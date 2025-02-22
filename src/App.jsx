import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Seção das Paginas
import Client from "@/pages/Client/Client";
import Login from "@/pages/Login/Index";
import History from "@/pages/History/History";
import Home from "@/pages/Home/Index";
import Drink from "@/pages/Options/Drink/Index";
import Flavor from "@/pages/Options/Flavor/Index";
import Promotion from "@/pages/Options/Promotion/Promotion";
import Order from "@/pages/Order/Order";
import Report from "@/pages/Report/Index";

// Seção dos Modais
import ModalDrink from "@/modals/Drink/Drink";
import ModalFlavor from "@/modals/Flavor/Flavor";
import AddNewDrink from "@/modals/New_drink/AddNewDrink"
import AddNewFlavor from "@/modals/New_flavor/Add_new_flavor";
import PromoModal from "@/modals/promo_add/PromoModal";
import ModalReview from "@/modals/Review/Review";
import SelectBeveragePromo from "@/modals/select_beverage_promo/SelectBeveragePromo";
import SelectPizzaPromo from "@/modals/select_pizza_promo/selectPizzaPromo";
import SelectPizzaType from "@/modals/Select_pizza_type/Select_pizza_type";

// Seção dos Componentes
import Navbar from "@/components/Navbar/Index";
import ModalPagamento from "@/components/OrderDetails/ModalPagamento/ModalPagamento";

import "./utils/global.css";

const App = () => {
    return (
        <Router>
            <ToastContainer />
            <Routes>  
                <Route
                    path='/'
                    element={ <Home /> }
                ></Route>

                <Route
                    path='/navbar'
                    element={ <Navbar role={"admin"}/> }
                ></Route>

                <Route
                    path='/login'
                    element={ <Login /> }
                ></Route>

                <Route
                    path='/pedidos'
                    element={ <Client /> }
                ></Route>

                <Route 
                    path='/pedidos/novo-pedido'
                    element={ <Order />}
                ></Route>

                <Route 
                    path='/modal/pagamento' 
                    element={ <ModalPagamento /> }
                ></Route>

                <Route
                    path='/sabores'
                    element={ <Flavor /> }
                ></Route>

                <Route
                    path='/bebidas'
                    element={ <Drink /> }
                ></Route>
                
                <Route
                    path='/historicos'
                    element= { <History />}>
                </Route>

                <Route
                    path='/promotion'
                    element={ <Promotion /> }
                ></Route>

                <Route
                    path='/relatorios'
                    element={ <Report /> }
                ></Route>

                <Route
                    path='/modal/sabores'
                    element={ <ModalFlavor /> }
                ></Route>

                <Route
                    path='/modal/bebidas'
                    element={ <ModalDrink /> }
                ></Route>

                <Route
                    path='/modal/revisoes'
                    element={ <ModalReview /> }
                ></Route>

                <Route 
                    path='/modal/newflavor'
                    element={ <AddNewFlavor /> } 
                ></Route>

                <Route 
                    path='/modal/selectpizzatype'
                    element={ <SelectPizzaType /> } 
                ></Route>

                <Route 
                    path='/modal/addnewdrink'
                    element={ <AddNewDrink /> } 
                ></Route>

                <Route 
                    path='/modal/addpromo'
                    element={ <PromoModal/> } 
                ></Route>

                <Route 
                    path='/modal/selectpizzapromo'
                    element={ <SelectPizzaPromo/> } 
                ></Route>

                <Route 
                    path='/modal/selectbeveragepromo'
                    element={ <SelectBeveragePromo/> } 
                ></Route>
            </Routes>
        </Router>
    );
}

export default App;
