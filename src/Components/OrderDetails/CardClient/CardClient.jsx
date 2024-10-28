import React from "react";
import styles from "./CardClient.module.css";
import FloatingInput from "../../FloatingInput/FloatingInput";
import { NotePencil } from "@phosphor-icons/react";

function formatAddress(address) {
    if (!address) return "Endereço não disponível";

    const { cep, number, street, neighborhood, city } = address;
    return `${street}, ${number}, ${neighborhood} - ${city}, CEP: ${cep}`;
}

function CardClient({ clientData }){
    console.log('client card client'+ JSON.stringify(clientData));

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
                            <FloatingInput onValue={clientData.name} label={"Nome"} />
                            <FloatingInput onValue={clientData.phone} label={"Telefone"} />
                        </div>
                        <FloatingInput onValue={formatAddress(clientData.address)} label={"Endereço"} />
                    </div>
                </div>
            </main>
        </>
    );
}

export default CardClient;