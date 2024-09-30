import React, { StrictMode } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'


import Home from './pages/Home/Home'
import ModalDrink from './components/Modal/Drink/Drink';
import ModalFlavor from './components/Modal/Flavor/Flavor';
import ModalReview from './components/Modal/Review/Review';
import AddNewFlavor from './components/Modal/New_flavor/Add_new_flavor'
import SelectPizzaType from './components/Modal/Select_pizza_type/Select_pizza_type'
import AddNewDrink from './components/Modal/New_drink/AddNewDrink'
import Navbar from './components/Navbar/Navbar'
import Login from './pages/Login/Login'
import Order from './pages/New_order/Order'
import Flavor from './pages/Options/Flavor'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        
        <Route
          path='/home'
          element={ <Home /> }
        ></Route>
        
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

        <Route 
          path='/modal/addnewdrink'
          element={ <AddNewDrink /> } 
        ></Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
