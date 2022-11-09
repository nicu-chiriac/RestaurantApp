import React from 'react';
import './Hero.css';
import foodBackgroundImage from '../../assets/img/food-bg-hero.jpg';
import '../CoffeAnimation/CoffeAnimation.css';
import restaurantLogo from '../../assets/img/logo.svg';
import { HashLink as Link } from 'react-router-hash-link';

export default function Hero() {

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  }

  return (
    <section className='home' id="home">
      <div className="background">
        <picture>
          <img className='food-bg-hero' src={foodBackgroundImage} alt="Food background" />
        </picture>
      </div>
      <div className='central-container'>
        <picture>
          <img className='restaurant-logo' src={restaurantLogo} alt="Restaurant logo" />
        </picture>
        <div className='hero-text'>
          <h2>Let's enhance that morning, shall we?</h2>
          <h1>Get the best meals<br />for your <span>breakfast</span> & <span>lunch</span>!</h1>
          <button>
            <Link smooth to='#menu' scroll={scrollWithOffset}>
              <div>
              </div>
            </Link>
          </button>
        </div>
      </div>
    </section>
  )
}
