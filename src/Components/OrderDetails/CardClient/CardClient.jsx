import React from "react";
import { NotePencil } from "@phosphor-icons/react";
import styles from "./CardClient.module.css";

function CardClient(){
    const [client, setClient] = React.useState({
        name: "Teste",
        phone: "11 0000-0000",
        address: "Rua teste, 123"
    });

    // const handleChange = (event) => { //atualizar valores do cliente
    //     const {name, value} = event.target;
    //     setClient({...client, [name]: value});
    // };

    // const handleSubmit = (event) => {
    //     // event.preventDefault();
    //     console.log(client);

    //     //chamar api para salvar cliente
    // };


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
                        <p> <b>Endereço:</b> {client.address} </p>
                    </div>
                </div>
            </main>
        </>
    );
}

export default CardClient;