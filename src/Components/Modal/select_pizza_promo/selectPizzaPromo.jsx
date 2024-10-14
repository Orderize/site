import React, { useState, useEffect, useRef } from 'react';
import './selectPizzaPromo.css';

const SelectPizzaPromo = () => {
  const [activeTabPromo, setActiveTabPromo] = useState('Salgadas');
  const [pizzaListPromo, setPizzaListPromo] = useState([]); 
  const [visiblePizzaCount, setVisiblePizzaCount] = useState(10); 
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

  return (
    <div className="selectPizzaPromo-modal-wrapper">
      <section className="selectPizzaPromo-modal-container">
        <h2>Selecione as pizzas para a promoção</h2>

        <div className="selectPizzaPromo-pizza-menu">
          <div className="selectPizzaPromo-pizza-tabs">
            <button 
              className={`selectPizzaPromo-pizza-tab ${activeTabPromo === 'Salgadas' ? 'active' : ''}`} 
              onClick={() => {
                setActiveTabPromo('Salgadas');
                setVisiblePizzaCount(10); 
              }}>
              Salgadas
            </button>
            <button 
              className={`selectPizzaPromo-pizza-tab ${activeTabPromo === 'Doces' ? 'active' : ''}`} 
              onClick={() => {
                setActiveTabPromo('Doces');
                setVisiblePizzaCount(10); 
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
              <button key={index} className="selectPizzaPromo-pizza-item">
                {index + 1} | {pizza}
              </button>
            ))}
          </div>
        </div>
        <button className="selectPizzaPromo-next-button">
          Próximo
        </button>

        <div className="progress-indicator-select-pizza-promo">
          <span className="dot active"></span>
          <span className="dot-not"></span>
          <span className="dot-not"></span>
        </div>
      </section>
    </div>
  );
};

export default SelectPizzaPromo;
