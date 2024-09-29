import React, { act, useRef, useState } from 'react';
import { Pizza, ListMagnifyingGlass, ClockClockwise } from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';

import ButtonNavbar from './Button/ButtonNavbar';
import Option from './Option/option';

import imgLogo from "../../utils/assets/logo.png";

import styles from "./NavBar.module.css";

function navbar({ activeButton }) {
    const [actualButton, setActualButton] = useState(activeButton);
    const goTo = useNavigate();

    const handleClick = (event) => {
        console.log(event);
        goTo("/login"); 
    }

    return (
        <>
            <nav className={styles["container-navbar"]}>
                <img className={styles["logo"]} src={imgLogo} alt="imagem logo orderize" />
                <ul className={styles["ordenation-navbar"]}>
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
                <button 
                    className="button-config"
                    onClick={e => handleClick(e)}>
                    CONFIGURAÇÕES
                </button>
            </nav>
        </>
    )
}

export default navbar;