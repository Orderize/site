import React, { useState } from "react";
import { PiPizzaBold } from "react-icons/pi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./History.module.css";
import { WiDayThunderstorm } from "react-icons/wi";

function History() {

    const [valueSearch, setValueSearch] = useState("");

    const enter = () => {
        console.log(valueSearch);
    }

    const orders = [
        { date: "19/10/2024", time: "14:30", code: "123", total: 50, type: "Delivery" },
        { date: "18/10/2024", time: "18:00", code: "124", total: 30, type: "Salao/mesa" },
        { date: "17/10/2024", time: "13:00", code: "125", total: 70, type: "Delivery" },
        { date: "17/10/2024", time: "18:00", code: "125", total: 70, type: "salao/mesa" },
        { date: "16/10/2024", time: "22:00", code: "125", total: 70, type: "Delivery" },
    ];

    return (
        <div className={styles['container']}>
            <Navbar></Navbar>

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
                    {orders.map((order) => {
                        const backgroundColor = order.type === "Delivery" ? '#B5B9A4' : '#7B806A';

                        return (
                            <div className={styles['orderCard']} style={{ backgroundColor }}>
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
                                            <span>Cod: {order.code}</span>
                                        </div>

                                    </div>
                                    <hr></hr>
                                    <div className={styles['infoCodTotal']}>
                                        <RiMoneyDollarCircleLine className={styles['iconPizzaMoney']}></RiMoneyDollarCircleLine>
                                        <div className={styles['infos2']}>
                                            <span>Total: </span>
                                            <span>R$ {order.total}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default History;