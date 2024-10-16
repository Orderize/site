import React, { useState } from 'react';
import './PromoModal.css'; 

const PromoModal = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [conditionDo, setConditionDo] = useState('');
  const [conditionIf, setConditionIf] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ startDate, endDate, conditionDo, conditionIf });
  };

  return (
    <div className="modal">
      <form className="promo-form" onSubmit={handleSubmit}>
        <h2>Adicionar promoção</h2>

        <div className="period-condition-wrapper">
          <div className="label-column">
            <h3>Por período</h3>
            <h3>Por condição</h3>
          </div>

          <div className="input-column">
            {/* Bloco Data inicial e Data final */}
            <div className="input-group date-group">
              <div className="date-inputs">
                <div>
                  <label>Dia inicial:</label>
                  <TextField
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Dia final:</label>
                  <TextField
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Bloco Faça e Se */}
            <div className="input-group condition-group">
              <div className="condition-inputs">
                <div>
                  <label>Faça:</label>
                  <TextField
                    type="text"
                    value={conditionDo}
                    onChange={(e) => setConditionDo(e.target.value)}
                  />
                </div>
                <div>
                  <label>Se:</label>
                  <TextField
                    type="text"
                    value={conditionIf}
                    onChange={(e) => setConditionIf(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="progress-indicator-add-promo">
          <span className="dot-not"></span>
          <span className="dot-not"></span>
          <span className="dot active"></span>
        </div>
        <button type="submit" className="add-button">Adicionar</button>
      </form>
    </div>
  );
};

const TextField = ({ type, value, onChange }) => {
  return (
    <input className="text-field" type={type} value={value} onChange={onChange} />
  );
};

export default PromoModal;
