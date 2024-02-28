import React, { useEffect } from 'react';
import profilePic from "../../../images/builderprofile.png";
import {ShareSocial} from 'react-share-social' 
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min.js';
 

const modal_share = ({ isvisible,onClose,url})  => {
    
    if ( !isvisible) return null;
  return (
    <div className='fixed top-0  w-full h-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
        <div className=' w-[600px] h-[300px] border bg-white shadow-2xl' >
            <div className='text-right pr-7 pt-4'>
                <button className='border rounded-full w-6 hover:bg-slate-100 font-medium'onClick={() => onClose()}>X</button>
            </div>
            <div>

            <h1 className='sm:text-4xl text-2xl text-center'>
            Thanks For <span className='bg-gradient-to-r from-yellow-900 via-cream-light via-yellow-700 to to-yellow-100 bg-clip-text text-transparent'>Sharing!</span>
            </h1>
            <div className='grid '>
               
                <ShareSocial  
                url ={`https://halahomes.ca${url}`}
                socialTypes= {['twitter','whatsapp','linkedin','email','telegram','reddit']}
                onSocialButtonClicked={ data => console.log(data)}    
                />
                </div>

            
            </div>

        
       
    </div>
    </div>
  )
}

export default modal_share;