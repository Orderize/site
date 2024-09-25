import React from "react";
import styles from "./Features.module.css";
import { CiCirclePlus } from 'react-icons/ci';

function Features({ icon, title}) {
    return (
        <div className={styles["features"]}>
            <img src={icon}/>
            <div className={styles["titlePlus"]}>
                <h3>{title}</h3>
                <CiCirclePlus className={styles['iconPlus']}/>
            </div>
        </div>
    );
}

export default Features;