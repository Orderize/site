import React, { useState } from "react";
import AddButton from "../AddButton/AddButton";
import styles from "./CardDrink.module.css";
import ModalDrink from "../../Modal/Drink/Drink";
import { XSquare, NotePencil } from '@phosphor-icons/react';

function CardDrink(){
    const [isOpenDrinkModal, setIsOpenDrinkModal] = useState(false);

    const openSelectDrinkModal = () => {    
        setIsOpenDrinkModal(true);
    };

    const editDrinkModal = () => {
        // abrir o modal com os dados da bebida setado conforme o sabor
        setIsOpenDrinkModal(true);
    }

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
                {/* <button className={styles["btn-adicionar"]}>Adicionar bebida</button>         */}
            </div>

            <div className={styles["list-drink"]}>
                <div className={styles["content-drink"]}>
                    <div className={styles["drink-information"]}>
                        <p className={styles["name"]}>Fanta-laranja 2L (201)</p>
                        <p className={styles["name"]}>R$0.00</p>

                        <div className={styles["edit-cancel"]}>
                            <XSquare size={25} weight="duotone" />
                            <NotePencil size={25} weight="duotone" onClick={editDrinkModal}/>
                        </div>
                    </div>
                </div>
                
            </div>

            {
                isOpenDrinkModal && <ModalDrink handleBack={handleBack} handleNext={handleNext}/>
            }


        </main>
        </>
    );
}

export default CardDrink;