import React from "react";
import styles from "./AddButton.module.css";

function AddButton({ openModal, texto }) {
    return (
        <button 
            onClick={openModal} 
            className={styles["btn-adicionar"]}
        >{texto}</button> 
    );
}

export default AddButton;