import React, { useState } from "react";
import Floatinginput from "./Floatinginput/Floatinginput";
import ButtonPrevious from "./../../Progress/ButtonPrevious/ButtonPrevious";
import styles from "./CardPayment.module.css";

function CardPayment(){
    const [payment, setPayment] = useState("");
    const [currentStep, setCurrentStep] = useState(1);

    const handleMoney = () => {
        setPayment("Dinheiro");
        setCurrentStep(2);
    }

    const handleCard = () => {
        setPayment("Cartão");
        setCurrentStep(2);
    }
    
    const handlePrevious = () => {
        setPayment("");
        setCurrentStep(1);
    };

    return (
        <>
        <main className={styles["container-payment"]}>
            {payment === "" && (  
                <>
                    <p className={styles.titulo}>Selecione a forma de pagamento</p>
                    <div className={styles["botoes-payment"]}>
                        <button onClick={handleMoney}>Dinheiro</button>
                        <button onClick={handleCard}>Cartão</button>
                    </div>
                </>
            )}

            {payment === "Dinheiro" && (
                <div className={styles["container-money"]}>
                    <div className={styles["titulo-money"]}>
                        <ButtonPrevious onPrevious={handlePrevious} disabled={currentStep <= 1} />
                        <p className={styles.titulo}>Forma de pagamento: Dinheiro</p>
                    </div>

                    <div className={styles["container-troco"]}>
                        <Floatinginput type="number" label="Valor a receber" />

                        <div className="troco">
                            <p>Troco: </p>
                            <p>R$0,00</p>
                        </div>
                    </div>

                </div>
            )}

            {payment === "Cartão" && (
                <div className={styles["container-card"]}>
                    <div className={styles["titulo-card"]}>
                        <ButtonPrevious onPrevious={handlePrevious} disabled={currentStep <= 1} />
                        <p>Forma de pagamento: Cartão</p>
                    </div>

                    <p className={styles["subtitulo-card"]}>Débito/Crédito</p>
                </div>
            )}
        </main>
        </>
        
    );
}

export default CardPayment;