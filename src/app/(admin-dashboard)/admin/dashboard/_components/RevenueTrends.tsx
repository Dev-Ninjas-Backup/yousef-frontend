import React from "react";
import { Line } from "react-chartjs-2";

const RevenueTrends = () => {
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "revenue",
        data: [35000, 40000, 42000, 38000, 43000, 45000],
        borderColor: "#3B82F6",
        backgroundColor: "transparent",
        tension: 0.4,
        fill: false,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverBackgroundColor: "#3B82F6",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        align: "start" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "line",
          padding: 20,
          font: {
            size: 12,
            family: "Inter, system-ui, sans-serif",
          },
          color: "#3B82F6",
          boxWidth: 25,
          boxHeight: 2,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#1F2937",
        bodyColor: "#1F2937",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            return context.parsed.y.toLocaleString();
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          drawOnChartArea: true,
          color: "#F3F4F6",
          drawTicks: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 11,
            family: "Inter, system-ui, sans-serif",
          },
          padding: 8,
        },
      },
      y: {
        grid: {
          display: true,
          drawOnChartArea: true,
          color: "#F3F4F6",
          drawTicks: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 11,
            family: "Inter, system-ui, sans-serif",
          },
          padding: 8,
          callback: function (value: any) {
            return value >= 1000 ? value / 1000 + "000" : value;
          },
        },
        beginAtZero: true,
        max: 60000,
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
        Revenue Trends
      </h2>
      <div className="h-64 sm:h-72 lg:h-80">
        <Line data={revenueData} options={revenueOptions} />
      </div>
    </div>
  );
};

export default RevenueTrends;
