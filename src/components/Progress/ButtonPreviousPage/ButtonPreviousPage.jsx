import React from "react";
import { CaretCircleLeft } from "@phosphor-icons/react";
import styles from "./ButtonPreviousPage.module.css";

function ButtonPreviousPage({ onPreviousPage, disabled }) {
    return (
        <button className={styles["btn-previous"]} onClick={onPreviousPage} disabled={disabled}>
            <CaretCircleLeft size={22} weight="duotone" />
        </button>
    );
}

export default ButtonPreviousPage;