import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../Components/Navbar/Index";
import ButtonPreviousPage from "../../Components/Progress/ButtonPreviousPage/ButtonPreviousPage";
import CardPizza from "../../Components/OrderDetails/CardPizza/CardPizza";
import CardDrink from "../../Components/OrderDetails/CardDrink/CardDrink";
import CardClient from "../../Components/OrderDetails/CardClient/CardClient";
import CardTotal from "../../Components/OrderDetails/CardTotal/CardTotal";
import ModalPagamento from "../../Components/OrderDetails/ModalPagamento/ModalPagamento";
import MediaQuery from "react-responsive";
import styles from "./Order.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Stack } from "../../utils/stack/Stack";
import { saveOrder } from "../../api/services/Orders";
import { saveAttestation } from "../../api/services/Attestations";
import { toast, ToastContainer } from "react-toastify";

function Order() {
  const [token] = useState(localStorage.getItem('token'));
  const [isOpenModal, setIsOpenModal] = useState(false); 
  const [pizzas, setPizzas] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const clientData = JSON.parse(localStorage.getItem("client")); 
  const userData = JSON.parse(localStorage.getItem("user"));

  const drinkList = drinks.map((drink) => drink.id);
  const pizzaList = pizzas.map((pizza) => pizza.id);

  const unremovedItens = useRef(new Stack(20));
  
  const navigate = useNavigate();

  const handleSaveOrder = async () => {
    const order = {
      client: clientData.id, 
      responsible: userData.id,
      pizzas: drinkList,
      drinks: pizzaList,
      type: "Delivery",
      freight: 5,
      estimatedTime: 45,
    };

    try {
      console.log(order);

      const response = await saveOrder(token, order);
      console.log(response);

      if(response?.id){
        console.log("Pedido salvo com sucesso!");
        return response.id;
      }
    } catch (error) {
      console.error("Erro ao salvar o pedido:", error);
    }
  };

  const handleSaveAttestation = async ( orderId ) => {
    try {
      console.log(orderId);

      const order = {
        "order": orderId
      };
      console.log("Enviando payload para recibo:", order);

      const response = await saveAttestation(token, order);
      console.log("Recibo salvo com sucesso:", response);
      
    } catch (error) {
      console.error("Erro ao salvar o recibo:", error);
    }
  };

  const handleFinalize = async () => {
    if (pizzas.length != 0 || drinks.length != 0) {
      try {
        const responseOrder = await handleSaveOrder();
  
        if(responseOrder){
          await handleSaveAttestation(responseOrder);
        }
  
        setIsOpenModal(true);
      } catch (error) {
        console.error("Erro ao finalizar o pedido:", error);
      }
    } else {
      toast.error("Selecione pelo menos uma pizza ou uma bebida para finalizar o pedido.");
    }
  };

  const handlePreviousPage = () => {
    navigate("/pedidos");
  };

  const handleBack = () => {
    setIsOpenModal(false);
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
              <CardTotal drinks={drinks} pizzas={pizzas} setTotalValue={setTotalValue}/>
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

      {isOpenModal && <ModalPagamento totalValue={totalValue} handleBack={handleBack} /> }

      <ToastContainer />
      
    </>
  );
}

export default Order;
