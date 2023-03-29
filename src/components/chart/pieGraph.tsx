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
  console.log();
  const data = {
    labels: newName,
    datasets: [
      {
        // label: "# of Votes",
        data: newSubtotal,
        backgroundColor: [
          "#FF773E",
          "#663399",
          "#5D99FF",
          "#333333",
          "#FF5192",
          "#2E8B57",
          "#87CEFA",
          "#FFCC99",
          "#005500",
          "#FA8072",
          "#CD853F",
          "#696969",
        ],
        borderColor: [
          "#FF773E",
          "#663399",
          "#5D99FF",
          "#333333",
          "#FF5192",
          "#2E8B57",
          "#87CEFA",
          "#FFCC99",
          "#005500",
          "#FA8072",
          "#CD853F",
          "#696969",
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
