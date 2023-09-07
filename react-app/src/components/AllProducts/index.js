import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import './AllProducts.css'
import { fetchProducts } from "../../store/productsReducer";



export const AllProducts = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user);
    const productsObj = useSelector((state) => (state.products ? state.products : {}))

    const [filter, setFilter] = useState("");


    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])


    if (!productsObj) return null

    const singleProdKey = "singleProduct"
    delete productsObj[singleProdKey]
    const products = Object.values(productsObj)

    if (!products.length) return null

    return(
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
