import React from "react";
import styles from "./CardTotal.module.css";

function CardTotal(){
    return (
        <>
        <main className={styles["container-total"]}>
            <p className={styles.titulo}>Total</p>
            <p className={styles.total}>R$</p>

            <div className={styles["list-precos"]}>
                <div className={styles["list-precos__item"]}>
                    <p>Pizzas</p>
                    <p>R$</p>
                </div>

                <div className={styles["list-precos__item"]}>
                    <p>Bebidas</p>
                    <p>R$</p>
                </div>

                <div className={styles["list-precos__item"]}>
                    <p>Frete</p>
                    <p>R$</p>
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