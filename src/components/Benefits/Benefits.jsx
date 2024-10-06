import React from "react";
import styles from "./Benefits.module.css"

function Benefits({ icon, title }) {
    return (
        <div className={styles["benefits"]}>
            <img src={icon}/>
            <h3>{title}</h3>
        </div>
    );
}

export default Benefits;