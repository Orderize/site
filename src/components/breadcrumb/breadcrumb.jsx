import React from "react";
import "./breadcrumb.css"
import ButtonNavbar from "../navbar/button/buttonNavbar";

function breadcrumb({ activeButton }) {
    return (
        <>
            <nav className="container-breadcrumb">
                <ul className="organization">
                    <li>
                        <a 
                            href="/sabores"
                            className={ activeButton === "sabores" ? "active": "" }
                        >Sabores</a>
                    </li>
                    <li>
                        <a 
                            href=""
                            className={ activeButton === "bebidas" ? "active": "" }
                        >Bebidas</a>
                    </li>
                    <li>
                        <a 
                            href=""                            
                            className={ activeButton === "brindes" ? "active": "" }
                        >Brindes</a>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default breadcrumb;