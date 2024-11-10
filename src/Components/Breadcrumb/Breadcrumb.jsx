import React from "react";
import ButtonNavbar from "../Navbar/Button/ButtonNavbar";
import { Link } from "react-router-dom";
import "./Breadcrumb.css"

function Breadcrumb({ activeButton }) {
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
                        >Promoções</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Breadcrumb;