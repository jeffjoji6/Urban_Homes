import React from 'react';
import Navbar from '../Navbar_contact.js';
import maps from "../../images/maps.png";


const ContactUs = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap"></link>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      </link>
    <Navbar/>
    <div className='bg-white pt-10 w-full rounded-xl'>

              <div className='contus_page px-5 md:px-32'>
                  <div className='head_bx'>
                      <h3>Contact <span>Us</span></h3>
                  </div>
                  <ul class="mb-6 pt-6 flex justify-between list_address">
                        <li class="flex">
                            <div class="flex h-10 w-10 items-center justify-center rounded bg-yellow-700 text-gray-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="h-6 w-6">
                                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                    <path
                                        d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z">
                                    </path>
                                </svg>
                            </div>
                            <div class="ml-4 ">
                                <h3 class="mb-2 text-lg font-medium leading-6 text-gray-900 ">Our Address
                                </h3>
                                <p class="text-gray-600 dark:text-slate-400">25 Scrivener Square, Unit 301, Toronto, </p>
                                <p class="text-gray-600 dark:text-slate-400">Ontario, M4W 3Y6</p>
                            </div>
                        </li>
                        <li class="flex">
                            <div class="flex h-10 w-10 items-center justify-center rounded bg-yellow-700 text-gray-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="h-6 w-6">
                                    <path
                                        d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2">
                                    </path>
                                    <path d="M15 7a2 2 0 0 1 2 2"></path>
                                    <path d="M15 3a6 6 0 0 1 6 6"></path>
                                </svg>
                            </div>
                            <div class="ml-4 mb-4">
                                <h3 class="mb-2 text-lg font-medium leading-6 text-gray-900 ">Contact
                                </h3>
                               
                                <p class="text-gray-600 dark:text-slate-400">Mail: info@halahomes.ca</p>
                            </div>
                        </li>
                        <li class="flex">
                            <div class="flex h-10 w-10 items-center justify-center rounded bg-yellow-700 text-gray-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="h-6 w-6">
                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                    <path d="M12 7v5l3 3"></path>
                                </svg>
                            </div>
                            <div class="ml-4 mb-4">
                                <h3 class="mb-2 text-lg font-medium leading-6 text-gray-900 ">Working
                                    hours</h3>
                                <p class="text-gray-600 dark:text-slate-400">Monday - Friday: 08:00 - 17:00</p>
                                <p class="text-gray-600 dark:text-slate-400">Saturday &amp; Sunday: 08:00 - 12:00</p>
                            </div>
                        </li>
                  </ul>
                  <img src={maps} className='shadow-xl'></img>
                  

                  
                  <div className='flex w-full justify-center'>
            
            <form className='border-0 w-2/3 bg-transparent p-0 form_contus'>
            <div className=' pl-10 flex-col pr-10'>
                <div className='grid grid-rows-2 text-slate-500 pl-4'>
            <div className="grid grid-cols-2 pt-3">
                <div>
                    <h3>Name</h3>
                    <div className='border border-slate-600 rounded-md w-4/5 h-2/3'>
                    <label htmlFor="textBox" className='text-gray-200'></label>
                    <input type="text"
                            id="name"
                            placeholder='Annie Cooper'
                            className='w-full h-full'
                             />
                    </div>
    
    
                </div>
                <div>
                    <h3>Email</h3>
                    <div className='border border-slate-600 rounded-md w-4/5 h-2/3'>
                    <label htmlFor="textBox" className='text-gray-200'></label>
                    <input type="email"
                            id="landSize"
                            placeholder='anniecooper@gmail.com'
                            className='w-full h-full'
                             />
                    </div>
                
    
    
                </div>
                </div>
                <div className="grid grid-cols-2 pt-3">
                <div>
                    <h3>Phone Number</h3>
                    <div className='border border-slate-600 rounded-md w-4/5 h-2/3'>
                    <label htmlFor="textBox" className='text-gray-200'></label>
                    <input type="text"
                            id="requirement"
                            placeholder='+12505550196'
                            className='w-full h-full'
                             
                             />
                    </div>
    
    
                </div>
                <div>
                    <h3>Company</h3>
                    <div className='border border-slate-600 rounded-md w-4/5 h-2/3'>
                    <label htmlFor="textBox" className='text-gray-200'></label>
                    <input type="text"
                            id="city"
                            placeholder=''
                            className='w-full h-full'
                             />
    
                    </div>
    
    
                </div>
                
                </div>
                </div>
                <div className='pt-3 mx-4 text-slate-600'>
                    <h3>Details</h3>
                    <div className='  w-11/12 h-40 '>
                    <label htmlFor="textBox" className='text-gray-200'></label>
                    <textarea 
                            id="additionalInfo"
                            placeholder=''
                            className='w-full h-full border border-slate-600 rounded-md'
                             />
                    </div>
    
    
                </div>
            </div>
            
                
                        <div className=' flex justify-center w-full p-5'>
                            <button className='hover:border-slate-500 rounded-2xl shadow-lg hover:bg-yellow-700 h-10 w-32 text-slate-500 hover:text-white transition-all'>
              Send Message
            </button>
                        </div>
                    
                        </form>
                        </div>
              </div>        

           
           
       
                    
                
             
        

    </div>
    </>
  )
}

export default ContactUs