import React from 'react';
import './FooterModal.css'; 

const FooterModal = ({ handleNext, handleBack, disabled }) => {
  return (
    <div className="pizza-actions">
      <button className="cancel-button" onClick={handleBack}>Cancelar</button>
      <button className="next-button" onClick={handleNext}>Confirmar</button>
    </div>
  );
};

export default FooterModal;
