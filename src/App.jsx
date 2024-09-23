import React, { StrictMode } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Login from './component/Login/login'
import Navbar from './component/navbar/navbar'
import Flavor from './component/page/options/flavor'
import Order from './component/page/new_order/order'
import Home from './component/page/home/home';
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
          path='/home' 
          element={<Home />} 
        ></Route>
        

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)