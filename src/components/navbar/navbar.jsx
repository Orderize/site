import React, { useRef, useState } from 'react';
import { ChartDonut, ClockClockwise, ListMagnifyingGlass, Pizza } from "@phosphor-icons/react";
import ButtonNavbar from './button/buttonNavbar';
import Option from "./option/option";

import "./navbar.css";

function navbar({ role, activeButton }) {
    const [actualButton, setActualButton] = useState(activeButton);

    const mainButton = {
        title: role === "admin" ? "Relatórios" : "Pedidos",  
        icon: role === "admin" ? <ChartDonut size={37} /> : <Pizza size={37} />,
        path: role === "admin" ? "/relatorios" : "/pedidos"
    };

    
    const nameMiddleButton = role === "admin" ? "Gerenciamento" : "Opções";

    return (
        <>
            <nav className="container-navbar">
                <div className='logo center'>
                    <img src="/image/logo.png" alt="imagem logo orderize" />
                </div>
                <ul className="ordenation-navbar center">
                    <ButtonNavbar
                        icon={mainButton.icon}
                        isActive={actualButton === mainButton.title}
                        link={mainButton.path}
                        text={mainButton.title}
                        />
                    <ButtonNavbar
                        icon={ <ListMagnifyingGlass size={37}/>}
                        isActive={actualButton === nameMiddleButton}
                        link="/sabores"
                        text={nameMiddleButton}
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
            </nav>
        </>
    )
}

export default navbar;