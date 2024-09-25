import React from "react";
import "./CardPayment.css";

function CardPayment(){
    return (
        <>
        <main className="container-payment">
            <p className="titulo">Selecione a forma de pagamento</p>

            <div className="botoes-payment">
                <button>Dinheiro</button>
                <button>Cartão</button>
            </div>
        </main>
        </>
        
    );
}

export default CardPayment;