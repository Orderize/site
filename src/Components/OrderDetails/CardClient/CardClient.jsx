import React, { useEffect, useState } from "react";
import { NotePencil } from "@phosphor-icons/react";
import styles from "./CardClient.module.css";

function CardClient() {
    const [client, setClient] = useState(JSON.parse(localStorage.getItem("client")));

    return (
        <>
            <main className={styles["container-client"]}>
                <div className={styles.campos}>
                    <div className={styles.titulo}>
                        <p>Cliente</p>
                        
                        <button className={styles.edit}>
                            <NotePencil size={32} weight="duotone" />
                        </button>
                    </div>

                    <div className={styles.campo__item}>
                        <p> <b>Nome:</b> {client.name} </p>
                    </div>
                    <div className={styles.campo__item}>
                        <p> <b>Telefone:</b> {client.phone} </p>
                    </div>
                    <div className={styles.campo__item}>
                        <p> <b>Endereço:</b> {client.address.street} </p>
                    </div>
                </div>
            </main>
        </>
    );
}

export default CardClient;