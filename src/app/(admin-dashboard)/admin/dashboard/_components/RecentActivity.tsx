import { ActivityItem } from "@/components/shared/dashboard/admin/ActivityItem";
import {
  LuUsers,
  LuStore,
  LuBox,
  LuDollarSign
} from "react-icons/lu";

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-5">
        Recent Activity
      </h2>
      <div className="divide-y divide-gray-100">
        <ActivityItem
          icon={LuStore}
          title="New garage registration: QuickFix Auto Service"
          time="2 hours ago"
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <ActivityItem
          icon={LuBox}
          title="Spare part submitted for approval: Engine Oil Filter"
          time="3 hours ago"
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
        <ActivityItem
          icon={LuDollarSign}
          title="Payment received: $650.00 from Precision Auto Care"
          time="6 hours ago"
          iconBg="bg-green-50"
          iconColor="text-green-600"
        />
        <ActivityItem
          icon={LuUsers}
          title="New user registration: Sarah Johnson"
          time="8 hours ago"
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>
    </div>
  );
};

export default RecentActivity;
