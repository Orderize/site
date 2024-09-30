import React, { StrictMode } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Login from './pages/login/login'
import Flavor from './pages/options/flavor'
import Navbar from './components/navbar/navbar'
import Report from './pages/report/report'
import Order from './pages/new_order/order'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        
        <Route
          path='/'
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
          path='/relatorios'
          element={ <Report /> }
        ></Route>
        

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
