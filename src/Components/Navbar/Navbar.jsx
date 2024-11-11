import React, { useRef, useState } from 'react';
import { ChartDonut, ClockClockwise, ListMagnifyingGlass, Pizza } from "@phosphor-icons/react";
import ButtonNavbar from './Button/ButtonNavbar';
import Option from "./Option/Option";

import "./Navbar.css";
import ImgLogo from '../../utils/assets/logo.png';
import { useMediaQuery } from 'react-responsive';

function navbar({ roles, activeButton, subActiveButton }) {
    // const [ isOwner ] = useState(roles.some(role => role.name === "OWNER"));
    
    const isDesktop = useMediaQuery({
        query: '(min-width: 1200px)' 
    });

    const [actualButton, setActualButton] = useState(activeButton);

    const mainButton = {
        title: roles === "OWNER" ? "Relatórios" : "Pedidos",  
        icon: roles === "OWNER" ? <ChartDonut size={37} /> : <Pizza size={37} />,
        path: roles === "OWNER" ? "/relatorios" : "/pedidos"
    };

    
    const nameMiddleButton = roles === "OWNER" ? "Gestão" : "Opções";

    return (
        <>
            <nav className="container-navbar center">
                {
                    isDesktop 
                        && 
                    <div className='logo center'>
                        <img src={ImgLogo} alt="imagem logo orderize" />
                    </div>
                }
                <ul className="ordenation-navbar center">
                    <ButtonNavbar
                        icon={mainButton.icon}
                        isActive={actualButton === mainButton.title}
                        link={mainButton.path}
                        text={mainButton.title}
                        event={setActualButton}
                        />
                    <ButtonNavbar
                        icon={ <ListMagnifyingGlass size={37}/>}
                        isActive={actualButton === nameMiddleButton}
                        link="/sabores"
                        text={nameMiddleButton}
                        event={setActualButton}
                        />
                    {
                        subActiveButton === "Sabores" || subActiveButton === "Bebidas" || subActiveButton === "Promo" ? 
                            <Option activeButton={subActiveButton} />
                        : null
                    }
                    <ButtonNavbar
                        icon={ <ClockClockwise size={37} /> }
                        isActive={actualButton === "Histórico"}
                        link="/historico"
                        text="Histórico"
                        event={setActualButton}
                    />
                </ul>
            </nav>
        </>
    )
}

export default navbar;