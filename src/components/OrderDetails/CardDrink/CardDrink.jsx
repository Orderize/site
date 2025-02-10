import React, { useState } from "react";
import AddButton from "../AddButton/AddButton";
import styles from "./CardDrink.module.css";
import ModalDrink from "@/modals/Drink/Drink";
import { XSquare, NotePencil } from '@phosphor-icons/react';

function CardDrink({ drinks, setDrinks }){
    const [isOpenDrinkModal, setIsOpenDrinkModal] = useState(false);

    const openSelectDrinkModal = () => {    
        setIsOpenDrinkModal(true);
    };

    const removeDrink = (drinkToRemove) => {
        setDrinks((prev) => prev.filter((drink) => drink.id !== drinkToRemove.id));
    };

    const close = () => {
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

                {drinks && drinks.map((drink) => (
                    <div key={drink.id} className={styles["content-drink"]}>
                        <div className={styles["drink-information"]}>
                            <p className={styles["name"]}>{drink.name}</p>
                            <p className={styles["name"]}>R${drink.price.toFixed(2)}</p>

                            <div className={styles["edit-cancel"]}>
                                <XSquare size={25} weight="duotone" onClick={() => removeDrink(drink)}/>
                                {/* <NotePencil size={25} weight="duotone" onClick={editDrinkModal}/> */}
                            </div>
                        </div>
                    </div>
                ))
                }
                
            </div>

            {
                isOpenDrinkModal && 
                <ModalDrink 
                    close={close} 
                    setListDrinks={setDrinks}
                />
            }


        </main>
        </>
    );
}

export default CardDrink;