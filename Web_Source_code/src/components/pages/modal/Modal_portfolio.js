import React, { useState, Fragment } from 'react';
import api from '../../../Api.js';
import Cookies from 'js-cookie';

const Modal_quotation = ({ isvisible, onClose, portfolio_id }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    media_url:'',
    area: '',
    length: '',
    width: '',
    location: '',
  });


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const submitPortfolio = async (event) => {
    event.preventDefault();
    try {
      const userIdCookie = Cookies.get('user_id');
      const uid = Number(decodeURIComponent(userIdCookie));

      // Upload the file first
      const uploadedFile = await upload();

      const detailsData = {
        portfolio_id:portfolio_id,
        media_url: uploadedFile, // Assuming your API response has the URL of the uploaded file
        area: formData.area,
        length: formData.length,
        width: formData.width,
        location: formData.location,
      };

      // Send a POST request to the /portfolio_details endpoint
      await api.post('/portfolio/details', detailsData);

      onClose(); // Close the modal after successful submission

    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setPreview(event.target.files[0]);
  };

  const upload = async () => {
    try {
      const fileData = new FormData();
      fileData.append('file', file);
      const res = await api.post('/upload', fileData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

    if ( !isvisible) return null;
  return (
    <Fragment>

        <div className='fixed top-0  w-full h-full flex items-center justify-center bg-black  bg-opacity-50 backdrop-blur-sm'>
        <div className='bg-white sm:w-[550px] rounded-xl'>
        
        <h1 className='sm:text-4xl text-2xl text-center pt-10'>
        Add new Project
        </h1>
        <form onSubmit={submitPortfolio} className='border-0 bg-transparent p-0 w-full justify-center'>
        <div className='md:space-y-6'>
        {file&&(
                  <div className='flex justify-center'>
                  <img
                    src={URL.createObjectURL(preview)}
                    className='max-h-[200px] max-w-[500px] h-80 w-80 p-6 md:p-0 object-cover rounded-lg border-slate-200'
                    alt='Uploaded Image'
                  />
                </div>              )}
            <div className='flex-col w-full px-3'>
              <div className='grid md:grid-flow-col items-center w-full justify-stretch'>
              <label for="img_upload"  className=' mx-10 text-center block uppercase rounded-full py-3 text-md p-2 px-0 bg-[#994b00] transition-all text-white hover:text-[#994b00] hover:bg-[#994b002a] '> Upload <input required type="file" onChange={handleFileChange} id="img_upload" name='project_img' accept="image/* " class="w-[1px] p-[0px] h-[1px]"></input>Project Image</label>

               </div>
            </div>
        </div>
        <div className=' pl-10 pr-10'>
            <div className='grid grid-rows-2 text-slate-500 pl-4'>
        <div className="grid grid-cols-2 pt-3">
            <div>
                <h3>Square Feet</h3>
                <div className='border border-slate-600 rounded-md w-4/5 h-2/3'>
                <label htmlFor="textBox" className='text-gray-200'></label>
                <input type="text"
                        id="area"
                        placeholder='500'
                        className='w-full h-full'
                        value={formData.area}
                        onChange={handleChange}
                        required
                        />
                </div>


            </div>
            <div>
                <h3>Length</h3>
                <div className='border border-slate-600 rounded-md w-4/5 h-2/3'>
                <label htmlFor="textBox" className='text-gray-200'></label>
                <input type="text"
                        id="length"
                        placeholder='72'
                        className='w-full h-full'
                        value={formData.length}
                        onChange={handleChange}
                        required
                        />
                </div>
            


            </div>
            </div>
            <div className="grid grid-cols-2 pt-3">
            <div>
                <h3>Width</h3>
                <div className='border border-slate-600 rounded-md w-4/5 h-2/3'>
                <label htmlFor="textBox" className='text-gray-200'></label>
                <input type="text"
                        id="width"
                        placeholder='32'
                        className='w-full h-full'
                        value={formData.width}
                        onChange={handleChange} 
                        required
                        />
                </div>


            </div>
            <div>
                <h3>Location</h3>
                <div className='border border-slate-600 rounded-md w-4/5 h-2/3'>
                <label htmlFor="textBox" className='text-gray-200'></label>
                <input type="text"
                        id="location"
                        placeholder='St. Catherines'
                        className='w-full h-full'
                        value={formData.location}
                        onChange={handleChange}
                        required
                        />
                </div>
            </div>
            </div>
            </div>
        </div>
        <div className='flex md:pt-20  md:pl-80 pl-16 pt-14 '>
          <button className='hover:border-slate-500 rounded-2xl shadow-lg hover:bg-yellow-700 h-10 w-16 text-slate-500 hover:text-white mx-6 transition-all'onClick={() => onClose()} >Close</button>
          <button
          className='hover:border-slate-500 rounded-2xl shadow-lg hover:bg-yellow-700 h-10 w-16 text-slate-500 hover:text-white transition-all'
          type='submit'
          >
            Done
          </button>
        </div>
    
      </form>
                
             
        

    </div>
    </div>


    
    
    </Fragment>
  )
  
}


export default Modal_quotation;
