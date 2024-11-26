import React, { useState, useEffect } from "react";
import AddButton from "../AddButton/AddButton";
import styles from "./CardDrink.module.css";
import ModalDrink from "../../Modal/Drink/Drink";
import { ToastContainer } from "react-toastify";
import { XSquare, NotePencil } from '@phosphor-icons/react';

function CardDrink(){
    const [modalDrink, setModalDrink] = useState([]);
    const [isOpenDrinkModal, setIsOpenDrinkModal] = useState(false);

    const openSelectDrinkModal = () => {    
        setIsOpenDrinkModal(true);
    };

    const removeDrink = (drinkToRemove) => {
        setModalDrink((prev) =>
            prev
                .map((drink) =>
                    drink.id === drinkToRemove.id
                        ? { ...drink, quantity: drink.quantity - 1 }
                        : drink
                )
                .filter((drink) => drink.quantity > 0)
        );
    };

    const handleBack = () => {
        if (isOpenDrinkModal) {
            setIsOpenDrinkModal(false);
        }
    }

    const handleNext = () => {
        if (isOpenDrinkModal) {
            setIsOpenDrinkModal(false);
        }
    }

    // useEffect(() => {
    //     const price = modalDrink.map((drink) => drink.price)[0];
    //     setTotal(price);
    //     setDrinkTotal(price);
    // }, [modalDrink]);

    return (
        <>
        <main className={styles["container-drink"]}>
            <div className={styles.titulo}>
                <p>Bebidas</p>

                <AddButton openModal={openSelectDrinkModal} texto={"Adicionar bebida"} />
            </div>

            <div className={styles["list-drink"]}>

            {modalDrink.map((drink) => (
                <div key={drink.id} className={styles["content-drink"]}>
                    <div className={styles["drink-information"]}>
                        <p className={styles["name"]}>
                            {drink.name} ({drink.quantity})
                        </p>
                        <p className={styles["name"]}>R${drink.price}</p>

                        <div className={styles["edit-cancel"]}>
                            <XSquare size={25} weight="duotone" onClick={() => removeDrink(drink)} />
                        </div>
                    </div>
                </div>
            ))}

                
            </div>

            {
                isOpenDrinkModal && <ModalDrink handleBack={handleBack} handleNext={handleNext} setModal={setModalDrink} />
            }


        </main>
        </>
    );
}

export default CardDrink;