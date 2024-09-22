import React, { useEffect, useState } from "react";
import "./item.css";

function item({ type, cod, description, flavor, price }) {
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
                <div className="content">
                    <img src={srcImage} alt={altImage} />
                    <h3>R$ {price}</h3>
                    <p>{cod} | {flavor}</p>

                    {
                        description ?
                            <p className="description">{description}</p>
                        : null
                    }
                    
                </div>
            </div>

        </>
    );
}

export default item; 