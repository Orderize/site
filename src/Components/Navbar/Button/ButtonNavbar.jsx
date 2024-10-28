import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import "./ButtonNavbar.css"

function buttonNavbar({ icon, isActive, link, text }) {
    
    // Só para teste kk
    const isDesktop = useMediaQuery({
        query: '(min-width: 1200px)'
    })

    const handleClick = (e) => {
    }

    return (
        <>
            <li 
                className={ `container-buttonNavbar ${isActive ? "active" : ""}` }
                onClick={handleClick}
            >
                <Link 
                    to={link}
                    className={ `${isActive ? "active" : ""}` }
                >
                    <i>
                        {icon}
                    </i>
                    {
                        isDesktop 
                            && 
                        text
                    }
                </Link>
            </li>
        </>
    );
}

export default buttonNavbar;