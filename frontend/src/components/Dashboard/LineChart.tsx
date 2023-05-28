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
import expense from "../../services/api/expense";
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
  const { data: resData } = expense.getMonthlyExpenseTrend(userId);

  const monthLabels = Object.keys(resData ?? []);
  const expenseValues = Object.values(resData ?? []);

  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: "Monthly Expenses",
        data: expenseValues,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Expense Trend",
      },
    },
    maintainAspectRatio: false,
  };

  return <Line options={options} data={data} />;
};

//  Object.entries(resData || []).map(([key, value]) => ({
//       fill: false,
//       label: key,
//       data: value,
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     })),
export default LineChart;
