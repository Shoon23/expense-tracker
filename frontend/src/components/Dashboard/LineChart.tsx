import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { getMonthlyExpenseTrend } from "../../services/api/expense";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface Props {
  userId: number;
}

const LineChart: React.FC<Props> = ({ userId }) => {
  const { data: resData } = getMonthlyExpenseTrend(userId);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Most Spent",
      },
    },
    maintainAspectRatio: false,
  };
  const dates = Object?.keys(resData || []);

  const data = {
    dates,
    datasets: Object.entries(resData || []).map(([key, value]) => ({
      fill: false,
      label: key,
      data: value,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    })),
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
