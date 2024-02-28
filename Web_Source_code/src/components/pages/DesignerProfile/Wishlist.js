import React,{useState, useEffect, Fragment} from 'react';
import Cookies from 'js-cookie';
import moment from 'moment';
import 'moment-timezone';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min.js';
import api from '../../../Api.js'
import '../../../App.css';
import { Link } from 'react-router-dom';
import userImage from "../../../images/designer_profile.jpg";
import profilePic from "../../../images/Designer/profile_pic.jpg";
import user_0 from "../../../images/user_0_img.jpg";
import Navbar from '../../Navbar_white';

export default function UserProfile_wishlist() {
  const [wishlists, setWishlists] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const user_query = useLocation().search

  useEffect(() => {
    fetchUser();
  },[]);

  
  const fetchUser = async () => {
    try{
        const userIdCookie = Cookies.get('user_id');
        const uid = decodeURIComponent(userIdCookie);
        const wishlist_fetch =await api.get(`wishlist/portfolio/${uid}?wishlisted_user_id=${uid}`);
        const userDisplay = await api.get(`/UserProfile/Profile/${uid}`);
        console.log(wishlist_fetch)
        setUser (userDisplay.data[0])
        setWishlists(wishlist_fetch.data)
        
  
      }    
      catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  return (
    <>
    <Navbar />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap"></link>
    <div className='bg-white-800 md:ml-20 p-8 text-white text-center w-full-z-10'>
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
<p className="pt-4 md:py-8 text-black text-3xl font-semibold">{user.full_name}</p>
<div className='p-4 flex-col w-full  items-center inline-flex'>
        <Link to='/DesignerProfile/profile'>
              <button className='text-slate-400 uppercase m-1.5  font-bold p-3 w-full'>
                Profile
                </button>
                </Link>
                <Link to='/DesignerProfile/notification'>
              <button className='text-slate-400 uppercase m-1.5 font-bold  p-3 w-full'>
                Notifications
                </button>
                </Link>
            </div>
        </div>
      
      <div className="flex-col mx-auto">
      <div className="flex mt-40 mb-4" >
      <Link
        to="/DesignerProfile/messages"
        className=" hover:text-[#994B00] text-black font-semibold h-1/6 w-80 py-2   transition duration-300"
      >
        Messages
        <div className='bg-[#994B002a] mt-3 h-1'></div>
      </Link>
      <Link
        to="/DesignerProfile/portfolio"
        className=" hover:text-[#994B00] text-black font-semibold h-1/6 w-80 py-2   transition duration-300"
      >
        Portfolio
        <div className='bg-[#994B002a] mt-3 h-1'></div>
      </Link>
      <Link
        to="/DesignerProfile/wishlist"
        className=" hover:text-[#994B00] text-black font-semibold h-1/6 w-80 py-2   transition duration-300 "
      >
        Wishlist
        <div className='bg-[#994B00] mt-3 h-1 '></div>
      </Link>
    </div>
    {wishlists?(
                    <table className=" w-full">
                <tbody>
                    {wishlists.map((wishlist)=>(
                    <tr key={wishlist.id}>
      <div className='flex text-left w-full space-x-5 mt-4 shadow-lg rounded-lg  p-4'>
        <img src={user_0} className='w-14 object-cover rounded-full border-2 border-slate-200'></img>
        <div className='flex w-full items-center justify-between'>
        <div className='flex-col'>
          <h2 className='text-black font-semibold text-[18px]'>
          {wishlist.full_name} has saved your profile
        </h2>
        
        </div>
       
        </div>
      </div>
      </tr>
      ))}</tbody>
      </table>
      ):(
        <p className='text-2xl text-gray-400 text-center w-full mt-10 p-2 font-bold'>No users wishlisted yet. <Link className='text-[#994b00aa] hover:text-[#994b00] transition-all' to='/community'>Join the Community to explore more</Link></p>
        )}
      
      </div>
    
    </div>
      
      {/* Other content in the UserProfile component */}
    </div>
    </>
  );
}
