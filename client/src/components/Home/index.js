import React from 'react';
import Navbar from '../Navbar/HomeNavbar';
import Hero from './Hero';
import Discover from './Discover';
import About from './About';

const Home = () => {
  return (
    <>
        <Navbar />
        <Hero />
        <Discover />
        <About />
    </>
  );
};

export default Home;