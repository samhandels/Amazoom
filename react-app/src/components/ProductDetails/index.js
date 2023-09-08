import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct, fetchProducts } from "../../store/productsReducer";
import './ProductDetails.css';
import prime from './prime-logo.png'

export const ProductDetails = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    // const product = products.fetchSingleProduct?.product;
    const product = useSelector((state) =>
        state.products ? state.products.singleProduct : null
    )

    console.log('product products', product, products)
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchSingleProduct(productId));
    }, [dispatch, productId]);

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
                </div>
            </div>
        </div>
    );
};
