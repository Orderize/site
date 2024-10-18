import React, { useState } from "react";
import styles from "./NavbarHome.module.css";
import Acessebility from '../acessibility/acessibility.jsx';
import MediaQuery from "react-responsive";

import { IoMenuOutline } from "react-icons/io5";
import { IoChevronBackCircleOutline } from "react-icons/io5";

function NavbarHome({ logo }) {

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('overlay')) setIsOpen(false);
    };

    const overlayClass = `${styles.overlay} ${isOpen ? styles.active : ''}`;
    const navClass = `${styles.nav} ${isOpen ? styles.open : ''}`;
    const menuClass = `${styles.menu} ${isOpen ? styles.open : ''}`


    return (
        <>
            <MediaQuery maxWidth={460}>
                <div className={menuClass}>
                    <IoMenuOutline className={styles["menu-icon"]} onClick={toggleMenu} />
                </div>
                <div className={styles['nav-acessibility']}>
                    <Acessebility></Acessebility>
                </div>

                <div className={overlayClass} onClick={handleOutsideClick}>
                    {/* Menu deslizante */}
                    <nav className={navClass}>
                        <IoChevronBackCircleOutline className={styles["close-btn"]} onClick={toggleMenu} />
                        <img src={logo} className={styles['imageLogo']} />
                        <ul className={styles['nav-links']}>
                            <li><a href="#home" className={styles['item-nav']}>Home</a></li>
                            <li><a href="#ourSystem" className={styles['item-nav']}>Nosso Sistema</a></li>
                            <li><a href="#benefits" className={styles['item-nav']}>Benefícios</a></li>
                            <li><a href="#contact" className={styles['item-nav']}>Fale Conosco</a></li>
                        </ul>
                    </nav>

                </div>
            </MediaQuery>

            <MediaQuery minWidth={460}>               
                    <nav className={styles['nav']}>
                        <img src={logo} className={styles['imageLogo']} />
                        <div className={styles['nav-acessibility']}>
                            <ul className={styles['nav-links']}>
                                <li><a href="#" className={styles['item-nav']}>Home</a></li>
                                <li><a href="#ourSystem" className={styles['item-nav']}>Nosso Sistema</a></li>
                                <li><a href="#benefits" className={styles['item-nav']}>Benefícios</a></li>
                                <li><a href="#contact" className={styles['item-nav']}>Fale Conosco</a></li>
                            </ul>
                            <Acessebility></Acessebility>
                        </div>
                    </nav>

            </MediaQuery>
        </>
    );
};

export default NavbarHome;