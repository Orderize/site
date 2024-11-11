import React, {useState} from 'react';
import { Coins, QrCode, CreditCard, Wallet, Wall } from '@phosphor-icons/react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import FloatingInput from '../../Floatinginput/Floatinginput';
import ButtonPreviousPage from '../../Progress/ButtonPreviousPage/ButtonPreviousPage';
import ButtonPrevious from '../../Progress/ButtonPrevious/ButtonPrevious';
import styles from './ModalPagamento.module.css'; 

function ModalPagamento({ totalValue }) {
    const [paymentOption, setPaymentOption] = useState(null); 
    const [receivedValue, setReceivedValue] = useState(0);
    const [change, setChange] = useState(0);
    const navigate = useNavigate();

    const handlePaymentOption = (option) => {
        setPaymentOption(option);
        setReceivedValue(0); 
        setChange(0); 

        toast.success(`Forma de pagamento selecionada: ${option === "money" ? "Dinheiro" : option.charAt(0).toUpperCase() + option.slice(1)}`);

        if (option !== "money") {      
           handleFinalize();
        }
    };
    
    const handleReceivedValueChange = (event) => {
        const value = Number(event.target.value);
        setReceivedValue(value);
        setChange(value - totalValue); 
    };

    const handlePreviousPage = () => {
        navigate("/pedidos/novo-pedido");
    };

    const handleFinalize = () => { 
        toast.info("Pedido finalizado!");

        setTimeout(() => {
            navigate("/pedidos");
        }, "1000");
    };

      return (
        <div className={styles["modal-overlay"]}>
          <ToastContainer />
            <section className={styles["modal-container"]} onClick={(e) => e.stopPropagation()}>
                {paymentOption != "money" ? (
                    <>
                        <div className={styles["btn-voltar"]}>
                            <ButtonPreviousPage onPreviousPage={handlePreviousPage} />
                        </div>

                        <h2>Selecione a forma de pagamento</h2>

                        <div className={styles["payment-options"]}>
                            <div className={styles.option} onClick={() => handlePaymentOption("money")}>
                                <div className={styles.circle}>
                                    <Coins size={50} color='var(--verde-escuro)'/>
                                </div>
                                <div className={styles.description}>
                                    <p className={styles.titulo}>Dinheiro</p>
                                    <p className={styles.subtitulo}>ou pressione a tecla F1</p>
                                </div>
                            </div>
                            <div className={styles.option} onClick={() => handlePaymentOption("pix")}>
                                <div className={styles.circle}>
                                    <QrCode size={50} color='var(--verde-escuro)'/>
                                </div>
                                <div className={styles.description}>
                                    <p className={styles.titulo}>Pix</p>
                                    <p className={styles.subtitulo}>ou pressione a tecla F2</p>
                                </div>
                            </div>
                            <div className={styles.option} onClick={() => handlePaymentOption("cartão")}>
                                <div className={styles.circle}>
                                    <CreditCard size={50} color='var(--verde-escuro)'/>
                                </div>
                                <div className={styles.description}>
                                    <p className={styles.titulo}>Cartão</p>
                                    <p className={styles.subtitulo}>ou pressione a tecla F3</p>
                                </div>
                            </div>
                            <div className={styles.option} onClick={() => handlePaymentOption("vr")}>
                                <div className={styles.circle}>
                                    <Wallet size={50} color='var(--verde-escuro)'/>
                                </div>
                                <div className={styles.description}>
                                    <p className={styles.titulo}>VR</p>
                                    <p className={styles.subtitulo}>ou pressione a tecla F4</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles["btn-voltar"]}>
                            <ButtonPrevious onPrevious={() => handlePaymentOption(null)} />
                        </div>

                        {paymentOption === "money" && (
                            <div className={styles["money-container"]}>
                                <h2>Dinheiro</h2>
                                <p className={styles.tituloPag}>Total do pedido: R$ {totalValue}</p>

                                <div className={styles["troco-container"]}>
                                    <p className={styles["troco-titulo"]}>Troco</p>
                                    <div className={styles["troco-input"]}>
                                        <FloatingInput label={"Valor a receber"} value={receivedValue} onChange={handleReceivedValueChange} />
                                    </div>
                                    {change >= 0 && (
                                        <p className={styles["troco-subtitulo"]}>Troco: R$ {change.toFixed(2)}</p>
                                    )}

                                </div>
                                
                                <button className={styles["btn-finalizar"]} onClick={handleFinalize}>Finalizar</button>
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
}

export default ModalPagamento;
