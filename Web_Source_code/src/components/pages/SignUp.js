import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import '../../App.css';
import '../Style.css';
import image from "../../images/sign_up.jpg"
import api from '../../Api.js'
import can from "../../images/image 34.png"

function Signup() {
    
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [formData, setFormData] = useState({
      full_name: "",
      email: "",
      phone: "",
      user_type: "",
      otp:""
    });
    
    useEffect(() => {
    }, []);

    const sendOtp = async () => {
      try {
        const response = await api.post('/signup/otp', {  email: formData.email, name: formData.full_name  });
        if (response && response.data && response.data.success){
          setIsOtpSent(true);
        } else {
          setError('Error sending OTP. Please try again.');
        }
      } catch (error) {
        console.error('Error sending OTP:', error);
    if (error.response && error.response.data && error.response.data.includes('User already exists')) {
      setError('User already exists');
    } else {
      setError('Error sending OTP. Please try again.');
    }
      }
    };

  
  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await api.post('/users', formData);
        console.log(response.data)
        if (response.data === "Signed Up successfully") {
            setIsSignedUp(true);
            console.log("Signed Up successfully");
            window.location.href = '/log-in';
            
        } else {
            setError('');
        }
        } catch (err) {
        setError(err.response.data)
        console.error("Error signing in:", err);
        }
    
  };
    return (
        <>
        <div className="login_sect flex flex-col md:flex-row h-screen">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap"></link>
       
        {/* Left Section - Image */}
      <div className='relative w-full md:w-1/2 h-64 md:h-full flex items-center'>
        <img src={image} className="w-full h-full object-cover" alt="Sign Up Image" />
      </div>

      {/* Right Section - Form */}
      <div className=' w-full md:w-1/2 scale-90 bg-[#fff]'>
        <h3 className='heading_title'><a href="/">Home</a></h3>
                <div className="login_frm_sect">
          <div className="form_crd">
                        <form  className='p-0 border-0'onSubmit={handleFormSubmit} >
                            <div className="row">
                                <div className="col-lg-12 text-center col-md-12 col-sm-12">
                                    <h2 className='text-4xl  font-semibold text-gray-600'>Create Your Account</h2>
                                </div>
                            </div>
                            <div className='inner_bdy'>
                            {error && <p className="text-red-500 text-center mt-2">{error}</p>}  
                            {isOtpSent && <p className="text-green-500 font-bold text-center mt-2">OTP sent succesfully</p>}
                            <div className="row">
                            <div className="col-lg-12 mb-4 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input required type="text" name="full_name" id="full_name" onChange={handleInputChange} value={formData.full_name} className="form-control" placeholder="Annie Cooper" />
                                    </div>
                                </div>
                            <div className="col-lg-12 col-md-12 mb-4 col-sm-12">
                                    <div className="form-group">
                                        <label>Email ID</label>
                                        <input required type="email" name="email" id="email" className="form-control" onChange={handleInputChange} value={formData.email} placeholder="admin@halahomes.ca" />
                                    </div>
                                </div>
                            <div className="col-lg-12 col-md-12 mb-4 col-sm-12">
                                    <div className="form-group grid grid-rows-2">
                                      
                                        <label>Phone Number</label>
                                        <div className='flex '>
                                        <img src={can} className='w-10 h-11 rounded-sm object-contain'></img>
                                        <input required type="text" pattern="^\+[1-9]{1}[0-9]{1,14}$" title="Please enter a valid phone number of format along with country code." name="phone" id="phone" className="form-control" onChange={handleInputChange} value={formData.phone} placeholder="+12505550196" />
                                    </div>
                                    </div>
                                </div>
                            <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                            <label>Choose Category</label>
                                    <select
                                      id='user_type' name='user_type' 
                                      className='form-control' 
                                      onChange={handleInputChange}
                                      value={formData.user_type}
                                      required
                                      // Set a default value if needed
                                    >
                                      <option value="">Select your category</option>
                                      <option value="Home Owner">Home Owner</option>
                                      <option value="Builder">Builder</option>
                                      <option value="Supplier">Supplier</option>
                                      <option value="Designer">Designer</option>
                                    </select>
                                </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="frm_frog">
                                        <div className="otp_grp">
                                            <input required value={formData.otp} onChange={handleInputChange} type="text" name="otp" id="otp" placeholder="* * * *"  className={`form-control ${!isOtpSent && ("bg-gray-200 cursor-not-allowed")} transition-all duration-300`} />
                                            {/* <input type="text" placeholder="*" className="form-control" />
                                            <input type="text" placeholder="*" className="form-control" />
                                            <input type="text" placeholder="*" className="form-control" /> */}
                                        </div>
                                        <div className="pass_rest">
                                        

                                            {!isOtpSent?
                                            (<button onClick={sendOtp} type="button">
                                            <a>Send OTP</a>
                                            </button>
                                            )
                                            :
                                            (<a className='text-gray-400'>OTP already sent</a>)}
                                        </div>
                                    </div>
                                </div>
                                <div className='inline-flex mt-4  w-full justify-center items-center text-center space-x-2'>
                                <input required id="" type="checkbox" value="" className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600" />
                                <p className='text-md font-normal text-gray-600'>I agree with <span className='font-base text-md text-[#994a00be]'>terms and conditions</span>of Halahomes</p>
                                </div>
                                <div className="col-sm-12 -mt-10">
                                    <button type='submit' disabled={!isOtpSent} className='btn'>SIGNUP</button>
                                </div>
                                <div className=' text-center mt-3'>
                            <p className='text-md font-normal mt-40 md:mt-3 text-[#060606]'>Already Have an Account? <Link to="/log-in"><span className='text-md font-semibold text-[#994B00]'>Login</span></Link></p>
                            </div>
                            </div>
                            </div>
                            
                        </form>

                    </div>
                    </div>

        
        </div>
        </div>
        
        </>
    );
};

export default  Signup;