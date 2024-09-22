import React from 'react';
import './PizzaModal.css';

const PizzaModal = () => {
  return (
    <div className="modal-overlay">
      <div className="pizza-container">
        <h2>Revisão da pizza</h2>

        <div className="pizza-options">
          <select className="pizza-dropdown">
            <option>Tamanho da pizza</option>
            <option>8 pedaços</option>
            <option>6 pedaços</option>
          </select>

          <select className="pizza-dropdown">
            <option>Massa da pizza</option>
            <option>Massa fina</option>
            <option>Massa grossa</option>
          </select>

          <select className="pizza-dropdown">
            <option>Borda da pizza</option>
            <option>Catupiry</option>
            <option>Sem borda</option>
          </select>
        </div>

        <div className="pizza-menu">
          <div className="pizza-header">
            <span>100 | Calabresa</span>
          </div>

          <div className="pizza-ingredients">
            <p>Ingredientes:</p>
            <ul>
              <li>
                <input type="checkbox" checked readOnly /> Cebola
              </li>
              <li>
                <input type="checkbox" checked readOnly /> Calabresa
              </li>
              <li>
                <input type="checkbox" checked readOnly /> Tomate
              </li>
              <li>
                <input type="checkbox" checked readOnly /> Massa de tomate
              </li>
            </ul>
          </div>
        </div>

        <div className="pizza-actions">
          <button className="button back-btn">Voltar</button>
          <button className="button next-btn">Próximo</button>
        </div>
      </div>
    </div>
  );
};

export default PizzaModal;
