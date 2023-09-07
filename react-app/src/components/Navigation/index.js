import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import samazonLogo from './samazonwhite.png';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

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
        <button className="hide-that-button"><i className="fa-solid fa-magnifying-glass"></i></button>
      </div>
      <ul>
        <li>
          Language: EN
        </li>
        {isLoaded && (
          <li>
            <ProfileButton className="nav-link profile-button" user={sessionUser} />
          </li>
        )}
        <li>
          <div className="returns-orders">
            <div className="returns">Returns</div>
            <div>& Orders</div>
          </div>
        </li>
        <li>
          <NavLink exact to="/shopping_cart/current">
            <div className="cart">
              <i className="nav-link fa-solid fa-cart-shopping"></i>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
