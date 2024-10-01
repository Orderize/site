import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ButtonNavbar.css"

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
                <Link 
                    to={link} 
                    className={ `${isActive ? "active" : ""}` }
                >
                    <i>
                        {icon}
                    </i>
                    {text}
                </Link>
            </li>
        </>
    );
}

export default buttonNavbar;