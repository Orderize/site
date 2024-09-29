import React, { StrictMode } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'


import './index.css'
import AddNewDrink from './components/modal/new_drink/AddNewDrink'
import AddNewFlavor from './components/modal/new_flavor/add_new_flavor'
import ModalDrink from './components/modal/drink/drink';
import ModalFlavor from './components/modal/flavor/flavor';
import ModalReview from './components/modal/review/review';
import Navbar from './components/navbar/Navbar';
import SelectPizzaType from './components/modal/select_pizza_type/select_pizza_type'
import Flavor from './pages/Options/Flavor';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Order from './pages/New_order/Order'



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
          path='/home' 
          element={<Home />} 
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

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)