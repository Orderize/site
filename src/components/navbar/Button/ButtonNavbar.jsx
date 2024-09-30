import React, { useState } from "react";
import styles from "./ButtonNavbar.module.css";
import { useNavigate } from "react-router-dom";

function buttonNavbar({ classx, icon, isActive, link, text }) {
    
    const goTo = useNavigate();

    const handleClick = (event) => {
        goTo(link);
    }; 

    return (
        <>
            <li 
                className={styles["container-buttonNavbar", classx, isActive ? "active" : ""]}
            >
                <button 
                    onClick={handleClick}
                    className={ styles[isActive ? "active" : ""] }
                >
                    <i>
                        {icon}
                    </i>
                    {text}
                </button>
            </li>
        </>
    );
}

export default buttonNavbar;