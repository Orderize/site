import React, { StrictMode } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Login from './pages/login/login'
import ModalDrink from './components/modal/drink/drink';
import ModalFlavor from './components/modal/flavor/flavor';
import ModalReview from './components/modal/review/review';
import AddNewFlavor from './components/modal/new_flavor/add_new_flavor'
import SelectPizzaType from './components/modal/select_pizza_type/select_pizza_type'
import AddNewDrink from './components/modal/new_drink/AddNewDrink'
import PromoModal from './components/modal/promo_add/PromoModal'
import Navbar from './components/navbar/navbar'
import SelectPizzaPromo from './components/modal/select_pizza_promo/selectPizzaPromo'
import SelectBeveragePromo from './components/modal/select_beverage_promo/SelectBeveragePromo'
import Order from './pages/new_order/order'

import './index.css'
import Promotion from './pages/options/promotion'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        
        <Route
          path='/'
          element={ <Navbar /> }
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
          path='/promotion'
          element={ <Promotion /> }
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
