import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar_white';
import Cookies from 'js-cookie';
import moment from 'moment';
import '../../../App.css';
import api from '../../../Api';
import userImage from "../../../images/designer_profile.jpg";
import profilePic from "../../../images/Designer/profile_pic.jpg";
import user_0 from "../../../images/user_0_img.jpg";


const changeToIST=(timeStamp) =>{
  const localDate = moment(timeStamp).local().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
  return moment(localDate).fromNow();  
}
const timeStamp=(timeStamp) =>{
  const localDate = moment(timeStamp).local().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
  return moment(localDate).format('HH:mm');
}

export default function UserProfile_wishlist() {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState([]);
  const userIdCookie = Cookies.get('user_id');
  const uid = decodeURIComponent(userIdCookie);

  useEffect(() => {
    // Fetch messages for the logged-in user
    const fetchMessages = async () => {
      try {
        const userDisplay = await api.get(`/UserProfile/Profile/${uid}`);
        // Replace '/getMessagesEndpoint' with the actual endpoint to fetch messages for the given user ID
        const response =await api.get(`/messages?user_id=${uid}`);
        setUser (userDisplay.data[0])
        setChats(response.data.reverse()); // Assuming the messages are received in an array format
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
  
    fetchMessages();
  }, []);

  const latestMessages = chats.reduce((acc, chat) => {
    const sender = chat.sender;
    const messageTime = chat.created_at; // Assuming 'created_at' holds the message timestamp
  
    if (!acc[sender] || messageTime > acc[sender]) {
      acc[sender] = messageTime;
    }
  
    return acc;
  }, {});

  const uniqueSenders = chats.reduce((acc, chat) => {
    const { sender, user_id, receiver_id } = chat;
    const userIdCookie = Cookies.get('user_id');
    const uid = Number(decodeURIComponent(userIdCookie));
  
    // Choose user_id from either user_id or receiver_id where it is not equal to logged-in user_id
    const selectedUserId = user_id !== uid ? user_id : receiver_id;
  
    // Add sender to the uniqueSenders object with their user_id
    if (!acc[sender]) {
      acc[sender] = selectedUserId;
    }
    
    return acc;
  }, {});  return (
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
        <div className='bg-[#994B00] mt-3 h-1'></div>
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
        <div className='bg-[#994B002a] mt-3 h-1 '></div>
      </Link>
    </div>
    {Object.keys(uniqueSenders).length > 0 && (<div className='flex-col mx-auto'>
        {/* Display messages */}
        {Object.keys(uniqueSenders).map((sender, index) => (<Link to='/message'>
          <div className='flex hover:scale-[1.01] transition all text-left space-x-5 mt-4 shadow-lg rounded-lg p-4' key={index}>
            {/* Message user avatar */}
            <img src={user_0} className='w-14 object-cover rounded-full border-2 border-slate-200' alt='User Avatar' />

            <div className='w-full space-x-5 flex justify-between'>
              <div className='flex-col'>
                <h2 className='text-black font-semibold text-xl'>{sender}</h2>
              </div>
              <p className='text-black'>{timeStamp(latestMessages[sender])}</p> {/* Modify this to display the message timestamp */}
            </div>
          </div>
          </Link>))}
      </div>)}
      </div>
    
    </div>
      
      {/* Other content in the UserProfile component */}
    </div>
    </>
  );
}
