import React,{useState, useEffect, Fragment} from 'react';
import Cookies from 'js-cookie';
import api from '../../Api.js';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min.js';
import '../../App.css';
import Navbar from '../Navbar_white';
import { Link } from 'react-router-dom';
import img from "../../images/Builder/2.png";

export default function UserProfile_post() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const project_id = urlParams.get('project');
    const [portfolio,setPortfolio]= useState([]);
    
    const fetchPortfolio = async ()=>{
        const portfolioData = await api.get(`/portfolio/details/${project_id}`);
        setPortfolio(portfolioData.data[0]);    
    }
    useEffect(() => {
        fetchPortfolio();
      },[]);

  return (
    <>
    <Navbar />
        <div className='w-screen md:w-full mb-40 p-10 md:p-20 justify-center'>
            <div className='md:flex w-full md:space-x-10 justify-center'>
            <img  src={`../uploads/${portfolio.media_url}`} className='w-full md:h-[400px] md:w-1/3 object-cover '></img>
            <div className='shadow-lg space-y-6 p-4 md:p-8 md:w-1/4'>
                <p className='uppercase text-2xl font-bold text-[#994b00]'>Details</p>
                <div>
                    <div className='p-3 justify-between inline-flex w-full bg-[#994b002a]'>
                        <p>Category</p>
                        <p >{portfolio.category}</p>
                    </div>
                    <div className='p-3 justify-between inline-flex w-full bg-transparent'>
                        <p>Square Feet</p>
                        <p >{portfolio.area}</p>
                    </div>
                    <div className='p-3 justify-between inline-flex w-full bg-[#994b002a]'>
                        <p>Length</p>
                        <p >{portfolio.length}</p>
                    </div>
                    <div className='p-3 justify-between inline-flex w-full bg-transparent'>
                        <p>Width</p>
                        <p >{portfolio.width}</p>
                    </div>
                    <div className='p-3 justify-between inline-flex w-full bg-[#994b002a]'>
                        <p>Location</p>
                        <p >{portfolio.location}</p>
                    </div>
                </div>            
            </div>

            </div>
        </div>
    </>
  );
}
