import React, { useState, useEffect, useRef } from 'react';
import FooterModal from '../../footer_modal/FooterModal';
import InputSearch from '../../InputSearch/InputSearch';
import styles from './Drink.module.css';
import drink from '../../../utils/assets/drink.svg';
import { getDrinks } from '../../../api/services/Drinks';
import { XSquare } from '@phosphor-icons/react';
import { ToastContainer, toast } from 'react-toastify';

const DrinkModal = ({  close, setListDrinks }) => {
  const [token] = useState(localStorage.getItem('token'));
  const [optionsDrink, setOptionsDrink] = useState([]);
  const [drinkList, setDrinkList] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [valueSearch, setValueSearch] = useState("");

  const handleDrinks = async (name) => {
    try {
      const params = {
        name: "",
        milimeters: ""
        };

        const data = await getDrinks(token, params);
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

    if (value == "") {
      setOptionsDrink([]);
      return;
    }
    
    try {
      const params = {
        name: "",
        milimeters: ""
        };

        const data = await getDrinks(token, params);
        setOptionsDrink(data);
    } catch (error) {
        alert(error.message)
        console.log(error);
    }
  }

  const handleDrinkSelect = (drink) => {
    if (!drinks.some((selected) => selected.id === drink.id)) {
      setDrinks((prev) => [...prev, drink]);
    }

    setValueSearch("");
    setOptionsDrink([]);
  };

  const removeDrink = (drinkToRemove) => {
    setDrinks((prev) =>
      prev.filter((drink) => drink.id !== drinkToRemove.id)  
    );
    toast.success(`Sabor ${drinkToRemove.name} removido com sucesso.`);
  };

  const handleConfirm = () => {
    setListDrinks(drinks);
    close();
  }

  return (
    <section className={styles["modal-wrapper-drink"]}>
      <div className={styles['drink-container']}>

          <div className={styles["drink-tabs"]}>
            <button 
              className={styles["drink-tab"]}>
              Bebidas
            </button>
          </div>


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
                {drinks.length > 0 && drinks.map((drink) => (
                    <div key={drink.id} className={styles["drink-information-selected"]}>
                      <div>
                        <p>{drink.name}</p>
                        <p>R${drink.price}</p>
                      </div>
                      
                      <div onClick={() => removeDrink(drink)}>
                        <XSquare size={30} weight="duotone" />
                      </div>
                    </div>
                )) || (
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
