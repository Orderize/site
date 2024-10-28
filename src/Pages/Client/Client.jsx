import React, { useState, useRef } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import FormClient from "../../Components/FormClient/FormClient";
import ButtonNext from "../../Components/Progress/ButtonNext/ButtonNext";
import Progress from "../../Components/Progress/Progress";
import styles from "./Client.module.css";
import MediaQuery from "react-responsive";
import { useNavigate } from "react-router-dom";

    function Client() {
        const navigate = useNavigate();
        const [isNovoClient, setIsNovoClient] = useState(false);
        const formClientRef = useRef();

        // const [client, setClient] = useState({
        //     name: "",
        //     phone: "",
        //     address: "",
        // });

        const handleNext = async () => {
            console.log("handleNext foi chamado");
            try {
                if (formClientRef.current && !formClientRef.current.isValidForm()) {
                    alert("Por favor, preencha todos os campos obrigatórios.");
                    return;
                }
        
                if (isNovoClient) {
                    await formClientRef.current.handleSaveClient();
                }
        
                let clientData; // Defina clientData fora do bloco para torná-lo acessível no navigate
        
                if (formClientRef.current) {
                    clientData = formClientRef.current.getClientData();
                    console.log("Dados do cliente:", clientData); //até aqui está trazendo os dados certos
                    navigate("/pedidos/novo-pedido", { state: { clientData } });
                }
        
                // Navegue para o próximo componente com o estado clientData
        
            } catch (error) {
                alert("Erro ao salvar o cliente: " + error.message);
                console.error(error);
            }
        };
        

        const handleNovoClientChange = (isNovo) => {
            console.log("Mudando estado de novo cliente para:", isNovo);
            setIsNovoClient(isNovo);
        };

    return (
        <>
        <Navbar activeButton={"Pedidos"} />

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
                {isNovoClient ?
                    <p className={styles["client-nao-encontrado"]}>Cliente não encontrado.</p>
                    : null
                }

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