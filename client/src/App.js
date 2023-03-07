import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Auth from './utils/auth';

// components
import Footer from './components/Footer';

// pages
import Blog from './pages/Blog';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SinglePost from './pages/SinglePost';
import Signup from './pages/Signup';

const baseUrl = 'http://localhost:4000';

const authAxios = axios.create({
  baseURL: baseUrl,
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const loggedIn = Auth.loggedIn();

function App() {
  return (
    <Router>
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={loggedIn ? <Navigate to="/" /> : <Signup />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
