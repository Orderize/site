import React from "react";
import styles from "./ConfirmModal.module.css";
import ActionButton from "@/components/ActionButton/ActionButton";

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  children,
  message
}) => {
  if (!isOpen) return null; 

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-container"]}>
        
        {children}

        <div>    
            <div>
                <p className={styles.titulo}>{title}</p>
                <p className={styles.texto}>{message}</p>
            </div>

            <div className={styles["modal-actions"]}>
                <ActionButton label="Cancelar" onClick={onClose}/>
                <ActionButton label="Confirmar" onClick={onConfirm}/>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
