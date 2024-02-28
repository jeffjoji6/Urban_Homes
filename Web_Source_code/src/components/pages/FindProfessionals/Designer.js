import React,{useState, useEffect, Fragment} from 'react';
import api from '../../../Api.js'
import Modal from '../modal/modal_message.js';
import '../../../App.css';
import { Link } from 'react-router-dom';
import userImage from "../../../images/Designer/find_cover.jpg";
import profilePic from "../../../images/Designer/profile_pic.jpg";
import defaultUser from "../../../images/user_0_img.jpg";
import img1 from "../../../images/Designer/12.jpg";
import img2 from "../../../images/Designer/13.jpg";
import img3 from "../../../images/Designer/14.jpg";
import img4 from "../../../images/Designer/15.jpg";
import left from "../../../images/Icons/L_arrow.svg"
import right from "../../../images/Icons/R_arrow.svg"
import Navbar from '../../Navbar_white';

export default function UserProfile_post() {

  const [isFilter,setIsFilter] = useState(true);
  const [users,setUsers]=useState([])
  const [expanded1, setExpanded1] = useState(false);
  const [isDrop1,setIsDrop1] = useState(true);
  const [isDrop2,setIsDrop2] = useState(true);
  const [isDrop3,setIsDrop3] = useState(true);
  const [isDrop4,setIsDrop4] = useState(true);
  const [city,setCity] = useState('');
  const [rating, setRating] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedId, setSelectedId] = useState('');
    
  const [experience, setExperience] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  const postsPerPage = 4;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }


  const paginate = (pageNumber) => setCurrentPage(pageNumber);    
  


  const handleReadMoreClick1 = () => {
    setExpanded1(()=> (!expanded1));
  };

  
  

  useEffect(() => {
    fetchUser()
  },[searchTerm,city,rating,experience])


