import React from "react";
import { Bar } from "react-chartjs-2";

const RenderBarChart = ({ info }) => {
    if (!info) return null;

    return (
        <Bar data={info.data} options={info.options} />
    );
};

export default RenderBarChart;