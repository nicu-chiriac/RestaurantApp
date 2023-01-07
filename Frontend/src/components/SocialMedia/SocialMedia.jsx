import './SocialMedia.css';
import CoffeAnimation from '../CoffeAnimation/CoffeAnimation';
import Slider from '../Slider/Slider';
import { FaInstagramSquare } from 'react-icons/fa';
import { AiFillFacebook } from 'react-icons/ai';
import { AiFillGoogleSquare } from 'react-icons/ai';

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
            <FaInstagramSquare size={30} onClick={() => window.open('https://www.instagram.com/breakfaststation319/', '_blank')} />
            <AiFillFacebook size={30} onClick={() => window.open('https://www.facebook.com/profile.php?id=100084926203677', '_blank')} />
            <AiFillGoogleSquare size={30} onClick={() => window.open('https://www.google.com/search?q=breakfast+station+319+somersworth&client=firefox-b-d&sxsrf=ALiCzsYKXjtA01F_-EQ_0n0lSNta9eGKRA%3A1670506567846&ei=R-iRY-H-Mufl7_UPstm6iAE&ved=0ahUKEwihvsj0ker7AhXn8rsIHbKsDhEQ4dUDCA4&uact=5&oq=breakfast+station+319+somersworth&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIGCCMQJxATMggIABCABBDLATIICAAQgAQQywE6CwgAEIAEELADEMsBOggIIRDDBBCgAUoECEEYAEoECEYYAFDmBVjcCmD3DmgAcAB4AIABwAKIAbEGkgEHMS4yLjEuMZgBAKABAcgBAcABAQ&sclient=gws-wiz-serp', '_blank')} />
          </div>
        </div>
        <div className="column-2">
          <Slider />
        </div>
      </div>
    </section>
  );
}