import React, { useState } from 'react';
import './About.css';
import iconKnifeFork from '../../assets/img/icon_knife_fork.svg';
import imageOnMountain from '../../assets/img/onMountain3.jpg';

export default function About() {

  const [showMore, setShowMore] = useState(false);
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

  return (
    <section className='about' id="about">
      <h1>Discover <br /><span>Our Story</span></h1>
      <div className="row">
        <div className="column-1">
          <img src={iconKnifeFork} alt='icon' />
          <p>
            {showMore ? text : `${text.substring(0, 232)}`}
          </p>
          <button onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show less" : "Show more"}
          </button>
        </div>
        <div className="column-2">
          <picture>
            <img src={imageOnMountain} alt='' />
          </picture>
        </div>
      </div>

    </section>
  )
}
