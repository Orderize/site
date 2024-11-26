import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Progress from "../../Components/Progress/Progress";
import ButtonNext from "../../Components/Progress/ButtonNext/ButtonNext";
import ButtonPrevious from "../../Components/Progress/ButtonPrevious/ButtonPrevious";
import ButtonPreviousPage from "../../Components/Progress/ButtonPreviousPage/ButtonPreviousPage";
import CardPizza from "../../Components/OrderDetails/CardPizza/CardPizza";
import CardDrink from "../../Components/OrderDetails/CardDrink/CardDrink";
import CardClient from "../../Components/OrderDetails/CardClient/CardClient";
import CardPayment from "../../Components/OrderDetails/CardPayment/CardPayment";
import CardTotal from "../../Components/OrderDetails/CardTotal/CardTotal";
import MediaQuery from "react-responsive";
import styles from "./Order.module.css";
import { useNavigate, useLocation } from "react-router-dom";

function Order() {
  const [currentStep, setCurrentStep] = useState(2);
  const [modalPizza, setModalPizza] = useState(undefined);

  const [total, setTotal] = useState();
  const [pizzaValue, setPizzaValue] = useState();
  
  // const location = useLocation();
  const navigate = useNavigate();
  
  // console.log("location.state:", location.state);
  // const clientData = location.state?.clientData;

  // if (!clientData) {
  //     console.log("Nenhum dado de cliente encontrado.");
  // }

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

  const handlePreviousPage = () => {
    navigate("/pedidos");
  };

  const handleFinalize = () => {
    navigate("/modal/pagamento");
  };

  return (
    <>
      <Navbar activeButton={"Pedidos"} />

      <MediaQuery minWidth={769}>
        <main className={styles["container-order"]}>
          <div className={styles["btn-voltar"]}>
            <ButtonPreviousPage onPreviousPage={handlePreviousPage} />
          </div>

          <section className={styles["container-details-order"]}>
            <section>
              <CardPizza setTotal={setTotal} setPizzaValue={setPizzaValue} setModal={setModalPizza}/>
            </section>

            <section>
              <CardTotal total={total} pizzaValue={pizzaValue}/>
            </section>

            <section>
              <CardDrink />
            </section>

            <section>
              <CardClient />
            </section>
          </section>
              
          <div className={styles["btn-finalizar"]}>
            <button className={styles["btn"]} onClick={handleFinalize}>Finalizar</button>
          </div>
        </main>
      </MediaQuery>
      
    </>
  );
}

export default Order;
