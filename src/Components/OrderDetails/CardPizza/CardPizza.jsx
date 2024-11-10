import React, { useEffect, useState } from "react";
import AddButton from "../AddButton/AddButton";
import styles from "./CardPizza.module.css";
// import SelectPizzaPromo from "../../Modal/select_pizza_promo/selectPizzaPromo";
import Flavor from '../../Modal/Flavor/Flavor';
import Review from "/src/Components/Modal/Review/Review";

function CardPizza({ setTotal, setPizzaValue }) {
    const [isOpenPizzaModal, setIsOpenPizzaModal] = useState(false);
    const [isOpenReviewModal, setIsOpenReviewModal] = useState(false);
    const [listPizzas, setListPizzas] = useState([]);

    const openSelectPizzaModal = () => {
        setIsOpenPizzaModal(true);
    };

    const handleNext = () => {
        if (isOpenPizzaModal) {
            setIsOpenPizzaModal(false);
            setIsOpenReviewModal(true);
        }
        
        if (isOpenReviewModal) {
            setIsOpenReviewModal(false);
        }
    }

    const handleBack = () => {
        if (isOpenPizzaModal) {
            setIsOpenPizzaModal(false);
        }

        if (isOpenReviewModal) {
            setIsOpenReviewModal(false);
            setIsOpenPizzaModal(true);
        }    
        
    }

    const showPizzas = () => {
        console.log(listPizzas);
    }

    useEffect(() => {
        const price = listPizzas.map(pizza => pizza.price)[0];
        setTotal(price);
        setPizzaValue(price);
    }, [listPizzas]);

    return (
        <>
        <main className={styles["container-pizza"]}>
            <div className={styles.titulo}>
                <p>Pizzas</p>
                <AddButton openModal={openSelectPizzaModal} texto={"Adicionar pizza"} />

                {/* <button className={styles["btn-adicionar"]}>Adicionar pizza</button>         */}
            </div>

            <div className={styles["list-pizza"]}>
                {
                    listPizzas.length > 0 &&
                    listPizzas.map(pizza => (
                        <div className={styles["content-pizza"]} key={pizza.id}>
                            <p className={styles["name"]}>{pizza.name}</p>
                            <p className={styles["value"]}>R${pizza.price.toFixed(2)}</p>
                        </div>
                    ))
                }
            </div>
            {
                isOpenPizzaModal 
                && 
                <Flavor 
                    // setListPizzas={setListPizzas} 
                    // handleNext={handleNext}
                    // handleBack={handleBack} 
                />
            }
            {
                isOpenReviewModal
                &&
                <Review 
                    pizzas={listPizzas}
                    handleNext={handleNext}
                    handleBack={handleBack}
                />
            }
        </main>
        </>
    );
}

export default CardPizza;