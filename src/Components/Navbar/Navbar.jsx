import React, { useRef, useState } from 'react';
import { ChartDonut, ClockClockwise, ListMagnifyingGlass, Pizza } from "@phosphor-icons/react";
import ButtonNavbar from './Button/ButtonNavbar';
import Option from "./Option/Option";

import styles from "./Navbar.module.css";
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
            <nav className={styles['container-navbar']}>
                {
                    isDesktop 
                        && 
                    <div className={styles['logo']}>
                        <img src={ImgLogo} alt="imagem logo orderize" />
                    </div>
                }
                <ul className={styles['ordenation-navbar']}>
    
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
                        subActiveButton === "Sabores" || subActiveButton === "Bebidas" || subActiveButton === "Promo" ? 
                            <Option activeButton={subActiveButton} />
                        : null
                    }
                    <ButtonNavbar
                        icon={ <ClockClockwise size={37} /> }
                        isActive={actualButton === "Histórico"}
                        link="/historico"
                        text="Histórico"
                    />
                </ul>
            </nav>
        </>
    )
}

export default navbar;