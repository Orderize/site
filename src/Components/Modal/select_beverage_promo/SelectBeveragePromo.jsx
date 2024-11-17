import React, { useState, useEffect, useRef } from 'react';
import './selectBeveragePromo.css';
import PromoModal from '/src/Components/Modal/promo_add/PromoModal.jsx'; 
import InputSearch from '../../InputSearch/InputSearch';
import { getDrinks } from '../../../api/services/Drinks';

const SelectBeveragePromo = ({ onClose }) => {
  const [valueSearch, setValueSearch] = useState("");
  const [drinkList, setDrinkList] = useState([]);
  const [beverageListPromo, setBeverageListPromo] = useState([]); 
  const [visibleBeverageCount, setVisibleBeverageCount] = useState(10); 
  const [selectedBeverage, setSelectedBeverage] = useState(null);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false); 
  const beverageScrollRef = useRef(null);
  const [token] = useState(localStorage.getItem("token"));


  const handleScrollBeverage = () => {
    if (beverageScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = beverageScrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setVisibleBeverageCount((prevCount) => prevCount + 10);
      }
    }
  };

  const handleBeverageSelect = (beverage) => {
    setSelectedBeverage(beverage);
  };

  const handleNext = () => {
    if (selectedBeverage) {
      setIsPromoModalOpen(true); 
    } else {
      alert('Por favor, selecione uma bebida antes de continuar.');
    }
  };

  const closePromoModal = () => {
    setIsPromoModalOpen(false); 
    onClose(); 
  };

  const handleClose = () => {
    onClose(); // Fecha o modal principal
  };

  const handleDrinks = async () => {
    const value = event.target.value;
    try {
      const params = {
        name: value,
        milimeters: null
      };
      const data = await getDrinks(token, params);
      setDrinkList(data);
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
        const params = {
          name: value,
          milimeters: null
        };
        const data = await getDrinks(token, params);
        if (data.length > 0) setDrinkList(data);        
    } catch (error) {
        alert(error.message);
        console.log(error);
    }
  }

  useEffect(() => {
      handleDrinks();
  }, []);

  return (
    <div className="selectBeveragePromo-modal-wrapper">
      <section className="selectBeveragePromo-modal-container">
        <button className="close-button" onClick={handleClose}>
          ✖
        </button>
        <h2>Selecione as bebidas para a promoção</h2>

        <div className="selectBeveragePromo-beverage-menu">
          <div className="selectBeveragePromo-beverage-tabs">
            <button className="selectBeveragePromo-beverage-tab active">
              Bebidas
            </button>
          </div>

          <div className="selectBeveragePromo-search-bar">
            <InputSearch valueSearch={valueSearch} handleSearch={handleSearch} />
            <button className="selectBeveragePromo-search-button">🔍</button>
          </div>

          <div 
            className="selectBeveragePromo-beverage-list" 
            ref={beverageScrollRef} 
            onScroll={handleScrollBeverage}
          >
            {
              drinkList.map(drink => (
                <button 
                  key={drink.id} 
                  className={`selectBeveragePromo-beverage-item ${selectedBeverage === drink ? 'selected' : ''}`} 
                  onClick={() => handleBeverageSelect(drink)}
                >
                  {drink.id} | {drink.name}
                </button>
              ))
            }
          </div>
        </div>
        
        <button className="selectBeveragePromo-next-button" onClick={handleNext}>
          Próximo
        </button>

        <div className="progress-indicator-select-beverage-promo">
          <span className="dot-not"></span>
          <span className="dot active"></span>
          <span className="dot-not"></span>
        </div>

        {isPromoModalOpen && <PromoModal onClose={closePromoModal} />}
      </section>
    </div>
  );
};

export default SelectBeveragePromo;
