import React from "react";
import styles from "./AddButton.module.css";

function AddButton({ texto }) {
    return (
        <button className={styles["btn-adicionar"]}>{texto}</button> 
    );
}

export default AddButton;