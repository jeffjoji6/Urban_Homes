import api from '../../../Api.js';
import React,{useState, useEffect, Fragment} from 'react';
import Modal from '../modal/Modal_portfolio.js';
import Cookies from 'js-cookie';
import '../../../App.css';
import { Link } from 'react-router-dom';
import userImage from "../../../images/designer_profile.jpg";
import Null from "../../../images/Builder/null.jpg";
import { Button } from '../../Button';
import Navbar from '../../Navbar_white';

export default function UserProfile_wishlist() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState('');
  const [user, setUser] = useState([]);
  const [portfolio,setPortfolio]= useState([]);

  const handleFileChange = async (event,portfolio_id) => {
    try {
      const fileData = new FormData();
      fileData.append('file', event.target.files[0]);
      const res = await api.post('/upload', fileData);
      await api.post(`/portfolio/cover/${portfolio_id}`, { media_url: res.data });
      fetchPortfolio();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCategoryChange = async (event,portfolio_id) => {
    const newCategory = event.target.value;

    try {
      await api.post(`/portfolio/category/${portfolio_id}`, { category: newCategory });
      fetchPortfolio(); // Fetch updated portfolio data after successful update
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };
  
  const handleModal = (id) => {
    setSelectedPortfolioId(id);
    setShowModal(true);
  };

  const addPortfolio = async () =>{
    try{
      const userIdCookie = Cookies.get('user_id');
      const uid = decodeURIComponent(userIdCookie);
      await api.post(`/portfolio/${uid}`);
      fetchPortfolio();
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  const removePortfolio = async (portfolio_id) =>{
    try{
      await api.delete(`/portfolio/${portfolio_id}`);
      fetchPortfolio();
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  const removeProject = async (portfolio_id) =>{
    try{
      await api.delete(`/portfolio/details/${portfolio_id}`);
      fetchPortfolio();
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  const fetchUser = async () => {
    try{
      const userIdCookie = Cookies.get('user_id');
      const uid = decodeURIComponent(userIdCookie);
      const userDisplay = await api.get(`/UserProfile/Profile/${uid}`);
      setUser(userDisplay.data[0])
    }
    
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const fetchPortfolio = async ()=>{
    const userIdCookie = Cookies.get('user_id');
    const uid = decodeURIComponent(userIdCookie);
    const portfolioData = await api.get(`/portfolio/${uid}`);
    setPortfolio(portfolioData.data);
    console.log(portfolioData.data)

  }

  useEffect(() => {
    fetchUser();
    fetchPortfolio();
  },[]);


  return (
    <Fragment>
    <>
    <Navbar />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap"></link>
    <div className='bg-white-800 p-8 md:ml-20 text-white text-center w-full-z-10'>
      <div className='flex flex-col w-full h-full '>
        {/* <div className="absolute items-center inset-0 h-2/4 bg-gradient-to-b from-black to-transparent opacity-85  -z-10"></div> */}
        <img src={userImage} alt= "pool-side home"className=' absolute inset-x-0 md:p-10 inset-y-24 h-[400px] md:h-[650px] w-full md:rounded-[75px]  object-cover -z-20'></img>
          <h1 className=' justify-center text-7xl  text-white mx-auto font-extrabold pt-60'></h1>
          <p className='justify-center text-xl text-opacity-85 text-white mx-auto pt-6'></p>
          <p className='justify-center text-xl text-white text-opacity-85 md:mb-48 mx-auto'></p>
        </div>
      <div className="relative w-full h-full mb-40 md:flex">
      <div className='md:w-1/6 px-5 items-center overflow-hidden -my-30'>
        <img
          src={`../uploads/${user.profile_pic}`}
          alt='Profile Pic'
          className='h-[250px] w-[300px] object-cover rounded-3xl'
        />
        <p className="pt-4 md:py-8 text-black text-3xl font-semibold">{user.full_name}</p>
        <div className='p-4 flex-col w-full  items-center inline-flex'>
        <Link to='/DesignerProfile/profile'>
              <button className='text-slate-400 uppercase m-1.5  font-bold p-3 w-full'>
                Profile
                </button>
                </Link>
                <Link to='/DesignerProfile/notification'>
              <button className='text-slate-400 uppercase m-1.5 font-bold  p-3 w-full'>
                Notifications
                </button>
                </Link>
            </div>
        </div>
      
      <div className="flex-col mx-auto">
      <div className="flex mt-40 mb-4" >
      <Link
        to="/DesignerProfile/messages"
        className=" hover:text-[#994B00] text-black font-semibold h-1/6 w-80 py-2   transition duration-300"
      >
        Messages
        <div className='bg-[#994B002a]  mt-3 h-1'></div>
      </Link>
      <Link
        to="/DesignerProfile/portfolio"
        className=" hover:text-[#994B00] text-black font-semibold h-1/6 w-80 py-2   transition duration-300"
      >
        Portfolio
        <div className=' bg-[#994B00] mt-3 h-1'></div>
      </Link>
      <Link
        to="/DesignerProfile/wishlist"
        className=" hover:text-[#994B00] text-black font-semibold h-1/6 w-80 py-2   transition duration-300 "
      >
        Wishlist
        <div className='bg-[#994B002a] mt-3 h-1 '></div>
      </Link>
    </div>
    {portfolio[0] ?(
      <>
     {portfolio.map((p) =>  (<div className='md:flex text-left space-x-5 mt-4 p-8 shadow-lg md:w-[880px] w-[350px] rounded-lg overflow-hidden '>
        <div className='md:w-full w-[300px]'>
          <div className='flex justify-between'>
          <h1 className= 'text-black uppercase text-2xl font-bold'>Portfolio</h1>
          
          <div className='p-2 shadow-inner rounded-lg  space-x-3 border-2 border-gray-100'>
            <button className='bg-[#994B002a] py-1 px-3 rounded-md text-xl text-[#994B00]' onClick={()=>addPortfolio()}>
              +
            </button>
            <button className='bg-[#994B002a] py-1 px-3 rounded-md text-xl text-[#994B00]' onClick={()=>removePortfolio(p.portfolio_id)}>
              -
            </button>
          </div>
        </div>
        <div className='flex flex-row space-x-10'>
        <div className='text-center'>
        <label htmlFor={`img_upload_${p.portfolio_id}`}>  
        <img
          className='rounded-lg w-[150px] aspect-square object-cover hover:shadow-lg hover:shadow-gray-400 hover:scale-105 transition duration-300'
          src={`../uploads/${p.cover_img}`}
          alt='Cover Image'
        />
        <input
          required
          type="file"
          onChange={(event) => handleFileChange(event, p.portfolio_id)} 
          id={`img_upload_${p.portfolio_id}`}
          name='project_img'
          accept="image/*"
          className="hidden"
        />
        <h2 className='text-black text-lg'>Cover Image</h2>
        </label>
        </div>
        
        <div className='flex-col w-full'>
        <h1 className='text-slate-800'>Category</h1>
        <select
          value={p.category}
          onChange={(event) => handleCategoryChange(event, p.portfolio_id)}
          className='w-full text-gray-500 mt-4 rounded-md bg-transparent border-b-1 px-4 py-2 border-gray-400 outline outline-gray-200 focus:outline focus:outline-gray-300'
          defaultValue="Home Owner" // Set a default value if needed
        >
    <option value="0">Select a category</option>
    <option value="Bed room">Bed Room</option>
    <option value="Kitchen">Kitchen</option>
    <option value="Living room">Living Room</option>
   
      </select> 
      </div>
      </div>
      <div className='flex border-2 rounded-md bg-[#00000006] flex-wrap justify-left mt-7'>
      {p.details[0].portfolio_details_id !==null && p.details.map((item, index) => (
        <div className='text-center' key={index}>
          <img className='rounded-lg my-2 mt-6 object-cover mx-6 w-[150px] aspect-square hover:shadow-lg hover:shadow-gray-400 hover:scale-105 transition duration-300' src={`../uploads/${item.project_img}`} style={{ objectFit: 'cover' }} alt={`Project ${index + 1}`} />
          <button className='block text-orange-800 text-lg w-full font-bold'  onClick={()=>removeProject(item.portfolio_details_id)}>Delete Project
          </button>
          <h2 className='text-black text-sm mb-4'>{item.location}</h2>
        </div>
      ))}
        {/* <div className='text-center'>
        <img className='rounded-lg my-2 object-cover hover:shadow-lg hover:shadow-gray-400 hover:scale-105 transition duration-300' src={img3}></img>
        <h2 className='text-orange-800 text-lg font-bold'>Delete Image</h2>
        <h2 className='text-black text-sm'>Toronto</h2>
        </div>
        <div className='text-center'>
        <img className='rounded-lg my-2 object-cover hover:shadow-lg hover:shadow-gray-400 hover:scale-105 transition duration-300' src={img4}></img>
        <h2 className='text-orange-800 text-lg font-bold'>Delete Image</h2>
        <h2 className='text-black text-sm'>Belleville</h2>
        </div> */}
        <div className='text-center mx-6'>
        
          <img
            className='rounded-lg my-2 mt-6 p-5 border-2 border-gray-300 object-cover cursor-pointer'
            src={Null}
            alt='Add Photo/Video'
            onClick={()=>handleModal(p.portfolio_id)}
          />
          <h2 className='text-gray-400 mb-4 text-lg'>Add Photo/Video</h2>
        
        </div>
        </div>
        </div>
      </div>))}
      </>):
  (
<>
  <h1 className='text-black font-bold text-2xl mx-4 mt-10 text-left'>Points for a Good Portfolio:</h1>
  <ul className='text-left list-disc m-8 pl-6'>
    <li className='text-gray-800 mb-2'>High-Quality Images: Use crisp, high-resolution images that effectively showcase your work.</li>
    <li className='text-gray-800 mb-2'>Diversity in Projects: Display a variety of projects to highlight your skills and capabilities.</li>
    <li className='text-gray-800 mb-2'>Clear Descriptions: Provide concise and informative descriptions for each project.</li>
    <li className='text-gray-800 mb-2'>Organized Layout: Structure your portfolio for easy navigation and readability.</li>
    <li className='text-gray-800 mb-2'>Showcase Best Work First: Feature your most impressive projects prominently.</li>
    <li className='text-gray-800 mb-2'>Mobile-Friendly Design: Ensure your portfolio is mobile-responsive and user-friendly.</li>
    <li className='text-gray-800 mb-2'>Regular Updates: Keep your portfolio updated with new projects and information.</li>
  </ul>
  <div className="flex justify-center mt-8">
    <button 
      className=' px-10 text-center font-bold block uppercase rounded-full py-3 text-md p-2  bg-[#994b00] transition-all text-white  hover:text-[#994b00] hover:bg-[#994b002a] '
      onClick={()=>addPortfolio()}
    >
      Start Building Your Portfolio
    </button>
  </div>
</>
    )
}  



      </div>
    
    </div>
      
      {/* Other content in the UserProfile component */}
    </div>
    </>
     <Modal isvisible ={showModal} onClose={() =>{setShowModal((prev)=>(!prev));fetchPortfolio()}} portfolio_id={selectedPortfolioId}/>
     </Fragment>
  );
}
