import { useState, useContext } from 'react';
import { ProductsContextProvider } from '../../Context/ProductsContext';
import MenuItems from './MenuComponents/MenuItems';
import './Menu.css';
import AddProduct from './MenuComponents/AddProduct';
import UserContext from '../../Context/UserContext';

function Menu() {

  const [user, setUser] = useContext(UserContext);
  const [showText, setShowText] = useState(false);
  const text = "Phone number copied!"

  return (
    <ProductsContextProvider>
      <section className='menu' id="menu">
        {user.role === "admin@yahoo.com" ? (
          <AddProduct />
        ) : (
          <div className="title">
            <h1>Our delicious <span>MENU</span> items!</h1>
          </div>
        )}
        <MenuItems />
        <button className='order-btn' onClick={() => { navigator.clipboard.writeText('+0001 4548 6457'); setShowText(!showText) }}>
          <div></div>
        </button>
        <p className='text__message'>
          {showText ? text : ''}
        </p>
      </section>
    </ProductsContextProvider>
  )
}

export default Menu
