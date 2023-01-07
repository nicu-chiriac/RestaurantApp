import React, { useContext, useState, useEffect } from 'react';
import './MenuItems.css';
import beveragesIcon from '../../../assets/img/icons/beverages.svg';
import breakfastIcon from '../../../assets/img/icons/breakfast.svg';
import lunchIcon from '../../../assets/img/icons/lunch.svg';
import { ProductsContext } from '../../../Context/ProductsContext';
import ProductsFinder from '../../../apis/ProductsFinder';

export default function MenuItems() {

  const { products, setProducts } = useContext(ProductsContext);
  const [mainCategory, setMainCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductsFinder.get();
        setProducts(response.data);
      } catch (error) { }
    };

    fetchData();

  }, []);

  useEffect(() => {
    setMainCategory('breakfast');
  }, []);

  const handleClickBreakfast = (e) => {
    setMainCategory('breakfast')
  }

  const handleClickLunch = (e) => {
    setMainCategory('lunch')
  }

  const handleClickDrinks = (e) => {
    setMainCategory('drinks')
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const categories = new Map();
  products
    .filter(product => product.main_category === mainCategory)
    .forEach(product => {
      if (!categories.has(product.category)) {
        categories.set(product.category, []);
      }
      categories.get(product.category).push(product);
    });

  return (
    <div className='products__container'>
      <div className='category'>
        <button onClick={handleClickBreakfast}>
          <img src={breakfastIcon} alt='food category' />
          <span>
            Breakfast Menu <br />
            7 AM - 11 AM
          </span>
        </button>
        <button onClick={handleClickLunch}>
          <img src={lunchIcon} alt='food category' />
          <span>
            Lunch Menu <br />
            11 AM - 3 PM
          </span>
        </button>
        <button onClick={handleClickDrinks}>
          <img src={beveragesIcon} alt='beverage category' />
          <span>Drinks Menu</span>
        </button>
      </div>
      <div className='item__list'>
        {
          Array.from(categories).map(([category, categoryProducts]) => (
            <div className='item__column' key={category}>
              <h1>{capitalizeFirstLetter(category)}</h1>
              {categoryProducts.map(product => (
                <div key={product.id}>
                  <div className="item__row">
                    <h2>{product.product_name}</h2>
                    <h3>{product.price}$</h3>
                  </div>
                  <p>{product.ingredients}</p>
                </div>
              ))}
            </div>
          ))
        }
      </div>
    </div>
  )
}
