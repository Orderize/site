import React, { act, useRef, useState } from 'react';
import { Pizza, ListMagnifyingGlass, ClockClockwise } from "@phosphor-icons/react";
import ButtonNavbar from './button/buttonNavbar';
import Option from "./option/option";
import "./navbar.css";

function navbar() {
    const [actualButton, setActualButton] = useState("Novo Pedido");

    return (
        <>
            <nav className="container-navbar">
                <img className="logo" src="public\image\logo.png" alt="imagem logo orderize" />
                <ul className="ordenation-navbar">
                    <ButtonNavbar
                        event={ setActualButton }
                        icon={ <Pizza size={37}/> }
                        isActive={actualButton === "Novo Pedido"}
                        link="/"
                        text="Novo Pedido"
                    />
                    <ButtonNavbar
                        event={ setActualButton }
                        icon={ <ListMagnifyingGlass size={37}/>}
                        isActive={actualButton === "Opções"}
                        link="/"
                        text="Opções"
                    />
                    {
                        actualButton === "Opções" ? 
                            <Option />
                        : null
                    }
                    <ButtonNavbar
                        event={ setActualButton }
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