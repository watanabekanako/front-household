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

  const pieColor = selectedCategoryGroup.map((data: any) => data.color);
  console.log(pieColor, "color");
  const data = {
    labels: newName,
    datasets: [
      {
        data: newSubtotal,
        backgroundColor: pieColor,
        borderColor: pieColor,
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
