import React,{useState, useEffect, Fragment} from 'react';
import api from '../../../Api.js'
import Cookies from 'js-cookie';
import moment from 'moment';
import profilePic from "../../../images/builderprofile.png";

const Modal_message = ({ isvisible,onClose, full_name,receiver_id })  => {
    const [inputMessage, setInputMessage] = useState('');
    const handleMessageSend = async () => {
        if (inputMessage.trim() !== '') {
          try {
            const userIdCookie = Cookies.get('user_id');
            const uid = Number(decodeURIComponent(userIdCookie));
            
            const messageData = {
              user_id: uid, // Assuming 'uid' contains the user_id of the sender
              receiver_id: receiver_id, // Assuming 'selectedUser' contains the receiver_id
              message: inputMessage,
            };
      
            await api.post('/messages', messageData);
            setInputMessage('Message Sent Successfully');
          } catch (error) {
            console.error('Error sending message:', error);
          }
        }
      };
    
    if ( !isvisible) return null;
  return (
    <div className='fixed top-0  w-full h-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
        <div className='bg-white w-[375px] h-[550px] sm:w-[600px] sm:h-[570px] rounded-xl'>
        
        <h1 className='sm:text-4xl text-2xl text-center pt-10'>
        Contact With {}
        <span className='bg-gradient-to-r from-yellow-900 via-cream-light via-yellow-700 to to-yellow-100 bg-clip-text text-transparent'>
        {full_name}
        </span>
        </h1>
        <div className='pt-10 pl-10 pr-10'>
        <div className="grid grid-cols-7">
        <div>
            <img src={profilePic} className='h-12 w-14'></img>
        </div>
            <div className='pt-5 font-bold col-span-6'>
            {full_name}
            <div>
            {/* {full_name} */}
            </div>
            
            </div>
            <div>
                
            </div>
           
        
            
        </div>
        <h1 className='pt-5 font-bold text-xl'>Message:</h1>
            
                <div className='pt-2'>
                <div>
                    <textarea id="textBox" name="example"  className='resize-none border rounded-md p-2 w-full h-60 shadow-lg ' value={inputMessage} required placeholder={`Hi ${full_name}`}  onChange={(e) => setInputMessage(e.target.value)}/>

                </div>
                
                    <div className='md:pt-10 md:pl-96 flex pl-44 pt-7 '>
                        <button className='hover:border-slate-500 rounded-2xl shadow-lg hover:bg-yellow-700 h-8 w-16 text-slate-500 hover:text-white block 'onClick={() => onClose()} >Close</button>
                        <button className='hover:border-slate-500 rounded-2xl shadow-lg hover:bg-yellow-700 h-8 w-16 text-slate-500 hover:text-white block' onClick={handleMessageSend} >Done</button>
                        
                        </div>
                    
                    

                    </div>
                    </div>
        

    </div>
    </div>
  )
}

export default Modal_message;