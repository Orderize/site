import React from "react";
import AddButton from "../AddButton/AddButton";
import styles from "./CardPizza.module.css";

function CardPizza(){
    return (
        <>
        <main className={styles["container-pizza"]}>
            <div className={styles.titulo}>
                <p>Pizzas</p>

                <AddButton texto={"Adicionar pizza"} />

                {/* <button className={styles["btn-adicionar"]}>Adicionar pizza</button>         */}
            </div>

            <div className={styles["list-pizza"]}>
                
            </div>

        </main>
        </>
    );
}

export default CardPizza;