// Filter users based on search term
const filteredUsers = users.filter((user) =>
  user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
);

  const fetchUser = async () => {
    try {
      // const filterData={
      //   category: 'Builder', // Change this category as needed
      //   city_name: city,
      // }
      // console.log(filterData);
      const response = await api.get(`/users?category=Designer&city=${city}&rating=${rating}&experience=${experience}`);
      console.log(response.data)
  
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  const truncateText = (text) => {
    if (text && typeof text === 'string') {
      const words = text.split(' ');
      if (words.length > 50) {
        return words.slice(0, 70).join(' ') + '...';
      }
      return text;
    }
    return '';
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // Change the width based on your phone breakpoint

    const handleScreenChange = (e) => {
      setIsFilter(e.matches); // Set state based on screen width
    };


    setIsFilter(mediaQuery.matches);


    // Add event listener to listen for changes in screen size
    mediaQuery.addEventListener('change', handleScreenChange);

    // Clean up the event listener
    return () => {
      mediaQuery.removeEventListener('change', handleScreenChange);
    };
  }, []);
  return (
    <Fragment>
    
    <Navbar />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap"></link>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet" />
    <div className='bg-white-800 p-8 text-white text-center w-full-z-10'>
      <div className='flex flex-col w-full h-full '>
        <div className="absolute items-center inset-0 h-[320px] md:h-[670px]  bg-gradient-to-b from-black to-transparent opacity-85  -z-10"></div>
          <img src={userImage} alt= "pool-side home"className=' absolute inset-0 h-[320px] md:h-[670px] w-full   object-cover -z-20'></img>
          <h1 className=' justify-center text-5xl md:text-7xl  text-white mx-auto font-extrabold pt-0 md:pt-40'>Get Matched with </h1>
          <h1 className=' justify-center text-5xl md:text-7xl  text-white mx-auto font-extrabold '>Designer</h1>
          <p className='justify-center text-xl text-opacity-85 text-white mx-auto pt-6'></p>
          <p className='justify-center text-xl text-white text-opacity-85 md:mb-48 mx-auto'></p>
        </div>
        <div className="relative w-full pt-20 h-full mb-40 md:flex">
        <div className='md:w-1/4 md:pl-16 px-5  text-left overflow-hidden'>
         {!isFilter?(
         <>
         <button onClick={()=> setIsFilter((prev)=>(!prev))} className=' block mb-3 md:hidden w-full rounded-md text-xl p-2 font-bold uppercase border-2 bg-[#994B00] text-white'>Hide Filters</button>
<div className='p-4 border shadow-md rounded-md md:p-0 md:border-0 md:shadow-none'><p className='px-3 mt-0 mb-2 text-gray-600'>Location</p>
            <select onChange={(e) => setCity(e.target.value)}
        // id='Category' name='Category' onChange={handleInputChange} value={formData.name}
        className='w-full transition-all text-gray-500 mb-4 py-3 px-3 rounded-sm bg-transparent outline focus:outline outline-gray-100 focus:outline-gray-200'
        defaultValue="Search City, State or ZIP"
        >
            
            <option value="">Select City</option>
            <option value="Toronto">Toronto</option>
            <option value="Calgary">Calgary</option>
            <option value="Vancouver">Vancouver</option>
            <option value="Montreal">Montreal</option>
            <option value="Victoria">Victoria</option>
            <option value="St. Johns">St. Johns</option>
            <option value="Edmonton">Edmonton</option>
            <option value="Quebec">Quebec</option>
            <option value="Ottawa">Ottawa</option>
            <option value="Hamilton">Hamilton</option>
            <option value="Regina">Regina</option>
        </select> 
        <p className='px-3 mb-2 text-gray-600'>Distance</p>
                <select
            // id='Category' name='Category' onChange={handleInputChange} value={formData.name}
            className='w-full transition-all text-gray-500 mb-4 py-3 px-3 rounded-sm bg-transparent outline focus:outline outline-gray-100 focus:outline-gray-200'
            defaultValue="Search City, State or ZIP"
        >
            <option value="category1">50 MI</option>
            <option value="category1">75 MI</option>
            <option value="category1">100 MI</option>
            <option value="category1">150 MI</option>
        </select> 
<div className='pl-1 divide-gray-200 divide-y'>
    <div className='w-full pb-4'>
        <button onClick={() => setIsDrop1((prev)=> !prev)} className=" transition-all hover:text-[#994b00] text-gray-800 w-full justify-between font-bold inline-flex md:pt-3" type="button">Project Type<svg className="w-2.5 mt-1.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
        </button>   


{!isDrop1 ? (
<div className="z-10 w-full">
    <ul className="py-2 px-1 space-y-1 text-sm text-gray-700 dark:text-gray-200">
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="checkbox-item-4" type="checkbox" value="" className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600" />
          <label for="checkbox-item-4" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Small-scale</label>
        </div>
      </li>
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="checkbox-item-6" type="checkbox" value="" className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600" />
          <label for="checkbox-item-6" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Mid-scale</label>
        </div>
      </li>
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="checkbox-item-6" type="checkbox" value="" className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600" />
          <label for="checkbox-item-6" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Large-scale</label>
        </div>
      </li>
    </ul>
</div>):(
    <div className='hidden'></div>
)}
</div>
<div className='w-full pb-4'>
        <button onClick={() => setIsDrop2((prev)=> !prev)} className="transition-all hover:text-[#994b00] text-gray-800 w-full justify-between font-bold inline-flex md:pt-3" type="button">Style<svg className="w-2.5 mt-1.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
        </button>   


{!isDrop2 ? (
<div className="z-10 w-full">
    <ul className="py-2 px-1 space-y-1 text-sm text-gray-700 dark:text-gray-200">
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="checkbox-item-4" type="checkbox" value="" className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600" />
          <label for="checkbox-item-4" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Modern</label>
        </div>
      </li>
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="checkbox-item-6" type="checkbox" value="" className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600" />
          <label for="checkbox-item-6" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Eco-friendly</label>
        </div>
      </li>
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="checkbox-item-6" type="checkbox" value="" className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600" />
          <label for="checkbox-item-6" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Contemporary</label>
        </div>
      </li>
    </ul>
</div>):(
    <div className='hidden'></div>
)}
</div>
{/* <div className='w-full pb-4'>
        <button onClick={() => setIsDrop3((prev)=> !prev)} className="text-gray-800 transition-all hover:text-[#994b00] w-full justify-between font-bold inline-flex md:pt-4" type="button">Rating<svg className="w-2.5 mt-1.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
        </button>   


{!isDrop3 ? (
<div className="z-10 w-full">
    <ul className="py-2 px-1 space-y-1 text-sm text-gray-700 dark:text-gray-200">
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="radio-item-4" type="radio" onChange={(e) => setRating(e.target.value)} value="4" checked={rating === '4'} className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600" />
          <label htmlFor="radio-item-4" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300 inline-flex">4&#9733; & above</label>
        </div>
      </li>
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="radio-item-3" type="radio" onChange={(e) => setRating(e.target.value)} value="3" checked={rating === '3'} className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600" />
          <label htmlFor="radio-item-3" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300 inline-flex">3&#9733; & above</label>
        </div>
      </li>
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="radio-item-2" type="radio" onChange={(e) => setRating(e.target.value)} value="2" checked={rating === '2'} className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600" />
          <label htmlFor="radio-item-2" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300 inline-flex">2&#9733; & above</label>
        </div>
      </li>
      
      
    </ul>
</div>):(
    <div className='hidden'></div>
)}
</div> */}
<div className='w-full'>
        <button onClick={() => setIsDrop4((prev)=> !prev)} className="text-gray-800 transition-all hover:text-[#994b00] w-full justify-between font-bold inline-flex md:pt-3" type="button">Experience<svg className="w-2.5 mt-1.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
        </button>   


{!isDrop4 ? (
<div className="z-10 w-full">
    <ul className="py-2 px-1 space-y-1 text-sm text-gray-700 dark:text-gray-200">
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="radio-item-gt20" type="radio" value="20 Years and above" onChange={(e) => setExperience(e.target.value)}  checked={experience === '20 Years and above'} className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600" />
          <label htmlFor="radio-item-gt20" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">20 Years and above</label>
        </div>
      </li>
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="radio-item-10t20" type="radio" value="10-20 Years" onChange={(e) => setExperience(e.target.value)}  checked={experience === '10-20 Years'} className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600" />
          <label htmlFor="radio-item-10t20" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">10-20 Years</label>
        </div>
      </li>
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="radio-item-5t10" type="radio" value="5-10 Years" onChange={(e) => setExperience(e.target.value)}  checked={experience === '5-10 Years'} className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600" />
          <label htmlFor="radio-item-5t10" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">5-10 Years</label>
        </div>
      </li>
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="radio-item-lt5" type="radio" value="Less than 5 Years" onChange={(e) => setExperience(e.target.value)}  checked={experience === 'Less than 5 Years'} className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600" />
          <label htmlFor="radio-item-lt5" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Less than 5 Years</label>
        </div>
      </li>
    </ul>
</div>):(
    <div className='hidden'></div>
)}
</div>
</div>
</div>
    </>  ):(<button onClick={()=> setIsFilter((prev)=>(!prev))} className=' block mb-3 md:hidden w-full rounded-md text-xl p-2 font-bold uppercase border-2 transition-all border-[#994B00] text-[#994B00]'>Filter Builders</button>
      )
}
              {/* <p className='text-gray-800 uppercase font-bold pt-2 pb-4'>Notifications</p> */}
    
        </div>
      
      <div className="flex-col w-full divide-y md:px-20 mx-auto">
      <div className='w-full flex items-center justify-between'> 
<div className='hidden md:block'>
<buttton className='p-2 rounded-full  px-4 bg-[#994B00]'>Designer <i className="bg-white px-1 ml-14 rounded-full py-0.5 text-[#994B00] fas fa-times"></i>
</buttton>
</div>
<div className='w-full md:w-auto'>
<input type="text" onChange={(e) => {setSearchTerm(e.target.value);setCity("");setExperience('');setRating("");}} placeholder="Search by Name or Keyword" className="mt-8 md:mt-0 w-full md:w-72 md:justify-end transition-all  text-gray-500 py-3 px-3 rounded-sm bg-transparent outline focus:outline outline-gray-100 focus:outline-gray-200" />
</div>
</div>

{/*-----------------------------------------------------------------------------------1st post-----------------------------------------------------------------------*/}
{!searchTerm ? (<div>
     {users[0] ? (<tbody>
      {currentPosts.map((user)=>(
      <tr key={user.id}>

         <div className='md:flex text-left space-x-5 mt-4 p-4 overflow-hidden hover:scale-[1.01] hover:outline-1 outline hover:outline-gray-200 transition-all '>
        
         <img src={img2} className=' mb-5 p-1.5 transition-all  w-full md:w-1/6 md:mb-0 object-contain object-top '></img>

         
         <div className='w-full flex-col'>

           <div className='flex py-1'>
             <div className=' justify-between w-full md:flex'>
         <Link to={`/profile/?user_id=${user.user_id}`}>
             <div className='flex'>
<img src={defaultUser} className='h-14 object-cover rounded-full border-2 mr-2 border-slate-200'></img>
             <div className='flex-col'>
               <h2 className='transition-all hover:text-[#994b00] text-black text-xl'>
               {user.full_name}
               </h2>
               <h3 className='text-gray-600 inline-flex te'>
               <p className='font-bold items-center inline-flex'>
            {/* <p className='text-yellow-400 pr-1 text-md'> {user.rating}</p> 
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <span key={index}>
                  {ratingValue <= user.rating ? (
                    <span className='text-yellow-400'>&#9733;</span>
                  ) : (
                    <span className='text-yellow-600 opacity-75'>&#9733;</span>
                  )}
                </span>
              );
            })} */}
          </p> 
               </h3>
               </div>
               </div>
       </Link>
               <div> 
               <button onClick={() => { setShowModal(true); setFullName(user.full_name); setSelectedId(user.user_id)}} className='transition-all hover:scale-105 h-full px-5 bg-transparent text-[#994B00] border  border-green-700 rounded-md font-bold text-sm md:text-xl'><i className="mr-2 text-[#994b00]  fas fa-envelope"></i>Send Message</button>
</div>
             </div>
           </div>

           <div className='flex w-full justify-between'>
           <div className=' max-w-3xl mt-4'>
             <p className='text-gray-600 rounded-md font-semibold bg-gray-100 p-1 px-2 space-x-2 inline-flex'>
             <i className="fa-solid fas  text-green-700 mt-1 fa-birthday-cake"></i><p>{user.experience} Years in Business</p>
             </p>
             <div className='w-full mt-2'>
             
                     <p className='text-black mt-2 mb-5 md:mb-0 '>{truncateText(user.about_us)}
                     <Link to={`/profile/?user_id=${user.user_id}`}><span onClick={handleReadMoreClick1} className='font-bold' style={{ color: '#994B00', cursor: 'pointer' }}>
                         Read more &gt;
                     </span>
       </Link>
                     </p>
                
             </div>
           </div>
           <div className='text-gray-600 mt-4  space-x-1 hidden md:inline-flex h-full items-center text-center'><i className="fas fa-map-marker-alt"></i><p className='font-bold'> Projects</p><p> in {user.city}</p></div>
           </div>
         </div>
       </div>
       </tr>
    ))}
    </tbody>):(
    <div className='border-0'> 
      <p className='text-3xl font-bold pt-12 text-gray-300'>No Designers for selected Filters</p>
      </div>)}
      </div>):(
        <div>
        {users[0] ? (<tbody>
         {filteredUsers.map((user)=>(
         <tr key={user.id}>
   
            <div className='md:flex text-left space-x-5 mt-4 p-4 overflow-hidden hover:scale-[1.01] hover:outline-1 outline hover:outline-gray-200 transition-all '>
           
            <img src={img2} className=' mb-5 p-1.5 transition-all  w-full md:w-1/6 md:mb-0 object-contain object-top '></img>
   
            
            <div className='w-full flex-col'>
   
              <div className='flex py-1'>
                <div className=' justify-between w-full flex'>
            <Link to={`/profile/?user_id=${user.user_id}`}>
                <div className='flex'>
   <img src={defaultUser} className='h-14 object-cover rounded-full border-2 mr-2 border-slate-200'></img>
                <div className='flex-col'>
                  <h2 className='transition-all hover:text-[#994b00] text-black text-xl'>
                  {user.full_name}
                  </h2>
                  <h3 className='text-gray-600 inline-flex te'>
                  <p className='font-bold items-center inline-flex'>
               {/* <p className='text-yellow-400 pr-1 text-md'> {user.rating}</p> 
               {[...Array(5)].map((star, index) => {
                 const ratingValue = index + 1;
                 return (
                   <span key={index}>
                     {ratingValue <= user.rating ? (
                       <span className='text-yellow-400'>&#9733;</span>
                     ) : (
                       <span className='text-yellow-600 opacity-75'>&#9733;</span>
                     )}
                   </span>
                 );
               })} */}
             </p> 
                  </h3>
                  </div>
                  </div>
          </Link>
                  <div> 
                  <button onClick={() => { setShowModal(true); setFullName(user.full_name);setSelectedId(user.user_id) }} className='transition-all hover:scale-105 h-full px-5 bg-transparent text-[#994B00] border  border-green-700 rounded-md font-bold'><i className="mr-2 text-[#994b00]  fas fa-envelope"></i>Send Message</button>
</div>
                </div>
              </div>
   
              <div className='flex w-full justify-between'>
              <div className=' max-w-3xl mt-4'>
                <p className='text-gray-600 rounded-md font-semibold bg-gray-100 p-1 px-2 space-x-2 inline-flex'>
                <i className="fa-solid fas  text-green-700 mt-1 fa-birthday-cake"></i><p>{user.experience} Years in Business</p>
                </p>
                <div className='w-full mt-2'>
                
                        <p className='text-black mt-2 mb-5 md:mb-0 '>{truncateText(user.about_us)}
                        <Link to={`/profile/?user_id=${user.user_id}`}><span onClick={handleReadMoreClick1} className='font-bold' style={{ color: '#994B00', cursor: 'pointer' }}>
                            Read more &gt;
                        </span>
          </Link>
                        </p>
                   
                </div>
              </div>
              <div className='text-gray-600 mt-4  space-x-1 hidden md:inline-flex h-full items-center text-center'><i className="fas fa-map-marker-alt"></i><p className='font-bold'> Projects</p><p>in {user.city}</p></div>
              </div>
            </div>
          </div>
          </tr>
       ))}
       </tbody>):(<div className='border-0'> 
         <p className='text-3xl font-bold pt-12 text-gray-300'>No Designers for selected Filters</p>
         </div>)}
         </div>
      )}
        </div>
    
    </div>
    <div className='flex space-x-4 mt-20 justify-center'>
              <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className='border-2 flex border-black rounded-full py-2 pr-7 hover:bg-[#994B002a] transition-all px-4 '>
                <img src={left} className='h-7 object-contain'/><img src={left} className='h-7 object-contain -ml-4'/><p className='pb-1 ml-2 text-xl font-bold text-black'>Previous</p>
              </button>
              <div className='bg-[#994B002a] overflow-hidden  h-full items-center rounded-2xl text-[#994B00] font-bold hidden md:flex '>
              {pageNumbers.map((number) => (
                <button
                key={number}
                onClick={() => paginate(number)}
                className={`flex rounded-xl hover:bg-[#994B002a] transition-all py-3 px-6 ${
                  currentPage === number ? 'bg-[#994b00] text-white' : ''
                }`}
              >
                {number}
              </button>
            ))}
            </div>
              <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastPost >= users.length} className='border-2 flex border-black rounded-full hover:bg-[#994B002a] transition-all py-2 px-4 pl-7 '>
              <p className='pb-1 text-xl font-bold text-black mr-10'>Next</p><img src={right} className='h-7 object-contain'/><img src={right} className='h-7 object-contain -ml-4'/>
              </button>
            </div>
      {/* Other content in the UserProfile component */}
    </div>
    <Modal isvisible ={showModal} onClose={() =>setShowModal((prev)=>(!prev))} full_name={fullName} receiver_id={selectedId}/>
</Fragment>
  );
}



