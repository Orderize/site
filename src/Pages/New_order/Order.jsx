import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Order.css"

function order() {
    return (
        <>
            <Navbar role={"attendant"} activeButton={"Pedidos"} />
            <main className="container-order">
                <h1>Novo Pedido</h1>
                <section className="client-modal">
                    <h2>Selecione o cliente:</h2>
                    <div className="client-modal-card">
                        <h2>Cliente</h2>
                    </div>
                    <button>Proximo</button>
                </section>
            </main>
        </>
    );
}

export default order;