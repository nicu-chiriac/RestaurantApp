import React from 'react';
import './TextSlider.css';
import foodIcon1 from '../../assets/img/food-icon1.svg'
import foodIcon2 from '../../assets/img/food-icon2.svg'
import foodIcon3 from '../../assets/img/food-icon3.svg'

export default function TextSlider() {
  return (
    <section className="scrolling-text-wrapper">
      <div className="scrolling-text">
        <div>
          <img src={foodIcon1} alt='food icon' width={80} height={80}></img>
          <span>Amazing pancakes</span>
        </div>
        <div>
          <img src={foodIcon2} alt='food icon' width={80} height={80}></img>
          <span>Delicious food</span>
        </div>
        <div>
          <img src={foodIcon3} alt='food icon' width={80} height={80}></img>
          <span>True coffe</span>
        </div>

      </div>
    </section>
  )
}
