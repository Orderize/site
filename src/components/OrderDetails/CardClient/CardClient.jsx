import React, { useState, useEffect } from "react";
import styles from "./CardClient.module.css";
import FloatingInput from "../../Floatinginput/Floatinginput";
import { NotePencil } from "@phosphor-icons/react";

function formatAddress(address) {
    const { cep, number, street, neighborhood, city } = address;
    return `${street}, ${number}, ${neighborhood} - ${city}, CEP: ${cep}`;
}

function CardClient(){
    const address = JSON.parse(localStorage.getItem('address'));
    const client = JSON.parse(localStorage.getItem('client'));

    return (
        <>
            <main className={styles["container-client"]}>
                <div className={styles.campos}>
                    <div className={styles.titulo}>
                        <p>Cliente</p>
                        
                        {/* <button className={styles.edit}>
                            <NotePencil size={32} weight="duotone" />
                        </button> */}
                    </div>
                    
                    <div className={styles.list}>
                        <div className={styles["list-superior"]}>
                            <FloatingInput onValue={client.name} label={"Nome"} />
                            <FloatingInput onValue={client.phone} label={"Telefone"} />
                        </div>
                        <FloatingInput onValue={formatAddress(address)} label={"Endereço"} />
                    </div>
                </div>
            </main>
        </>
    );
}

export default CardClient;