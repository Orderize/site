import React, { useState } from "react";
import "./buttonNavbar.css"
import { useNavigate } from "react-router-dom";

function buttonNavbar({ classx, event, icon, isActive, link, text }) {
    
    const setLink = () => {
        event(text);
    }

    const navigate = useNavigate();

    const handleClick = (e) => {
        // setLink();
        navigate(link);
    }
    

    return (
        <>
            <li 
                className={ `container-buttonNavbar ${classx} ${isActive ? "active" : ""}` }
                onClick={handleClick}
            >
                <a 
                    className={ `${isActive ? "active" : ""}` }
                >
                    <i>
                        {icon}
                    </i>
                    {text}
                </a>
            </li>
        </>
    );
}

export default buttonNavbar;