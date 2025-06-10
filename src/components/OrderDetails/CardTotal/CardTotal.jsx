import React, { useEffect, useState } from "react";
import styles from "./CardTotal.module.css";

function CardTotal({ drinks, pizzas, setTotalValue }){
    const [total, setTotal] = useState({
        value: 0,
        pizzas: 0,
        drinks: 0,
        frete: 5,
        promotions: 0
    });

    const handleTotal = () => {
        const totalPizzas = pizzas.reduce((sum, it) => {return it.price + sum}, 0); 
        const totalDrinks = drinks.reduce((sum, it) => {return it.price + sum}, 0);
        const totalValue = totalPizzas + totalDrinks + total.frete - total.promotions;

        console.log(totalPizzas);
        
        setTotal(prev => ({
            ...prev, 
            pizzas: totalPizzas,
            drinks: totalDrinks,
            value: totalValue
        }));

        setTotalValue(totalValue);
    }

    useEffect(() => {
        handleTotal();
    }, [pizzas, drinks]);

    return (
        <>
        <main className={styles["container-total"]}>
            <p className={styles.titulo}>Total</p>
            <p className={styles.total}>R$ { total && total.value?.toFixed(2) }</p>

            <div className={styles["list-precos"]}>
                <div className={styles["list-precos__item"]}>
                    <p>Pizzas</p>
                    <p>R$ { total && total.pizzas?.toFixed(2) }</p>
                </div>

                <div className={styles["list-precos__item"]}>
                    <p>Bebidas</p>
                    <p>R$ { total && total.drinks?.toFixed(2) }</p>
                </div>

                <div className={styles["list-precos__item"]}>
                    <p>Frete</p>
                    <p>R$ { total && total.frete?.toFixed(2) }</p>
                </div>

                {/* <div className={styles["list-precos__item"]}>
                    <p>Promoção</p>
                    <p>-R$ { total && total.promotions?.toFixed(2) }</p>
                </div> */}
            </div>
        </main>
        </>
    );
}

export default CardTotal;