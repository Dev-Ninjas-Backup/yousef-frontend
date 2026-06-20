"use client";

import { useGetPartsCategoryQuery } from "@/store/fetures/admin.dashboard.api";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#F97316",
  "#6366F1",
  "#84CC16",
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
        <p className="text-gray-600 text-sm">
          {item.value.toFixed(1)}%
        </p>
        <p className="text-gray-500 text-xs">{item.count} products</p>
      </div>
    );
  }
  return null;
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
        <div className="flex flex-col items-center gap-6">
          {/* Responsive pie chart */}
          <div className="w-full h-64 sm:h-72 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius="75%"
                  isAnimationActive={isAnimationActive}
                  labelLine={false}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                    if (percent === undefined || percent === null || percent < 0.05) return null; // skip tiny slices
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
                    const angle = midAngle ?? 0;
                    const x = cx + radius * Math.cos(-angle * RADIAN);
                    const y = cy + radius * Math.sin(-angle * RADIAN);
                    return (
                      <text
                        x={x}
                        y={y}
                        fill="white"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={12}
                        fontWeight={600}
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                >
                  {chartData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend grid — 2 cols, grows naturally */}
          <div className="w-full grid grid-cols-2 gap-x-6 gap-y-2.5">
            {chartData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2 min-w-0">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <span
                  className="text-xs text-gray-600 font-medium truncate"
                  title={`${entry.name}: ${entry.value.toFixed(1)}%`}
                >
                  {entry.name}: {entry.value.toFixed(1)}%
                </span>
              </div>
            ))}
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
