import React, { act, useRef, useState } from 'react';
import { Pizza, ListMagnifyingGlass, ClockClockwise } from "@phosphor-icons/react";
import ButtonNavbar from "./Button/ButtonNavbar";
import Option from "./Option/Option";
import logo from "../../../public/image/logo.png";
import "./Navbar.css";

function Navbar({ activeButton }) {
    const [actualButton, setActualButton] = useState(activeButton);

    return (
        <>
            <nav className="container-navbar">
                <img className="logo" src={logo} alt="imagem logo orderize" />
                <ul className="ordenation-navbar">
                    <ButtonNavbar
                        classx={"main"}
                        icon={ <Pizza size={37}/> }
                        isActive={actualButton === "Pedidos"}
                        link="/pedidos"
                        text="Pedidos"
                    />
                    <ButtonNavbar
                        icon={ <ListMagnifyingGlass size={37}/>}
                        isActive={actualButton === "Opções"}
                        link="/sabores"
                        text="Opções"
                        />
                    {
                        actualButton === "Opções" ? 
                            <Option />
                        : null
                    }
                    <ButtonNavbar
                        icon={ <ClockClockwise size={37} /> }
                        isActive={actualButton === "Histórico"}
                        link="/"
                        text="Histórico"
                    />
                </ul>
                <button className="button-config">CONFIGURAÇÕES</button>
            </nav>
        </>
    )
}

export default Navbar;