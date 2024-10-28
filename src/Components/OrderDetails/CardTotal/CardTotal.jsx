import React from "react";
import styles from "./CardTotal.module.css";

function CardTotal({ total, pizzaValue }){
    return (
        <>
        <main className={styles["container-total"]}>
            <p className={styles.titulo}>Total</p>
            <p className={styles.total}>R$ { total ? total .toFixed(2): '0,00' }</p>

            <div className={styles["list-precos"]}>
                <div className={styles["list-precos__item"]}>
                    <p>Pizzas</p>
                    <p>R$ { pizzaValue ? pizzaValue.toFixed(2) : '0,00'}</p>
                </div>

                <div className={styles["list-precos__item"]}>
                    <p>Bebidas</p>
                    <p>R$ {'0,00'}</p>
                </div>

                <div className={styles["list-precos__item"]}>
                    <p>Frete</p>
                    <p>R$ {'0,00'}</p>
                </div>

                <div className={styles["list-precos__item"]}>
                    <p>Promoção</p>
                    <p>-R$</p>
                </div>
            </div>
        </main>
        </>
    );
}

export default CardTotal;