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
            </div>

            <div className={styles["list-pizza"]}>
                <div className={styles["content-pizza"]}>

                  <div className={styles["pizza-information"]}>
                    <p className={styles["name"]}>Pizza (1 Sabor)</p>
                    <p className={styles["name"]}>R$0.00</p>

                    <div className={styles["edit-cancel"]}>
                        <XSquare size={25} weight="duotone" />
                        <NotePencil size={25} weight="duotone" onClick={editPizzaModal}/>
                    </div>
                  </div>

                  <div className={styles["flavor-information"]}>
                    <p className={styles["flavor"]}>Calabresa</p>

                    <p className={styles["observation"]}>- sem cebola</p>
                  </div>

                </div>


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