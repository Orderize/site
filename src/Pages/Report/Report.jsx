import React, { useEffect, useRef, useState } from "react";
import 'chart.js/auto';

import "./Report.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useMediaQuery } from "react-responsive";

import RenderKpis from "./RenderKpis";
import RenderDoughnutChart from "./RenderDoughnutChart";
import useAttestations from "../../hooks/useAttestations";
import { ToastContainer } from "react-toastify";

function Report() {
    const [ token ] = useState(localStorage.getItem('token'));
    const { infoKpi, infoDoughnutChart } = useAttestations(token);
    
    const [ barChart, setBarChart ] = useState();
    
    const isDesktop = useMediaQuery({query: "(min-width: 1200px)"})

    const handleBarChart = () => {
        const data = [{}];

        const infos = {
            delivery: data.filter(it => it.orderType == "delivery").reduce((sum, current) => sum + current.totalValue, 0).toFixed(2),
            saloon: data.filter(it => it.orderType == "saloon").reduce((sum, current) => sum + current.totalValue, 0).toFixed(2),
        };
        
        // const dataBarChart = barData(infos);
    } 

    return (
        <>
            <Navbar activeButton={"Relatórios"} />
            <ToastContainer />
            <main className="container-report">
                <h1>Relatórios</h1>
                <section className="area-kpis">
                    <RenderKpis info={infoKpi} isDesktop={isDesktop}/>
                </section>
                <section className="area-mini-charts">
                    <RenderDoughnutChart info={infoDoughnutChart}/>
                </section>
                
                {/* <div className="charts profit">
                    <Bar                             
                        data={profitData.data}
                        options={profitData.options}
                    />
                </div> */}
                    
                    
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
