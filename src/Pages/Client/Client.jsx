import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import FormClient from "../../Components/FormClient/FormClient";
import ButtonNext from "../../Components/Progress/ButtonNext/ButtonNext";
import Progress from "../../Components/Progress/Progress";
import styles from "./Client.module.css";
import MediaQuery from "react-responsive";
import { useNavigate } from "react-router-dom";
import { NotePencil } from '@phosphor-icons/react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

    function Client() {
        const navigate = useNavigate();
        const [isNovoClient, setIsNovoClient] = useState(false);
        const [isEditing, setIsEditing] = useState(false);
        const formClientRef = useRef();

        var respostaAddress;
        var respostaUser;
    
        const handleNext = async () => {
            console.log("handleNext foi chamado");
            try {
                if (isNovoClient) {
                    respostaAddress = await formClientRef.current.handleSaveAdress();

                    console.log("respostaAddress de salvar endereço:", respostaAddress);

                    respostaUser = await formClientRef.current.handleSaveClient(respostaAddress);
                }

                if (!formClientRef.current.isValidForm()) {
                    toast.error("Por favor, preencha todos os campos.", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    // setIsNovoClient(false);

                    return;
                } 
                navigate("/pedidos/novo-pedido");
            } catch (error) {
                alert("Erro ao salvar o cliente: " + error.message);
                console.error(error);
            }
        };

        const handleEdit = () => {
            console.log("handleEdit foi chamado");
            setIsEditing(true);
        };

        const handleSave = async () => {
            try {
                console.log("handleSave foi chamado");
                console.log("respostaUser", respostaUser);
                console.log("respostaAddress", respostaAddress);
                formClientRef.current.handleSaveClick();

                toast.success('Cliente editado com sucesso!');
                setIsEditing(false);
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
        <Navbar activeButton={"Pedidos"}/>

        <main className={styles["container-client"]}>

        <MediaQuery minWidth={769}>
        
            <p className={styles.titulo}>Novo Pedido</p>
            <div className={styles["client-modal-card"]}>

            {/* {isNovoClient ? ( */}
                {isEditing ? (
                    <button onClick={handleSave} className={styles.save}>Salvar</button>
                ) : (
                    <NotePencil 
                        size={25} 
                        weight="duotone" 
                        className={styles.edit} 
                        onClick={handleEdit}
                    />  
                )}
            {/* ) : (
                <NotePencil 
                        size={25} 
                        weight="duotone" 
                        className={styles["edit-desativado"]} 
                />  
            )} */}



                <div className={styles["client-info"]}> 
                    <p className={isNovoClient ? styles.novoCliente : styles.subtitulo}>
                        {isNovoClient ? "Novo Cliente" : "Cliente"}
                    </p>
                        
                    <FormClient ref={formClientRef} onNovoClientChange={handleNovoClientChange} isEditing={isEditing} />
                </div>
            </div>

            <ButtonNext onNext={handleNext} />
        </MediaQuery>
        </main>
    </>
    );
}

export default Client;