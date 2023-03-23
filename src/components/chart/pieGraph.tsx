import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { categoryGroup } from "../../types/Types";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieGraph: React.FC<any> = ({ selectedCategoryGroup, name }) => {
  console.log({ selectedCategoryGroup }, "props");
  console.log(name, "name");
  const newSubtotal = selectedCategoryGroup?.map(
    (data: { subtotal: number }) => data.subtotal
  );
  const newName = selectedCategoryGroup?.map(
    (data: { name: string }) => data.name
  );

  const data = {
    labels: newName,
    datasets: [
      {
        // label: "# of Votes",
        data: newSubtotal,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <Pie data={data} />
    </>
  );
};

export default PieGraph;
