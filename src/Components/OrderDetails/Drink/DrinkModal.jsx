import React, { useState, useEffect } from 'react';
import FooterModal from '@/components/footer_modal/FooterModal';
import InputSearch from '@/components/InputSearch/InputSearch';
import styles from './DrinkModal.module.css';
import drink from '@/utils/assets/drink.svg';
import { getDrinks } from '@/api/services/Drinks';
import { XSquare, PlusSquare, MinusSquare } from '@phosphor-icons/react';
import { ToastContainer, toast } from 'react-toastify';

const DrinkModal = ({ close, setListDrinks, initialSelectedDrinks = [] }) => {
  const [optionsDrink, setOptionsDrink] = useState([]);
  const [drinkList, setDrinkList] = useState([]);
  const [drinks, setDrinks] = useState(() => {
    if (initialSelectedDrinks.length > 0) {
      const grouped = initialSelectedDrinks.reduce((acc, drink) => {
        const existing = acc.find(item => item.drink.id === drink.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          acc.push({ drink, quantity: 1 });
        }
        return acc;
      }, []);
      return grouped;
    }
    return [];
  });
  const [valueSearch, setValueSearch] = useState("");

  const handleDrinks = async (name) => {
    try {
      const data = await getDrinks();
      setDrinkList(data);
    } catch (error) {
      alert(error.message)
      console.log(error);
    }
  };

  useEffect(() => {
    handleDrinks();
  }, []);

  const handleSearch = async (event) => {
    const value = event.target.value;
    setValueSearch(value);

    if (value === "") {
      setOptionsDrink([]);
      return;
    }
    
    try {
      const params = {
        name: value,
        milimeters: ""
      };

      const data = await getDrinks(params);
      setOptionsDrink(data);
    } catch (error) {
      alert(error.message)
      console.log(error);
    }
  }

  const handleDrinkSelect = (drink, isFromPlusButton = false) => {
    setDrinks(prev => {
      const existingDrinkIndex = prev.findIndex(item => item.drink.id === drink.id);
      
      if (existingDrinkIndex >= 0) {
        const updatedDrinks = [...prev];
        updatedDrinks[existingDrinkIndex] = {
          ...updatedDrinks[existingDrinkIndex],
          quantity: updatedDrinks[existingDrinkIndex].quantity + 1
        };
        return updatedDrinks;
      } else {
        return [...prev, { drink, quantity: 1 }];
      }
    });
  
    const existingDrink = drinks.find(item => item.drink.id === drink.id);
    toast.success(existingDrink 
      ? `Mais uma unidade de ${drink.name} adicionada.` 
      : `${drink.name} adicionada com sucesso.`);
  
    setValueSearch("");
    setOptionsDrink([]);
  };

  const removeDrink = (drinkToRemove) => {
    setDrinks(prev => {
      const existingDrinkIndex = prev.findIndex(item => item.drink.id === drinkToRemove.id);
      
      if (existingDrinkIndex >= 0) {
        if (prev[existingDrinkIndex].quantity > 1) {
          const updatedDrinks = [...prev];
          updatedDrinks[existingDrinkIndex] = {
            ...updatedDrinks[existingDrinkIndex],
            quantity: updatedDrinks[existingDrinkIndex].quantity - 1
          };
          toast.success(`Uma unidade de ${drinkToRemove.name} removida com sucesso.`);
          return updatedDrinks;
        } else {
          toast.success(`${drinkToRemove.name} removida com sucesso.`);
          return prev.filter(item => item.drink.id !== drinkToRemove.id);
        }
      }
      return prev;
    });
  };

  const handleConfirm = () => {
    const flatDrinks = drinks.flatMap(item => 
        Array(item.quantity).fill(item.drink)
    );
    setListDrinks(flatDrinks);
    close();
}

  return (
    <section className={styles["modal-wrapper-drink"]}>
      <div className={styles['drink-container']}>
          <div className={styles["search-bar"]}>
            <p className={styles["drink-title"]}>Selecione a bebida</p>

            <InputSearch valueSearch={valueSearch} handleSearch={handleSearch} text="Pesquise pelo nome da bebida"/>

            {optionsDrink.length > 0 && (
              <div className={styles["drink-options-list"]}>
                {optionsDrink.map((drink, index) => (
                  <div 
                    key={index} 
                    className={styles["drink-option"]}
                    onClick={() => handleDrinkSelect(drink)}
                  >
                    {drink.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles["info-drink"]}>
            <img src={drink} alt="drink" className={styles["drink-image"]}/>
              <div className={styles["info"]}>
                <p className={styles["info-titulo"]}>Bebidas selecionadas:</p>
                {drinks.length > 0 ? drinks.map(({drink, quantity}) => (
                    <div key={drink.id} className={styles["drink-information-selected"]}>
                      <div>
                        <p>{drink.name} ({quantity})</p>
                        <p>R${(drink.price * quantity).toFixed(2)}</p>
                      </div>
                      
                      <div className={styles["botoes-opt"]}>
                        <div onClick={() => removeDrink(drink)}>
                          <MinusSquare size={30} weight="duotone" />
                        </div>

                        <div onClick={() => handleDrinkSelect(drink)}> 
                          <PlusSquare size={30} weight="duotone" />
                        </div>
                      </div>
                    </div>
                )) : (
                  <div className={styles["drink-information"]}>
                    <p>Selecione uma bebida</p>
                  </div>
                )}
              </div>
          </div>

          {drinkList.length > 0 && (
              <div className={styles["drink-list"]}>
                {drinkList.map((drink, index) => (
                  <div 
                    key={index} 
                    className={styles["drink-item"]}
                    onClick={() => handleDrinkSelect(drink)}
                  >
                    {drink.name}
                  </div>
                ))}
              </div>
            )}

        <FooterModal handleBack={close} handleNext={handleConfirm}/>
      </div>
      <ToastContainer />
    </section>
  );
};

export default DrinkModal;