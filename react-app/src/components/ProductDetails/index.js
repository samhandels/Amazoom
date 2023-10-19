import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { fetchSingleProduct, fetchProducts, editProduct, removeProduct, clearSingleProduct } from "../../store/productsReducer";
import { addToCart, getCart } from "../../store/cartReducer";
import './ProductDetails.css';
import prime from './prime-logo.png'

export const ProductDetails = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const products = useSelector((state) => state.products);
    const product = useSelector((state) =>
        state.products ? state.products.singleProduct : null
    );
    const currentUser = useSelector(state => state.session.user);
    const [quantity, setQuantity] = useState(1);

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = futureDate.toLocaleDateString('en-US', options);


    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchSingleProduct(productId));
    }, [dispatch, productId]);

    useEffect(() => {
          dispatch(clearSingleProduct());
    }, [dispatch]);


    const handleUpdateClick = () => {
        history.push({
            pathname: `/products/new`,
            state: { productToUpdate: product }
        });
    }

    const handleDeleteClick = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (confirmed) {
            await dispatch(removeProduct(product.id));
            history.push('/');
        }
    }

    const addToCartHandler = async () => {
        if (!currentUser) {
            history.push('/login');
        } else {
            await dispatch(addToCart(quantity, product.id));
            dispatch(getCart());
            history.push('/cart');
        }
    };


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

                        <span>${product?.price}</span>
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
                            <button className="update-delete-but" onClick={handleUpdateClick}>Update Product</button>
                            <button className="update-delete-but" onClick={handleDeleteClick}>Delete Product</button>
                        </div>
                    )}
                </div>
                <div className="add-to-cart-section">
                <div className="buy-new">
                    <h2>Buy new:</h2>
                    </div>
                    <span className="product-details-price-addtocart">${product?.price}</span>
                    <img src={prime} alt="prime" className="prime-logo" />
                    <div className="product-details-returns-cart">FREE Returns</div>
                    <div className="free-delivery">FREE delivery by <strong>{formattedDate}.</strong></div>
                    <div className="deliver-to">Deliver to {currentUser?.username} - {currentUser?.address}</div>
                    <div className="stock">In Stock</div>
                    <div className="stock-quantity">Only {product?.quantity} left in stock.</div>
                    {currentUser && currentUser.id === product.user_id ? (
                        <div className="cannot-purchase-own-product">You can't purchase your own product</div>
                    ) : (
                        <button className="add-to-cart" onClick={addToCartHandler}>Add to Cart</button>
                    )}
                    <div className="product-samazon-info">
                        <div className="product-addtocart-left">
                            <span>Payment</span>
                            <span>Ships from</span>
                            <span>Sold by</span>
                        </div>
                        <div className="product-addtocart-right">
                            <span className="secure-transaction">Secure transaction</span>
                            <span>Samazon</span>
                            <span>Samazon</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
