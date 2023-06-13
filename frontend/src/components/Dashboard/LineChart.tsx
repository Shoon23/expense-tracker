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
import expenseQuery from "../../services/api/expenseQuery";
import Loading from "../common/Loading";
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
  const {
    data: resData,
    isLoading,
    isError,
  } = expenseQuery.getMonthlyExpenseTrend(userId);

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

  return isLoading ? (
    <div className="flex items-center justify-center h-full w-full">
      <Loading />
    </div>
  ) : isError ? (
    <div className="flex items-center justify-center h-full w-full">
      <p className="text-center text-red-600 ">
        Error occurred while fetching data.
      </p>
    </div>
  ) : resData ? (
    <Line options={options} data={data} />
  ) : (
    <div className="flex items-center justify-center h-full w-full">
      <p className="text-center ">No Data Available</p>
    </div>
  );
};

export default LineChart;
