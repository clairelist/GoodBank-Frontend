import React from 'react';
import Home from '../components/home/Home';
import { Route, Routes } from 'react-router-dom';
import AccountDetails from '../components/account-details/AccountDetails';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import Loan from '../components/loans/loan';

export const AppRoutes: React.FC<unknown> = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/details" element={<AccountDetails />} />
    <Route path="/loan" element={<Loan/>} />
  </Routes>
);
