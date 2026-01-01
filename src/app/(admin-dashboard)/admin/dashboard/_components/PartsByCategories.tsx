"use client";

import { Cell, Pie, PieChart, PieLabelRenderProps } from "recharts";

// Sample data
const data = [
  { name: "Engine Parts", value: 38, color: "#3B82F6" },
  { name: "Brakes", value: 21, color: "#10B981" },
  { name: "Suspension", value: 18, color: "#F59E0B" },
  { name: "Electrical", value: 14, color: "#EF4444" },
  { name: "Body Parts", value: 9, color: "#8B5CF6" },
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
  // Type assertions for recharts number types
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

const PartsByCategories = ({ isAnimationActive = true }: { isAnimationActive?: boolean }) => {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
        Parts by Category
      </h2>
      <div className="h-64 sm:h-72 lg:h-80 relative flex items-center justify-center">
        <div className="w-full max-w-md relative">
          {/* Chart Container */}
          <div className="relative w-full aspect-square max-w-[280px] mx-auto">
            <PieChart
              style={{ width: "100%", maxWidth: "500px", maxHeight: "80vh", aspectRatio: 1 }}
            >
              <Pie
                data={data}
                labelLine={false}
                label={renderCustomizedLabel}
                fill="#8884d8"
                dataKey="value"
                isAnimationActive={isAnimationActive}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>

          {/* Labels positioned around the chart */}
          <div className="absolute top-2 right-0 text-xs sm:text-sm font-medium text-blue-600">
            Engine Parts: 38%
          </div>
          <div className="absolute top-1/3 left-0 text-xs sm:text-sm font-medium text-green-600">
            Brakes: 21%
          </div>
          <div className="absolute bottom-1/4 left-4 text-xs sm:text-sm font-medium text-yellow-600">
            Suspension: 18%
          </div>
          <div className="absolute bottom-1/3 right-2 text-xs sm:text-sm font-medium text-red-600">
            Electrical: 14%
          </div>
          <div className="absolute top-1/2 right-0 translate-x-2 text-xs sm:text-sm font-medium text-purple-600">
            Body Parts: 9%
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartsByCategories;
