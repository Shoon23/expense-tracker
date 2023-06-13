import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import expenseQuery from "../../services/api/expenseQuery";
import Loading from "../common/Loading";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  userId: number;
}
const DoughnutChart: React.FC<Props> = ({ userId }) => {
  const {
    data: resData,
    isLoading,
    isError,
  } = expenseQuery.getCategoryDistribution(userId);
  const labels = resData?.map((category: any) => category.category) || [];
  const dataValues =
    resData?.map((category: any) => category.totalExpenses) || [];

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <p className="text-center text-red-600 ">
      Error occurred while fetching data.
    </p>
  ) : resData ? (
    <Doughnut data={data} />
  ) : (
    <p className="text-center ">No Data Available</p>
  );
};
export default DoughnutChart;
