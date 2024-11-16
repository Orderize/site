import React, { useEffect, useRef, useState } from 'react';
import { ChartDonut, ClockClockwise, ListMagnifyingGlass, Pizza } from "@phosphor-icons/react";
import ButtonNavbar from './Button/ButtonNavbar';
import Option from "./Option/Option";

import "./Navbar.css";
import ImgLogo from '../../utils/assets/logo.png';
import { useMediaQuery } from 'react-responsive';

function navbar({ activeButton, subActiveButton }) {
    const isDesktop = useMediaQuery({
        query: '(min-width: 1200px)' 
    });

    const [actualButton, setActualButton] = useState(activeButton);

    const [ user ] = useState(JSON.parse(localStorage.getItem('user')));
    const [ isOwner ] = useState(user.roles.some(role => role.name == "OWNER"));
    const [ mainButton ] = useState({
        title: isOwner ? "Relatórios" : "Pedidos",
        icon: isOwner ? <ChartDonut size={37} /> : <Pizza size={37} />,
        path: isOwner ? "/relatorios" : "/pedidos"
    });

    const nameMiddleButton = isOwner ? "Gestão" : "Opções";

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
                    />
                    <ButtonNavbar
                        icon={ <ListMagnifyingGlass size={37}/>}
                        isActive={actualButton === "Opções"}
                        link="/sabores"
                        text={nameMiddleButton}
                    />
                    {
                        subActiveButton === "Sabores" || subActiveButton === "Bebidas" || subActiveButton === "Promo" ? 
                            <Option activeButton={subActiveButton} />
                        : null
                    }
                    <ButtonNavbar
                        icon={ <ClockClockwise size={37} /> }
                        isActive={actualButton === "Histórico"}
                        link="/historicos"
                        text="Histórico"
                    />
                </ul>
            </nav>
        </>
    )
}

export default navbar;