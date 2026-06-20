export interface DaySchedule {
  isClosed: boolean;
  openTime: string;
  closeTime: string;
}

export interface WeeklySchedule {
  Sunday: DaySchedule;
  Monday: DaySchedule;
  Tuesday: DaySchedule;
  Wednesday: DaySchedule;
  Thursday: DaySchedule;
  Friday: DaySchedule;
  Saturday: DaySchedule;
}

export const DAYS_OF_WEEK: (keyof WeeklySchedule)[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const parseExistingSchedule = (weekdaysHours: string | null | undefined, weekendsHours: string | null | undefined): WeeklySchedule => {
  try {
    if (weekdaysHours && weekdaysHours.startsWith("{")) {
      const parsed = JSON.parse(weekdaysHours);
      const schedule: any = {};
      DAYS_OF_WEEK.forEach((day) => {
        const value = parsed[day] || "Closed";
        if (value.toLowerCase() === "closed") {
          schedule[day] = { isClosed: true, openTime: "9:00 AM", closeTime: "6:00 PM" };
        } else {
          const parts = value.split(" - ");
          schedule[day] = {
            isClosed: false,
            openTime: parts[0] || "9:00 AM",
            closeTime: parts[1] || "6:00 PM",
          };
        }
      });
      return schedule as WeeklySchedule;
    }
  } catch (e) {
    console.error("Failed to parse JSON working hours in parseExistingSchedule", e);
  }

  const schedule: any = {};
  DAYS_OF_WEEK.forEach((day) => {
    const isWeekend = day === "Sunday" || day === "Saturday";
    const oldVal = isWeekend ? weekendsHours : weekdaysHours;
    const value = oldVal || (isWeekend ? "Closed" : "8:00 AM - 8:00 PM");

    if (value.toLowerCase() === "closed") {
      schedule[day] = { isClosed: true, openTime: "9:00 AM", closeTime: "6:00 PM" };
    } else {
      const parts = value.split(" - ");
      schedule[day] = {
        isClosed: false,
        openTime: parts[0] || "9:00 AM",
        closeTime: parts[1] || "6:00 PM",
      };
    }
  });

  return schedule as WeeklySchedule;
};

export const serializeSchedule = (schedule: WeeklySchedule): string => {
  const serialized: Record<string, string> = {};
  DAYS_OF_WEEK.forEach((day) => {
    const d = schedule[day];
    serialized[day] = d.isClosed ? "Closed" : `${d.openTime} - ${d.closeTime}`;
  });
  return JSON.stringify(serialized);
};

export const parseTime = (h: string, m: string, p?: string): number => {
  let hour = parseInt(h);
  const min = parseInt(m || "0");
  if (p?.toLowerCase() === "pm" && hour !== 12) hour += 12;
  if (p?.toLowerCase() === "am" && hour === 12) hour = 0;
  return hour + min / 60;
};

export const isGarageCurrentlyOpen = (
  weekdaysHours: string | null | undefined,
  weekendsHours: string | null | undefined
): boolean => {
  if (!weekdaysHours && !weekendsHours) return false;

  const now = new Date();
  const day = now.getDay();
  const currentDayName = DAYS_OF_WEEK[day];

  let hoursStr = "";

  if (weekdaysHours && weekdaysHours.startsWith("{")) {
    try {
      const schedule = JSON.parse(weekdaysHours);
      hoursStr = schedule[currentDayName] || "";
    } catch (e) {
      console.error("Failed to parse JSON working hours in isGarageCurrentlyOpen", e);
    }
  } else {
    const isWeekend = day === 0 || day === 6;
    hoursStr = (isWeekend ? weekendsHours : weekdaysHours) || "";
  }

  if (!hoursStr || hoursStr.toLowerCase() === "closed") return false;

  const match = hoursStr.match(
    /(\d{1,2}):?(\d{0,2})\s*(am|pm)?\s*-\s*(\d{1,2}):?(\d{0,2})\s*(am|pm)?/i
  );
  if (!match) return false;

  const open = parseTime(match[1], match[2], match[3]);
  const close = parseTime(match[4], match[5], match[6]);
  const current = now.getHours() + now.getMinutes() / 60;

  return current >= open && current < close;
};

export const getFormattedWeeklySchedule = (
  weekdaysHours: string | null | undefined,
  weekendsHours: string | null | undefined
): { day: string; hours: string; status: "Open" | "Closed" }[] => {
  const weekly = parseExistingSchedule(weekdaysHours, weekendsHours);
  
  return DAYS_OF_WEEK.map((day) => {
    const d = weekly[day];
    return {
      day,
      hours: d.isClosed ? "Closed" : `${d.openTime} - ${d.closeTime}`,
      status: d.isClosed ? "Closed" : "Open",
    };
  });
};

export const getTodayHoursDescription = (
  weekdaysHours: string | null | undefined,
  weekendsHours: string | null | undefined
): string => {
  if (!weekdaysHours) return "";
  if (weekdaysHours.startsWith("{")) {
    try {
      const schedule = JSON.parse(weekdaysHours);
      const todayName = DAYS_OF_WEEK[new Date().getDay()];
      return schedule[todayName] || "Closed";
    } catch (e) {
      console.error("Failed to parse JSON working hours in getTodayHoursDescription", e);
    }
  }
  const todayIdx = new Date().getDay();
  const isWeekend = todayIdx === 0 || todayIdx === 6;
  return (isWeekend ? weekendsHours : weekdaysHours) || "";
};
