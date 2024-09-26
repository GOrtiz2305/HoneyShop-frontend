import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";

import Homepage from '../HomePage'
import ShopPage from '../ShopPage'
import ProductDetailsPage from '../ProductDetailsPage'
import CheckoutPage from '../CheckoutPage'
import OrderRecived from '../OrderRecived'
import CartPage from '../CartPage'
import ErrorPage from '../ErrorPage'
import ContactPage from '../ContactPage'
import LoginPage from '../LoginPage'
import SignUpPage from '../SignUpPage'
import ForgotPassword from '../ForgotPassword'
import InventoryPage from '../InventoryPage'

const AllRoute = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/product-single/:id' element={<ProductDetailsPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/order_received' element={<OrderRecived />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/404' element={<ErrorPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<SignUpPage />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/inventory' element={<InventoryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AllRoute;