{/* <div className='md:flex text-left space-x-5 mt-4 pt-6 p-4 overflow-hidden '>
        
<img src={img3} className=' mb-5 p-1.5 transition-all hover:scale-105 w-full md:w-1/6 md:mb-0 object-contain object-top '></img>
<div className='w-full flex-col'>
  <div className='flex py-1'>
    <div className=' justify-between w-full flex'>
    <div className='flex'><img src={defaultUser} className='h-14 object-cover rounded-full border-2 mr-2 border-slate-200'></img>
    <div className='flex-col'>
      <h2 className='text-black transition-all hover:text-[#994b00] text-xl'>
      Swift_SiteBuilder
      </h2>
      <h3 className='text-gray-600 inline-flex te'>
      <p className=' text-yellow-400 font-bold inline-flex'>5.0 <p className='ml-1 -mt-1 text-lg'>&#9733;&#9733;&#9733;&#9733;&#9733;</p></p> 61 Reviews
      </h3>
      </div>
      </div>
      <div>
        <button className='transition-all hover:scale-105 h-full px-5 bg-transparent text-[#994B00] border  border-green-700 rounded-md font-bold'><i className="mr-2 text-[#994b00]  fas fa-envelope"></i>Send Message</button>
      </div>
    </div>
  </div>
  <div className='flex w-full justify-between'>
  <div className=' max-w-3xl mt-4'>
    <p className='text-gray-600 rounded-md font-semibold bg-gray-100 p-1 px-2 space-x-2 inline-flex'>
    <i className="fa-solid fas  text-green-700 mt-1 fa-birthday-cake"></i><p>16 Years in Business</p>
    </p>
    <div className='w-full mt-2'>
    {!expanded3 && (
            <p className='text-black mt-2 mb-5 md:mb-0 '>At swift site builder we offer a range of design and build services, including new construction, home renovations, room additions...
            <span onClick={handleReadMoreClick3} className='font-bold' style={{ color: '#994B00', cursor: 'pointer' }}>
                Read more &gt;
            </span>
            </p>
        )}
    
    {expanded3 && (
        <p className="text-black mt-2 mb-5 md:mb-0 ">
                At swift site builder we offer a range of design and build services, including new construction, home renovations, room additions, ensuring that each detail resonates with your vision. Our mission is to create a haven that mirrors your aspirations, offering a blend of elegance, functionality, and comfort. Your satisfaction is our priority as we endeavor to exceed your expectations, step by step, from conception to the final touches.                   
                <span onClick={handleReadMoreClick3} className='font-bold' style={{ color: '#994B00', cursor: 'pointer' }}>
                Show less
            </span>
        </p>
    )}
    </div>
  </div>
  <div className='text-gray-600 mt-4  space-x-1 hidden md:inline-flex h-full items-center text-center'><i className="fas fa-map-marker-alt"></i><p className='font-bold'>52 Projects</p><p>in Ontario</p></div>
  </div>
</div>
</div> */}
