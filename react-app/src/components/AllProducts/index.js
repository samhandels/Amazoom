import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import './AllProducts.css'
import { fetchProducts } from "../../store/productsReducer";

export const AllProducts = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user);

    // Access the allProducts from the state
    const allProductsObj = useSelector((state) => (state.products.allProducts ? state.products.allProducts : {}));

    const [filter, setFilter] = useState("");

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    if (!allProductsObj) return null;

    // Convert the allProducts object to an array
    const products = Object.values(allProductsObj);

    if (!products.length) return null;

    return (
        <div>
            <h1>All Products</h1>
            <div className="products-container">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

