import React,{useState, useEffect, Fragment} from 'react';
import '../../App.css';
import api from '../../Api.js'
import Cookies from 'js-cookie';
import moment from 'moment';
import 'moment-timezone';
import default_user from '../../images/user_0_img.jpg';
import '../../App.css';
import Navbar from '../Navbar_white';
import { Link } from 'react-router-dom';
import img from '../../images/Builder/2.png';

const changeToIST=(timeStamp) =>{
  const localDate = moment(timeStamp).local().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
  return moment(localDate).fromNow();  
}
const timeStamp=(timeStamp) =>{
  const localDate = moment(timeStamp).local().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
  return moment(localDate).format('HH:mm');
}
// ChatMessage component to display a single message
const ChatMessage = ({ message, time,isSelf }) => {
    const isQuotationRequest = message.includes('Requirement') && message.includes('Land Size (SQ FT)') && message.includes('Province') && message.includes('City')&& message.includes('Zip code') && message.includes('Additional Info');

  let content;
  if (isQuotationRequest) {
    const formattedMessage = message.split('\n').map((line, index) => {
      // Splitting each line into key and value pairs based on the colon (':')
      const [key, value] = line.split(':');
      return (
        <div key={index} className="flex w-full justify-between mb-2">
          <p className="w-1/3 font-bold text-sm">{key}:</p>
          <p className="w-2/3 ml-2 text-sm">{value}</p>
        </div>
      );
    });

    content = (
      <>
        <h2 className="text-lg font-semibold mb-4">{isSelf ? 'Your Quotation Request' : 'Received Quotation Request'}</h2>
        <div>{formattedMessage}</div>
      </>
    );
  } else {
    content = (
      <div className="">
        <p className="text-sm">{message}</p>
      </div>
    );
  }

  return (
    <div className={`flex ${isSelf ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-md min-w-[200px] p-2 rounded-lg overflow-hidden shadow-md ${isSelf ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
        <div className="space-y-1">
          {content}
          <p className='text-right text-xs opacity-50'>{timeStamp(time)}</p>
        </div>
      </div>
    </div>
  );
};

// ChatList component to display the list of messages for a particular user
const ChatList = ({ selectedUser, self, chats }) => {
  const groupedChats = {};
  const userIdCookie = Cookies.get('user_id');
      const uid = Number(decodeURIComponent(userIdCookie));

  // Group chats by sender
  chats.forEach(chat => {
    const sender = chat.sender;
    if (!groupedChats[sender]) {
      groupedChats[sender] = [];
    }
    groupedChats[sender].push(chat);
  });

  const selectedChat = groupedChats[selectedUser];

  console.log(groupedChats)
  console.log(selectedChat)

  if (!selectedChat) return null; // Return null if no chat found for the selected user

  return (
    <div className="flex flex-col-reverse h-[472px] overflow-y-auto px-4">
      {selectedChat.map((chat) => (
        <ChatMessage key={chat.id} message={chat.messages} time={chat.created_at} isSelf={Number(chat.user_id) === uid} />
      ))}
    </div>
  );
};


export default function UserProfile_post() {
  const [self, setSelf] = useState('');
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserId, setSelectedUserId] = useState();
  const [chats, setChats] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    if (inputMessage === '') {
      fetchUserChat();
    }
    
  },[inputMessage,selectedUser]);

  

  const fetchUserChat = async () => {
    try {
      const userIdCookie = Cookies.get('user_id');
      const uid = Number(decodeURIComponent(userIdCookie));
      const chats_fetch = await api.get(`/messages?user_id=${uid}`);
      setChats(chats_fetch.data.reverse())
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const handleMessageSend = async () => {
    if (inputMessage.trim() !== '') {
      try {
        const userIdCookie = Cookies.get('user_id');
        const uid = Number(decodeURIComponent(userIdCookie));
        
        const messageData = {
          user_id: uid, // Assuming 'uid' contains the user_id of the sender
          receiver_id: selectedUserId, // Assuming 'selectedUser' contains the receiver_id
          message: inputMessage,
        };
  
        await api.post('/messages', messageData);
        
        // Update UI after sending the message
        fetchUserChat()
        setInputMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

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
  }, {});
  console.log(uniqueSenders)

  return (
    <>
      <Navbar />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap"></link>

      <div className='w-screen md:w-full mb-40 p-10 md:p-20 flex justify-center'>
        <div className='md:flex md:w-4/5 w-full  justify-center rounded-lg overflow-hidden border border-gray-300 shadow-xl'>
          <div className='bg-gray-200 w-full md:w-1/4 p-2  h-[600px]'>
            <p className='text-[#994b00] font-bold pl-4 mb-4 text-xl border-b-2 py-3  border-[#994b004a] '>Inbox</p>
            {Object.keys(uniqueSenders).length > 0 && (
              <ul>
                {Object.keys(uniqueSenders).map((sender, index) => (
                  <li key={index}>
                    {uniqueSenders[sender] !== self && (
                      <button onClick={() => {setSelectedUser(sender);setSelectedUserId(uniqueSenders[sender])}} className={`py-2 px-4 w-full text-left rounded-lg focus:outline-none ${selectedUser === sender ? 'bg-[#00000012]' : ''}`}>
                        <div className='flex'>
                          <img src={default_user} className='h-10 object-cover rounded-full border-2 mr-4' alt='User'></img>
                          <div className='flex-col'>
                            <h2 className='text-black font-semibold text'>{sender}</h2>
                            <h3 className='text-gray-400 text-sm'>{changeToIST(latestMessages[sender])}</h3>
                          </div>
                        </div>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}

          </div>
          <div className='bg-white md:w-3/4'>

            {selectedUser?(<><div className='h-16 bg-gray-50 p-2 pt-1 border border-gray-200'>
              <div className='flex'>
                <img src={default_user} className='h-12 object-cover rounded-full border-2 mr-4 border-slate-200' alt='User'></img>
                <div className='flex-col'>
                  <h2 className='text-black font-semibold text-lg'>{selectedUser}</h2>
                  <h3 className='text-gray-400 text-sm'>{changeToIST(latestMessages[selectedUser])}</h3>
                </div>
              </div>
            </div>
            <div className='h-[536px]'>
              <ChatList selectedUser={selectedUser} self={self} chats={chats} />
              <div className='flex h-12 items-center bg-gray-100 m-2 rounded-lg '>
                <input
                  type='text'
                  className='flex-grow px-4 py-2 bg-gray-100 focus:outline-none'
                  placeholder='Write a message...'
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <button
                  className='px-4 font-semibold text-white'
                  onClick={handleMessageSend}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                  <path d="M18.3909 8.97081C18.3906 8.828 18.3495 8.68825 18.2724 8.568C18.1954 8.44775 18.0856 8.35199 17.956 8.29198L2.04614 0.867365C1.90735 0.80491 1.75285 0.786155 1.60315 0.813592C1.45345 0.841029 1.31565 0.913358 1.20803 1.02097C1.10041 1.12859 1.02809 1.2664 1.00065 1.4161C0.973212 1.56579 0.991966 1.7203 1.05442 1.85908L3.79093 8.23365L10.5261 8.22304L10.5261 9.71857L3.76971 9.71857L1.03851 16.0984C0.979135 16.2364 0.962556 16.389 0.990923 16.5366C1.01929 16.6841 1.09129 16.8196 1.19761 16.9258C1.30698 17.0307 1.44559 17.1001 1.59518 17.1247C1.74476 17.1493 1.89829 17.128 2.03553 17.0636L17.9454 9.63903C18.0754 9.58133 18.1863 9.48788 18.2651 9.36957C18.344 9.25126 18.3876 9.11296 18.3909 8.97081Z" fill="black"/>
                  </svg>
                </button>
              </div>
            </div></>):(
              <h1 className='text-center uppercase text-2xl font-bold p-10 text-gray-200 mt-10'>Select any user to view messages</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
  