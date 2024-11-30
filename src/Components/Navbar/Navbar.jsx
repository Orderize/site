import React, { useEffect, useRef, useState } from 'react';
import { ChartDonut, ClockClockwise, ListMagnifyingGlass, Pizza } from "@phosphor-icons/react";
import ButtonNavbar from './Button/ButtonNavbar';
import Option from "./Option/Option";

import styles from "./Navbar.module.css";
import ImgLogo from '../../utils/assets/logo.png';
import { useMediaQuery } from 'react-responsive';
import { getMainButton, isUserOwner } from './NavbarData';
import { useNavigate } from 'react-router-dom';

function navbar({ activeButton, subActiveButton }) {
    const isDesktop = useMediaQuery({
        query: '(min-width: 1200px)' 
    });

    const user = JSON.parse(localStorage.getItem('user'));
    const isOwner = isUserOwner(user.roles);
    const mainButton = getMainButton(isOwner);

    const nameMiddleButton = isOwner ? "Gestão" : "Opções";

    const [indexItem, setIndexItem] = useState({
        idx: activeButton == "Opções" ? 1 : activeButton == "Histórico" ? 2 : 0,
        limit: 3
    });

    const navigate = useNavigate();

    const handleNavIndex = (event) => {
        let idx = indexItem.idx;
        if (event.key == "ArrowDown" && event.ctrlKey) {
                idx = (indexItem.idx + 1) % indexItem.limit;
        } else if (event.key == "ArrowUp" && event.ctrlKey) {
                idx = (indexItem.idx - 1 + indexItem.limit) % indexItem.limit;
        }

        if (idx != indexItem.idx) {
            setIndexItem(prev => ({...prev, idx}));
            switch (idx) {
                case 0:
                    navigate(mainButton.path);  
                    break;
                case 1:
                    navigate("/sabores");
                    break;
                case 2:
                    navigate("/historicos");
                    break;
                default:
                    break;
            }
        }
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            handleNavIndex(event);
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <nav className={`${styles.container} ${styles.center}`}>
            {isDesktop && (
                <div className={`${styles.logo} ${styles.center}`}>
                    <img src={ImgLogo} alt="Orderize logo" />
                </div>
            )}
            <ul className={`${styles.ordenation} ${styles.center}`}>
                <ButtonNavbar
                    icon={mainButton.icon}
                    isActive={activeButton === mainButton.title}
                    link={mainButton.path}
                    text={mainButton.title}
                />
                <ButtonNavbar
                    key={2}
                    icon={ <ListMagnifyingGlass size={37}/>}
                    isActive={activeButton === "Opções"}
                    link="/sabores"
                    text={nameMiddleButton}
                />
                {subActiveButton && ["Sabores", "Bebidas", "Promo"].includes(subActiveButton) && ( 
                    <Option activeButton={subActiveButton} />
                )}
                <ButtonNavbar
                    icon={ <ClockClockwise size={37} /> }
                    isActive={activeButton === "Histórico"}
                    link="/historicos"
                    text="Histórico"
                />
            </ul>
        </nav>
    )
}

export default navbar;