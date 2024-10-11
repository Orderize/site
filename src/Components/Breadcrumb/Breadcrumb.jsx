import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrumb.css"
// import ButtonNavbar from "../navbar/button/buttonNavbar";

function breadcrumb({ activeButton }) {
    return (
        <>
            <nav className="container-breadcrumb">
                <ul className="organization">
                    <li>
                        <Link to={"/sabores"}
                           className={ activeButton === "sabores" ? "active": "" }                     
                        >Sabores</Link>
                    </li>
                    <li>
                        <Link 
                            to={""}
                            className={ activeButton === "bebidas" ? "active": "" }
                        >Bebidas</Link>
                    </li>
                    <li>
                        <Link 
                            to={""}                            
                            className={ activeButton === "brindes" ? "active": "" }
                        >Brindes</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default breadcrumb;