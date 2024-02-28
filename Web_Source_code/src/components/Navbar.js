import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleClick = () => {
    if (isMobile) {
      setClick(!click);
      setDropdown(!dropdown); // Toggle dropdown visibility on mobile
    } else {
      setClick(!click);
    }
  };

  const closeMobileMenu = () => {
    setClick(false);
    setDropdown(false); // Hide the dropdown when closing the mobile menu
  };

  const handleDropdownClick = () => {
    if (isMobile) {
      setDropdown(!dropdown); // Toggle dropdown visibility on mobile
    }
  };

  const checkIsMobile = () => {
    if (window.innerWidth <= 960) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const handleHover = () => {
    if (!isMobile) {
      setDropdown(true);
    }
  };

  const handleLeave = () => {
    if (!isMobile) {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          HalaHomes
          <i className='fab fa-firstdraft' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={handleDropdownClick}
          >
            <Link to='#' className='nav-links'>
              Services <i className='fas fa-caret-down' />
            </Link>
            {dropdown && <Dropdown />} {/* Show dropdown on hover or click */}
          </li>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Products
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Contact Us
            </Link>
          </li>
          <li>
            <Link to='/log-in' className='nav-links-mobile' onClick={closeMobileMenu}>
              Log In
            </Link>
          </li>
        </ul>
        <Button />
      </nav>
    </>
  );
}

export default Navbar;
