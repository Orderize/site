import React, { useEffect, useRef, useState } from "react";
import { ForkKnife, Wine, Money } from "@phosphor-icons/react";
import ButtonNavbar from '../Button/ButtonNavbar';
import "./Option.css"

function Option({ activeButton }) {
    const [actualButton, setActualButton] = useState(activeButton);
    

    return (
        <>
            <ul className={`container-option ${ ""/*isActive ? "openAnimation" : "closeAnimation"*/ }`}>
                <ButtonNavbar
                    event={ setActualButton }
                    icon={ <ForkKnife size={37} /> }
                    isActive={actualButton === "Sabores"}
                    link="/sabores"
                    text="Sabores"
                />
                <ButtonNavbar
                    event={ setActualButton }
                    icon={ <Wine size={37} />}
                    isActive={actualButton === "Bebidas"}
                    link="/"
                    text="Bebidas"
                />
                <ButtonNavbar
                    event={ setActualButton }
                    icon={ <Money size={75} className='money' /> }
                    isActive={actualButton === "Brindes"}
                    link="/promotion"
                    text="Brindes"
                />
            </ul>
        </>
    );
}

export default Option;