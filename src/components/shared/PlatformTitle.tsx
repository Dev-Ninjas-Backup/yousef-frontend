"use client";

import { useEffect } from "react";
import { useGetPlatformSettingPublicQuery } from "@/store/fetures/setting.api";

/**
 * Invisible component placed in the root layout.
 * Fetches the platform name from the DB and updates the browser <title> tag dynamically.
 * Falls back to "SayaraHub" while loading or if the API fails.
 */
export function PlatformTitle() {
  const { data: platformData } = useGetPlatformSettingPublicQuery();

  useEffect(() => {
    const name = platformData?.data?.platformName;
    if (name) {
      document.title = name;
    }
  }, [platformData]);

  return null;
}
