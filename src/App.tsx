import React from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import HomePage from './components/Home';
import LoginPage from './components/auth/Login';
import RegisterPage from './components/auth/Register';
import NoMatch from './components/NoMatch';
import DefaultLayout from './components/containers/DefaultLayout';
import MyProfile from './components/MyProfile/MyProfile';
import AutoList from './components/Auto/AutoList';
import AddAuto from './components/Auto/AddAuto';

function App() {
  return (
   <>
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="auto/list" element={<AutoList />} />
        <Route path="auto/create" element={<AddAuto />} />
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
