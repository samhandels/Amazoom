import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import './AllProducts.css'
import { fetchProducts } from "../../store/productsReducer";

export const AllProducts = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user);

    const allProductsObj = useSelector((state) => (state.products.allProducts ? state.products.allProducts : {}));

    const [filter, setFilter] = useState("");

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    if (!allProductsObj) return null;

    const products = Object.values(allProductsObj);

    if (!products.length) return null;

    return (
        <div>
            <h1 className="all-products">All Products</h1>
            <div className="products-container">
                {products.map(product => (
                    <div key={product.id} className="product-card" onClick={() => history.push(`/products/${product.id}`)}>
                        <img src={product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Category: {product.category}</p>
                        <p>Quantity: {product.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
