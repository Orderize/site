import React, { useState, useEffect, useRef } from 'react';
import './flavor.css';

const PizzaComponent = () => {
  const [activeTab, setActiveTab] = useState('Salgadas');
  const [pizzaItems, setPizzaItems] = useState([]); 
  const [visibleItems, setVisibleItems] = useState(10); 
  const pizzaListRef = useRef(null);

  useEffect(() => {
    const salgadaPizzas = Array.from({ length: 20 }, (_, i) => `Salgada ${i + 1}`);
    const docePizzas = Array.from({ length: 30 }, (_, i) => `Doce ${i + 1}`);
    setPizzaItems(activeTab === 'Salgadas' ? salgadaPizzas : docePizzas);
  }, [activeTab]);

  const handleScroll = () => {
    if (pizzaListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = pizzaListRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
      }
    }
  };

  return (
    <div className="container-flavor">
      <div className="pizza-options-flavor">
        <select className="pizza-dropdown-flavor">
          <option>Pequena</option>
          <option>Média</option>
          <option>Grande</option>
        </select>
        <select className="pizza-dropdown-flavor">
          <option>Massa da pizza</option>
        </select>
        <select className="pizza-dropdown-flavor">
          <option>Borda da pizza</option>
        </select>
      </div>

      <div className="pizza-menu-flavor">
        <div className="pizza-tabs">
          <button 
            className={`pizza-tab ${activeTab === 'Salgadas' ? 'active' : ''}`} 
            onClick={() => {
              setActiveTab('Salgadas');
              setVisibleItems(10); 
            }}>
            Salgadas
          </button>
          <button 
            className={`pizza-tab ${activeTab === 'Doces' ? 'active' : ''}`} 
            onClick={() => {
              setActiveTab('Doces');
              setVisibleItems(10); 
            }}>
            Doces
          </button>
        </div>

        <div className="search-bar">
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

      <div className="pizza-actions-flavor">
        <button class="cancel-button" className="cancel-button">Cancelar</button>
        <button class="next-button" className="next-button">Próximo</button>
      </div>
    </div>
  );
};

export default PizzaComponent;
