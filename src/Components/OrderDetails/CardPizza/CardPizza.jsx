import React, { useEffect, useState } from "react";
import AddButton from "../AddButton/AddButton";
import styles from "./CardPizza.module.css";
// import SelectPizzaPromo from "../../Modal/select_pizza_promo/selectPizzaPromo";
import Flavor from '../../Modal/Flavor/Flavor';
import { XSquare, NotePencil } from '@phosphor-icons/react';

function CardPizza({ setTotal, setPizzaValue }) {
    const [isOpenPizzaModal, setIsOpenPizzaModal] = useState(false);
    const [listPizzas, setListPizzas] = useState([]);
    const [selectedPizza, setSelectedPizza] = useState(undefined);

    const openSelectPizzaModal = () => {
        setIsOpenPizzaModal(true);
    };

    const editPizza = (pizzaToEdit) => {
        setSelectedPizza(pizzaToEdit);
        setIsOpenPizzaModal(true);
    };

    // adicionar a logica para desfazer isso, colocando essa pizza em uma pilha que desfaz o remover
    const removePizza = (pizza) => {
        setListPizzas(prev => prev.filter(p => p.id != pizza.id));
    }
      
    const close = () => {
        if (isOpenPizzaModal) {
            setIsOpenPizzaModal(false);
            setSelectedPizza(undefined);
        }
    }      

    useEffect(() => {
    }, [isOpenPizzaModal]);

    return (
        <>
        <main className={styles["container-pizza"]}>
            <div className={styles.titulo}>
                <p>Pizzas</p>
                <AddButton openModal={openSelectPizzaModal} texto={"Adicionar pizza"} />
            </div>

            <div className={styles["list-pizza"]}>
                {listPizzas.length > 0 && listPizzas.map(pizza => (
                    <div className={styles["content-pizza"]}>
                        <div className={styles["pizza-information"]}>
                            <p className={styles["name"]}>{pizza.name}</p>
                            <p className={styles["name"]}>{pizza.price}</p>

                            <div className={styles["edit-cancel"]}>
                                <XSquare size={25} weight="duotone" onClick={() => removePizza(pizza)}/>
                                <NotePencil size={25} weight="duotone" onClick={() => editPizza(pizza)}/>
                            </div>
                        </div>

                        {pizza.flavors.map(flavor => (
                            <div className={styles["flavor-information"]}>
                                <p className={styles["flavor"]}>{flavor.name}</p>
                            </div>
                        ))}
                        <p className={styles["observation"]}>{pizza.observations}</p>
                    </div>
                ))}
            </div>
            {
                isOpenPizzaModal 
                && 
                <Flavor 
                    setListPizzas={setListPizzas} 
                    selectedPizza={selectedPizza}
                    close={close}
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