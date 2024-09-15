import React, { useState } from "react";
import "./buttonNavbar.css"

function buttonNavbar({ event, icon, isActive, link, text }) {
    const setLink = () => {
        event(text);
    }

    return (
        <>
            <li 
                className={ `container-buttonNavbar ${isActive ? "active" : ""}` }
                onClick={setLink}
            >
                <a 
                    // href="" 
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