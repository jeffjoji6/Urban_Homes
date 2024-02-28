

import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import '../../../App.css';
import '../../Style.css';
import image from "../../../images/sign_up.jpg"

function AdminLogin() {
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
                        <form action="">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <h3>Admin Login</h3>
                                </div>
                            </div>
                            <div className='inner_bdy'>
                            <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <label>Email ID</label>
                                        <input type="text" name="" id="" className="form-control" placeholder="admin@halahomes.ca" />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="frm_frog">
                                        <div className="otp_grp">
                                            <input type="text" placeholder="*" className="form-control" />
                                            <input type="text" placeholder="*" className="form-control" />
                                            <input type="text" placeholder="*" className="form-control" />
                                            <input type="text" placeholder="*" className="form-control" />
                                        </div>
                                        <div className="pass_rest">
                                            00:14 <a href="#">Resend OTP</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <a href='https://adminhalahomes.waysdatalabs.com/' className='btn'>Login</a>
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

export default  AdminLogin;