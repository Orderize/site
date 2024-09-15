import React, { useState } from "react";
import "./buttonNavbar.css"

function buttonNavbar({ classx, event, icon, isActive, link, text }) {
    const setLink = () => {
        event(text);
    }

    return (
        <>
            <li 
                className={ `container-buttonNavbar ${classx} ${isActive ? "active" : ""}` }
                onClick={setLink}
            >
                <a 
                    href={link} 
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