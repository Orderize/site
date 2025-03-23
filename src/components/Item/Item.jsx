import React, { useEffect, useState } from "react";
import drink from '../../utils/assets/drink.svg';
import pizza from '../../utils/assets/pizzas/pizza-1-sabor.svg';
import styles from "./Item.module.css";

function item({ index, type, cod, description, name, price }) {
    const [srcImage, setSrcImage] = useState();
    const [altImage, setAltImage] = useState();

    useEffect(() => {
        switch (type) {
            case "flavor":
                setSrcImage(pizza);
                setAltImage("Imagem de Pizza");
                break;
            case "drink":
                setSrcImage(drink);
                setAltImage("Imagem de Bebida");
                break;
            default:
                break;
        }
    }, [type]);

    return (
        <>
            <div className={styles["component-item"]} tabIndex={index}>
                <img src={srcImage} alt={altImage} />
                <p>cod : {cod}</p>
                <h3 className={styles["name center"]}>{name}</h3>
                <h3>R$ {price.toFixed(2)}</h3>
                {
                    description ?
                    <p className={styles["description"]}>{description}</p>
                    : null
                }

                
            </div>

        </>
    );
}

export default item; 