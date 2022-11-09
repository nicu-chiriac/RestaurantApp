import React, { useState, useEffect } from 'react';
import products from '../../assets/data/products';
import './Menu.css';
import ReactPaginate from "react-paginate";
import iconSearch from '../../assets/img/icons/icon-search.svg';
import foodsIcon from '../../assets/img/icons/foods.svg';
import beveragesIcon from '../../assets/img/icons/beverages.svg';

export default function Menu() {

  const [searchTerm, setSearchTerm] = useState("");
  // const [pageNumber, setPageNumber] = useState(0);

  const [category, setCategory] = useState("");
  // const [pageCount, setPageCount] = useState();

  const [showText, setShowText] = useState(false);
  const text = "Phone number copied!"

  useEffect(() => {
    setCategory('food');
    // setPageCount(Math.ceil(searchedProduct.length / productPerPage));
  }, []);

  const handleClickFood = (e) => {
    setCategory('food')
  }

  const handleClickBeverage = (e) => {
    setCategory('beverage')
  }

  const searchedProduct = products.filter((product) => {
    if (searchTerm.value === "") {
      return product;
    }
    if (product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return product;
    } else {
      return console.log("not found");
    }
  });

  // const productPerPage = 6;
  // const visitedPage = pageNumber * productPerPage;
  // const displayPage = searchedProduct.slice(
  //   visitedPage,
  //   visitedPage + productPerPage
  // );



  // const changePage = ({ selected }) => {
  //   setPageNumber(selected);
  // };

  return (
    <section className='menu' id="menu">
      <div className="title">
        <h1>Our delicious <span>MENU</span> items!</h1>
      </div>
      <div className='category'>
        <button onClick={handleClickFood}>
          <img src={foodsIcon} alt='food category' />
          <span>Foods</span>
        </button>
        <button onClick={handleClickBeverage}>
          <img src={beveragesIcon} alt='beverage category' />
          <span>Beverages</span>
        </button>
      </div>
      <div className="search-bar">
        <div className="search__widget">
          <input
            type="text"
            placeholder="I'm looking for...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span>
            <img src={iconSearch} alt='search  icon' />
          </span>
        </div>
      </div>
      <div className="products">
        {searchedProduct.filter((item) => item.category === category).map((product) => (
          <div className='product' key={product.id}>
            <div className="image">
              <img src={product.image} alt='Product' />
              <div className="image__overlay">
                <div className="image__title">{product.name}</div>
                <div className="image__description"><b>Ingredients:</b><br />{product.ingredients}</div>
                <div className="allergens">Allergens: {product.allergens}</div>
              </div>
            </div>
            <h2>
              {product.name}
            </h2>
            <h3>
              Price: {product.price} $
            </h3>
            <p>
              {product.desc}
            </p>
          </div>
        ))}
      </div>
      <button className='order-btn' onClick={() => { navigator.clipboard.writeText('+0001 4548 6457'); setShowText(!showText) }}>
        <div></div>
      </button>
      <p>
        {showText ? text : ''}
      </p>
      {/* <div>
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={changePage}
          previousLabel={"Prev"}
          nextLabel={"Next"}
          containerClassName=" paginationBttns "
        />
      </div> */}
    </section>
  )
}
