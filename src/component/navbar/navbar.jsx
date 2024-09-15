import React, { act, useRef, useState } from 'react';
import { Pizza, ListMagnifyingGlass, ClockClockwise } from "@phosphor-icons/react";
import ButtonNavbar from './button/buttonNavbar';
import Option from "./option/option";
import "./navbar.css";

function navbar({ activeButton }) {
    const [actualButton, setActualButton] = useState(activeButton);

    return (
        <>
            <nav className="container-navbar">
                <img className="logo" src="public\image\logo.png" alt="imagem logo orderize" />
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

export default navbar;