import React, { useState } from "react";
import "./buttonNavbar.css"

function buttonNavbar({ event, icon, isActive, classx, text }) {
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