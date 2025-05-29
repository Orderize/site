import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
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
        const [hasSelectedClient, setHasSelectedClient] = useState(false);
        const formClientRef = useRef();

        var respostaAddress;
        var respostaUser;
    
        const handleNext = async () => {

            try {
                if (!formClientRef.current.isValidForm()) {
                    toast.error("Por favor, preencha todos os campos.", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    // setIsNovoClient(false);

                    return; 
                }

                
                if (isNovoClient) {
                    respostaAddress = await formClientRef.current.handleSaveAdress();
                    respostaUser = await formClientRef.current.handleSaveClient(respostaAddress);

                    if (respostaUser){
                        setHasSelectedClient(true);
                        navigate("/pedidos/novo-pedido");
                    }
                } else {
                    setHasSelectedClient(true);
                    navigate("/pedidos/novo-pedido");
                }

            
            } catch (error) {
                // toast.error("Erro ao salvar o cliente: " + error.message);
                // alert("Erro ao salvar o cliente: " + error.message);
                console.error(error);
                return;
            }
        };


        const handleEdit = () => {
            setIsEditing(true);
        };

        const handleSave = async () => {
            try {
                formClientRef.current.handleSaveClick();

                // toast.success('Cliente editado com sucesso!');
                setIsEditing(false);
            } catch (error) {
                alert("Erro ao salvar o cliente: " + error.message);
                console.error(error);
                return;
            }
        };

        const handleNovoClientChange = (isNovo) => {
            setIsNovoClient(isNovo);
        };

    return (
        <>
        <Navbar activeButton={"Pedidos"}/>

        <main className={styles["container-client"]}>

        <MediaQuery minWidth={769}>
        
            <p className={styles.titulo}>Novo Pedido</p>

            <div className={styles["client-modal-card"]}>
                {hasSelectedClient && !isNovoClient && (
                    isEditing ? (
                        <button onClick={handleSave} className={styles.save}>Salvar</button>
                    ) : (
                        <NotePencil 
                            size={25} 
                            weight="duotone" 
                            className={styles.edit} 
                            onClick={handleEdit}
                        />  
                    )
                )}

                <div className={styles["client-info"]}> 
                    <p className={isNovoClient ? styles.novoCliente : styles.subtitulo}>
                        {isNovoClient ? "Novo Cliente" : "Cliente"}
                    </p>
                            
                    <FormClient 
                        ref={formClientRef} 
                        onNovoClientChange={(isNovo) => {
                            setIsNovoClient(isNovo);
                            if (!isNovo) setHasSelectedClient(true);
                        }} 
                        isEditing={isEditing} 
                        // hasSelectedClient={hasSelectedClient}
                    />
                </div>
            </div>

            {/* {!isNovoClient && (
                isEditing ? (
                    <div className={styles["card-final"]}>    
                        <button onClick={handleSave} className={styles["btn-editar"]}>Salvar</button>

                        <button onClick={handleSave} className={styles["btn-editar"]}>Cancelar</button>
                    </div>
                ) : ( 
                    <div className={styles["card-final"]}>   
                        <button onClick={handleEdit} className={styles["btn-next"]}>Editar</button>

                    </div>
                )
            )} */}
            <ButtonNext onNext={handleNext} />

            {/* {isNovoClient && (
                <ButtonNext onNext={handleNext} />
            )} */}

        </MediaQuery>
        </main>
    </>
    );
}

export default Client;