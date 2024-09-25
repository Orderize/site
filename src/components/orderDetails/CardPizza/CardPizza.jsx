import React from "react";
import "./CardPizza.css";

function CardPizza(){
    return (
        <>
        <main className="container-pizza">
            <div className="titulo">
                <p>Pizzas</p>

                <button className="btn-adicionar">Adicionar pizza</button>        
            </div>

            <div className="list-pizza">
                
            </div>


        </main>
        </>
    );
}

export default CardPizza;