import React, { useState } from "react";
import AddButton from "../AddButton/AddButton";
import styles from "./CardDrink.module.css";
import ModalDrink from "../../Modal/Drink/Drink";
import { XSquare, NotePencil } from '@phosphor-icons/react';

function CardDrink(){
    const [modalDrink, setModalDrink] = useState([]);
    const [isOpenDrinkModal, setIsOpenDrinkModal] = useState(false);

    const openSelectDrinkModal = () => {    
        setIsOpenDrinkModal(true);
    };

    const editDrinkModal = () => {
        setIsOpenDrinkModal(true);
    }

    const removeDrink = (drinkToRemove) => {
        setModalDrink((prev) => prev.filter((drink) => drink.id !== drinkToRemove.id));
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

    return (
        <>
        <main className={styles["container-drink"]}>
            <div className={styles.titulo}>
                <p>Bebidas</p>

                <AddButton openModal={openSelectDrinkModal} texto={"Adicionar bebida"} />
            </div>

            <div className={styles["list-drink"]}>

                {modalDrink.length > 0 ? (
                    modalDrink.map((drink) => (
                        <div key={drink.id} className={styles["content-drink"]}>
                            <div className={styles["drink-information"]}>
                                <p className={styles["name"]}>{drink.name}</p>
                                <p className={styles["name"]}>R${drink.price}</p>

                                <div className={styles["edit-cancel"]}>
                                    <XSquare size={25} weight="duotone" onClick={() => removeDrink(drink)}/>
                                    {/* <NotePencil size={25} weight="duotone" onClick={editDrinkModal}/> */}
                                </div>
                            </div>
                        </div>
                    ))
                ) : null }
                
            </div>

            {
                isOpenDrinkModal && <ModalDrink handleBack={handleBack} handleNext={handleNext} setModal={setModalDrink} />
            }


        </main>
        </>
    );
}

export default CardDrink;