import React, { useContext, useEffect, useState } from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Context, server } from './main';

const App = () => {
  const { user, setUser, setIsAuthenticated } = useContext(Context);
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
