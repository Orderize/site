import React, { useEffect, useState } from "react";
import ButtonNavbar from "../Navbar/Button/ButtonNavbar";
import { Link, useNavigate } from "react-router-dom";
import "./Index.css"

function Breadcrumb({ activeButton }) {
    
    const [indexItem, setIndexItem] = useState({
        idx: activeButton == "bebidas" ? 1 : activeButton == "brindes" ? 2 : 0,
        limit: 3
    });

    const navigate = useNavigate();

    const handleNavIndex = (event) => {
        let idx = indexItem.idx;
        if (event.key == "ArrowRight" && event.ctrlKey) {
                idx = (indexItem.idx + 1) % indexItem.limit;
        } else if (event.key == "ArrowLeft" && event.ctrlKey) {
                idx = (indexItem.idx - 1 + indexItem.limit) % indexItem.limit;
        }

        if (idx != indexItem.idx) {
            setIndexItem(prev => ({...prev, idx}));
            switch (idx) {
                case 0:
                    navigate("/sabores");  
                    break;
                case 1:
                    navigate("/bebidas");
                    break;
                case 2:
                    navigate("/promotion");
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
        <>
            <nav className="container-breadcrumb">
                <ul className="organization">
                    <li>
                        <Link to={"/sabores"}
                           className={ activeButton === "sabores" ? "active": "" }                     
                        >Sabores</Link>
                    </li>
                    <li>
                        <Link 
                            to={"/bebidas"}
                            className={ activeButton === "bebidas" ? "active": "" }
                        >Bebidas</Link>
                    </li>
                    <li>
                        <Link 
                            to={"/promotion"}                            
                            className={ activeButton === "brindes" ? "active": "" }
                        >Promoções</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Breadcrumb;