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
    const [isEdition, setIsEdition] = useState(false);

    const openSelectPizzaModal = () => {
        setIsOpenPizzaModal(true);
    };

    const editPizzaModal = (pizzaToEdit) => {
        setSelectedPizza(pizzaToEdit);
        setIsEdition(true);
        setIsOpenPizzaModal(true);
    };
      
    const close = () => {
        if (isOpenPizzaModal) {
            setIsEdition(false);
            setIsOpenPizzaModal(false);
            setSelectedPizza(undefined);
        }
    }

    const getObservationText = (flavor) => {
        const removedIngredients = ingredients[flavor.name]?.filter(ingredient => !ingredient.checked).map(ingredient => ingredient.name);
      
        if (removedIngredients.length > 0) {
          return `sem ${removedIngredients.join(', ')}`;
        }
      
        return '';
    };
      

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
                            <p className={styles["name"]}>{pizza.info.flavor.text}</p>
                            <p className={styles["name"]}>{pizza.info.total}</p>

                            <div className={styles["edit-cancel"]}>
                                <XSquare size={25} weight="duotone" />
                                <NotePencil size={25} weight="duotone" onClick={() => editPizzaModal(pizza)}/>
                            </div>
                        </div>

                        {pizza.selectedFlavors.length > 0 && pizza.selectedFlavors.map(flavor => (
                            <div className={styles["flavor-information"]}>
                                <p className={styles["flavor"]}>{flavor.name}</p>

                                <p className={styles["observation"]}>- sem massa</p>
                            </div>
                        ))}
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
                    isEdition={isEdition}
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