import React, { useEffect, useState } from "react";
import "./Item.css";

function item({ type, cod, description, name, price }) {
    const [srcImage, setSrcImage] = useState();
    const [altImage, setAltImage] = useState();

    useEffect(() => {
        switch (type) {
            case "flavor":
                setSrcImage("https://www.cicis.com/content/images/cicis/Jalapeno%20pizza.png");
                setAltImage("Imagem de Pizza");
                break;
            case "drink":
                setSrcImage("https://www.cicis.com/content/images/cicis/Jalapeno%20pizza.png");
                setAltImage("Imagem de Bebida");
                break;
            case "gift":
                setSrcImage("https://www.cicis.com/content/images/cicis/Jalapeno%20pizza.png");
                setAltImage("Imagem de Brinde");
                break;
            default:
                break;
        }
    }, [srcImage])

    return (
        <>
            <div className="component-item">
                <p>cod : {cod}</p>
                <h3 className="name center">{name}</h3>
                {/* <img src={srcImage} alt={altImage} /> */}
                <h3>R$ {price.toFixed(2)}</h3>
                {
                    description ?
                    <p className="description">{description}</p>
                    : null
                }

                
            </div>

        </>
    );
}

export default item; 