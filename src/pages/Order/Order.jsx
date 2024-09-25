import React from "react";
import Navbar from "../../components/navbar/Navbar";
import CardPizza from "../../components/orderDetails/cardPizza/cardPizza";
import CardDrink from "../../components/orderDetails/CardDrink/CardDrink";
import CardClient from "../../components/orderDetails/CardClient/CardClient"; 
import CardPayment from "../../components/orderDetails/cardPayment/cardPayment";
import CardTotal from "../../components/orderDetails/CardTotal/CardTotal";
import "./Order.css";

function Order() {
    return (
        <>
            <Navbar activeButton={"Pedidos"} />
            <main className="container-order">
            
                <div className="order-details-left">
                <h1>Novo Pedido</h1>
                    <section className="container-pizza">
                        <CardPizza />
                    </section>

                    <section className="container-drink">
                        <CardDrink />
                    </section>
                </div>

                <div className="order-details-right">
                    <CardClient />
                    <CardPayment />
                    <CardTotal />
                </div>
            </main>
        </>
    );
    
}

export default Order;