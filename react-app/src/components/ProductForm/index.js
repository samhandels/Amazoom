import React, { useState, useRef, useLocation } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchcreateProduct, editProduct } from '../../store/productsReducer';
import './ProductForm.css';

export const ProductForm = ({ product, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const fileRef = useRef();
//   const location = useLocation();
//   const productFromState = location.state?.product;
//   const formTypeFromState = location.state?.formType;

  const [name, setName] = useState(product?.name ?? '');
  const [price, setPrice] = useState(product?.price ?? .99);
  const [description, setDescription] = useState(product?.description ?? '');
  const [category, setCategory] = useState(product?.category ?? '');
  const [quantity, setQuantity] = useState(product?.quantity ?? 1);
  const [image, setImage] = useState(product?.image ?? null);
  const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     const newValue = type === 'file' ? files[0] : value;

//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: newValue,
//     }));
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation here

    product = {
        ...product,
        name,
        price,
        description,
        category,
        quantity,
        image
    }

    if (formType === "Update") {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('quantity', quantity);
        if (image) formData.append('image', image);

        const updatedProduct = await dispatch(editProduct(product.id, formData))
        history.replace(`/products/${updatedProduct.singleProduct.id}`)
    } else {
        const newProduct = await dispatch(fetchcreateProduct(product));
        history.replace(`/products/${newProduct.product.id}`)
    }

    // if (data && data.errors) {
    //   setErrors(data.errors);
    // } else {
    //   history.push(`/products`);
    //   window.location.reload();
    // }
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  return (
    <div className="product-form-container">
      <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
        <div className="form-line">
          <label>Product Name*</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            required
          />
          {errors.name && <p className="form-errors">{errors.name}</p>}
        </div>

        <div className="form-line">
          <label>Retail Price*</label>
          <div className="product-form__price">
            <span>$</span>
            <input
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

        <div className="form-line">
          <label>Category*</label>
          <select
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
            <option value="Amazon Basics">Amazon Basics</option>
            <option value="Pet Supplies">Pet Supplies</option>
            <option value="Beauty">Beauty</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && <p className="form-errors">{errors.category}</p>}
        </div>

        <div className="form-line">
          <label>Quantity*</label>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
          {errors.quantity && <p className="form-errors">{errors.quantity}</p>}
        </div>

        <div className="form-line">
          <label>Product Description*</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="At least 1-3 sentences"
            required
          />
          {errors.description && (
            <p className="form-errors">{errors.description}</p>
          )}
        </div>

        <div className="form-line">
            <label>Image*</label>
            {!image ? (
                <button className="form__file-upload" onClick={handleImageUpload}>
                <i className="fa-solid fa-plus"></i>
                </button>
            ) : (
                <div className="form__file-pic">
                <img src={URL.createObjectURL(image)} alt="preview" />
                </div>
            )}
            <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                required
            />
            {errors.image && <p className="form-errors">{errors.image}</p>}
        </div>
        <div className="form-submit">
          <button type="submit">List Product</button>
        </div>
      </form>
    </div>
  );
};
