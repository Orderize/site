import React, { useState, useEffect, useRef } from 'react';
import './selectBeveragePromo.css';

const SelectBeveragePromo = () => {
  const [beverageListPromo, setBeverageListPromo] = useState([]); 
  const [visibleBeverageCount, setVisibleBeverageCount] = useState(10); 
  const beverageScrollRef = useRef(null);

  useEffect(() => {
    const beverageOptions = Array.from({ length: 50 }, (_, i) => `Bebida Promo ${i + 1}`);
    setBeverageListPromo(beverageOptions);
  }, []);

  const handleScrollBeverage = () => {
    if (beverageScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = beverageScrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setVisibleBeverageCount((prevCount) => prevCount + 10);
      }
    }
  };

  return (
    <div className="selectBeveragePromo-modal-wrapper">
      <section className="selectBeveragePromo-modal-container">
        <h2>Selecione as bebidas para a promoção</h2>

        <div className="selectBeveragePromo-beverage-menu">
          <div className="selectBeveragePromo-beverage-tabs">
            <button className="selectBeveragePromo-beverage-tab active">
              Bebidas
            </button>
          </div>

          <div className="selectBeveragePromo-search-bar">
            <input type="text" placeholder="Pesquise pelo nome da bebida" />
            <button className="selectBeveragePromo-search-button">🔍</button>
          </div>

          <div 
            className="selectBeveragePromo-beverage-list" 
            ref={beverageScrollRef} 
            onScroll={handleScrollBeverage}
          >
            {beverageListPromo.slice(0, visibleBeverageCount).map((beverage, index) => (
              <button key={index} className="selectBeveragePromo-beverage-item">
                {index + 1} | {beverage}
              </button>
            ))}
          </div>
        </div>
        <button className="selectBeveragePromo-next-button">
          Próximo
        </button>

        <div className="progress-indicator-select-beverage-promo">
          <span className="dot-not"></span>
          <span className="dot active"></span>
          <span className="dot-not"></span>
        </div>
      </section>
    </div>
  );
};

export default SelectBeveragePromo;
