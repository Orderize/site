import React, { useEffect, useRef, useState } from "react";
import { PiPizzaBold } from "react-icons/pi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./History.module.css";
import { getHistory } from "../../api/services/History";
import { dowloadAttestation } from "../../api/services/Attestations";

const formatDateAndTime = (datetime) => {
    if (!datetime) return { date: "", time: "" };

    const dateObj = new Date(datetime);
    const date = dateObj.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    const time = dateObj.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return { date, time };
};

function History() {
    
    const [history, setHistory] = useState([]);
    const [token] = useState(localStorage.getItem('token'));
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleHistory = async (event) => {
        try {
            const data = await getHistory(token);
            console.log("data:", data);
            // setHistory(data);
            setHistory(data.reverse());
        } catch (error) {
            alert(error.message)
            console.log(error);
        }
    }

    useEffect(() => {
        handleHistory();
      
        const interval = setInterval(() => {
            handleHistory();
        }, 5000);

        return () => clearInterval(interval);
    }, [token]);

    const handleClickOrder = (order) => {
        setSelectedOrder(order);
        setIsOpen(true);
    }

    const orderClass = `${styles.orderList} ${isOpen ? styles.active : ''}`;
    // const dateClass = `${styles.dateInput} ${isOpen ? styles.active : ''}`;

    const closeDetails = () => {
        setSelectedOrder(null);
        setIsOpen(false);
    };

    const handleDownload = async () => {
        try {
            const data = await dowloadAttestation(token);
    
            const blobUrl = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = blobUrl;
    
            link.setAttribute('download', 'relatorio.csv');
            
            document.body.appendChild(link);
            link.click();
    
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Erro ao baixar o arquivo:', error);
            alert('Não foi possível baixar o arquivo. Tente novamente mais tarde.');
        }
    };

    return (
        <>
            <Navbar roles={"attendant"} activeButton={"Histórico"} />
            <div className={styles['container']}>
                <div className={styles['main']}>
                    <h1>Histórico de pedidos</h1>

                    <div className={styles['filters']}>
                        <div className={styles['button-csv']}>
                            <button onClick={handleDownload}>Baixar relatório</button>
                        </div>

                        <div className={styles['dateWrapper']}>
                            <input type="date" className={`${styles['dateInput']} ${isOpen ? styles['dateInputVisible'] : ''}`} />
                        </div>

                    </div>

                    <div className={styles['legend']}>
                        <div className={styles['legend-item']}>
                            <div className={styles['color-circle']} style={{ backgroundColor: '#B5B9A4' }}></div>
                            <span className={styles.info}>Delivery</span>
                        </div>

                        <div className={styles['legend-item']}>
                            <div className={styles['color-circle']} style={{ backgroundColor: '#7B806A' }}></div>
                            <span className={styles.info}>Salão/Mesa</span>
                        </div>
                    </div>

                    <div className={orderClass}>
                        {history.map((order) => {
                            const backgroundColor = order.type === "delivery" ? '#B5B9A4' : '#7B806A';

                            const { date, time } = formatDateAndTime(order.datetime);

                            return (
                                <div key={order.id} className={styles['orderCard']} style={{ backgroundColor }} onClick={() => handleClickOrder(order)}>
                                    <div className={styles['orderInfo']}>
                                        <div className={styles['infoDate']}>
                                            <span className={styles['infoDate-data']}>{date}</span>
                                            <span className={styles['infoDate-time']}>{time}</span>
                                        </div>
                                        <hr></hr>
                                        <div className={styles['infoCodTotal']}>
                                            <PiPizzaBold className={styles['iconPizzaMoney']}></PiPizzaBold>
                                            <div className={styles['infos2']}>
                                                <span className={styles['infos2-titulo']}>Pedido</span>
                                                <span className={styles['infos2-subtitulo']}>Cod: {order.id}</span>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className={styles['infoCodTotal']}>
                                            <RiMoneyDollarCircleLine className={styles['iconPizzaMoney']}></RiMoneyDollarCircleLine>
                                            <div className={styles['infos2']}>
                                                <span className={styles['infos2-titulo']}>Total: </span>
                                                <span className={styles['infos2-subtitulo']}>R$ {order.price}</span>
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
                            <div className={styles['divClose']}>
                                <IoCloseCircleOutline
                                    className={styles['iconX']}
                                    onClick={closeDetails}
                                />
                            </div>

                            <div className={styles['detailsOrder']}>
                                <h2>Detalhes do Pedido</h2>
                                <div>
                                    <strong className={styles.subtitulo}>Data:</strong> {selectedOrder.date}
                                </div>
                                <hr />
                                <div className="divIconPizzaTitulo">
                                    <div className="divIconPizza">
                                        <PiPizzaBold className={styles['iconPizzaCode']} />
                                    </div>

                                    <div className={styles["divTituloValor"]}>
                                        <strong className={styles.subtitulo}>Código do Pedido:</strong>
                                        <ul>{selectedOrder.id}</ul>
                                    </div>

                                </div>


                                <hr />
                                <div><strong className={styles.subtitulo}>Pizzas:</strong></div>
                                <ul>
                                    {selectedOrder.pizzas.map((pizza) => (
                                        <li key={pizza.id} className={styles.info}>
                                            {pizza.name} - R${pizza.price}
                                        </li>
                                    ))}
                                </ul>
                                <hr />
                                <div><strong className={styles.subtitulo}>Bebidas:</strong></div>
                                <ul>
                                    {selectedOrder.drinks.map((drink) => (
                                        <li key={drink.id} className={styles.info}>
                                            {drink.name} - R${drink.price}
                                        </li>
                                    ))}
                                </ul>
                                <hr />
                                <div className="divIconPizzaTitulo">
                                    <div className="divIconPizza">
                                        <RiMoneyDollarCircleLine className={styles['iconMoney']} />
                                    </div>
                                    <div className="divTituloValor">
                                        <strong className={styles.subtitulo}>Total:</strong>
                                        <ul>R${selectedOrder.price}</ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}

export default History;
