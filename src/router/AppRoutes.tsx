import React from 'react';
import Home from '../components/home/Home';
import { Route, Routes } from 'react-router-dom';
import AccountDetails from '../components/account-details/AccountDetails';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Loan from '../components/loans/loan';
import CreditCardDetails from '../components/credit-cards/CreditCardDetails';
import Profile from '../components/profile/Profile';



export const AppRoutes: React.FC<unknown> = () => (
  
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/details" element={
      <ProSidebarProvider>
        <AccountDetails />
      </ProSidebarProvider>
    } />
    <Route path="/loan" element={<Loan/>} />
    <Route path="/credit-card-details" element={
      <ProSidebarProvider>
        <CreditCardDetails />
      </ProSidebarProvider>
    } />
    <Route path="/profile" element={<Profile/>} />
  </Routes>
);
