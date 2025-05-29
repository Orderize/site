import React, { useState } from "react";
import AddButton from "../AddButton/AddButton";
import styles from "./CardDrink.module.css";
import ModalDrink from "@/components/OrderDetails/Drink/DrinkModal";
import { XSquare, NotePencil } from '@phosphor-icons/react';
import { toast } from "react-toastify";

function CardDrink({ initialDrinks = [], setDrinks }) {
    const [isOpenDrinkModal, setIsOpenDrinkModal] = useState(false);
    const [selectedDrink, setSelectedDrink] = useState(null);
    const [editing, setEditing] = useState(false);

    const openAddDrinkModal = () => {    
        setEditing(false);
        setIsOpenDrinkModal(true);
    };

    const openEditDrinkModal = () => {    
        setEditing(true);
        setIsOpenDrinkModal(true);
    };

    const groupDrinks = (drinksList) => {
        const grouped = {};
        
        drinksList.forEach(drink => {
            if (!grouped[drink.id]) {
                grouped[drink.id] = {
                    ...drink,
                    quantity: 1
                };
            } else {
                grouped[drink.id].quantity += 1;
            }
        });
        
        return Object.values(grouped);
    };

    const removeDrinkUnit = (drinkToRemove) => {
        setDrinks(prev => {
            const indexToRemove = prev.findIndex(d => d.id === drinkToRemove.id);
            
            if (indexToRemove !== -1) {
                const newDrinks = [...prev];
                newDrinks.splice(indexToRemove, 1);
                return newDrinks;
            }
            return prev;
        });
    };

    const handleDrinksUpdate = (newDrinks) => {
        console.log('newDrinks '+ JSON.stringify(newDrinks))
        console.log('editing '+ editing)
        if (editing) {
            setDrinks(newDrinks);
        } else {
            setDrinks(prev => [...prev, ...newDrinks]);
        }
    };

    const closeModal = () => {
        setIsOpenDrinkModal(false);
    }

    const renderDrinkItem = (drinkItem) => {
        return (
            <div key={drinkItem.id} className={styles["content-drink"]}>
                <div className={styles["drink-information"]}>
                    <p className={styles["name"]}>
                        {drinkItem.name} {drinkItem.quantity > 1 ? `(${drinkItem.quantity})` : ''}
                    </p>
                    <p className={styles["name"]}>R${(drinkItem.price * drinkItem.quantity).toFixed(2)}</p>

                    <div className={styles["edit-cancel"]}>
                        
                            <>
                                <XSquare 
                                    size={25} 
                                    weight="duotone" 
                                    onClick={() => removeDrinkUnit(drinkItem)}
                                />
                                <NotePencil 
                                    size={25} 
                                    weight="duotone" 
                                    onClick={openEditDrinkModal}
                                    className={styles["edit-icon"]}
                                />
                            </>
                    </div>
                </div>
            </div>
        );
    };

    const groupedDrinks = groupDrinks(initialDrinks || []);

    return (
        <>
            <main className={styles["container-drink"]}>
                <div className={styles.titulo}>
                    <p>Bebidas</p>
                    <AddButton 
                        openModal={openAddDrinkModal} 
                        texto={"Adicionar bebida"} 
                    />
                </div>

                <div className={styles["list-drink"]}>
                    {groupedDrinks.length > 0 && (
                        groupedDrinks.map(renderDrinkItem)
                    )}
                </div>

                {isOpenDrinkModal && 
                    <ModalDrink 
                        close={closeModal} 
                        setListDrinks={handleDrinksUpdate}
                        initialSelectedDrinks={editing ? initialDrinks : []}
                    />
                }
            </main>
        </>
    );
}

export default CardDrink;