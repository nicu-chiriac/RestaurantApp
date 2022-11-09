import React from 'react'
import Navbar from './components/Navbar/Navbar';
import TextSlider from './components/TextSlider/TextSlider';
import About from './components/About/About';
import Menu from './components/Menu/Menu';
import Location from './components/Location/Location';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import './App.css';
import "swiper/css/bundle";
import SocialMedia from './components/SocialMedia/SocialMedia';
import { BrowserRouter } from 'react-router-dom';


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Hero />
      <TextSlider />
      <About />
      <Menu />
      <Location />
      <SocialMedia />
      <Footer />
    </BrowserRouter>
  );  
}

