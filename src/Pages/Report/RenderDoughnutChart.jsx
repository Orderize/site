import React from "react";
import { Doughnut } from "react-chartjs-2";

const RenderDoughnutChart = ({ info }) => {
    if (!info) return null;

    return (
        <Doughnut data={info.data} options={info.options} />
    );
};

export default RenderDoughnutChart;