import React, { useState, useEffect, useRef } from 'react';
import './selectPizzaPromo.css';
import SelectBeveragePromo from '/src/Components/Modal/select_beverage_promo/SelectBeveragePromo.jsx';
import PromoModal from '/src/Components/Modal/promo_add/PromoModal.jsx';
import { getAllPizzas } from '../../../api/services/Pizzas';
import InputSearch from '../../InputSearch/InputSearch';

const SelectPizzaPromo = ({ setListPizzas, handleNext }) => {
  const [valueSearch, setValueSearch] = useState("");
  const [pizzaList, setPizzaList] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const pizzaScrollRef = useRef(null);

  const handleScrollPromo = () => {
    if (pizzaScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = pizzaScrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setVisiblePizzaCount((prevCount) => prevCount + 10);
      }
    }
  };

  const handlePizzaSelect = (pizza) => {
    setListPizzas(prevPizza => [...prevPizza, pizza]);
    setSelectedPizza(pizza);
  };

  // const handleNext = () => {
  //   if (selectedPizza) {
  //     setIsBeverageModalOpen(true);

  //   } else {
  //     alert('Por favor, selecione uma pizza antes de continuar.');
  //   }
  // };

  // diego resolver isso
  const handleClose = () => {
    window.location.reload(); 
  };

  const handlePizzas = async () => {
    try {
        const data = await getAllPizzas(token);
        if (data.length > 0) setPizzaList(data);
    } catch (error) {
        // FAZER UM MODAL AQUI PARA FALAR SOBRE O ERRO
        alert(error.message)
        console.log(error);
    }
  };

  const handleSearch = async (event) => {
    const value = event.target.value;
    setValueSearch(value);
    try {
        const data = await getAllPizzas(token, value);
        console.log(data);
        
        setPizzaList(data);
    } catch (error) {
        alert(error.message);
        console.log(error);
    }
  }

  useEffect(() => {
    handlePizzas();
  }, []);


  return (
    <div className="selectPizzaPromo-modal-wrapper">
      <section className="selectPizzaPromo-modal-container">
        <button className="close-button" onClick={handleClose}>
          ✖
        </button>
        <h2>Selecione as pizzas para a promoção</h2>

        <div className="selectPizzaPromo-pizza-menu">
          <div className="selectPizzaPromo-pizza-tabs">
            <button className={`selectPizzaPromo-pizza-tab`}>Pizzas</button>
          </div>

          <div className="selectPizzaPromo-search-bar">
            <InputSearch valueSearch={valueSearch} handleSearch={handleSearch} />
            <button className="selectPizzaPromo-search-button">🔍</button>
          </div>

          <div 
            className="selectPizzaPromo-pizza-list" 
            ref={pizzaScrollRef} 
            onScroll={handleScrollPromo}
          >
            {

              pizzaList.length > 0 &&
              pizzaList.map(pizza => (
                <button 
                  key={pizza.id} 
                  className={`selectPizzaPromo-pizza-item ${selectedPizza === pizza ? 'selected' : ''}`} 
                  onClick={() => handlePizzaSelect(pizza)}
                >
                  {pizza.id} | {pizza.name}
                </button>
              ))
            }
          </div>
        </div>
        
        <button 
          className="selectPizzaPromo-next-button" 
          onClick={handleNext}
          disabled={!selectedPizza}
        >
          Próximo
        </button>

        <div className="progress-indicator-select-pizza-promo">
          <span className="dot active"></span>
          <span className="dot-not"></span>
          <span className="dot-not"></span>
        </div>
      </section>

      {/* {isBeverageModalOpen && (
        <SelectBeveragePromo onClose={closeBeverageModal} />
      )}

      {isPromoModalOpen && (
        <PromoModal onClose={closePromoModal} />
      )} */}
    </div>
  );
};

export default SelectPizzaPromo;
