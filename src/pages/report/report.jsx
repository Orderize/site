import React, { useEffect, useRef, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import 'chart.js/auto';

import "./report.css";
import Kpi from "./kpi/kpi";
import Navbar from "../../components/navbar/navbar";
import useChartData from "../../services/ChartData/useChartData";


function Report() {

    // faturamento semanal/mensal x 
    // faturamento por salão e delivery x
    // lucro bruto
    
    // faturamento do produto por hora 
    // valor médio de cada pedido diario

    // Adicionar controle para poder ver qual dos tipos de venda teve o maior pedido em dinheiro feito


    const { invoicingData, profitData, hourlyInvoicingData } = useChartData();
    

    if (!invoicingData || !profitData || !hourlyInvoicingData) {
        return <div>Carregando dados...</div>;
    }

    return (
        <>
            <Navbar role={"admin"} activeButton={"Relatórios"} />
            <main className="container-report">
                <h1>Relatórios</h1>
                <section className="area-kpis">
                    <Kpi
                        background={"#EAE5DE"}
                        color={"#3A3C16"}
                        title={"Renda Bruta"}
                        value={"R$ 3.125,00"}
                    />
                    <Kpi
                        background={"#656D4A"}
                        color={"#EAE5DE"}
                        title={"Rendimento/Hora"}
                        value={"+120%"}
                    />
                    <Kpi
                        background={"#7B806A"}
                        color={"#EAE5DE"}
                        title={"Pedidos no dia"}
                        value={"42"}
                    />
                    <Kpi
                        background={"#B5B9A4"}
                        color={"#3A3C16"}
                        title={"Faturamento do dia"}
                        value={"R$ 3.125,00"}
                    />
                </section>
                <section className="area-mini-charts">
                    <div className="charts profit">
                        <h3>Lucros por Período</h3>
                        <Bar                             
                            data={profitData.data}
                            options={profitData.options}
                        />
                    </div>
                    <div className="charts">
                        <h3>Faturamento R$ por Pedido</h3>
                        <Doughnut 
                            data={invoicingData.data}
                            options={invoicingData.options}
                        />
                    </div>
                </section>
                <section className="area-charts">
                    <div className="charts profit">
                        <h3>Faturamento por hora</h3>
                        <Line                             
                            data={hourlyInvoicingData.data}
                            options={hourlyInvoicingData.options}
                        />
                    </div>
                </section>
            </main>
        </>
    )
}

export default Report;
