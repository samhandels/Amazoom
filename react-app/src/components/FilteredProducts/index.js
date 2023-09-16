import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../store/productsReducer';

export const FilteredProducts = () => {
    const { searchInput } = useParams();
    const dispatch = useDispatch();
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
            {searchProducts.length ? (
                <div id='productCard-holder-FilteredProducts'>
                    {searchProducts.map((product) => (
                        <div key={product.id}>
                            <h3>{product.name}</h3>
                            <img src={product.image} alt={product.name} />
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            <p>Category: {product.category}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No Search Results</div>
            )}
        </div>
    );
};

