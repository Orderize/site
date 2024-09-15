import React, { StrictMode } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Navbar from './component/navbar/navbar'
import Order from './component/page/new_order/order'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        
        <Route
          path='/pizzas'
          element={ <Order /> }
        ></Route>
        
        <Route
          path='/'
          element={ <Navbar /> }
        ></Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
