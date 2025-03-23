import React from "react";
import styles from "./ButtonNext.module.css";

function ButtonNext({ onNext, disabled }) {
    return (
        <button className={styles["btn-next"]} onClick={onNext} disabled={disabled}>Próximo</button>
    );
}

export default ButtonNext;