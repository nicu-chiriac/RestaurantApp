import React, { useContext, useState, useEffect } from 'react';
import './MenuItems.css';
import beveragesIcon from '../../../assets/img/icons/beverages.svg';
import breakfastIcon from '../../../assets/img/icons/breakfast.svg';
import lunchIcon from '../../../assets/img/icons/lunch.svg';
import { ProductsContext } from '../../../Context/ProductsContext';
import ProductsFinder from '../../../apis/Api';
import Swal from 'sweetalert2';
import UserContext from '../../../Context/UserContext';
import { FiEdit3 } from 'react-icons/fi';
import { TiDeleteOutline } from 'react-icons/ti';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import './modal.css';

export default function MenuItems() {

  const { products, setProducts } = useContext(ProductsContext);
  const [user, setUser] = useContext(UserContext);
  const [mainCategory, setMainCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState("");
  const [productId, setProductId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductsFinder.get();
        setProducts(response.data);
      } catch (error) { }
    };

    fetchData();

  }, []);

  const updateData = async () => {
    try {
      const response = await ProductsFinder.get();
      setProducts(response.data);
    } catch (error) { }
  };

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

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Once the item is deleted, it can't be retrieved again!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#CF7878',
      cancelButtonColor: '#4D2222',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          ProductsFinder.delete(`/${id}/`);
          if (user.role === "admin@yahoo.com") {
            setProducts(products.filter(product => {
              return product.id !== id
            }))
            Swal.fire({
              position: 'center',
              title: "Deleted!",
              text: "The product was successfully deleted!",
              button: "Ok",
              allowOutsideClick: true,
              confirmButtonColor: '#CF7878',
            })
          } else {
            Swal.fire({
              position: 'center',
              title: "Failed!",
              text: "You are not authorized!",
              button: "Close",
              allowOutsideClick: true
            })
          }
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  const onCloseModal = () => setOpen(false);

  function onOpenModal() {
    setOpen(true);
  }

  const handleUpdate = async () => {
    try {
      const response = await ProductsFinder.put(`/${productId}/`, {
        product_name: name,
        price,
        main_category: mainCategory,
        ingredients,
        category,
      });
      updateData();
      console.log(response);
      Swal.fire({
        position: 'bottom-start',
        confirmButtonColor: '#CF7878',
        title: "Succes!",
        text: `The product was successfully updated!`,
        button: "OK!",
        timer: 2500,
        timerProgressBar: true,
        allowOutsideClick: true
      });
    } catch (error) {
      Swal.fire({
        position: 'center',
        title: "Failed!",
        text: "You are not authorized!",
        button: "Close",
        allowOutsideClick: true
      })
    }
  }

  return (
    <div className='products__container'>
      <Modal open={open} onClose={onCloseModal} center classNames={{ modal: 'customModal' }}>
        <h3>Update product</h3>
        <div className="form_container">
          <form>
            <div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className='form-control'
                placeholder='Product name'
              />
            </div>
            <div>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                step="0.01"
                className='form-control'
                placeholder='Price'
              />
            </div>
            <div>
              <input
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                type="text"
                className='form-control'
                placeholder='Ingredient list'
              />
            </div>
            <div>
              <select
                value={mainCategory}
                onChange={(e) => setMainCategory(e.target.value)}
              >
                <option value="" hidden>Main category</option>
                <option value='breakfast'>Breakfast</option>
                <option value='lunch'>Lunch</option>
                <option value='drinks'>Drinks</option>
              </select>
            </div>
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" hidden>Category</option>
                <option value='eggs'>eggs</option>
                <option value='bon voyage omelettes'>bon voyage omelettes</option>
                <option value='benedicts'>benedicts</option>
                <option value='319 specialties'>319 specialties</option>
                <option value='the sweets'>the sweets</option>
                <option value='add ons'>add ons</option>
                <option value='soups and salads'>soups and salads</option>
                <option value='burgers'>burgers</option>
                <option value='kids'>kids</option>
                <option value='sides'>sides</option>
                <option value='handhelds'>handhelds</option>
                <option value='soft drinks'>soft drinks</option>
                <option value='fun drinks'>fun drinks</option>
              </select>
            </div>
          </form>
          <button className='admin__buttons' onClick={() => { handleUpdate(productId); setOpen(false) }}> Salveaza </button>
        </div>
      </Modal>
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
                  {user.role === 'admin@yahoo.com' || user.role === "super@yahoo.com" ? (
                    <div className='buttons__container'>
                      <button className='admin__buttons' onClick={() => { onOpenModal(); setProductId(product.id) }}><FiEdit3 size="1.5em" /></button>
                      <button className='admin__buttons' onClick={() => handleDelete(product.id)}><TiDeleteOutline size="1.5em" /></button>
                    </div>
                  ) : (
                    <>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))
        }
      </div>
    </div>
  )
}
