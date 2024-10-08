import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Progress from "../../components/Progress/Progress";
import ButtonNext from "../../components/Progress/ButtonNext/ButtonNext";
import ButtonPrevious from "../../components/Progress/ButtonPrevious/ButtonPrevious";
import ButtonPreviousPage from "../../components/Progress/ButtonPreviousPage/ButtonPreviousPage";
import CardPizza from "../../components/orderDetails/cardPizza/cardPizza";
import CardDrink from "../../components/orderDetails/CardDrink/CardDrink";
import CardClient from "../../components/orderDetails/CardClient/CardClient";
import CardPayment from "../../components/orderDetails/CardPayment/CardPayment";
import CardTotal from "../../components/orderDetails/CardTotal/CardTotal";
import MediaQuery from "react-responsive";
import styles from "./Order.module.css";
import { useNavigate } from "react-router-dom";

function Order() {
  const [currentStep, setCurrentStep] = useState(2);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 2) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };
  
  const navigate = useNavigate();

  const handlePreviousPage = () => {
    navigate("/pedidos");
  };

  return (
    <>
      <Navbar activeButton={"Pedidos"} />

      <MediaQuery maxWidth={768}>
        <main className={styles["container-order"]}>
          <div className={styles.details}>

            {currentStep === 2 ? (
              <ButtonPreviousPage
                onPreviousPage={handlePreviousPage} 
              />
            ) : (
              <ButtonPrevious
                onPrevious={handlePrevious} 
                disabled={currentStep <= 2}
              />
            )}

            {currentStep === 2 && (
              <section className={styles["container-pizza"]}>
                <CardPizza />
              </section>
            )}
            {currentStep === 3 && (
              <section className={styles["container-drink"]}>
                <CardDrink />
              </section>
            )}
            {currentStep === 4 && (
              <section className={styles["pricing"]}>
                <CardPayment />
                <CardTotal />
              </section>
            )}
            {currentStep === 5 && (
              <section className={styles["review"]}>
                <CardPizza />
                <CardDrink />
                <CardPayment />
                <CardTotal />
              </section>
            )}

            <div className={styles.progress}>
              <ButtonNext onNext={handleNext} disabled={currentStep >= 5} />
              <Progress currentStep={currentStep} totalSteps={5} />
            </div>
          </div>
        </main>
      </MediaQuery>

      <MediaQuery minWidth={769}>
        <main className={styles["container-order"]}>
            <div className={styles["order-details-left"]}>
                <div className={styles.titulo}>
                    <ButtonPreviousPage
                        onPreviousPage={handlePreviousPage}
                    />
                    <h1>Novo Pedido</h1>
                </div>

                <section>
                    <CardPizza />
                </section>

                <section>
                    <CardDrink />
                </section>
            </div>

            <div className={styles["order-details-right"]}>
                <CardClient />
                <CardPayment />
                <CardTotal />
            </div>
        </main>
      </MediaQuery>
      
    </>
  );
}

export default Order;
