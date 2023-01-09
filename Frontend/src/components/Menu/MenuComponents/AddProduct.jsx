import React, { useContext, useState } from 'react';
import ProductsFinder from '../../../apis/Api';
import { ProductsContext } from '../../../Context/ProductsContext';
import Swal from 'sweetalert2';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import './modal.css';

function AddProduct() {

  const { addProduct } = useContext(ProductsContext)
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await ProductsFinder.post("", {
        product_name: name,
        price,
        main_category: mainCategory,
        ingredients,
        category,

      });
      addProduct(response.data);
      console.log(response.data.product_name);
      onCloseModal();
      Swal.fire({
        position: 'bottom-start',
        confirmButtonColor: '#CF7878',
        title: "Succes!",
        text: `The product : ${response.data.product_name} was successfully added!`,
        button: "OK!",
        timer: 2500,
        timerProgressBar: true,
        allowOutsideClick: true
      });

    } catch (error) {
      Swal.fire({
        position: 'center',
        title: "Failed!",
        confirmButtonColor: '#CF7878',
        text: "You are not authorized!",
        button: "Close",
        allowOutsideClick: true
      })
    }
  }

  return (
    <div>
      <div className='admin_panel'>
        <h2>Admin panel</h2>
        <button className='admin__buttons' onClick={onOpenModal}>Add products on the menu</button>
      </div>
      <Modal open={open} onClose={onCloseModal} center classNames={{ modal: 'customModal' }}>
        <h3>Add product</h3>
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
          <button className='admin__buttons' onClick={handleSubmit}> Salveaza </button>
        </div>
      </Modal>
    </div>
  );
}

export default AddProduct;