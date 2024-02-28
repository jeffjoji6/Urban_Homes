import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import '../../App.css';
import '../Style.css';
import image from "../../images/sign_up.jpg"
import api from '../../Api.js'
import Popup from './modal/Popup.js';

function Login() {
    const [email, setEmail] = useState('');
    const [otp, setotp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [error, setError] = useState('');
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isStatus, setIsStatus] = useState()

    const handlePopupClose = () => {
        document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'Full Name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'Category=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setPopupOpen(false);
    };

    const sendOtp = async () => {
        try {
          const response = await api.post('/login/otp', { email });
          if (response && response.data && response.data.success) {
            setIsOtpSent(true);
          } else {
            setError('Error sending OTP. Please try again.');
          }
        } catch (error) {
          console.error('Error sending OTP:', error);
          if (error.response && error.response.data && error.response.data.includes('User does not exist')) {
            setError('User does not exist. Please check your email.');
          } else {
            setError('Error sending OTP. Please try again.');
          }
        }
      };
      

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
        const response = await api.post('/login', { email, otp });
        if (response && response.data && response.data.message === 'Login successful') {
            if(response.data.status === 0){
                setPopupOpen(true)
               return false;
            }
            const userCookie = response.headers['set-cookie'];
            console.log("Logged In Succesfully")
            window.location.href = '/community';
            if (userCookie){
                localStorage.setItem('userCookie', userCookie);
            }
            
        } else {
            setError('Invalid credentials');
        }
        } catch (error) {
        console.error("Error logging in:", error);
        }
    };

    if(isPopupOpen){
        return(
          <div>
             <Popup isOpen={isPopupOpen} onClose={handlePopupClose} />
          </div>
        )
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
      <div className=' w-full md:w-1/2 bg-[#fff]'>
        <h3 className='heading_title'><a href="/">Home</a></h3>
                <div className="login_frm_sect">
          <div className="form_crd">
                        <form onSubmit={handleLogin}>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <h3>Welcome Back</h3>
                                </div>
                            </div>
                            <div className='inner_bdy'>
                            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                            {isOtpSent && <p className="text-green-500 font-bold text-center mt-2">OTP sent succesfully</p>}
                            <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <label>Email ID</label>
                                        <input type="email" placeholder="Annie.cooper@gmail.com" name="email" id="email" className="form-control"  value={email}  onChange={(e) => setEmail(e.target.value)} required/>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="frm_frog">
                                        <div className="otp_grp">
                                            <input disabled={!isOtpSent} required name="otp" id="otp"  value={otp}  onChange={(e) => setotp(e.target.value)} type="text" placeholder="* * * * " className={`form-control ${!isOtpSent && ("bg-gray-200 cursor-not-allowed")} transition-all duration-300`} />
                                            {/* <input type="text" placeholder="*" className="form-control" />
                                            <input type="text" placeholder="*" className="form-control" />
                                            <input type="text" placeholder="*" className="form-control" /> */}
                                        </div>
                                        <div className="pass_rest">
                                        <button onClick={sendOtp} type="button">
                                            {!isOtpSent?
                                            (<a>Send OTP</a>)
                                            :
                                            (<a>Resend OTP</a>)}
                                        </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <button disabled={!isOtpSent} type='submit' className='btn'>Login</button>
                                </div>
                            </div>
                            </div>
                            <div className=' text-center mt-3'>
                            <p className='text-md font-normal mt-40 md:mt-0 text-[#060606]'>Enter Login Details or <Link to="/sign-up"><span className='text-md font-base text-[#994B00]'>Create Account</span></Link></p>
                            </div>
                        </form>

                    </div>
                    </div>

        
        </div>
        </div>
        
        </>
    );
};

export default  Login;