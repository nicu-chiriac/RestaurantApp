import React, { useState, useEffect, useContext } from 'react'
import breakfastStationName from '../../assets/img/Breakfast_Station.svg';
import './Navbar.css';
import { HashLink as Link } from 'react-router-hash-link';
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import UserContext from '../../Context/UserContext';
import { onLogout } from '../../apis/AuthFinder';

export default function Navbar() {

	const [isMobile, setIsMobile] = useState(false);
	const [user, setUser] = useContext(UserContext);

	console.log('aici este :' + user)

	const logout = async () => {
		try {
			await onLogout()
			setUser({
				isLoggedIn: false,
				role: 'guest'
			});
		} catch (error) {
			console.log(error.response)
		}
	}

	const scrollWithOffset = (el) => {
		const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
		const yOffset = -80;
		window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
	}

	function screenSize() {
		if (window.innerWidth >= 1250) {
			setIsMobile(false)
		}
	}

	window.onresize = screenSize;

	return (
		<nav className='navbar'>
			<div className="brand">
				<img src={breakfastStationName} alt="Breakfast Station #319" />
			</div>
			<ul className={isMobile ? 'links-mobile' : 'links'}
				onClick={() => setIsMobile(false)}
			>
				<li className='underline'>
					<Link smooth to='/#home' className='active' scroll={scrollWithOffset}>
						Home
					</Link>
				</li>
				<li className='underline'>
					<Link smooth to='/#about' scroll={scrollWithOffset}>
						About
					</Link>
				</li>
				<li className='underline'>
					<Link smooth to='/#menu' scroll={scrollWithOffset}>
						Menu
					</Link>
				</li>
				<li className='underline'>
					<Link smooth to='/#location' scroll={scrollWithOffset}>
						Location & Contacts
					</Link>
				</li>
				<li className='underline'>
					<Link smooth to='/#media' scroll={scrollWithOffset}>
						Our Social Media
					</Link>
				</li>
				{user.isLoggedIn ? (
					<li>
						<Link smooth to="/" className="logout__button" onClick={() => logout()}>
							Logout
						</Link>
					</li>
				) : (
					<>
						<li>
							<Link smooth to="/login" className="login__button">
								Login
							</Link>
						</li>
						<li>
							<Link smooth to="/register" className="auth__button">
								Register
							</Link>
						</li>
					</>
				)}
			</ul>
			<button
				className="mobile-menu-icon"
				onClick={() => setIsMobile(!isMobile)}
			>
				{isMobile ? (
					<FaTimes size={20} />
				) : (
					<FaBars size={20} />
				)}
			</button>
		</nav>
	)
}
