import React, { useState, useEffect } from 'react';
import './Button.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

export function Button() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
      const connectSidCookie = Cookies.get('user_email');
      console.log(connectSidCookie);
      if (connectSidCookie) {
          setIsLoggedIn(true);
      } else {
          setIsLoggedIn(false);
      }
      console.log(isLoggedIn);
  };
  const handleLogout = () => {
    document.cookie = 'user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsLoggedIn(false);
  };

  useEffect(() => {
    checkLoginStatus(); // Check if user is logged in when component mounts
  }, []);
  return (
    <div>
    {isLoggedIn ?( 

    <Link to='/log-in'>
      <button className='btn' onClick={handleLogout}>Logout</button>
    </Link>
    ) : (
      <Link to='/log-in'>
      <button className='btn'>Login</button>
    </Link>
    )}
    </div>
  );
}
