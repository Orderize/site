import React, { StrictMode } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Login from './pages/login/login'
import Flavor from './pages/options/flavor'
import ModalDrink from './components/modal/drink/drink';
import ModalFlavor from './components/modal/flavor/flavor';
import ModalReview from './components/modal/review/review';
import AddNewFlavor from './components/modal/new_flavor/add_new_flavor'
import SelectPizzaType from './components/modal/select_pizza_type/select_pizza_type'
import Navbar from './components/navbar/navbar'
import Order from './pages/new_order/order'
import './index.css'


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
          path='/sabores'
          element={ <Flavor /> }
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

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
