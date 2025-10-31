export const StatCard = ({ 
  icon: Icon, 
  value, 
  label, 
  change, 
  iconBg, 
  iconColor,
  changeColor,
  trendIcon: TrendIcon 
}: {
  icon: any;
  value: string | number;
  label: string;
  change: string;
  iconBg: string;
  iconColor: string;
  changeColor: string;
  trendIcon?: any;
}) => (
  <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${iconBg} flex items-center justify-center mb-3 sm:mb-4`}>
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor}`} />
        </div>
        <p className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-1">{value}</p>
        <p className="text-xs sm:text-sm text-gray-500 font-medium">{label}</p>
        <div className="flex items-center gap-1 mt-2">
          {TrendIcon && <TrendIcon className={`w-3 h-3 sm:w-4 sm:h-4 ${changeColor}`} />}
          <span className={`text-xs sm:text-sm font-medium ${changeColor}`}>{change}</span>
        </div>
      </div>
      {TrendIcon && (
        <div className="mt-2">
          <TrendIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${changeColor}`} />
        </div>
      )}
    </div>
  </div>
);
