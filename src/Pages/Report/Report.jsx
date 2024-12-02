import React, { useEffect, useRef, useState } from "react";
import 'chart.js/auto';

import Navbar from "../../Components/Navbar/Navbar";
import { useMediaQuery } from "react-responsive";

import RenderKpis from "./RenderKpis";
import RenderDoughnutChart from "./RenderDoughnutChart";
import useAttestations from "../../hooks/useAttestations";
import { ToastContainer } from "react-toastify";
import RenderBarChart from "./RenderBarChart";
import styles from "./Report.module.css";

function Report() {
    const [ token ] = useState(localStorage.getItem('token'));
    const { infoKpi, infoDoughnutChart, infoBarChart } = useAttestations(token);
    
    const isDesktop = useMediaQuery({query: "(min-width: 1200px)"})
    
    useEffect(() => {
        console.log(infoDoughnutChart);
    }, [infoDoughnutChart])

    return (
        <>
            <Navbar activeButton={"Relatórios"} />
            <ToastContainer />
            <main className={styles["container-report"]}>
                <h1>Relatórios</h1>
                <section className={styles["area-kpis"]}>
                    <RenderKpis info={infoKpi} isDesktop={isDesktop}/>
                </section>
                <section className={styles["area-mini-charts"]}>
                    <div className={styles["chart"]}>
                        <RenderBarChart info={infoDoughnutChart}/>
                        <RenderDoughnutChart info={infoDoughnutChart}/>
                    </div>
                    <div className={styles["chart"]}>
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
