import React, { useEffect, useRef, useState } from "react";
import 'chart.js/auto';

import "./Report.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useMediaQuery } from "react-responsive";

import RenderKpis from "./RenderKpis";
import RenderDoughnutChart from "./RenderDoughnutChart";
import useAttestations from "../../hooks/useAttestations";
import { ToastContainer } from "react-toastify";
import RenderBarChart from "./RenderBarChart";

function Report() {
    const [ token ] = useState(localStorage.getItem('token'));
    const { infoKpi, infoDoughnutChart, infoBarChart } = useAttestations(token);
    
    const isDesktop = useMediaQuery({query: "(min-width: 1200px)"})

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
                    <div className="chart">
                        <RenderDoughnutChart info={infoDoughnutChart}/>
                    </div>
                    <div className="chart">
                        <RenderBarChart info={infoBarChart}/>
                    </div>
                </section>

                {/* <div className="charts profit">
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
