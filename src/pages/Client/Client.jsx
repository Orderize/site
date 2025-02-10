import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar/Index";
import FormClient from "@/components/FormClient/FormClient";
import ButtonNext from "@/components/Progress/ButtonNext/ButtonNext";
import Progress from "@/components/Progress/Progress";
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
                    if (respostaUser){
                        navigate("/pedidos/novo-pedido");
                    }
                } else {
                    navigate("/pedidos/novo-pedido");
                }

                if (!formClientRef.current.isValidForm()) {
                    toast.error("Por favor, preencha todos os campos.", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    // setIsNovoClient(false);

                    return; 
                }

            } catch (error) {
                // toast.error("Erro ao salvar o cliente: " + error.message);
                // alert("Erro ao salvar o cliente: " + error.message);
                console.error(error);
                return;
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
                return;
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