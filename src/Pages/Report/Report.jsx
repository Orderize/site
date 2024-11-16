import React, { useEffect, useRef, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import 'chart.js/auto';

import "./Report.css";
import Kpi from "./Kpi/Kpi";
import Navbar from "../../Components/Navbar/Navbar";
import useChartData from "../../hooks/useChartData";
import { useMediaQuery } from "react-responsive";

import { getAttestationsToday } from "/src/api/services/Attestations"; 
import { doughnutData, barData } from "/src/hooks/useChartData";

function Report() {
    const [ token ] = useState(localStorage.getItem('token'));
    const [ user ] = useState(JSON.parse(localStorage.getItem('user')));
    const [ attestation, setAttestition ] = useState();
    const [ info, setInfo ] = useState();
    const [ doughnutChart, setDoughnutChart ] = useState();
    const [ barChart, setBarChart ] = useState();

    const isDesktop = useMediaQuery({
        query: "(min-width: 1200px)"
    })

    // const { invoicingData, profitData, hourlyInvoicingData } = useChartData();

    // if (!invoicingData || !profitData || !hourlyInvoicingData) {
    //     return <div>Carregando dados...</div>;
    // }

    const handleAttestions = async () => {
        try {
            const data = await getAttestationsToday(token);
            
            console.log(data);
            if (data) {
                setAttestition(data);
                handleInfo(data);
                handleDoughnutChart(data);
            };
        } catch (error) {
            // FAZER UM MODAL AQUI PARA FALAR SOBRE O ERR =
            alert(error.message)
            console.error(error);
        }
    };

    const handleInfo = (data) => {
        const quantidadePedidos = data.length;
        const lucro = data.reduce((sum, current) => sum + current.totalValue, 0);

        setInfo(prev => ({
            ...prev,
            quantidadePedidos,
            lucro,
        }));
    };

    const handleDoughnutChart = (data) => {
        const infos = {
            delivery: data.filter(it => it.orderType == "delivery").reduce((sum, current) => sum + current.totalValue, 0).toFixed(2),
            saloon: data.filter(it => it.orderType == "saloon").reduce((sum, current) => sum + current.totalValue, 0).toFixed(2),
        };

        const dataDoughnutChart = doughnutData(infos);        
        if (dataDoughnutChart) setDoughnutChart(dataDoughnutChart);
    };

    const handleBarChart = () => {
        const data = [{}];

        const infos = {
            delivery: data.filter(it => it.orderType == "delivery").reduce((sum, current) => sum + current.totalValue, 0).toFixed(2),
            saloon: data.filter(it => it.orderType == "saloon").reduce((sum, current) => sum + current.totalValue, 0).toFixed(2),
        };
        
        // const dataBarChart = barData(infos);
    } 

    useEffect(() => {
        handleAttestions();
    }, []);

    return (
        <>
            <Navbar activeButton={"Relatórios"} />
            <main className="container-report">
                <h1>Relatórios</h1>
                <section className="area-kpis">
                    {
                        info &&
                        isDesktop ?  
                        [
                            <Kpi
                                background={"#7B806A"}
                                color={"#EAE5DE"}
                                title={"Pedidos no dia"}
                                value={info.quantidadePedidos}
                            />,
                            <Kpi
                                background={"#EAE5DE"}
                                color={"#3A3C16"}
                                title={"Faturamento Bruto"}
                                value={`R$ ${info.lucro.toFixed(2)}`}
                            />,
                            <Kpi
                                background={"#656D4A"}
                                color={"#EAE5DE"}
                                title={"Popular da Semana"}
                                value={"Calabreza"}
                            />,
                            <Kpi
                                background={"#B5B9A4"}
                                color={"#3A3C16"}
                                title={"Meta para o dia"}
                                value={"R$ 3.125,00"}
                            />

                        ] : [
                            <Kpi
                                background={"#EAE5DE"}
                                color={"#3A3C16"}
                                title={"Faturamento Bruto"}
                                value={"R$ 3.125,00"}
                            />,
                            <Kpi
                                background={"#656D4A"}
                                color={"#EAE5DE"}
                                title={"Pedidos no dia"}
                                value={"42"}
                            />,
                        ]
                        
                    }
                </section>
                {
                    doughnutChart &&
                    <section className="area-mini-charts">
                        {/* <div className="charts profit">
                            <Bar                             
                                data={profitData.data}
                                options={profitData.options}
                            />
                        </div> */}
                    
                        <div className="charts">
                            <Doughnut 
                                data={doughnutChart.data}
                                options={doughnutChart.options}
                            />
                        </div>
                    </section>
                }
                    
                {/* {
                    isDesktop
                        &&
                    <section className="area-charts">
                        <div className="charts profit">
                            <h3>Faturamento por hora</h3>
                            <Line                             
                                data={hourlyInvoicingData.data}
                                options={hourlyInvoicingData.options}
                            />
                        </div>
                    </section>
                } */}
            </main>
        </>
    )
}

export default Report;
