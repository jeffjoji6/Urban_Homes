import React,{useState, useEffect, Fragment} from 'react';

import api from '../../../Api';
import Cookies from 'js-cookie';

const Modal_post = ({ isvisible, onClose, reported_id, full_name }) => {
  const [firstName, lastName] = full_name.split(' ');
  const [selectedOption, setSelectedOption] = useState('');
  const [formData, setFormData] = useState({
    type: "",
    reason: "",
  });

  if (!isvisible) return null;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const userIdCookie = Cookies.get('user_id');
    const user_id = decodeURIComponent(userIdCookie);
    const postData = {
      user_id: user_id,
      reported_id: reported_id,
      type: formData.type,
      reason: formData.reason,
    };
    console.log(postData)
    try {
      await api.post('/report', postData);
      setFormData({ 
        type: "",
        reason: "Reported Sucessfully",
      });
    } catch (error) {
      console.error("Error Reported data:", error);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value
    });
    if(event.target.type === 'radio'){
      setSelectedOption(event.target.value);
    }
  };

  return (
    <div className='fixed top-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
      <div className='bg-white w-[370px] h-1/2 sm:w-[600px] sm:h-[450px] rounded-xl'>
        <h1 className='sm:text-4xl text-2xl text-center pt-10'>
          {firstName}
          <span className='bg-gradient-to-r pl-2 from-yellow-900 via-cream-light via-yellow-700 to to-yellow-100 bg-clip-text text-transparent'>
            {lastName}
          </span>
        </h1>
        <form onSubmit={handleFormSubmit} className='p-0 bg-transparent border-0'>
        <div className='pt-10 pl-10 pr-10'>
          <div className='flex items-center'>
            <input
              type='radio'
              id='reportRadioButton'
              name='type'
              value='0'
              onChange={handleInputChange}
              className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300'
              checked={selectedOption === '0'}
            />
            <label htmlFor='reportRadioButton' className='ml-2 text-gray-700'>
              Report Comment
            </label>
          </div>
          <div className='pt-2 flex'>
            <input
              type='radio'
              id='blockRadioButton'
              name='type'
              value='1'
              className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300'
              checked={selectedOption === '1'}
              onChange={handleInputChange}
            />
            <label htmlFor='blockRadioButton' className='ml-2 text-gray-700'>
              Block user
            </label>
          </div>

          <div className='pt-8'>
            
              <textarea type='text' className='border resize-none rounded-md p-2  w-[300px] md:w-full h-28 shadow-lg' name='reason' value={formData.reason} onChange={handleInputChange} placeholder={`Type reason why you ${selectedOption === 'report' ? 'report comment' : 'block user'}`} />
            </div>
            
              <div className='flex pt-10 pl-20 md:pt-10 md:pl-96 '>
                <button className='block hover:border-slate-500 rounded-2xl shadow-lg hover:bg-yellow-700 h-8 w-16 text-slate-500 hover:text-white ' onClick={() => onClose()}>
                  Close
                </button>
                <button type='submit' className='block hover:border-slate-500 rounded-2xl shadow-lg hover:bg-yellow-700 h-8 w-16 text-slate-500 hover:text-white'>
                  Done
                </button>
              </div>
            
        </div>
        </form>
      </div>
    </div>
  );
};

export default Modal_post;
