import React, { useState, useEffect, useRef } from 'react';
import FooterModal from '../../footer_modal/FooterModal';
import InputSearch from '../../InputSearch/InputSearch';
import styles from './Drink.module.css';
import drink from '../../../utils/assets/drink.svg';
import { getDrinks } from '../../../api/services/Drinks';
import { XSquare } from '@phosphor-icons/react';
import { ToastContainer, toast } from 'react-toastify';

const DrinkModal = ({  handleNext, handleBack, setSelectedDrinks }) => {
  const [token] = useState(localStorage.getItem('token'));
  const [drinks, setDrinks] = useState([]);
  const [valueSearch, setValueSearch] = useState("");

  const handleDrinks = async (event) => {
    try {
      const params = {
        name: "",
        milimeters: ""
        };

        const data = await getDrinks(token, params);
        setDrinks(data);
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

    try {
      const params = {
        name: value,
        milimeters: null
      };

        const data = await getDrinks(token, params);
        setDrinks(data);
        console.log(data);
    } catch (error) {
        alert(error.message);
        console.log(error);
    }
  }

  const handleDrinkSelect = (drink) => {
    if (!drinks.some((selected) => selected.id === drink.id)) {
      setSelectedDrinks((prev) => [...prev, drink]);
    }
  };

  const removeDrink = (drinkToRemove) => {
    setSelectedDrinks((prev) =>
      prev.filter((drink) => drink.id !== drinkToRemove.id)  
    );
    toast.success(`Sabor ${drinkToRemove.name} removido com sucesso.`);
  };

  return (
    <section className={styles["modal-wrapper-drink"]}>
      <div className={styles['drink-container']}>

        {/* <div className={styles["menu-drinks"]}> */}
          <div className={styles["drink-tabs"]}>
            <button 
              className={styles["drink-tab"]}>
              Bebidas
            </button>
          </div>

          <div className={styles["search-bar-drink"]}>
            <InputSearch valueSearch={valueSearch} handleSearch={handleSearch} text="Pesquise pelo nome da bebida"/>
          </div>

          <div className={styles["info-drink"]}>
            <img src={drink} alt="drink" className={styles["drink-image"]}/>
              <div className={styles["info"]}>
                <p className={styles["info-titulo"]}>Bebidas selecionadas:</p>
                {drinks.length > 0 ? (
              drinks.map((drink) => (
                <div key={drink.id} className={styles["drink-information-selected"]}>
                  <div>
                    <p>{drink.name}</p>
                    <p>R${drink.price}</p>
                  </div>
                  
                  <div onClick={() => removeDrink(drink)}>
                    <XSquare size={30} weight="duotone" />
                  </div>
                </div>
              ))
                ) : (
                  <div className={styles["drink-information"]}>
                   <p>Selecione uma bebida</p>
                  </div>
                )}
              </div>
          </div>

          <div className={styles["drink-list"]}>
          {drinks.map((drink) => (
            <div
              key={drink.id}
              className={`${styles["drink-item"]} ${
                drinks.some((selected) => selected.id === drink.id)
                  ? styles["selected"]
                  : ""
              }`}
              onClick={() => handleDrinkSelect(drink)}
            >
              <p>{drink.name}</p>
              <p>R${drink.price}</p>
            </div>
          ))}
        </div>

        <FooterModal handleBack={handleBack} handleNext={handleNext}/>

     </div>

     <ToastContainer />
    </section>
  );
};

export default DrinkModal;
