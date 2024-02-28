import Modal from './modal/modal_message.js';
import Modal_quotation from './modal/Modal_quotation.js';
import React,{useState, useEffect, Fragment} from 'react';
import '../../App.css';
import Navbar from '../Navbar_white';
import { Link } from 'react-router-dom';
import userImage from "../../images/user_profile.jpg";
import profilePic from "../../images/builderprofile.png";
import img1 from "../../images/Builder/1.jpg";
import img2 from "../../images/Builder/5.jpg";
import img3 from "../../images/Builder/8.jpg";
import user_0 from "../../images/user_0_img.jpg";
import star_orange from '../../images/star.svg'
import star_gray from '../../images/star_grey.svg'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min.js';
import Cookies from 'js-cookie';
import api from '../../Api.js';

export default function UserProfile_post() {
  const [showModal, setShowModal] = useState(false);
  const [showquo, setShowquo] = useState(false);
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [portfolio,setPortfolio]= useState([]);
  const user_query = useLocation().search
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const profile_id = urlParams.get('user_id');

  const fetchPortfolio = async ()=>{
    const portfolioData = await api.get(`/portfolio/${profile_id}`);
    setPortfolio(portfolioData.data);
    console.log(portfolioData.data)


  }

  useEffect(() => {
    fetchPortfolio();
  },[]);
  
  const fetchUser = async () => {
  try{
      const userIdCookie = Cookies.get('user_id');
      const uid = decodeURIComponent(userIdCookie);
      const userDisplay = await api.get(`/profile/display${user_query}`);
      const wishlists =await api.get(`/wishlist/portfolio/${uid}${user_query}`);
      if (wishlists.data[0]) 
      { 
        const wishlist_value=Number(wishlists.data[0].wishlist_user_id )=== userDisplay.data[0].user_id;

        setIsWishlisted(wishlist_value);}
        else{
          setIsWishlisted(false)
        }
      
      setUser(userDisplay.data[0])

    }    
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleAddToWishlist = async (event, pid) => {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const wishlist_user_id = params.get('user_id');
    const userIdCookie = Cookies.get('user_id');
    const uid = decodeURIComponent(userIdCookie);
    const wishlistData = {
      user_id: uid,
      wishlist_user_id: wishlist_user_id,
    };
    try {
      await api.post('/wishlist/portfolio/add', wishlistData);
      fetchUser(); // Assuming fetchUser() is a function to update user data after the wishlist is updated
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  
  // Function to handle removing a post from the wishlist
  const handleRemoveFromWishlist = async (event, pid) => {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const wishlist_user_id = params.get('user_id');
    const userIdCookie = Cookies.get('user_id');
    const uid = decodeURIComponent(userIdCookie);
    try {
      await api.delete('/wishlist/portfolio/remove', {
        data: { user_id: uid, wishlist_user_id: wishlist_user_id }
      });
      fetchUser(); // Assuming fetchUser() is a function to update user data after the wishlist is updated
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  },[isWishlisted]);
  return (
    <Fragment>
    <>
    <Navbar />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap"></link>
    <div className='bg-white-800 p-8 md:ml-20 text-white text-center w-full-z-10'>
      <div className='flex flex-col w-full h-full '>
        {/* <div className="absolute items-center inset-0 h-2/4 bg-gradient-to-b from-black to-transparent opacity-85  -z-10"></div> */}
        <img src={userImage} alt= "pool-side home"className=' absolute inset-x-0 md:p-10 inset-y-24 h-[400px] md:h-[650px] w-full md:rounded-[75px]  object-cover -z-20'></img>
        <h1 className=' justify-center text-7xl  text-white mx-auto font-extrabold pt-60'></h1>
          <p className='justify-center text-xl text-opacity-85 text-white mx-auto pt-6'></p>
          <p className='justify-center text-xl text-white text-opacity-85 md:mb-48 mx-auto'></p>
        </div>
      <div className="relative w-full h-full mb-40 md:flex">
      <div className='md:w-1/6 px-5 items-center overflow-hidden -my-30'>
        <img
          src={`../uploads/${user.profile_pic}`}
          alt='Profile Pic'
          className='h-[250px] w-[300px] object-cover rounded-3xl'
        />
       <p className="pt-4 text-black text-3xl font-semibold">{user.full_name}</p>
        <p className="pt-2 md:py-6 text-gray-500 text-2xl font-semibold">{user.user_type}</p>
        <div className='py-3 flex w-full text-center  items-center'>
              
              <button className='text-[#994b00] inline-flex m-1.5 space-x-1 border w-1/2 justify-center  border-[#994b00] rounded-md p-3 '>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z" stroke="#994B00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
                <p  >Review</p>
                </button>
                
              {isWishlisted? (
                  <button onClick={handleRemoveFromWishlist} className='text-white items-center border  border-[#994b00]   bg-[#994b00] inline-flex justify-center w-1/2 m-1.5 space-x-1 rounded-md  p-3 '>
              <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-fill" viewBox="0 0 16 16"> <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" fill="white"></path> </svg>
                <p>Saved</p>
                </button>
                ):(
              <button onClick={handleAddToWishlist} className='text-[#994b00]  border border-[#994b00] inline-flex justify-center w-1/2 m-1.5 space-x-1 rounded-md  p-3 '>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <rect width="25" height="25" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6 4.95975L6.92857 4H18.0714L19 4.95975V22L12.5 18.0188L6 22V4.95975ZM7.85714 5.91949V18.6314L12.5 15.7876L17.1429 18.6314V5.91949H7.85714Z" fill="#994B00"/>
              <path d="M17 6V18.5L12.5 15.5L8 18.5V6H17Z" fill="#994B00" stroke="#994B00"/>
              </svg>
                <p>Save</p>
                </button>
)}
            </div>
          <p className='text-[#994b00] py-6 font-bold text-lg'>Contact {user.full_name}</p>
          <button className='bg-[#994b00] rounded-full px-7 p-3'>                                       
          {isOpen && (
                                        <div>
                                            <button className='' onClick={() => setShowModal(true)}>
                                            Send Message
                                            </button>
                                        </div>
                                        )}
          </button>
          <button className='bg-[#994b00] mt-4 rounded-full px-7 p-3'>                                       
          {isOpen && (
                                        <div>
                                            <button className='' onClick={() => setShowquo(true)}>
                                            Request for Quotation
                                            </button>
                                        </div>
                                        )}
          </button>
          
        </div>
      
      <div className="flex-col mx-auto">
      <div className="flex max-w-xl mt-40 mb-4" >
      <Link
        to={`/profile/${user_query}`}
        className=" text-[#994B00]  font-semibold h-1/6 w-80 py-2   transition duration-300"
      >
        About Us
        <div className='bg-[#994B00] bg-opacity-100 mt-3 h-1'></div>
      </Link>
      <Link
        to={`/portfolio/${user_query}`}
        className=" hover:text-[#994B00] text-black font-semibold h-1/6 w-80 py-2   transition duration-300"
      >
        Portfolio
        <div className='bg-gray-400 bg-opacity-50 mt-3 h-1'></div>
      </Link>
      <button
        className=" hover:text-[#994B00] text-black font-semibold h-1/6 w-80 py-2   transition duration-300 "
      >
        Review
        <div className='bg-gray-400 bg-opacity-50 mt-3 h-1 '></div>
      </button>
    </div>
      <div className='md:flex max-w-4xl  text-left md:space-x-5 mt-4 shadow-lg rounded-lg overflow-hidden '>
        <div className='flex-col text-black border p-6 md:p-8 w-full'>
          <h1 className='uppercase font-extrabold  text-3xl'> About us</h1>
          <p className='py-6'>{user.about_us}</p>
      </div>
      </div>
      {portfolio[0] &&(
      <div className='md:flex max-w-4xl  text-left md:space-x-5 mt-4 shadow-lg rounded-lg overflow-hidden '>
        <div className='flex-col text-black space-y-10 p-6 md:p-8 w-full'>
          <h1 className='uppercase font-extrabold text-3xl'> Portfolio</h1>
          <div className='flex flex-wrap w-full space-x-8 '>
        {portfolio.map((p) =>  (
        <div className='relative w-1/3'>
        <img className='rounded-[75px] object-cover w-full ' src={`../uploads/${p.cover_img}`} alt='Kitchen' />
        <div className='absolute inset-0 rounded-[75px] bg-gradient-to-b from-transparent to-black opacity-60'></div>
        <div className='absolute inset-0  mt-48 flex flex-col px-8 text-2xl font-bold text-white'>
          <p>{p.category}</p>
        </div>
      </div>
        ))}

          </div>
          </div>
      </div>)}
      {/* <div className='md:flex max-w-4xl  text-left md:space-x-5 mt-4 shadow-lg rounded-lg overflow-hidden '>
        <div className='flex-col text-black space-y-10 p-6 md:p-8 w-full'>
          <h1 className='uppercase font-extrabold text-3xl'> Reviews</h1>
          <div className='inline-flex w-full justify-center items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
          <path d="M51.6928 28.0333C52.3566 27.3547 52.8189 26.505 53.028 25.579C53.2371 24.653 53.1848 23.6871 52.877 22.7891C52.5881 21.8885 52.0521 21.087 51.33 20.476C50.608 19.8651 49.7289 19.4691 48.7928 19.3333L38.4253 17.7383C38.3769 17.7243 38.3323 17.6996 38.2947 17.6662C38.2571 17.6328 38.2274 17.5913 38.2078 17.545L33.6645 7.87829C33.2661 6.97311 32.613 6.20331 31.7849 5.66267C30.9568 5.12202 29.9893 4.83387 29.0003 4.8333C28.0228 4.82925 27.0648 5.10762 26.2417 5.63494C25.4186 6.16225 24.7653 6.91608 24.3603 7.80579L19.817 17.4725C19.7922 17.5196 19.7579 17.5611 19.7163 17.5944C19.6747 17.6276 19.6267 17.6519 19.5753 17.6658L9.23196 19.3333C8.29453 19.4729 7.4142 19.8699 6.6889 20.48C5.9636 21.0901 5.42176 21.8894 5.12363 22.7891C4.8271 23.6903 4.78294 24.6554 4.99595 25.5798C5.20895 26.5043 5.67099 27.3528 6.33196 28.0333L13.9686 35.8874C13.9906 35.9369 14.002 35.9904 14.002 36.0445C14.002 36.0986 13.9906 36.1522 13.9686 36.2016L12.1803 47.1733C12.014 48.1288 12.1224 49.1118 12.4928 50.0082C12.8632 50.9045 13.4805 51.6773 14.2727 52.2367C15.065 52.7961 15.9998 53.1191 16.9684 53.1682C17.937 53.2173 18.8997 52.9905 19.7445 52.5141L28.7586 47.5116C28.8034 47.4883 28.8531 47.4761 28.9036 47.4761C28.9541 47.4761 29.0038 47.4883 29.0486 47.5116L38.0628 52.5141C38.9087 52.9803 39.8687 53.199 40.8331 53.1454C41.7974 53.0918 42.7272 52.7679 43.5162 52.2108C44.3052 51.6537 44.9216 50.8859 45.2948 49.9951C45.6681 49.1043 45.7832 48.1264 45.627 47.1733L43.9595 36.2499C43.934 36.2059 43.9206 36.1558 43.9206 36.1049C43.9206 36.054 43.934 36.004 43.9595 35.9599L51.6928 28.0333Z" fill="#FF8723"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
          <path d="M51.6928 28.0333C52.3566 27.3547 52.8189 26.505 53.028 25.579C53.2371 24.653 53.1848 23.6871 52.877 22.7891C52.5881 21.8885 52.0521 21.087 51.33 20.476C50.608 19.8651 49.7289 19.4691 48.7928 19.3333L38.4253 17.7383C38.3769 17.7243 38.3323 17.6996 38.2947 17.6662C38.2571 17.6328 38.2274 17.5913 38.2078 17.545L33.6645 7.87829C33.2661 6.97311 32.613 6.20331 31.7849 5.66267C30.9568 5.12202 29.9893 4.83387 29.0003 4.8333C28.0228 4.82925 27.0648 5.10762 26.2417 5.63494C25.4186 6.16225 24.7653 6.91608 24.3603 7.80579L19.817 17.4725C19.7922 17.5196 19.7579 17.5611 19.7163 17.5944C19.6747 17.6276 19.6267 17.6519 19.5753 17.6658L9.23196 19.3333C8.29453 19.4729 7.4142 19.8699 6.6889 20.48C5.9636 21.0901 5.42176 21.8894 5.12363 22.7891C4.8271 23.6903 4.78294 24.6554 4.99595 25.5798C5.20895 26.5043 5.67099 27.3528 6.33196 28.0333L13.9686 35.8874C13.9906 35.9369 14.002 35.9904 14.002 36.0445C14.002 36.0986 13.9906 36.1522 13.9686 36.2016L12.1803 47.1733C12.014 48.1288 12.1224 49.1118 12.4928 50.0082C12.8632 50.9045 13.4805 51.6773 14.2727 52.2367C15.065 52.7961 15.9998 53.1191 16.9684 53.1682C17.937 53.2173 18.8997 52.9905 19.7445 52.5141L28.7586 47.5116C28.8034 47.4883 28.8531 47.4761 28.9036 47.4761C28.9541 47.4761 29.0038 47.4883 29.0486 47.5116L38.0628 52.5141C38.9087 52.9803 39.8687 53.199 40.8331 53.1454C41.7974 53.0918 42.7272 52.7679 43.5162 52.2108C44.3052 51.6537 44.9216 50.8859 45.2948 49.9951C45.6681 49.1043 45.7832 48.1264 45.627 47.1733L43.9595 36.2499C43.934 36.2059 43.9206 36.1558 43.9206 36.1049C43.9206 36.054 43.934 36.004 43.9595 35.9599L51.6928 28.0333Z" fill="#FF8723"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
          <path d="M51.6928 28.0333C52.3566 27.3547 52.8189 26.505 53.028 25.579C53.2371 24.653 53.1848 23.6871 52.877 22.7891C52.5881 21.8885 52.0521 21.087 51.33 20.476C50.608 19.8651 49.7289 19.4691 48.7928 19.3333L38.4253 17.7383C38.3769 17.7243 38.3323 17.6996 38.2947 17.6662C38.2571 17.6328 38.2274 17.5913 38.2078 17.545L33.6645 7.87829C33.2661 6.97311 32.613 6.20331 31.7849 5.66267C30.9568 5.12202 29.9893 4.83387 29.0003 4.8333C28.0228 4.82925 27.0648 5.10762 26.2417 5.63494C25.4186 6.16225 24.7653 6.91608 24.3603 7.80579L19.817 17.4725C19.7922 17.5196 19.7579 17.5611 19.7163 17.5944C19.6747 17.6276 19.6267 17.6519 19.5753 17.6658L9.23196 19.3333C8.29453 19.4729 7.4142 19.8699 6.6889 20.48C5.9636 21.0901 5.42176 21.8894 5.12363 22.7891C4.8271 23.6903 4.78294 24.6554 4.99595 25.5798C5.20895 26.5043 5.67099 27.3528 6.33196 28.0333L13.9686 35.8874C13.9906 35.9369 14.002 35.9904 14.002 36.0445C14.002 36.0986 13.9906 36.1522 13.9686 36.2016L12.1803 47.1733C12.014 48.1288 12.1224 49.1118 12.4928 50.0082C12.8632 50.9045 13.4805 51.6773 14.2727 52.2367C15.065 52.7961 15.9998 53.1191 16.9684 53.1682C17.937 53.2173 18.8997 52.9905 19.7445 52.5141L28.7586 47.5116C28.8034 47.4883 28.8531 47.4761 28.9036 47.4761C28.9541 47.4761 29.0038 47.4883 29.0486 47.5116L38.0628 52.5141C38.9087 52.9803 39.8687 53.199 40.8331 53.1454C41.7974 53.0918 42.7272 52.7679 43.5162 52.2108C44.3052 51.6537 44.9216 50.8859 45.2948 49.9951C45.6681 49.1043 45.7832 48.1264 45.627 47.1733L43.9595 36.2499C43.934 36.2059 43.9206 36.1558 43.9206 36.1049C43.9206 36.054 43.934 36.004 43.9595 35.9599L51.6928 28.0333Z" fill="#FF8723"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="59" height="58" viewBox="0 0 59 58" fill="none">
          <path d="M52.3608 28.0333C53.0246 27.3547 53.4869 26.505 53.696 25.579C53.9051 24.653 53.8528 23.6871 53.5449 22.7891C53.256 21.8885 52.7201 21.087 51.998 20.476C51.2759 19.8651 50.3968 19.4691 49.4608 19.3333L39.0933 17.7383C39.0449 17.7243 39.0003 17.6996 38.9627 17.6662C38.925 17.6328 38.8954 17.5913 38.8758 17.545L34.3324 7.87829C33.934 6.97311 33.281 6.20331 32.4529 5.66267C31.6247 5.12202 30.6572 4.83387 29.6683 4.8333C28.6907 4.82925 27.7328 5.10762 26.9097 5.63494C26.0866 6.16225 25.4332 6.91608 25.0283 7.80579L20.4849 17.4725C20.4601 17.5196 20.4259 17.5611 20.3843 17.5944C20.3427 17.6276 20.2947 17.6519 20.2433 17.6658L9.89993 19.3333C8.96249 19.4729 8.08217 19.8699 7.35687 20.48C6.63157 21.0901 6.08973 21.8894 5.7916 22.7891C5.49507 23.6903 5.45091 24.6554 5.66392 25.5798C5.87692 26.5043 6.33896 27.3528 6.99993 28.0333L14.6366 35.8874C14.6586 35.9369 14.6699 35.9904 14.6699 36.0445C14.6699 36.0986 14.6586 36.1522 14.6366 36.2016L12.8483 47.1733C12.682 48.1288 12.7904 49.1118 13.1608 50.0082C13.5312 50.9045 14.1484 51.6773 14.9407 52.2367C15.733 52.7961 16.6678 53.1191 17.6364 53.1682C18.605 53.2173 19.5676 52.9905 20.4124 52.5141L29.4266 47.5116C29.4714 47.4883 29.5211 47.4761 29.5716 47.4761C29.6221 47.4761 29.6718 47.4883 29.7166 47.5116L38.7308 52.5141C39.5767 52.9803 40.5367 53.199 41.501 53.1454C42.4654 53.0918 43.3952 52.7679 44.1842 52.2108C44.9732 51.6537 45.5896 50.8859 45.9628 49.9951C46.3361 49.1043 46.4512 48.1264 46.2949 47.1733L44.6274 36.2499C44.602 36.2059 44.5886 36.1558 44.5886 36.1049C44.5886 36.054 44.602 36.004 44.6274 35.9599L52.3608 28.0333Z" fill="#C4C4C4"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="59" height="58" viewBox="0 0 59 58" fill="none">
          <path d="M52.3608 28.0333C53.0246 27.3547 53.4869 26.505 53.696 25.579C53.9051 24.653 53.8528 23.6871 53.5449 22.7891C53.256 21.8885 52.7201 21.087 51.998 20.476C51.2759 19.8651 50.3968 19.4691 49.4608 19.3333L39.0933 17.7383C39.0449 17.7243 39.0003 17.6996 38.9627 17.6662C38.925 17.6328 38.8954 17.5913 38.8758 17.545L34.3324 7.87829C33.934 6.97311 33.281 6.20331 32.4529 5.66267C31.6247 5.12202 30.6572 4.83387 29.6683 4.8333C28.6907 4.82925 27.7328 5.10762 26.9097 5.63494C26.0866 6.16225 25.4332 6.91608 25.0283 7.80579L20.4849 17.4725C20.4601 17.5196 20.4259 17.5611 20.3843 17.5944C20.3427 17.6276 20.2947 17.6519 20.2433 17.6658L9.89993 19.3333C8.96249 19.4729 8.08217 19.8699 7.35687 20.48C6.63157 21.0901 6.08973 21.8894 5.7916 22.7891C5.49507 23.6903 5.45091 24.6554 5.66392 25.5798C5.87692 26.5043 6.33896 27.3528 6.99993 28.0333L14.6366 35.8874C14.6586 35.9369 14.6699 35.9904 14.6699 36.0445C14.6699 36.0986 14.6586 36.1522 14.6366 36.2016L12.8483 47.1733C12.682 48.1288 12.7904 49.1118 13.1608 50.0082C13.5312 50.9045 14.1484 51.6773 14.9407 52.2367C15.733 52.7961 16.6678 53.1191 17.6364 53.1682C18.605 53.2173 19.5676 52.9905 20.4124 52.5141L29.4266 47.5116C29.4714 47.4883 29.5211 47.4761 29.5716 47.4761C29.6221 47.4761 29.6718 47.4883 29.7166 47.5116L38.7308 52.5141C39.5767 52.9803 40.5367 53.199 41.501 53.1454C42.4654 53.0918 43.3952 52.7679 44.1842 52.2108C44.9732 51.6537 45.5896 50.8859 45.9628 49.9951C46.3361 49.1043 46.4512 48.1264 46.2949 47.1733L44.6274 36.2499C44.602 36.2059 44.5886 36.1558 44.5886 36.1049C44.5886 36.054 44.602 36.004 44.6274 35.9599L52.3608 28.0333Z" fill="#C4C4C4"/>
          </svg>
          <h1 className='text-gray-400 pl-4 text-2xl'>Select Your Rating</h1>

          </div>
    </div>
    </div> */}
      </div>
    </div>
      
      {/* Other content in the BuilderProfile component */}
    </div>
    </>
    <Modal isvisible ={showModal} onClose={() =>setShowModal((prev)=>(!prev))} full_name={user.full_name} receiver_id={user.user_id}/>
    <Modal_quotation isvisible ={showquo} onClose={() =>setShowquo((prev)=>(!prev))} receiver_id={user.user_id}/>
    </Fragment>
  );
}
