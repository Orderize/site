import React, { useState, useEffect, useRef } from 'react';
import './selectPizzaPromo.css';
import SelectBeveragePromo from '/src/Components/Modal/select_beverage_promo/SelectBeveragePromo.jsx';
import PromoModal from '/src/Components/Modal/promo_add/PromoModal.jsx';

const SelectPizzaPromo = () => {
  const [activeTabPromo, setActiveTabPromo] = useState('Salgadas');
  const [pizzaListPromo, setPizzaListPromo] = useState([]); 
  const [visiblePizzaCount, setVisiblePizzaCount] = useState(10);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [isBeverageModalOpen, setIsBeverageModalOpen] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const pizzaScrollRef = useRef(null);

  useEffect(() => {
    const salgadaPizzaOptions = Array.from({ length: 20 }, (_, i) => `Salgada Promo ${i + 1}`);
    const docePizzaOptions = Array.from({ length: 30 }, (_, i) => `Doce Promo ${i + 1}`);
    setPizzaListPromo(activeTabPromo === 'Salgadas' ? salgadaPizzaOptions : docePizzaOptions);
  }, [activeTabPromo]);

  const handleScrollPromo = () => {
    if (pizzaScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = pizzaScrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setVisiblePizzaCount((prevCount) => prevCount + 10);
      }
    }
  };

  const handlePizzaSelect = (pizza) => {
    setSelectedPizza(pizza);
  };

  const handleNext = () => {
    if (selectedPizza) {
      setIsBeverageModalOpen(true);
    } else {
      alert('Por favor, selecione uma pizza antes de continuar.');
    }
  };

  const closeBeverageModal = () => {
    setIsBeverageModalOpen(false);
  };

  const closePromoModal = () => {
    setIsPromoModalOpen(false);
    setIsBeverageModalOpen(false);
  };

  const handleClose = () => {
    window.location.reload(); 
  };

  return (
    <div className="selectPizzaPromo-modal-wrapper">
      <section className="selectPizzaPromo-modal-container">
        <button className="close-button" onClick={handleClose}>
          ✖
        </button>
        <h2>Selecione as pizzas para a promoção</h2>

        <div className="selectPizzaPromo-pizza-menu">
          <div className="selectPizzaPromo-pizza-tabs">
            <button 
              className={`selectPizzaPromo-pizza-tab ${activeTabPromo === 'Salgadas' ? 'active' : ''}`} 
              onClick={() => {
                setActiveTabPromo('Salgadas');
                setVisiblePizzaCount(10);
                setSelectedPizza(null);
              }}>
              Salgadas
            </button>
            <button 
              className={`selectPizzaPromo-pizza-tab ${activeTabPromo === 'Doces' ? 'active' : ''}`} 
              onClick={() => {
                setActiveTabPromo('Doces');
                setVisiblePizzaCount(10);
                setSelectedPizza(null);
              }}>
              Doces
            </button>
          </div>

          <div className="selectPizzaPromo-search-bar">
            <input type="text" placeholder="Pesquise pelo nome da pizza" />
            <button className="selectPizzaPromo-search-button">🔍</button>
          </div>

          <div 
            className="selectPizzaPromo-pizza-list" 
            ref={pizzaScrollRef} 
            onScroll={handleScrollPromo}
          >
            {pizzaListPromo.slice(0, visiblePizzaCount).map((pizza, index) => (
              <button 
                key={index} 
                className={`selectPizzaPromo-pizza-item ${selectedPizza === pizza ? 'selected' : ''}`} 
                onClick={() => handlePizzaSelect(pizza)}
              >
                {index + 1} | {pizza}
              </button>
            ))}
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

      {isBeverageModalOpen && (
        <SelectBeveragePromo onClose={closeBeverageModal} />
      )}

      {isPromoModalOpen && (
        <PromoModal onClose={closePromoModal} />
      )}
    </div>
  );
};

export default SelectPizzaPromo;
