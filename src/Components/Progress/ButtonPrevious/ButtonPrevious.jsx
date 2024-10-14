import React from "react";
import { CaretCircleLeft } from "@phosphor-icons/react";
import styles from "./ButtonPrevious.module.css";

function ButtonPrevious({ onPrevious, disabled }) {
    return (
        <button className={styles["btn-previous"]} onClick={onPrevious} disabled={disabled}>
            <CaretCircleLeft size={20} weight="duotone" />
        </button>
    );
}

export default ButtonPrevious;