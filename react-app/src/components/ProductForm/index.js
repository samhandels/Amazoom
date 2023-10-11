import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchcreateProduct, editProduct } from '../../store/productsReducer';
import './ProductForm.css';
import samazonLogo from './samazonblack.png';


export const ProductForm = ({ product, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const fileRef = useRef();
  const location = useLocation();
  const productToUpdate = location.state?.productToUpdate;

  const [name, setName] = useState(productToUpdate?.name ?? '');
  const [price, setPrice] = useState(productToUpdate?.price ?? .99);
  const [description, setDescription] = useState(productToUpdate?.description ?? '');
  const [category, setCategory] = useState(productToUpdate?.category ?? '');
  const [quantity, setQuantity] = useState(productToUpdate?.quantity ?? 1);
  const [image, setImage] = useState(productToUpdate?.image ?? null);
  const [errors, setErrors] = useState({});

const handleSubmit = async (e) => {
    e.preventDefault();

    if (productToUpdate) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('quantity', quantity);
        if (image) formData.append('image', image);

        const updatedProduct = await dispatch(editProduct(productToUpdate.id, formData));
        history.replace(`/products/${updatedProduct.product.id}`);
    } else {
        const productData = {
            name,
            price,
            description,
            category,
            quantity,
            image
        };

        const newProduct = await dispatch(fetchcreateProduct(productData));
        history.replace(`/products/${newProduct.product.id}`);
    }
};

  const handleImageUpload = (e) => {
    e.preventDefault();
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  return (
    <div className="product-form-header">
      <div className='samazon-img-title'>
			<img className='samazon-logo-form' src={samazonLogo} alt="Samazon Logo" />
      <span className='create-a-product'>Create a Product</span>
    <div className="product-form-container">
      <form className='form-container' onSubmit={handleSubmit} method="POST" encType="multipart/form-data">

      <div className='name-description-inputs'>
        <div className="form-line">
          <div className="input-wrapper">
          <label>Product Name*</label>
          <input className='input-wide'
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            required
          />
          {errors.name && <p className="form-errors">{errors.name}</p>}
          </div>
        </div>

        <div className="form-line">
        <div className="input-wrapper">
          <label>Retail Price*</label>
          <div className="product-form__price">
            <span>$</span>
            <input className='input-thin'
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
              required
            />
            </div>
          {errors.price && <p className="form-errors">{errors.price}</p>}
          </div>
        </div>

        <div className="form-line">
        <div className="input-wrapper">
          <label>Category*</label>
          <select className='input-wide'
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Sports & Outdoors">Sports & Outdoors</option>
            <option value="Home">Home</option>
            <option value="Amazon Basics">Samazon Basics</option>
            <option value="Pet Supplies">Pet Supplies</option>
            <option value="Beauty">Beauty</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && <p className="form-errors">{errors.category}</p>}
          </div>
        </div>

        <div className="form-line">
        <div className="input-wrapper">
          <label>Quantity*</label>
          <input className='input-thin'
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
          {errors.quantity && <p className="form-errors">{errors.quantity}</p>}
          </div>
        </div>

        <div className="form-line">
        <div className="input-wrapper">
          <label>Product Description*</label>
          <textarea className='input-description'
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about your product"
            required
          />
          {errors.description && (
            <p className="form-errors">{errors.description}</p>
          )}
        </div>
        </div>
        </div>

      <div className='image-list-product'>
        <div className="form-line">
            <label>Image*</label>
            {!image ? (
                <button className="form__file-upload" onClick={handleImageUpload}>
                <i className="fa-solid fa-plus"></i>
                </button>
            ) : (
                <div className="form__file-pic">
                    <img src={image instanceof File ? URL.createObjectURL(image) : image} alt="preview" />
                </div>
            )}
            <input
                className='choose-file'
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                required={!productToUpdate}
            />
            {errors.image && <p className="form-errors">{errors.image}</p>}
        </div>
        <div className="form-submit">
            <button className='list-product' type="submit">{productToUpdate ? "Update Product" : "List Product"}</button>
        </div>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};
