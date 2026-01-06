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
      name: stat.category,
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
        <div className="h-64 sm:h-72 lg:h-80 relative flex items-center justify-center">
          <div className="w-full max-w-md relative">
            <div className="relative w-full aspect-square max-w-[280px] mx-auto">
              <PieChart
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  maxHeight: "80vh",
                  aspectRatio: 1,
                }}
              >
                <Pie
                  data={chartData}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  fill="#8884d8"
                  dataKey="value"
                  isAnimationActive={isAnimationActive}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </div>

            {/* Legend */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              {chartData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-xs sm:text-sm text-gray-700">
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
