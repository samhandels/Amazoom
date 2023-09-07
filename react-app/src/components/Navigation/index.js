import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import samazon_logo from './samazonwhite.png';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
	<div className='main-nav-bar'>
		<div>
			<NavLink className="samazon-logo" exact to="/">
				<img className='samazon-logo-img' src={samazon_logo}></img>
			</NavLink>
		</div>
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton className="nav-link profile-button" user={sessionUser} />
				</li>
			)}
		</ul>
	</div>
	);
}

export default Navigation;
