import React, { useEffect, useRef, useState } from "react";
import 'chart.js/auto';

import Navbar from "../../components/Navbar/Index";
import { useMediaQuery } from "react-responsive";

import RenderKpis from "./RenderKpis";
import RenderDoughnutChart from "./RenderDoughnutChart";
import useAttestations from "../../hooks/useAttestations";
import { ToastContainer } from "react-toastify";
import RenderBarChart from "./RenderBarChart";
import styles from "./Report.module.css";

function Report() {
<<<<<<<< HEAD:src/pages/Report/Report.jsx
    const { infoKpi, infoDoughnutChart, infoBarChart } = useAttestations(token);
========
    const { infoKpi, infoDoughnutChart, infoBarChart } = useAttestations();
>>>>>>>> c4c1e96 (Ajustando Reports.js):src/pages/Report/Index.jsx
    
    const isDesktop = useMediaQuery({query: "(min-width: 1200px)"})

    useEffect(() => {
    }, [infoKpi, infoDoughnutChart, infoBarChart]);

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
