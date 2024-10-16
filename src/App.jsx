import React, { StrictMode } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import Home from './pages/Home/Home'
import ModalDrink from './Components/Modal/Drink/Drink';
import ModalFlavor from './Components/Modal/Flavor/Flavor';
import ModalReview from './Components/Modal/Review/Review';
import AddNewFlavor from './Components/Modal/New_flavor/Add_new_flavor'
import SelectPizzaType from './Components/Modal/Select_pizza_type/Select_pizza_type'
import AddNewDrink from './Components/Modal/New_drink/AddNewDrink'
import PromoModal from './Components/Modal/promo_add/PromoModal'
import Navbar from './Components/Navbar/Navbar'
import Report from './pages/Report/Report'
import Login from './pages/Login/Login'
import SelectPizzaPromo from './Components/Modal/select_pizza_promo/selectPizzaPromo'
import SelectBeveragePromo from './Components/Modal/select_beverage_promo/SelectBeveragePromo'
import Order from './pages/New_order/Order'
import Promotion from './pages/Options/Promotion/Promotion'
import Flavor from './pages/Options/Flavor/Flavor'
import './utils/global.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
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
          element={ <Order /> }
        ></Route>

        <Route
          path='/sabores'
          element={ <Flavor /> }
        ></Route>
        
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
    </BrowserRouter>
  </StrictMode>,
)
