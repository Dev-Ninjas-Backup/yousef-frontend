"use client";

import { useGetPartsCategoryQuery } from "@/store/fetures/admin.dashboard.api";
import { Cell, Pie, PieChart, PieLabelRenderProps } from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  const centerX = cx as number;
  const centerY = cy as number;
  const angle = midAngle as number;
  const inner = innerRadius as number;
  const outer = outerRadius as number;
  const percentage = percent as number;

  const radius = inner + (outer - inner) * 0.5;
  const x = centerX + radius * Math.cos(-angle * RADIAN);
  const y = centerY + radius * Math.sin(-angle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > centerX ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs sm:text-sm font-semibold"
    >
      {`${(percentage * 100).toFixed(0)}%`}
    </text>
  );
};

const PartsByCategories = ({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) => {
  const { data, isLoading } = useGetPartsCategoryQuery();

  const chartData =
    data?.data.categoryStatistics.map((stat, index) => ({
      name: stat.categoryName,
      value: stat.percentage,
      count: stat.productCount,
      color: COLORS[index % COLORS.length],
    })) || [];

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
        Parts by Category
      </h2>
      {isLoading ? (
        <div className="h-64 sm:h-72 lg:h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : chartData.length > 0 ? (
        <div className="relative flex flex-col items-center justify-center">
          <div className="w-full max-w-md relative flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[200px] mx-auto flex items-center justify-center">
              <PieChart width={200} height={200}>
                <Pie
                  data={chartData}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  fill="#8884d8"
                  dataKey="value"
                  isAnimationActive={isAnimationActive}
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </div>

            {/* Legend */}
            <div className="mt-6 w-full grid grid-cols-2 gap-x-4 gap-y-2 sm:gap-y-2.5 px-2">
              {chartData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2 min-w-0">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-xs sm:text-sm text-gray-600 font-medium truncate" title={`${entry.name}: ${entry.value.toFixed(1)}%`}>
                    {entry.name}: {entry.value.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center text-gray-500">
          No category data available
        </div>
      )}
    </div>
  );
};

export default PartsByCategories;
