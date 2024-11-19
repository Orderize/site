import React, { useEffect, useState } from "react";
import AddButton from "../AddButton/AddButton";
import styles from "./CardPizza.module.css";
// import SelectPizzaPromo from "../../Modal/select_pizza_promo/selectPizzaPromo";
import Flavor from '../../Modal/Flavor/Flavor';
import { XSquare, NotePencil } from '@phosphor-icons/react';

function CardPizza({ setTotal, setPizzaValue }) {
    const [isOpenPizzaModal, setIsOpenPizzaModal] = useState(false);
    const [listPizzas, setListPizzas] = useState([]);

    const openSelectPizzaModal = () => {
        setIsOpenPizzaModal(true);
    };

    const editPizzaModal = () => {
        // abrir o modal com os dados da pizza setado conforme o sabor
        setIsOpenPizzaModal(true);
    }

    const handleNext = () => {
        if (isOpenPizzaModal) {
            setIsOpenPizzaModal(false);
        }
    }

    const handleBack = () => {
        if (isOpenPizzaModal) {
            setIsOpenPizzaModal(false);
        }  
    }

    const show = () => {
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
            </div>

        <button onClick={show}>mostrar</button>
            <div className={styles["list-pizza"]}>
                {listPizzas && listPizzas.map(itens => {
                    <div className={styles["content-pizza"]}>
                        <div className={styles["pizza-information"]}>
                            <p className={styles["name"]}>{itens.modal.flavor.pizzaText}</p>
                            <p className={styles["name"]}>{itens.modal.total}</p>

                            <div className={styles["edit-cancel"]}>
                                <XSquare size={25} weight="duotone" />
                                <NotePencil size={25} weight="duotone" onClick={editPizzaModal}/>
                            </div>
                        </div>

                        {itens.modal.selectedFlavors.length > 0 && itens.modal.selectedFlavors.map(flavor => {

                        })}
                        <div className={styles["flavor-information"]}>
                            <p className={styles["flavor"]}>Calabresa</p>

                            <p className={styles["observation"]}>- sem cebola</p>
                        </div>
                    </div>

                })}
            </div>
            {
                isOpenPizzaModal 
                && 
                <Flavor 
                    setListPizzas={setListPizzas} 
                    // setSelectedFlavors={setSelectedFlavors}
                    handleNext={handleNext}
                    handleBack={handleBack} 
                />
            }
            {/* {
                isOpenReviewModal
                &&
                <Review 
                    pizzas={listPizzas}
                    handleNext={handleNext}
                    handleBack={handleBack}
                />
            } */}
        </main>
        </>
    );
}

export default CardPizza;