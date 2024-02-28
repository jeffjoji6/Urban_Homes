import api from '../../../Api.js';
import React,{useState, useEffect, Fragment} from 'react';
import moment from 'moment';
import Cookies from 'js-cookie';
import Navbar from '../../Navbar_white';
import '../../../App.css';
import { Link } from 'react-router-dom';
import userImage from "../../../images/user_profile.jpg";
import profilePic from "../../../images/builderprofile.png";
import user_0 from "../../../images/user_0_img.jpg";

export default function UserProfile_post() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState([]);

  const userIdCookie = Cookies.get('user_id');
  const uid = Number(decodeURIComponent(userIdCookie));

  const timeStamp = (timeStamp) => {
    const localDate = moment(timeStamp).local().add(5, 'hours').add(30, 'minutes');
    return moment(localDate).format('D MMM').toUpperCase();
  };

  // Simulate fetching messages from an API
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {

      const userIdCookie = Cookies.get('user_id');
        const uid = Number(decodeURIComponent(userIdCookie));
        const userDisplay = await api.get(`/UserProfile/Profile/${uid}`);
        setUser (userDisplay.data[0])
      const response = await api.get(`/messages?user_id=${uid}`);

      // Set the fetched messages to state
      setMessages(response.data.reverse()); // Assuming your API response has a 'messages' array
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (
    <>
    <Navbar />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap"></link>
    <div className='bg-white-800 md:ml-20 p-8 text-white text-center w-full-z-10'>
      <div className='flex-col  w-full h-full '>
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
        <div className='p-4 flex-col w-full  items-center md:inline-flex'>
        <Link to='/BuilderProfile/profile'>
              <button className='text-slate-400 block uppercase m-1.5 font-bold  p-3 w-full'>
                Profile
                </button>
                </Link>
                <Link to='/BuilderProfile/notification'>

              <button className='text-white uppercase block m-1.5 bg-[#994b00] font-bold p-3 w-full'>
                Notifications
                </button>
                </Link>
            </div>
        </div>
      
      <div className="flex-col mx-auto">
      <div className="flex mt-40 max-w-xl mb-4" >
      <Link
        to="/BuilderProfile/messages"
        className=" hover:text-[#994B00] text-black font-semibold h-1/6 w-80 py-2   transition duration-300"
      >
        Messages
        <div className='bg-gray-400 bg-opacity-50 mt-3 h-1'></div>
      </Link>
      <Link
        to="/BuilderProfile/portfolio"
        className=" hover:text-[#994B00] text-black font-semibold h-1/6 w-80 py-2   transition duration-300"
      >
        Portfolio
        <div className='bg-gray-400 bg-opacity-50 mt-3 h-1'></div>
      </Link>
      <Link
        to="/BuilderProfile/wishlist"
        className=" hover:text-[#994B00] text-black font-semibold h-1/6 w-80 py-2   transition duration-300 "
      >
        Wishlist
        <div className='bg-gray-400 bg-opacity-50 mt-3 h-1 '></div>
      </Link>
    </div>
      <div className='flex-col max-w-4xl p-8 py-6 md:py-8 text-left space-y-3 mt-4 shadow-lg rounded-lg overflow-hidden divide-y-4'>
       <div className='md:inline-flex w-full justify-between'>
        <div className='md:inline-flex md:w-1/2 h-14 mb-24 md:mb-0 space-y-3 md:space-y-0 md:space-x-5  '>
          <button className='bg-[#994b00] block h-full shadow-lg hover:scale-105 transition-all  px-4 font-bold uppercase w-full md:w-1/4 rounded-sm'>all</button>
          {/* <button className='bg-transparent block border-2 h-14 border-gray-300 hover:scale-105 transition-all text-gray-300 px-4 font-bold uppercase w-full md:w-1/4 rounded-sm'>Unread </button> */}
        </div>
        <div className='md:inline-flex hidden justify-end items-baseline w-1/2 h-14 space-x-5  '>
        <h2 className='text-gray-800 pl-1  pb-2 text-md'>
              Search
              </h2>
              <div className='w-3/5'>
                <input type="text" placeholder="Search" className="mt-8 md:mt-0 w-full md:justify-end   text-gray-500 py-3 px-3 rounded-sm bg-transparent transition-all outline focus:outline outline-gray-100 focus:outline-gray-200" />
              </div>
        </div>
       </div>

       <div className=' pt-3 space-y-3 w-full'>
        {messages.length > 0 ? (
          messages.map((message) => (

          message.user_id !== uid && (
            <Link to='/message'  className=''><div className='w-full border-2 p-2 px-3 inline-flex rounded-md space-x-12 mb-3 items-center hover:-translate-y-0.5 hover:shadow-md transition-all'>
          <div className='bg-[#994b002a] font-bold text-center p-2 w-16 rounded-lg text-[#994b00] '>{timeStamp(message.created_at)}</div>
          <p className='text-gray-400 '> You have received a message from {message.sender}</p>
        </div>
        </Link>)))):(
          <p>No messages found.</p>
        )}
        
       </div>
      </div>
      </div>
    
    </div>
      
      {/* Other content in the UserProfile component */}
    </div>
    </>
  );
}
