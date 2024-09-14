import React, { useState } from 'react';
import { Pizza, ListMagnifyingGlass } from "@phosphor-icons/react";
import ButtonNavbar from './button/buttonNavbar';
import "./navbar.css";

function navbar() {
    const [actualLink, setActualLink] = useState("/");


    return (
        <>
            <nav className="container-navbar">
                <img src="public\image\logo.png" alt="imagem logo orderize" />
                <ul className="ordenation-navbar">
                    <ButtonNavbar
                        link="/"
                        icon={ <Pizza size={35} color="black"/> }
                        text="Novo Pedido"
                        event={setActualLink}
                        />
                    <ButtonNavbar
                        link="/"
                        icon={ <ListMagnifyingGlass size={35}/>}
                        text="Opções"
                        event={setActualLink}
                    />
                    {
                        actualLink == "Opções" ? "SIIRRR" /* <Options /> */ : null
                    }
                    <li>
                        <a href="/">
                        <i>icone </i>Novo Pedido</a>
                        <ul className='ordenation-order'>
                            <ButtonNavbar
                                link="/"
                                icon="icone"
                                text="Sabores"
                            />
                            <ButtonNavbar
                                link="/"
                                icon="icone"
                                text="Bebidas"
                            />
                            <ButtonNavbar
                                link="/"
                                icon="icone"
                                text="Promoções"
                            />
                        </ul>
                    </li>
                    <ButtonNavbar
                        link="/"
                        icon="icone"
                        text="Histórico de pedidos"
                    />
                </ul>
                <button className="buttonTest">Sair</button>
            </nav>
        </>
    )
}

export default navbar;