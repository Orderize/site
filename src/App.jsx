import React, { StrictMode } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Login from './components/Login/Login'
import Navbar from './components/navbar/Navbar'
import Flavor from './pages/Options/Flavor'
import Client from './pages/Client/Client'
import Order from './pages/Order/Order'
import './index.css'
import'./utils/globals.css'

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
          element={ <Client /> }
        ></Route>

        <Route 
          path='/pedidos/novo-pedido'
          element={ <Order />}
        ></Route>
        
        <Route
          path='/sabores'
          element={ <Flavor /> }
        ></Route>

        

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
