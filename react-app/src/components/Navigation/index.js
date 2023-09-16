import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import samazonLogo from './samazonwhite.png';
import shoppingcart from './shopping-cart-white.png';
import USAFlag from './USA-Flag.png';
import { getCart } from '../../store/cartReducer';
import { useDispatch, useSelector } from 'react-redux';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const cartItems = cart ? Object.values(cart) : [];
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);


  useEffect(() => {
    if (sessionUser) {
        dispatch(getCart());
    }
}, [dispatch, sessionUser]);


  return (
    <div className='main-nav-bar'>
      <div>
        <NavLink className="samazon-logo" exact to="/">
          <img className='samazon-logo-img' src={samazonLogo} alt="Samazon Logo" />
        </NavLink>
        <span className="deliver-address">Deliver to {sessionUser ? <>{sessionUser.username} <br /> {sessionUser.address}</> : 'Guest'}</span>
      </div>
      <div className="search-bar">
        <input
          className="search-bar-input"
          type="text"
          placeholder="Search for anything"
        />
        <i className="fa-solid fa-magnifying-glass" style={{color: "#343433",}} onClick={null}></i>
      </div>
      <ul className='nav-ul'>
        <li className='language'>
          <img className='USA-Flag' src={USAFlag} />
          EN
        </li>
        {isLoaded && (
          <li className='nav-li'>
            <ProfileButton className="nav-link profile-button" user={sessionUser} />
          </li>
        )}
        <li className='nav-li'>
          <div className="returns-orders">
            <div className="returns" onClick={() => alert("Feature coming soon")}>Returns <br/> & Orders</div>

          </div>
        </li>
        <li className='nav-li'>
          <NavLink exact to="/cart">
            <div className="cart">
              <div className='cart-items-num'>{totalItems}</div>
              <img className='shoppingcart' src={shoppingcart}></img>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
