import React, { useEffect, useRef, useState } from "react";
import { PiPizzaBold } from "react-icons/pi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
// import { IoCloseCircleOutline } from "react-icons/io5";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./History.module.css";
import { getHistory } from "../../api/services/History";

function History() {

    const [history, setHistory] = useState([]);
    const [token] = useState(localStorage.getItem('token'));
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleHistory = async (event) => {
        try{
            const data = await getHistory(token);
            console.log("data:",data);
            setHistory(data);
        }catch(error){
            alert(error.message)
            console.log(error);
        }
    }

    useEffect(()=> {
        handleHistory();

        const interval = setInterval(() => {
            handleHistory();
        }, 5000);

        return() => clearInterval(interval);
    }, [token]);


    const handleClickOrder = (order) => {
        setSelectedOrder(order);
    }

    // const closeDetails = () => {
    //     setSelectedOrder(null); 
    // };

    return (
        <>
            <Navbar roles={"attendant"} activeButton={"Histórico"}/>
        <div className={styles['container']}>
            <div className={styles['main']}>
                <h1>Histórico de pedidos</h1>

                <div className={styles['filters']}>
                    <div className={styles['dateWrapper']}>
                        <input type="date" className={styles['dateInput']} />
                    </div>
                </div>

                <div className={styles['legend']}>
                    <div className={styles['legend-item']}>
                        <div className={styles['color-circle']} style={{ backgroundColor: '#B5B9A4' }}></div>
                        <span>Delivery</span>
                    </div>

                    <div className={styles['legend-item']}>
                        <div className={styles['color-circle']} style={{ backgroundColor: '#7B806A' }}></div>
                        <span>Salão/Mesa</span>
                    </div>
                </div>

                <div className={styles['orderList']}>
                    {history.map((order) => {
                        const backgroundColor = order.type === "delivery" ? '#B5B9A4' : '#7B806A';

                        return (
                            <div key={order.id} className={styles['orderCard']} style={{ backgroundColor }} onClick={() => handleClickOrder(order)}>
                                <div className={styles['orderInfo']}>
                                    <div className={styles['infoDate']}>
                                        <span>{order.date}</span>
                                        <span>{order.time}</span>
                                    </div>
                                    <hr></hr>
                                    <div className={styles['infoCodTotal']}>
                                        <PiPizzaBold className={styles['iconPizzaMoney']}></PiPizzaBold>
                                        <div className={styles['infos2']}>
                                            <span>Pedido</span>
                                            <span>Cod: {order.id}</span>
                                        </div>

                                    </div>
                                    <hr></hr>
                                    <div className={styles['infoCodTotal']}>
                                        <RiMoneyDollarCircleLine className={styles['iconPizzaMoney']}></RiMoneyDollarCircleLine>
                                        <div className={styles['infos2']}>
                                            <span>Total: </span>
                                            <span>R$ {order.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {selectedOrder && (
                    <div className={styles['sidebar']}>
                        <div className={styles['sidebarContent']}>
                            <h2>Detalhes do Pedido</h2>
                            <div><strong>Data:</strong> {selectedOrder.date}</div>
                            <div><strong>Código:</strong> {selectedOrder.id}</div>
                            <div><strong>Pizzas:</strong></div>
                            <ul>
                                {selectedOrder.pizzas.map((pizza) => (
                                    <li key={pizza.id}>
                                        {pizza.name} - {pizza.observations}
                                    </li>
                                ))}
                            </ul>
                            <div><strong>Bebidas:</strong></div>
                            <ul>
                                {selectedOrder.drinks.map((drink) => (
                                    <li key={drink.id}>{drink.name} - {drink.description}</li>
                                ))}
                            </ul>
                            <div><strong>Total:</strong> R$ {selectedOrder.price}</div>
                        </div>
                    </div>
            )}
        </div>
    </>
    );
}

export default History;
