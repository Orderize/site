import React, { useState } from 'react';
import './add_new_drink.css';

const AddNewDrink = ({ onClose }) => {
  const [price, setPrice] = useState('');

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  return (
    <section className="modal-overlay-drink">
      <div className="container-add-new-drink">
        <button className="button-back-drink" onClick={onClose}>{"<"}</button>

        <h2>Adicionar nova bebida</h2>

        <div className="add-new-drink-form">
          <div className="add-new-drink-form-row">
            <input type="text" className="input-code" placeholder="Código" />
            <input type="text" className="input-name" placeholder="Nome da bebida" />
          </div>
          <div className="input-price-container-new-drink">
            <span className="price-symbol-new-drink">$</span>
            <input
              type="text"
              className="input-price-new-drink"
              placeholder="Preço da pizza"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
        </div>

        <div className="add-new-drink-actions">
          <button className="button next-btn">Salvar</button>
        </div>

        
      </div>
    </section>
  );
};

export default AddNewDrink;
