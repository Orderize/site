import { Chart } from "chart.js/auto";

export async function createDash(ctx, type, data, options) {
    return new Chart(ctx, {
        type: type,
        data: data,
        options: options
    });
}