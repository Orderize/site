import React from "react";
import "./CardTotal.css";

function CardTotal(){
    return (
        <>
        <main className="container-total">
            <p className="titulo">Total</p>
            <p className="total">R$</p>

            <div className="list-precos">
                <div className="list-precos__item">
                    <p>Pizzas</p>
                    <p>R$</p>
                </div>

                <div className="list-precos__item">
                    <p>Bebidas</p>
                    <p>R$</p>
                </div>

                <div className="list-precos__item">
                    <p>Frete</p>
                    <p>R$</p>
                </div>

                <div className="list-precos__item">
                    <p>Promoção</p>
                    <p>-R$</p>
                </div>
            </div>
        </main>
        </>
    );
}

export default CardTotal;