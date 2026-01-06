import { ActivityItem } from "@/components/shared/dashboard/admin/ActivityItem";
import { useGetRecentActivityQuery } from "@/store/fetures/admin.dashboard.api";
import {
  LuUsers,
  LuStore,
  LuBox,
} from "react-icons/lu";

const RecentActivity = () => {
  const { data, isLoading } = useGetRecentActivityQuery();

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

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-5">
        Recent Activity
      </h2>
      {isLoading ? (
        <div className="space-y-4">
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
        <div className="divide-y divide-gray-100">
          {data && data.length > 0 ? (
            data.map((activity) => {
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
            <p className="text-gray-500 text-sm text-center py-4">No recent activity</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
