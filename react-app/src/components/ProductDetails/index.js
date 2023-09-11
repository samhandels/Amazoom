import React, { useEffect, useState, useLocation } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchSingleProduct, fetchProducts, editProduct, removeProduct } from "../../store/productsReducer";
import './ProductDetails.css';
import prime from './prime-logo.png'

export const ProductDetails = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector((state) => state.products);
    const product = useSelector((state) =>
        state.products ? state.products.singleProduct : null
    );
    const currentUser = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchSingleProduct(productId));
    }, [dispatch, productId]);

    const handleUpdateClick = () => {
        history.push({
            pathname: `/products/update/${product.id}`,
            state: { product: product, formType: "Update" }
        });
    }

    const handleDeleteClick = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (confirmed) {
            await dispatch(removeProduct(product.id));
            history.push('/');
        }
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    const descriptionList = product?.description.split('. ');

    return (
        <div className="product-details-container">
            <div className="product-details-display-container">
                <div className="product-details-display-img">
                    <img src={product?.image} alt="product" />
                </div>
                <div className="product-details-display-info">
                    <span className="product-details-name">{product?.name}</span>
                    <div className="product-details-price">
                        <p>$</p>
                        <span>{product?.price}</span>
                    </div>
                    <img src={prime} alt="prime" className="prime-logo" />
                    <div className="product-details-returns">FREE Returns</div>
                    <div className="product-details-description">
                        <h4>About this item</h4>
                        <ul className="product-details-description-list">
                            {descriptionList.map((sentence, index) => (
                                <li key={index}>{sentence}</li>
                            ))}
                        </ul>
                    </div>
                    {currentUser && currentUser.id === product.user_id && (
                        <div>
                            <button onClick={handleUpdateClick}>Update Product</button>
                            <button onClick={handleDeleteClick}>Delete Product</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
