import React, { useEffect, useRef, useState } from "react";
import AddButton from "../AddButton/AddButton";
import styles from "./CardPizza.module.css";
// import SelectPizzaPromo from "../../Modal/select_pizza_promo/selectPizzaPromo";
import FlavorModal from '@/components/OrderDetails/Flavor/FlavorModal';
import { XSquare, NotePencil } from '@phosphor-icons/react';
import { Stack } from "../../../utils/stack/Stack.js";
import savePizzas, { deletePizzas, handleDataPizza } from "../../../hooks/usePizzas.js";

function CardPizza({ unremovedItem, pizzas, setPizzas }) {
    const [isOpenPizzaModal, setIsOpenPizzaModal] = useState(false);
    const [selectedPizza, setSelectedPizza] = useState(undefined);
    
    const openSelectPizzaModal = () => {
        setIsOpenPizzaModal(true);
    };

    const editPizza = (pizzaToEdit) => {
        setSelectedPizza(pizzaToEdit);
        setIsOpenPizzaModal(true);
    };

    const removePizza = (pizza) => {
        setPizzas(prev => prev.filter(p => p.id != pizza.id));
        unremovedItem.current.push(pizza);        
    }
      
    const close = () => {
        if (isOpenPizzaModal) {
            setIsOpenPizzaModal(false);
            setSelectedPizza(undefined);
        }
    }
    
    const handleUnremovePizza = async (event) => {
        if (event.key == "z" && event.ctrlKey) {
            const pizza = unremovedItem.current.pop();
            if (pizza) {
                setPizzas(prev => ([...prev, pizza]));
            }
        }
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            handleUnremovePizza(event);
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    
    }, []);

    return (
        <>
        <main className={styles["container-pizza"]}>
            <div className={styles.titulo}>
                <p>Pizzas</p>
                <AddButton openModal={openSelectPizzaModal} texto={"Adicionar pizza"} />
            </div>

            <div className={styles["list-pizza"]}>
                {pizzas.map((pizza, index) => (
                    <div className={styles["content-pizza"]} key={pizza.id || index}>
                        <div className={styles["pizza-information"]}>
                            <p className={styles["name"]}>Pizza {index + 1}</p> 
                            <p className={styles["name"]}>R${pizza.price}</p>

                            <div className={styles["edit-cancel"]}>
                                <XSquare size={25} weight="duotone" onClick={() => removePizza(pizza)}/>
                                <NotePencil size={25} weight="duotone" onClick={() => editPizza(pizza)}/>
                            </div>
                        </div>
                        {pizza.flavors?.map(flavor => (
                        <div className={styles["flavor-information"]} key={flavor.id}>
                            <p className={styles["flavor"]}>{flavor.name}</p>
                            {flavor.observations?.length > 0 && (
                            <p className={styles["observation"]}>sem {flavor.observations.join(', ')}</p>
                            )}
                        </div>
                        ))}
                        <p className={styles["observation"]}>{pizza.observations}</p>
                    </div>
                ))}
            </div>

            {
                isOpenPizzaModal 
                && 
                <FlavorModal 
                    setListPizzas={setPizzas} 
                    selectedPizza={selectedPizza}
                    close={close}
                />
            }
        </main>
        </>
    );
}

export default CardPizza;