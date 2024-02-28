import React, { useState, useEffect } from "react";
import { Button } from "./Button.js";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "./Navbar.css";
import api from "../Api.js";
import logo from "../images/c7bfba41e5c04691b076b125231388d4__2_-removebg-preview.png";
import Dropdown from "./Dropdown.js";
import img from "../images/user_0_img.jpg";
import $ from "jquery";
function Navbar() {
  const [click, setClick] = useState(false);
  const [fullname, setfullname] = useState("");
  const [category, setCategory] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [FindProfessionals, setFindProfessionals] = useState(false);
  const [Profile, setProfile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHomeOwner, setHomeOwner] = useState(false);
  const [isBuilder, setBuilder] = useState(false);
  const [isSupplier, setSupplier] = useState(false);
  const [isDesiginer, setDesigner] = useState(false);
  const [user, setUser] = useState([]);
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
      $("header").addClass("top-fixed");
    } else {
      $("header").removeClass("top-fixed");
    }
  });

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
      setDropdown(!dropdown);
    } // Toggle dropdown visibility on mobile
  };
  const handleFindProffesionals = () => {
    setFindProfessionals(!FindProfessionals);
    // Toggle dropdown visibility on mobile
  };
  const handleProfile = () => {
    setProfile(!Profile);
    // Toggle dropdown visibility on mobile
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
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
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

  useEffect(() => {
    fetchUser();
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    document.cookie =
      "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "Full Name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "Category=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
  };

  const fetchUser = async () => {
    try {
      const userIdCookie = Cookies.get("user_id");
      const uid = decodeURIComponent(userIdCookie);
      const userDisplay = await api.get(`/UserProfile/Profile/${uid}`);
      setUser(userDisplay.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkLoginStatus = () => {
    try {
      const full_name_d = Cookies.get("Full Name");
      renderDropdownLinks();
      const category_d = Cookies.get("Category");
      if (full_name_d && category_d) {
        // const full_name = decodeURIComponent(full_name_d);
        const category_cookie = decodeURIComponent(category_d);
        setfullname(user.full_name);
        setIsLoggedIn(true);
        setCategory(category_cookie);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error fetching details", error);
      setIsLoggedIn(false);
      setfullname(""); // Reset the fullname state in case of an error
      setCategory(""); // Reset the fullname state in case of an error
    }
  };

  const renderDropdownLinks = () => {
    if (isLoggedIn) {
      console.log(category);
      if (category === "Home Owner") {
        return setHomeOwner(true);
        // <div className='absolute mt-4 divide-y-2 translate-y-32 w-48 shadow-lg shadow-gray-500 bg-white flex flex-col z-10 '>
        //      <Link onClick={handleProfile} to='/UserProfile/profile' className='text-black hover:bg-[#994b00] transition-all hover:text-gray-600 py-2'>
        //       Profile
        //      </Link>
        //      <Link onClick={handleProfile} to='/UserProfile/posts' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
        //       Posts
        //      </Link>
        //      <Link onClick={handleProfile} to='/UserProfile/messages' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
        //       Messages
        //      </Link>
        //      <Link onClick={handleProfile} to='/UserProfile/wishlist' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
        //       Wishlist
        //      </Link>
        //      <Link onClick={handleProfile} to='/log-in' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
        //       Sign Out
        //      </Link>
        //   </div>
      } else if (category === "Builder") {
        return setBuilder(true);
        // <div className='absolute mt-4 divide-y-2 translate-y-32 w-48 shadow-lg shadow-gray-500 bg-white flex flex-col z-10 '>
        //      <Link onClick={handleProfile} to='/BuilderProfile/profile' className='text-black hover:bg-[#994b00] transition-all hover:text-gray-600 py-2'>
        //       Profile
        //      </Link>
        //      <Link onClick={handleProfile} to='/BuilderProfile/posts' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
        //       Posts
        //      </Link>
        //      <Link onClick={handleProfile} to='/BuilderProfile/messages' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
        //       Messages
        //      </Link>
        //      <Link onClick={handleProfile} to='/BuilderProfile/wishlist' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
        //       Wishlist
        //      </Link>
        //      <Link onClick={handleProfile} to='/log-in' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
        //       Sign Out
        //      </Link>
        //   </div>
      } else if (category === "Supplier") {
        return setSupplier(true);
        // <div className='absolute mt-4 divide-y-2 translate-y-32 w-48 shadow-lg shadow-gray-500 bg-white flex flex-col z-10 '>
        //      <Link onClick={handleProfile} to='/SupplierProfile/profile' className='text-black hover:bg-[#994b00] transition-all hover:text-gray-600 py-2'>
        //       Profile
        //      </Link>
        //      <Link onClick={handleProfile} to='/SupplierProfile/posts' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
        //       Posts
        //      </Link>
        //      <Link onClick={handleProfile} to='/SupplierProfile/messages' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
        //       Messages
        //      </Link>
        //      <Link onClick={handleProfile} to='/SupplierProfile/wishlist' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
        //       Wishlist
        //      </Link>
        //      <Link onClick={handleProfile} to='/log-in' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
        //       Sign Out
        //      </Link>
        //   </div>
      } else if (category === "Designer") {
        setDesigner(true);
        // return (
        //   <div className='absolute mt-4 divide-y-2 translate-y-32 w-48 shadow-lg shadow-gray-500 bg-white flex flex-col z-10 '>
        //        <Link onClick={handleProfile} to='/DesignerProfile/profile' className='text-black hover:bg-[#994b00] transition-all hover:text-gray-600 py-2'>
        //         Profile
        //        </Link>
        //        <Link onClick={handleProfile} to='/DesignerProfile/posts' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
        //         Posts
        //        </Link>
        //        <Link onClick={handleProfile} to='/DesignerProfile/messages' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
        //         Messages
        //        </Link>
        //        <Link onClick={handleProfile} to='/DesignerProfile/wishlist' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
        //         Wishlist
        //        </Link>
        //        <Link onClick={handleProfile} to='/log-in' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
        //         Sign Out
        //        </Link>
        //     </div>
        // );
      }
    }
    // Default return if no category matches (or user not logged in)
    return null;
  };
  //   setIsLoggedIn(false);
  // };

  useEffect(() => {
    checkLoginStatus(); // Check if user is logged in when component mounts
  }, []);

  return (
    <>
      <header className="inner_menu">
        <nav>
          <div class="max-w-screen-xl  flex flex-wrap  items-center justify-between mx-auto p-2">
            <a class="flex items-center space-x-3 rtl:space-x-reverse">
              <Link to="/">
                <img src={logo} class="w-32 scale-150" alt="HalaHomes Logo" />
              </Link>
            </a>
            <div className="hidden md:flex space-x-16">
              <Link to="/" className="text-black">
                Home
              </Link>
              <Link to="/about-us" className="text-black">
                About Us
              </Link>
              <Link to="/contact-us" className="text-black">
                Contact Us
              </Link>
            </div>
            <div class="flex md:order-2">
              {/* <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" class="md:hidden text-gray-600 hover:bg-gray-100  focus:outline-none focus:ring-4 focus:ring-gray-200  rounded-lg text-sm p-2.5 me-1">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span class="sr-only">Search</span>
          </button>
          <div class="relative hidden text-gray-600 md:block">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-5 h-5 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span class="sr-only">Search icon</span>
            </div>
            <input type="text" id="search-navbar" className="pl-10 mt-8 md:mt-0 w-full md:w-72 md:justify-end transition-all  text-gray-600 py-2 px-3 rounded-md bg-white outline outline-2 focus:outline outline-gray-100 focus:outline-gray-200" placeholder="Search Home"></input>
          </div> */}

              {isLoggedIn ? (
                <>
                  <button
                    onClick={handleProfile}
                    className="hidden px-16 md:inline-flex items-center space-x-4 text-white"
                  >
                    <img
                      src={`../uploads/${user.profile_pic}`}
                      className="h-10 w-10 border object-cover rounded-full"
                    ></img>
                    <p>{user.full_name}</p>
                    <svg
                      className={`w-3 h-3 rotate-${
                        Profile ? "0" : "180"
                      } shrink-0`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                    {Profile && category === "Home Owner" && (
                      <div className="absolute mt-4 divide-y-2 translate-y-32 w-48 shadow-lg shadow-gray-500 bg-white flex flex-col z-10 ">
                        <Link
                          onClick={handleProfile}
                          to="/UserProfile/profile"
                          className="text-gray-700 hover:bg-[#994b00] transition-all hover:text-white py-2"
                        >
                          Profile
                        </Link>
                        <Link
                          onClick={handleProfile}
                          to="/UserProfile/posts"
                          className="text-gray-700 py-2 hover:bg-[#994b00] transition-all hover:text-white"
                        >
                          Posts
                        </Link>
                        <Link
                          onClick={handleProfile}
                          to="/UserProfile/messages"
                          className="text-gray-700 py-2 hover:bg-[#994b00] transition-all hover:text-white"
                        >
                          Messages
                        </Link>
                        <Link
                          onClick={handleProfile}
                          to="/UserProfile/wishlist"
                          className="text-gray-700 py-2 hover:bg-[#994b00] transition-all hover:text-white"
                        >
                          Wishlist
                        </Link>
                        <Link
                          onClick={handleLogout}
                          to="/log-in"
                          className="text-gray-700 py-2 hover:bg-[#994b00] transition-all hover:text-white"
                        >
                          Sign Out
                        </Link>
                      </div>
                    )}
                    {Profile && category === "Supplier" && (
                      <div className="absolute mt-4 divide-y-2 translate-y-32 w-48 shadow-lg shadow-gray-500 bg-white flex flex-col text-black ">
                        <Link
                          onClick={handleProfile}
                          to="/SupplierProfile/profile"
                          className="text-gray-700 hover:bg-[#994b00] transition-all hover:text-white py-2"
                        >
                          Profile
                        </Link>
                        <Link
                          onClick={handleProfile}
                          to="/SupplierProfile/portfolio"
                          className="text-gray-700 py-2 hover:bg-[#994b00] transition-all hover:text-white"
                        >
                          Portfolio
                        </Link>
                        <Link
                          onClick={handleProfile}
                          to="/SupplierProfile/messages"
                          className="text-gray-700 py-2 hover:bg-[#994b00] transition-all hover:text-white"
                        >
                          Messages
                        </Link>
                        <Link
                          onClick={handleProfile}
                          to="/SupplierProfile/wishlist"
                          className="text-gray-700 py-2 hover:bg-[#994b00] transition-all hover:text-white"
                        >
                          Wishlist
                        </Link>
                        <Link
                          onClick={handleLogout}
                          to="/log-in"
                          className="text-black py-2 hover:bg-[#994b00] transition-all hover:text-white"
                        >
                          Sign Out
                        </Link>
                      </div>
                    )}
                    {Profile && category === "Builder" && (
                      <div className="absolute mt-4 divide-y-2 translate-y-32 w-48 shadow-lg shadow-gray-500 bg-white flex flex-col z-10 ">
                        <Link
                          onClick={handleProfile}
                          to="/BuilderProfile/profile"
                          className="text-gray-700 hover:bg-[#994b00] transition-all hover:text-white py-2"
                        >
                          Profile
                        </Link>
                        <Link
                          onClick={handleProfile}
                          to="/BuilderProfile/portfolio"
                          className="text-gray-700 py-2 hover:bg-[#994b00] transition-all hover:text-white"
                        >
                          Portfolio
                        </Link>
                        <Link
                          onClick={handleProfile}
                          to="/BuilderProfile/messages"
                          className="text-gray-700 py-2 hover:bg-[#994b00] transition-all hover:text-white"
                        >
                          Messages
                        </Link>
                        <Link
                          onClick={handleProfile}
                          to="/BuilderProfile/wishlist"
                          className="text-gray-700 py-2 hover:bg-[#994b00] transition-all hover:text-white"
                        >
                          Wishlist
                        </Link>
                        <Link
                          onClick={handleLogout}
                          to="/log-in"
                          className="text-gray-700 py-2 hover:bg-[#994b00] transition-all hover:text-white"
                        >
                          Sign Out
                        </Link>
                      </div>
                    )}
                    {Profile && category === "Designer" && (
                      <div className="absolute mt-4 divide-y-2 translate-y-32 w-48 shadow-lg shadow-gray-500 bg-white flex flex-col z-10 ">
                        <Link
                          onClick={handleProfile}
                          to="/DesignerProfile/profile"
                          className="text-gray-700 hover:bg-[#994b00] transition-all hover:text-white py-2"
                        >
                          Profile
                        </Link>
                        <Link
                          onClick={handleProfile}
                          to="/DesignerProfile/portfolio"
                          className="text-gray-700 py-2 hover:bg-[#994b00] transition-all hover:text-white"
                        >
                          Portfolio
                        </Link>
                        <Link
                          onClick={handleProfile}
                          to="/DesignerProfile/messages"
                          className="text-gray-700 py-2 hover:bg-[#994b00] transition-all hover:text-white"
                        >
                          Messages
                        </Link>
                        <Link
                          onClick={handleProfile}
                          to="/DesignerProfile/wishlist"
                          className="text-gray-700 py-2 hover:bg-[#994b00] transition-all hover:text-white"
                        >
                          Wishlist
                        </Link>
                        <Link
                          onClick={handleLogout}
                          to="/log-in"
                          className="text-gray-700 py-2 hover:bg-[#994b00] transition-all hover:text-white"
                        >
                          Sign Out
                        </Link>
                      </div>
                    )}
                    {/* {Profile && isSupplier && (
              <div className='absolute mt-4 divide-y-2 translate-y-32 w-48 shadow-lg shadow-gray-500 bg-white flex flex-col z-10 '>
                 <Link onClick={handleProfile} to='/SupplierProfile/profile' className='text-black hover:bg-[#994b00] transition-all hover:text-gray-600 py-2'>
                  Profile
                 </Link>
                 <Link onClick={handleProfile} to='/SupplierProfile/portfolio' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
                  Posts
                 </Link>
                 <Link onClick={handleProfile} to='/SupplierProfile/messages' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
                  Messages
                 </Link>
                 <Link onClick={handleProfile} to='/SupplierProfile/wishlist' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
                  Wishlist
                 </Link>
                 <Link onClick={handleProfile} to='/log-in' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
                  Sign Out
                 </Link>
              </div>
          )
            
            }
          {Profile && isBuilder && (
              <div className='absolute mt-4 divide-y-2 translate-y-32 w-48 shadow-lg shadow-gray-500 bg-white flex flex-col z-10 '>
                 <Link onClick={handleProfile} to='/SupplierProfile/profile' className='text-black hover:bg-[#994b00] transition-all hover:text-gray-600 py-2'>
                  Profile
                 </Link>
                 <Link onClick={handleProfile} to='/SupplierProfile/portfolio' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
                  Posts
                 </Link>
                 <Link onClick={handleProfile} to='/SupplierProfile/messages' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
                  Messages
                 </Link>
                 <Link onClick={handleProfile} to='/SupplierProfile/wishlist' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
                  Wishlist
                 </Link>
                 <Link onClick={handleProfile} to='/log-in' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
                  Sign Out
                 </Link>
              </div>
          )
            
            }
          {Profile && isDesiginer && (
              <div className='absolute mt-4 divide-y-2 translate-y-32 w-48 shadow-lg shadow-gray-500 bg-white flex flex-col z-10 '>
                 <Link onClick={handleProfile} to='/SupplierProfile/profile' className='text-black hover:bg-[#994b00] transition-all hover:text-gray-600 py-2'>
                  Profile
                 </Link>
                 <Link onClick={handleProfile} to='/SupplierProfile/portfolio' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
                  Posts
                 </Link>
                 <Link onClick={handleProfile} to='/SupplierProfile/messages' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
                  Messages
                 </Link>
                 <Link onClick={handleProfile} to='/SupplierProfile/wishlist' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
                  Wishlist
                 </Link>
                 <Link onClick={handleProfile} to='/log-in' className='text-black py-2 hover:bg-[#994b00] transition-all hover:text-gray-600'>
                  Sign Out
                 </Link>
              </div>
          )
            
            } */}
                  </button>
                </>
              ) : (
                <Link to="/log-in">
                  <button className=" border-2 border-white py-2 px-5 bg-white ml-6 rounded-full login_btn">
                    Login
                  </button>
                </Link>
              )}
              <div
                className={`md:hidden z-20 top-0 left-0 ${
                  dropdown &&
                  "bg-gray-700 w-full h-full bg-opacity-25 backdrop-blur-sm"
                }  fixed transition-all`}
              >
                <button
                  data-collapse-toggle="navbar-search"
                  type="button"
                  className="inline-flex fixed top-2 right-2 items-center  w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden bg-[#ffffff8a] backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gray-200 "
                  aria-controls="navbar-search"
                  aria-expanded={dropdown}
                  onClick={() => {
                    setDropdown((prev) => !prev);
                  }}
                >
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
              </div>

              {dropdown && (
                <div
                  class="p-2 z-20 mt-6 items-center justify-between fixed inset-y-10 start-0 w-full md:flex md:w-auto md:order-1"
                  id="navbar-search"
                >
                  <div class="relative mt-3 md:hidden">
                    <input
                      type="text"
                      id="search-navbar"
                      class="block shadow-lg  w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#ffffffea] focus:ring-1 focus:ring-[#994b00] "
                      placeholder="Search..."
                    ></input>
                  </div>
                  <ul class="flex shadow-lg  flex-col gap-2 p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                    <li>
                      <Link to="/">
                        <a
                          class="lock py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-[#994b00]  focus:text-[#ffffff] md:p-0"
                          aria-current="page"
                        >
                          Home
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/community">
                        <a class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-[#994b00]  focus:text-[#ffffff] md:p-0   ">
                          Community
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link to="FindProfessionals/builder">
                        <a class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-[#994b00]  focus:text-[#ffffff] md:p-0   ">
                          Find Builder
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link to="FindProfessionals/supplier">
                        <a class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-[#994b00]  focus:text-[#ffffff] md:p-0   ">
                          Find Supplier
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link to="FindProfessionals/designer">
                        <a class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-[#994b00]  focus:text-[#ffffff] md:p-0   ">
                          Find Designer
                        </a>
                      </Link>
                    </li>
                    {isLoggedIn && (
                      <li>
                        <Link
                          onClick={handleLogout}
                          to="/log-in"
                          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-[#994b00]  focus:text-[#ffffff] md:p-0  "
                        >
                          Sign Out
                        </Link>
                      </li>
                    )}
                    <li onClick={handleDropdownClick}>
                      {isLoggedIn ? (
                        <div className=" justify-center text-white bg-[#994b005a] p-2 rounded-lg w-full border inline-flex">
                          {category === "Home Owner" && (
                            <Link to="/UserProfile/profile">
                              <img
                                src={`../uploads/${user.profile_pic}`}
                                className="h-10 w-10 border block object-cover rounded-full"
                              ></img>
                              <p className="">{user.full_name}</p>
                            </Link>
                          )}
                          {category === "Builder" && (
                            <Link to="/BuilderProfile/profile">
                              <img
                                src={`../uploads/${user.profile_pic}`}
                                className="h-10 w-10 border object-cover rounded-full"
                              ></img>
                              <p>{user.full_name}</p>
                            </Link>
                          )}
                          {category === "Supplier" && (
                            <Link to="/SupplierProfile/profile">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={`../uploads/${user.profile_pic}`}
                                  className="h-10 w-10 border object-cover rounded-full"
                                ></img>
                                <p className="text-gray-900">
                                  {user.full_name}
                                </p>
                              </div>
                            </Link>
                          )}
                          {category === "Designer" && (
                            <Link to="/DesignerProfile/profile">
                              <img
                                src={`../uploads/${user.profile_pic}`}
                                className="h-10 w-10 border object-cover rounded-full"
                              ></img>
                              <p className="text-gray-900"> {user.full_name}</p>
                            </Link>
                          )}
                        </div>
                      ) : (
                        <Link to="/log-in" className="text-white">
                          <a class="lock py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:bg-[#994b00]  focus:text-[#ffffff] md:p-0">
                            Login
                          </a>
                        </Link>
                      )}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
