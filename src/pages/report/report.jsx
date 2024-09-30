import React, { useEffect, useRef, useState } from "react";
import "./report.css";
import Kpi from "./kpi/kpi";
import { createDash } from "./script";
import Navbar from "../../components/navbar/navbar";

function report() {

    // faturamento semanal/mensal
    // faturamento por salão e delivery
    // faturamento do produto por hora

    // valor médio de cada pedido diario


    // lucro bruto

    const chartRefs = useRef([]);
    const charts = useRef([]);

    const data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    const options = {
        plugins: {
            legend: {
                position: 'right', // Muda a posição da legenda para a esquerda
                align: 'center',    // Alinhamento da legenda (opcional)
                labels: {
                    usePointStyle: true, // Altera a forma da legenda para círculo
                    pointStyle: 'circle', // Define que o ponto deve ser um círculo
                }
            },
            elements: {
                point: {
                    borderWidth: 0, // Remove bordas dos arcos
                    radius: 10 // Define o raio das bordas
                }
            },
        },
        responsive: true,
        maintainAspectRatio: false
    }


    useEffect(() => {
        chartRefs.current.forEach(async (chartRef, idx) => {
            if (chartRef && chartRef.getContext) {
                const ctx = chartRef.getContext("2d");
                const newChart = await createDash(ctx, "doughnut", data, options);
                charts.current[idx] = newChart; 
            }
        });

        return () => {
            charts.current.forEach(chart => {
                if (chart) chart.destroy(); 
            });
        };
    }, []);
    

    return (
        <>
            <Navbar role={"admin"} activeButton={"Relatórios"} />
            <main className="container-report">
                <h1>Relatórios</h1>
                <section className="area-kpis">
                    <Kpi
                        background={"#EAE5DE"}
                        color={"#3A3C16"}
                        title={"Pedidos no dia"}
                        value={"00"}
                        />
                    <Kpi
                        background={"#656D4A"}
                        color={"#EAE5DE"}
                        title={"Faturamento do dia"}
                        value={"R$"}
                        />
                    <Kpi
                        background={"#7B806A"}
                        color={"#EAE5DE"}
                        title={"Renda Bruta"}
                        value={"R$"}
                        />
                    <Kpi
                        background={"#B5B9A4"}
                        color={"#3A3C16"}
                        title={"Renda Liquida"}
                        value={"R$"}
                    />
                </section>
                <section className="area-mini-charts">
                    <div className="charts">
                        <canvas ref={it => chartRefs.current[0] = it}></canvas>
                    </div>
                    <div>
                        <canvas></canvas>
                    </div>
                </section>
                <section className="">
                    <div>
                        <canvas></canvas>
                    </div>
                </section>
            </main>
        </>
    )
}

export default report;