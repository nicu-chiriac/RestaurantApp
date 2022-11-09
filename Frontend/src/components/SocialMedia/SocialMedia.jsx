import './SocialMedia.css';
import CoffeAnimation from '../CoffeAnimation/CoffeAnimation';
import Slider from '../Slider/Slider';
import { FaInstagramSquare } from 'react-icons/fa';
import { AiFillFacebook } from 'react-icons/ai';
import { SiTiktok } from 'react-icons/si';

export default function SocialMedia() {
  return (
    <section className="social-media" id='media'>
      <h1>Join us on our social media channels !</h1>
      <div className="row">
        <div className="column-1">
          <h2><span>See</span> our <span>news</span> and <span>exclusive offers</span>!</h2>
          <CoffeAnimation />
          <h2>Click on these links to follow !</h2>
          <div className="links">
            <FaInstagramSquare size={30} onClick={() => window.open('https://www.google.com', '_blank')} />
            <AiFillFacebook size={30} onClick={() => window.open('https://www.facebook.com/profile.php?id=100084926203677', '_blank')} />
            <SiTiktok size={30} onClick={() => window.open('https://www.google.com', '_blank')} />
          </div>
        </div>
        <div className="column-2">
          <Slider />
        </div>
      </div>
    </section>
  );
}