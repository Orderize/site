import React, { useEffect, useRef, useState } from "react";
import 'chart.js/auto';
import Navbar from "@/components/Navbar/Navbar";
import { useMediaQuery } from "react-responsive";
import RenderKpis from "./RenderKpis";
import RenderDoughnutChart from "./RenderDoughnutChart";
import useAttestations from "@/hooks/useAttestations";
import { ToastContainer } from "react-toastify";
import RenderBarChart from "./RenderBarChart";
import styles from "./Report.module.css";

function Report() {
    const { infoKpi, infoDoughnutChart, infoBarChart } = useAttestations();
    const [isLoading, setIsLoading] = useState(true);
    const isDesktop = useMediaQuery({query: "(min-width: 1200px)"})

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            if (infoKpi && infoDoughnutChart && infoBarChart) {
                setIsLoading(false);
            }
        }, 3000);

        return () => clearTimeout(loadingTimer);
    }, [infoKpi, infoDoughnutChart, infoBarChart]);

    if (isLoading) {
        return (
            <>
                <Navbar activeButton={"Relatórios"} />
                <main className={styles["container-report"]}>
                    <h1>Relatórios</h1>
                    <section className={styles["area-kpis"]}>
                        <div className={styles.skeletonKpi}></div>
                        <div className={styles.skeletonKpi}></div>
                        <div className={styles.skeletonKpi}></div>
                    </section>
                    <section className={styles["area-mini-charts"]}>
                        <div className={styles.skeletonChart}></div>
                        <div className={styles.skeletonChart}></div>
                    </section>
                </main>
            </>
        );
    }

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
