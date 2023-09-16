import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'; // Import useHistory
import { fetchProducts } from '../../store/productsReducer';
import './FilteredProducts.css';

export const FilteredProducts = () => {
    const { searchInput } = useParams();
    const dispatch = useDispatch();
    const history = useHistory(); // Initialize the useHistory hook
    const allProducts = useSelector(state => state.products.allProducts);
    const prodArray = allProducts ? Object.values(allProducts) : [];
    let searchProducts = [];

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (searchInput) {
        searchProducts = prodArray.filter((product) => {
            const description = product.description || "";
            const name = product.name || "";
            const category = product.category || "";

            return description.toLowerCase().includes(searchInput.toLowerCase()) ||
                   name.toLowerCase().includes(searchInput.toLowerCase()) ||
                   category.toLowerCase().includes(searchInput.toLowerCase());
        });
    }

    return (
        <div>
            <h1 className="all-products">Search Results</h1>
            <div className="products-container">
                {searchProducts.length ? (
                    searchProducts.map((product) => (
                        <div key={product.id} className="product-card" onClick={() => history.push(`/products/${product.id}`)}>
                            <h2>{product.name}</h2>
                            <img src={product.image} alt={product.name} />
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            <p>Category: {product.category}</p>
                        </div>
                    ))
                ) : (
                    <div>No Search Results</div>
                )}
            </div>
        </div>
    );
};
