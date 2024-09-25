import React, { StrictMode } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import Login from './pages/Login/Login';
import Flavor from './pages/Options/Flavor';
import Order from './pages/New_order/Order'
import Home from './pages/Home/Home';

import './index.css'
import Navbar from './components/navbar/Navbar';


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
        

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)