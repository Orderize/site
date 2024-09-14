import React from "react";
import "./buttonNavbar.css"

function buttonNavbar({ link, icon, text, event }) {
    const setLink = () => {
        event(text);
    }
    return (
        <>
            <li 
                className="container-buttonNavbar"
                onClick={setLink}
            >
                <a href={link}>
                    {icon}
                    {text}
                </a>
            </li>
        </>
    );
}

export default buttonNavbar;