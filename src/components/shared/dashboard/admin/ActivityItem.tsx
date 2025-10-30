export const ActivityItem = ({ 
  icon: Icon, 
  title, 
  time, 
  iconBg, 
  iconColor 
}: {
  icon: any;
  title: string;
  time: string;
  iconBg: string;
  iconColor: string;
}) => (
  <div className="flex items-center gap-3 sm:gap-4 py-3 sm:py-4">
    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor}`} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm sm:text-base font-medium text-gray-900 truncate">{title}</p>
      <p className="text-xs sm:text-sm text-gray-500">{time}</p>
    </div>
  </div>
);