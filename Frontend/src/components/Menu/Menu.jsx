import { useState } from 'react';
import { ProductsContextProvider } from '../../Context/ProductsContext';
import MenuItems from './MenuComponents/MenuItems';
import './Menu.css';

function Menu() {

  const [showText, setShowText] = useState(false);
  const text = "Phone number copied!"
  return (
    <ProductsContextProvider>
      <section className='menu' id="menu">
        <div className="title">
          <h1>Our delicious <span>MENU</span> items!</h1>
        </div>
        <MenuItems />
        <button className='order-btn' onClick={() => { navigator.clipboard.writeText('+0001 4548 6457'); setShowText(!showText) }}>
          <div></div>
        </button>
        <p>
          {showText ? text : ''}
        </p>
      </section>
    </ProductsContextProvider>
  )
}

export default Menu
