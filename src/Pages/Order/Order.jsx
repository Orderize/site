import React, { useState, useEffect, useRef } from "react";
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
import { Stack } from "../../utils/stack/Stack";

function Order() {
  const [pizzas, setPizzas] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const unremovedItens = useRef(new Stack(20));
  
  const navigate = useNavigate();

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
              <CardPizza unremovedItem={unremovedItens} pizzas={pizzas} setPizzas={setPizzas} />
            </section>

            <section>
              <CardTotal drinks={drinks} pizzas={pizzas}/>
            </section>

            <section>
              <CardDrink unremovedItens={unremovedItens} drinks={drinks} setDrinks={setDrinks}/>
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
