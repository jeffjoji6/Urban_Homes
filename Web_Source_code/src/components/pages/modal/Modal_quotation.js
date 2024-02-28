import React,{useState, useEffect, Fragment} from 'react'
import api from '../../../Api.js'
import Cookies from 'js-cookie';
import sent from "../../../images/vanshika_w.gif";





const Modal_quotation = ({ isvisible,onClose,receiver_id})  => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        landSize: '',
        requirement: '',
        city: '',
        province: '',
        zipCode: '',
        additionalInfo: '',
      });

      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
      };

      const createQuotationMessage = () => {
        const {
          name,
          landSize,
          requirement,
          city,
          province,
          zipCode,
          additionalInfo,
        } = formData;
    
        // Create a string with all the details
        const message = `Name: ${name}\nLand Size (SQ FT): ${landSize}\nRequirement: ${requirement}\nCity: ${city}\nProvince: ${province}\nZip code: ${zipCode}\nAdditional Info: ${additionalInfo}`;
    
        return message;
      };

      const sendQuotationRequest = async () => {
        try {
          const message = createQuotationMessage();
    
          const userIdCookie = Cookies.get('user_id');
          const uid = Number(decodeURIComponent(userIdCookie));
    
          const messageData = {
            user_id: uid,
            receiver_id: receiver_id,
            message: message,
          };
    
          // Send a POST request to the /messages endpoint
          await api.post('/messages', messageData);
    
          // Show the success modal
          setShowModal(true);
        } catch (error) {
          console.error('Error sending message:', error);
        }
      };


    if ( !isvisible) return null;
  return (
    <Fragment>
    {showModal?(
        <div className='fixed top-0  w-full h-full flex items-center justify-center bg-black  bg-opacity-50 backdrop-blur-sm'>
            <div className=' w-[500px] h-[400px] border bg-white shadow-2xl' >
            
            <div>
                <div className='flex justify-center pt-5'>
                    <img src={sent}></img>
            </div>
        
            <h1 className='sm:text-xl text-2xl text-center p-10'>
            Your request has been sent to our professional.He will get back to you soon.
            </h1>
            <div className='text-center pt-3'>
            <button className=' border border-slate-200 hover:border-slate-500 rounded-full shadow-md hover:bg-yellow-700 h-10 w-24 text-slate-500 hover:text-white transition-all 'onClick={()=>{onClose();setShowModal(false)}}>OK</button>
            </div>

            
            </div>

        
       
    </div>
            
        </div>
        
    ):(
        <div className='fixed top-0  w-full h-full flex items-center justify-center bg-black  bg-opacity-50 backdrop-blur-sm'>
        <div className='bg-white w-[375px] h-[700px] sm:w-[550px] sm:h-[570px] rounded-xl'>
        
        <h1 className='sm:text-4xl text-2xl text-center pt-10'>
        Request for Quotation
        </h1>
        <h2 className='tracking-wide pt-4 text-center'>This info will be shared with the Professional</h2>
        <form className='border-0 bg-transparent p-0 w-full justify-center'>
        <div className=' pl-10 pr-10'>
            <div className='grid grid-rows-4 text-slate-500 pl-4'>
        <div className="sm:grid grid-cols-2 sm:pt-3">
            <div>
                <h3>Name</h3>
                <div className='border border-slate-600 rounded-md w-4/5 h-2/3'>
                <label htmlFor="textBox" className='text-gray-200'></label>
                <input type="text"
                        id="name"
                        placeholder='Annie Cooper'
                        className='w-full h-full'
                        value={formData.name}
                        onChange={handleChange} />
                </div>


            </div>
            <div>
                <h3>Land Size (SQ FT)</h3>
                <div className='border border-slate-600 rounded-md w-4/5 h-2/3'>
                <label htmlFor="textBox" className='text-gray-200'></label>
                <input type="text"
                        id="landSize"
                        placeholder='600'
                        className='w-full h-full'
                        value={formData.landSize}
                        onChange={handleChange} />
                </div>
            


            </div>
            </div>
            <div className="sm:grid grid-cols-2 sm:pt-3">
            <div>
                <h3>Requirement</h3>
                <div className='border border-slate-600 rounded-md w-4/5 h-2/3'>
                <label htmlFor="textBox" className='text-gray-200'></label>
                <input type="text"
                        id="requirement"
                        placeholder='Home'
                        className='w-full h-full'
                        value={formData.requirement}
                        onChange={handleChange} 
                         />
                </div>


            </div>
            <div>
                <h3>Province</h3>
                <div className='border border-slate-600 rounded-md w-4/5 h-2/3'>
                <label htmlFor="textBox" className='text-gray-200'></label>
                <input type="text"
                        id="city"
                        placeholder='St. Catherines'
                        className='w-full h-full'
                        value={formData.city}
                        onChange={handleChange} />

                </div>


            </div>
            </div>
            <div className="sm:grid grid-cols-2 sm:pt-3">

            
            <div>
                <h3>Zip code</h3>
                <div className='border border-slate-600 rounded-md w-4/5 h-2/3'>
                <label htmlFor="textBox" className='text-gray-200'></label>
                <input type="text"
                        id="zipCode"
                        placeholder='L2R 3H6'
                        className='w-full h-full'
                        value={formData.zipCode}
                        onChange={handleChange} />
                </div>


            </div>
            </div>
            <div className='sm:pt-3'>
                <h3>Additional Info</h3>
                <div className='border border-slate-600 rounded-md  w-11/12 h-2/3'>
                <label htmlFor="textBox" className='text-gray-200'></label>
                <input type="text"
                        id="additionalInfo"
                        placeholder=''
                        className='w-full h-full'
                        value={formData.additionalInfo}
                        onChange={handleChange} />
                </div>


            </div>
            </div>
            

        
            
           
        
            
        
        </div>
        
            
                
                
                
               {/* button */}
                    <div className='sm:pt-12 pt-6 pl-20 sm:pl-80 '>
                        <button className='hover:border-slate-500 rounded-2xl shadow-lg hover:bg-yellow-700 h-10 w-16 text-slate-500 hover:text-white mx-6 transition-all'onClick={() => onClose()} >Close</button>
                        <button
          className='hover:border-slate-500 rounded-2xl shadow-lg hover:bg-yellow-700 h-10 w-16 text-slate-500 hover:text-white transition-all'
          onClick={() => {
            sendQuotationRequest(); // Call function to send the message
            setShowModal(true);
          }}
        >
          Done
        </button>
                    </div>
                
                    </form>
                
             
        

    </div>
    </div>

    )}
    
    
    </Fragment>
  )
  
}


export default Modal_quotation;
