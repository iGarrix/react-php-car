import React from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import HomePage from './components/Home';
import LoginPage from './components/auth/Login';
import RegisterPage from './components/auth/Register';
import NoMatch from './components/NoMatch';
import DefaultLayout from './components/containers/DefaultLayout';
import MyProfile from './components/MyProfile/MyProfile';
import ProductsListPage from './components/products/List';
import AddProduct from './components/products/AddProduct';
import EditProduct from './components/products/EditProduct';

function App() {
  return (
   <>
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products/list" element={<ProductsListPage />} />
        <Route path="products:id" element={<EditProduct />} />
        <Route path="products/addproducts" element={<AddProduct />} />
        <Route path="auto/find" element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
   </>
  );
}

export default App;
