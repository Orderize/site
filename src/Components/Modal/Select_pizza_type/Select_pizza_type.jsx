import React, { useState } from 'react';
import './select_pizza_type.css';

const SelectPizzaType = ({ onClose }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  const validatePrice = (value) => {
    const regex = /^\d+(\.\d{0,2})?$/;
    return regex.test(value) || value === ""; 
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    if (validatePrice(value)) {
      setPrice(value);
    }
  };

  const handleSave = () => {
    if (!selectedType || !price) {
      setError("Selecione um tipo de pizza e preencha o preço.");
      return;
    }
    setError("");
    setSuccessMessage("Pizza adicionada com sucesso!");

    setSelectedType(null);
    setPrice("");
    
    setTimeout(() => {
        onClose(); 
    }, 2000); 
  };

  return (
    <div className="modal-overlay-select">
      <div className="container-select-pizza-type">
        <button className="button-back" onClick={onClose}>{"<"}</button>
        <h2>Selecione o tipo da pizza:</h2>

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <div className="select-pizza-form">
          <div className="pizza-type-buttons">
            <button
              className={`pizza-type-button ${selectedType === 'Doce' ? 'active' : ''}`}
              onClick={() => handleSelectType('Doce')}
            >
              Doce
            </button>
            <button
              className={`pizza-type-button ${selectedType === 'Salgada' ? 'active' : ''}`}
              onClick={() => handleSelectType('Salgada')}
            >
              Salgada
            </button>
          </div>
          <div className="input-price-container">
            <span className="price-symbol">$</span>
            <input
              type="text"
              className="input-price"
              placeholder="Preço da pizza"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
        </div>

        <div className="select-pizza-actions">
          <button className="button-save" onClick={handleSave}>Salvar</button>
        </div>

        <div className="progress-indicator-select-pizza">
          <span className="dot-not"></span>
          <span className="dot active"></span>
        </div>
      </div>
    </div>
  );
};

export default SelectPizzaType;
