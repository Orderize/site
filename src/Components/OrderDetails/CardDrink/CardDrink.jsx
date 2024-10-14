import React from "react";
import AddButton from "../AddButton/AddButton";
import styles from "./CardDrink.module.css";

function CardDrink(){
    return (
        <>
        <main className={styles["container-drink"]}>
            <div className={styles.titulo}>
                <p>Bebidas</p>

                <AddButton texto={"Adicionar bebida"} />
                {/* <button className={styles["btn-adicionar"]}>Adicionar bebida</button>         */}
            </div>

            <div className={styles["list-drink"]}>
                
            </div>


        </main>
        </>
    );
}

export default CardDrink;