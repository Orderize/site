import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import FormClient from "../../Components/FormClient/FormClient";
import ButtonNext from "../../Components/Progress/ButtonNext/ButtonNext";
import Progress from "../../Components/Progress/Progress";
import styles from "./Client.module.css";
import MediaQuery from "react-responsive";
import { useNavigate } from "react-router-dom";

    function Client() {
        const navigate = useNavigate();

        const handleNext = () => {
            navigate("/pedidos/novo-pedido");
        };

    return (
        <>
        <Navbar activeButton={"Pedidos"} />

        <main className={styles["container-client"]}>
        <MediaQuery maxWidth={768}>

            {/* <p className={styles.titulo}>Novo Pedido</p>     */}
            {/* <div className={styles["client-modal"]}> */}

                {/* <p className={styles.subtitulo}>Selecione o cliente:</p> */}
                <p className={styles.titulo}>Novo Pedido</p>

                <div className={styles["client-modal-card"]}>
                    <p className={styles.subtitulo}>Cliente</p>

                    <FormClient />
                </div>

                <div className={styles.progress}>
                    <ButtonNext onNext={handleNext} />

                        <Progress currentStep={1} totalSteps={5} />
                </div>
            {/* </div> */}
        </MediaQuery>

        <MediaQuery minWidth={769}>
        {/* <div className={styles["client-modal"]}> */}
            <p className={styles.titulo}>Novo Pedido</p>

            <div className={styles["client-modal-card"]}>
                <p className={styles.subtitulo}>Cliente</p>

                <FormClient />
            </div>

            <ButtonNext onNext={handleNext} />
        {/* </div> */}
        </MediaQuery>
        </main>
    </>
    );
}

export default Client;