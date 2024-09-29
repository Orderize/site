import React from "react";
import Navbar from "../../components/navbar/Navbar";
import style from "./Order.module.css";

function order() {
    return (
        <>
            <Navbar activeButton={"Pedidos"} />
            <main className={style["container-order"]}>
                <h1>Novo Pedido</h1>
                <section className={style["client-modal"]}>
                    <h2>Selecione o cliente:</h2>
                    <div className={style["client-modal-card"]}>
                        <h2>Cliente</h2>
                    </div>
                    <button>Proximo</button>
                </section>
            </main>
        </>
    );
}

export default order;