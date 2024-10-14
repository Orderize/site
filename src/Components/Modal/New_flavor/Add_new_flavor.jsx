import React from 'react';
import './add_new_flavor.css';

const AddNewFlavor = ({ onClose }) => {
  return (
    <section className="modal-overlay-add">
      <div className="container-add-new-flavor">
        <button className="button-back-add" onClick={onClose}>{"<"}</button>

        <h2>Adicionar novo sabor</h2>

        <div className="add-new-flavor-form">
          <div className="add-new-flavor-form-row">
            <input type="text" className="input-code" placeholder="Código" />
            <input type="text" className="input-name" placeholder="Nome do sabor" />
          </div>
          <textarea className="input-description" placeholder="Descrição do sabor"></textarea>
        </div>

        <div className="add-new-flavor-actions">
          <button className="button next-btn">Próximo</button>
          
        </div>

        <div className="progress-indicator-add-new">
        <span className="dot active"></span>
          <span className="dot-not"></span>
        </div>
      </div>
    </section>
  );
};

export default AddNewFlavor;
