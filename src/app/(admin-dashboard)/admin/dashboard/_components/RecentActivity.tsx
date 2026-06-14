"use client";

import { useState } from "react";
import { ActivityItem } from "@/components/shared/dashboard/admin/ActivityItem";
import { useGetRecentActivityQuery } from "@/store/fetures/admin.dashboard.api";
import { LuUsers, LuStore, LuBox } from "react-icons/lu";
import { RotateCw, ChevronLeft, ChevronRight } from "lucide-react";

const RecentActivity = () => {
  const [filter, setFilter] = useState<"all" | "user" | "garage">("all");
  const [userPage, setUserPage] = useState(1);
  const [garagePage, setGaragePage] = useState(1);
  const limit = 5;

  const { data: response, isLoading, isFetching, refetch } = useGetRecentActivityQuery({
    userPage,
    userLimit: limit,
    garagePage,
    garageLimit: limit,
  });

  const getIconConfig = (type: string) => {
    switch (type) {
      case 'NEW_GARAGE':
        return { icon: LuStore, iconBg: 'bg-blue-50', iconColor: 'text-blue-600' };
      case 'PRODUCT_SUBMISSION':
        return { icon: LuBox, iconBg: 'bg-orange-50', iconColor: 'text-orange-600' };
      case 'NEW_USER':
        return { icon: LuUsers, iconBg: 'bg-purple-50', iconColor: 'text-purple-600' };
      default:
        return { icon: LuUsers, iconBg: 'bg-gray-50', iconColor: 'text-gray-600' };
    }
  };

  const usersList = response?.data?.users || [];
  const garagesList = response?.data?.garages || [];
  const userMeta = response?.data?.userMetadata;
  const garageMeta = response?.data?.garageMetadata;

  const renderPagination = (
    currentPage: number,
    totalPages: number,
    onPageChange: (p: number) => void
  ) => {
    if (totalPages <= 1) return null;
    return (
      <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-2">
        <span className="text-xs text-gray-500 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-50 text-gray-600 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-50 text-gray-600 transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-gray-100">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          Recent Activity
        </h2>
        <div className="flex items-center gap-2">
          {/* Refresh Button */}
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors disabled:opacity-50"
            title="Refresh Activities"
          >
            <RotateCw className={`w-4 h-4 ${isFetching ? "animate-spin text-blue-600" : ""}`} />
          </button>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value as "all" | "user" | "garage");
              setUserPage(1);
              setGaragePage(1);
            }}
            className="text-xs sm:text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 cursor-pointer font-medium"
          >
            <option value="all">Show All</option>
            <option value="user">Users Only</option>
            <option value="garage">Garages Only</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4 py-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse flex gap-3 py-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative">
          {filter === "all" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
              {/* User Activities Column */}
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    User Activities
                  </h3>
                  <div className="divide-y divide-gray-50">
                    {usersList.length > 0 ? (
                      usersList.map((activity) => {
                        const config = getIconConfig(activity.type);
                        return (
                          <ActivityItem
                            key={activity.id}
                            icon={config.icon}
                            title={activity.message}
                            time={activity.timeAgo}
                            iconBg={config.iconBg}
                            iconColor={config.iconColor}
                          />
                        );
                      })
                    ) : (
                      <p className="text-gray-500 text-xs text-center py-6">No user activity</p>
                    )}
                  </div>
                </div>
                {userMeta && renderPagination(userPage, userMeta.totalPage, setUserPage)}
              </div>

              {/* Vertical Divider */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-100 transform -translate-x-1/2" />

              {/* Garage Activities Column */}
              <div className="flex flex-col h-full justify-between md:pl-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Garage Activities
                  </h3>
                  <div className="divide-y divide-gray-50">
                    {garagesList.length > 0 ? (
                      garagesList.map((activity) => {
                        const config = getIconConfig(activity.type);
                        return (
                          <ActivityItem
                            key={activity.id}
                            icon={config.icon}
                            title={activity.message}
                            time={activity.timeAgo}
                            iconBg={config.iconBg}
                            iconColor={config.iconColor}
                          />
                        );
                      })
                    ) : (
                      <p className="text-gray-500 text-xs text-center py-6">No garage activity</p>
                    )}
                  </div>
                </div>
                {garageMeta && renderPagination(garagePage, garageMeta.totalPage, setGaragePage)}
              </div>
            </div>
          ) : filter === "user" ? (
            /* User Activities Full Width */
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  User Activities
                </h3>
                <div className="divide-y divide-gray-50">
                  {usersList.length > 0 ? (
                    usersList.map((activity) => {
                      const config = getIconConfig(activity.type);
                      return (
                        <ActivityItem
                          key={activity.id}
                          icon={config.icon}
                          title={activity.message}
                          time={activity.timeAgo}
                          iconBg={config.iconBg}
                          iconColor={config.iconColor}
                        />
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-xs text-center py-6">No user activity</p>
                  )}
                </div>
              </div>
              {userMeta && renderPagination(userPage, userMeta.totalPage, setUserPage)}
            </div>
          ) : (
            /* Garage Activities Full Width */
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Garage Activities
                </h3>
                <div className="divide-y divide-gray-50">
                  {garagesList.length > 0 ? (
                    garagesList.map((activity) => {
                      const config = getIconConfig(activity.type);
                      return (
                        <ActivityItem
                          key={activity.id}
                          icon={config.icon}
                          title={activity.message}
                          time={activity.timeAgo}
                          iconBg={config.iconBg}
                          iconColor={config.iconColor}
                        />
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-xs text-center py-6">No garage activity</p>
                  )}
                </div>
              </div>
              {garageMeta && renderPagination(garagePage, garageMeta.totalPage, setGaragePage)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
