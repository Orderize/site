import React, { useState } from "react";
import "./ButtonNavbar.css"

function ButtonNavbar({ classx, event, icon, isActive, link, text }) {
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
                    <span className="button-navbar-text">{text}</span>
                    {/* {text} */}
                </a>
            </li>
        </>
    );
}

export default ButtonNavbar;