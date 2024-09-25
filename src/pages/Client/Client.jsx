import React from "react";
import Navbar from "../../components/navbar/Navbar";
import FormClient from "../../components/FormClient/FormClient";
import "./Client.css";

function Client() {
    return (
        <>
        <Navbar activeButton={"Pedidos"} />
        <main className="container-order">
        

            <section className="client-modal">
            <p className="titulo">Novo Pedido</p>    

                <p className="subtitulo">Selecione o cliente:</p>

                <div className="client-modal-card">
                    <p>Cliente</p>

                    <FormClient />
                </div>
                <input type="text" />
                <input type="text" disabled value="dsljahads" />


                <button>Próximo</button>
            </section>
        </main>
    </>
    );
}

export default Client;