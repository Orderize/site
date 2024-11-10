import React, { useState, useRef } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import FormClient from "../../Components/FormClient/FormClient";
import ButtonNext from "../../Components/Progress/ButtonNext/ButtonNext";
import Progress from "../../Components/Progress/Progress";
import styles from "./Client.module.css";
import MediaQuery from "react-responsive";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

    function Client() {
        const navigate = useNavigate();
        const [isNovoClient, setIsNovoClient] = useState(false);
        const formClientRef = useRef();
    
        const handleNext = async () => {
            console.log("handleNext foi chamado");
            try {
                if (formClientRef.current && !formClientRef.current.isValidForm()) {
                    toast.error("Por favor, preencha todos os campos obrigatórios.", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    return;
                }
        
                if (isNovoClient) {
                    await formClientRef.current.handleSaveClient();
                }

                navigate("/pedidos/novo-pedido");
        
            } catch (error) {
                alert("Erro ao salvar o cliente: " + error.message);
                console.error(error);
            }
        };
        

        const handleNovoClientChange = (isNovo) => {
            console.log("Mudando estado de novo cliente para:", isNovo);
            setIsNovoClient(isNovo);
    
            if (isNovo) {
                toast.info("Cliente não encontrado.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        };

    return (
        <>
        <Navbar activeButton={"Pedidos"} />
        <ToastContainer />  

        <main className={styles["container-client"]}>
        <MediaQuery maxWidth={768}>
                <p className={styles.titulo}>Novo Pedido</p>

                <div className={styles["client-modal-card"]}>
                    <p className={isNovoClient ? styles.novoCliente : styles.subtitulo}>
                            {isNovoClient ? "Novo Cliente" : "Cliente"}
                        </p>
                    <FormClient onNovoClientChange={handleNovoClientChange} />
                </div>

                <div className={styles.progress}>
                    <ButtonNext onNext={handleNext} />

                    <Progress currentStep={1} totalSteps={5} />
                </div>
        </MediaQuery>

        <MediaQuery minWidth={769}>
            <p className={styles.titulo}>Novo Pedido</p>
            <div className={styles["client-modal-card"]}>
                <p className={isNovoClient ? styles.novoCliente : styles.subtitulo}>
                    {isNovoClient ? "Novo Cliente" : "Cliente"}
                </p>
                <FormClient ref={formClientRef} onNovoClientChange={handleNovoClientChange} />
            </div>

            <ButtonNext onNext={handleNext} />
        </MediaQuery>
        </main>
    </>
    );
}

export default Client;