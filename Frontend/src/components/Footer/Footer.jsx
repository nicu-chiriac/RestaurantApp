import React from 'react';
import './Footer.css';
import { MdLocationOn } from 'react-icons/md';
import { IoMdMail } from 'react-icons/io';
import { AiFillSchedule } from 'react-icons/ai';
import { ImPhone } from 'react-icons/im';

export default function Footer() {
  return (
    <section className='footer'>
      <div className="row">
        <div className="column">
          <h2>Location</h2>
          <MdLocationOn size={30} onClick={() => window.open("https://maps.google.com?q=" + 43.263660 + "," + (-70.863800))} style={{ cursor: 'pointer' }} />
          <h3>6th Main Street, Somersworth, NH</h3>
        </div>
        <div className="column">
          <h2>Daily schedule</h2>
          <AiFillSchedule size={30} />
          <h3>Monday - Sunday <br /> 7AM - 3PM  </h3>
        </div>
        <div className="column">
          <h2>Reservations</h2>
          <IoMdMail size={30} />
          <h3>
            bstation319@gmail.com <br /><br />
            <ImPhone size={30} /><br />
            +1 603-841-5567
          </h3>
        </div>
      </div>
      <h3 className='bottom-text'>®Breakfast Station 319. All rights reserved.</h3>
    </section>
  )
}
