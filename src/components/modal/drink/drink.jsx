import React, { useState, useEffect, useRef } from 'react';
import './drink.css';

const PizzaComponent = () => {
  const [activeTab, setActiveTab] = useState('Doces');
  const [pizzaItems, setPizzaItems] = useState([]); 
  const [visibleItems, setVisibleItems] = useState(10); 
  const pizzaListRef = useRef(null);

  useEffect(() => {
    const docePizzas = Array.from({ length: 30 }, (_, i) => `Bebida ${i + 1}`);
    setPizzaItems(docePizzas);
  }, []);

  const handleScroll = () => {
    if (pizzaListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = pizzaListRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
      }
    }
  };

  return (
    <div className="drink-container">
      <div className="pizza-options-drink">
      </div>

      <div className="menu-drinks">
        <div className="pizza-tabs">
          <button 
            className={`pizza-tab ${activeTab === 'Doces' ? 'active' : ''}`} 
            onClick={() => {
              setActiveTab('Doces');
              setVisibleItems(10); 
            }}>
            Bebidas
          </button>
        </div>

        <div className="search-bar-drink">
          <input type="text" placeholder="Pesquise pelo nome da bebida" />
          <button className="search-button">🔍</button>
        </div>

        <div 
          className="pizza-list" 
          ref={pizzaListRef} 
          onScroll={handleScroll}
        >
          {pizzaItems.slice(0, visibleItems).map((pizza, index) => (
            <button key={index} className="pizza-item">
              {index + 1} | {pizza}
            </button>
          ))}
        </div>
      </div>

      <div className="pizza-actions-drink">
        <button className="cancel-button">Cancelar</button>
        <button className="next-button">Próximo</button>
      </div>
    </div>
  );
};

export default PizzaComponent;
