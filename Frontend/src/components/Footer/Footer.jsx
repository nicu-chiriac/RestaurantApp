import React from 'react';
import './Footer.css';
import { MdLocationOn } from 'react-icons/md';
import { IoMdMail } from 'react-icons/io';
import { AiFillSchedule } from 'react-icons/ai';
import { ImPhone } from 'react-icons/im';

export default function Footer() {
  return (
    <section className='footer'>
      {/* <picture>
        <img className='brick-border' src={brickBorder} alt="Brick border" />
      </picture> */}
      {/* <picture>
        <img className='restaurant-logo' src={restaurantLogo} alt="Restaurant logo" />
      </picture> */}
      <div className="row">
        <div className="column">
          <h2>Location</h2>
          <MdLocationOn size={30} onClick={() => window.open("https://maps.google.com?q=" + 43.263660 + "," + (-70.863800))} />
          <h3>6th Main Street, Somersworth, NH</h3>
        </div>
        <div className="column">
          <h2>Daily schedule</h2>
          <AiFillSchedule size={30} />
          <h3>Monday - Saturday <br /> 7AM - 2PM  </h3>
        </div>
        <div className="column">
          <h2>Reservations</h2>
          <IoMdMail size={30} />
          <h3>
            example@gmail.com <br /><br />
            <ImPhone size={30} /><br />
            (1): +0001 4548 6457 <br />
            (2): +0001 8974 6584
          </h3>
        </div>
      </div>
      <h3 className='bottom-text'>®Breakfast Station 319. All rights reserved.</h3>
      {/* <picture>
        <img className='brick-border' src={brickBorder} alt="Brick border" />
      </picture> */}
    </section>
  )
}
