import '../../../App.css';
import Navbar from '../../Navbar_white';
import { Link } from 'react-router-dom';
import userImage from "../../../images/user_profile.jpg";
import profilePic from "../../../images/builderprofile.png";
import user_0 from "../../../images/user_0_img.jpg";
import post from "../../../images/post_1.jpg";
import api from '../../../Api.js';
import React,{useState, useEffect, Fragment} from 'react';
import Cookies from 'js-cookie';


export default function UserProfile_post() {
  const [user, setUser] = useState([]);
  const [userdata, setFormData] = useState([])

  const[file,setFile]=useState(null)
  const[preview,setPreview]=useState(null)
  // useEffect(() => {
//   console.log(file)
// })
const handleFileChange = (event)=>{
  setFile(event.target.files[0]);
  setPreview(event.target.files[0]);}

const handleFileRemove = ()=>{
  setFile(null);
  setPreview("default");}

const upload = async ()=>{
  try{
      const fileData = new FormData ();
    fileData.append('file', file)
    const res = await api.post("/upload", fileData)
    return res.data
  }catch(err){
    console.log(err)
  }
}

  const fetchUser = async () => {
    console.log(userdata.company_name)
    try{
      const userIdCookie = Cookies.get('user_id');
      const uid = decodeURIComponent(userIdCookie);
      const userDisplay = await api.get(`/UserProfile/Profile/${uid}`);
      setFormData(userDisplay.data[0])
      setUser(userDisplay.data[0])
    }
    
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({ 
      ...userdata,
      [event.target.name]: value
    });
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let profile_pic=""
    if (file)
    {
      profile_pic=await upload()
    }
    else if(preview==="default"){
      profile_pic="default_pic.jpg"
    }
    const userIdCookie = Cookies.get('user_id');
    const user_id = decodeURIComponent(userIdCookie);
    const postData = {
      user_id: user_id,
      profile_pic: profile_pic,
      company_name: userdata.company_name,
      name: userdata.full_name,
      about_us: userdata.about_us,
      email: userdata.email,
      phone: userdata.phone,
      city: userdata.city,
      provience: userdata.provience,
      zip_code: userdata.zip_code,
      experience: userdata.experience
    };
    console.log(postData.name)

    try {
      await api.post('/UserProfile/Profile', postData);
      fetchUser();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  
  useEffect(() => {
    fetchUser();
  },[]);




  return (
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
        <div className='p-4 flex-col w-full  items-center md:inline-flex'>
        <Link to='/BuilderProfile/profile'>
              
              <button className='text-white uppercase block m-1.5 bg-[#994b00] font-bold p-3 w-full'>
                Profile
                </button>
                </Link>
                <Link to='/BuilderProfile/notification'>

              <button className='text-slate-400 uppercase block m-1.5 font-bold  p-3 w-full'>
                Notifications
                </button>
                </Link>
            </div>
        </div>
        <form className='border-0 w-full flex p-0 bg-transparent' onSubmit={handleFormSubmit}>
      <div className="flex-col mx-auto">
      <div className="md:flex max-w-xl md:mt-40 md:mb-4 mb-8" >
      <Link
        to="/BuilderProfile/messages"
        className=" hover:text-[#994B00] text-black font-semibold h-1/6 w-80 py-2   transition duration-300"
      >
        Messages
        <div className='bg-gray-400 bg-opacity-50 mt-3 h-1'></div>
      </Link>
      <Link
        to="/BuilderProfile/portfolio"
        className=" hover:text-[#994B00] text-black font-semibold h-1/6 w-80 py-2   transition duration-300"
      >
        Portfolio
        <div className='bg-gray-400 bg-opacity-50 mt-3 h-1'></div>
      </Link>
      <Link
        to="/BuilderProfile/wishlist"
        className=" hover:text-[#994B00] text-black font-semibold h-1/6 w-80 py-2   transition duration-300 "
      >
        Wishlist
        <div className='bg-gray-400 bg-opacity-50 mt-3 h-1 '></div>
      </Link>
    </div>
      <div className='md:flex max-w-4xl  text-left md:space-x-5 mt-4 shadow-lg rounded-lg overflow-hidden '>
        <div className='flex-col  border p-6 md:p-14 md:w-full w-[350px]'>
          <div className='md:flex md:space-x-8'>
          {file?(
              <img src={URL.createObjectURL(preview)} className=' md:h-[175px]  md:max-w-[175px] h-80 w-80 p-6 md:p-0 object-cover rounded-full  md:mr-2 border-slate-200'></img>
              ):(
              <img src={preview==="default"? `../uploads/default_pic.jpg` : `../uploads/${user.profile_pic}`} className=' md:h-[175px]  md:max-w-[175px] h-80 w-80 p-6 md:p-0 object-cover rounded-full  md:mr-2 border-slate-200'></img>
            )}
            <div className='flex-col w-full px-3'>
              <h2 className='text-gray-800 pl-1   md:pb-2 text-md'>
              Company Name
              </h2>
              <div className='w-full'>
                <input required type="text" id='company_name' name='company_name'  onChange={handleInputChange}
              value={userdata.company_name} placeholder={user.company_name}  className="mt-2 md:mt-0 w-full md:justify-end   text-gray-500 py-3 px-3 rounded-sm bg-transparent transition-all outline focus:outline outline-gray-100 focus:outline-gray-200" />
              </div>
              <div className='grid md:grid-flow-col mt-10 space-y-5 md:space-y-0 md:space-x-6 items-center w-full justify-stretch'>
              <button onClick={handleFileRemove}  type="button" className='block uppercase border-2 py-3 md:py-2 text-md rounded-full px-12 p-2 transition-all border-[#994b00] hover:bg-[#994b002a] text-[#994b00]'> Remove</button>
                <label for="profile_pic_upload"  className='text-center block uppercase rounded-full py-3 text-md p-2 px-0 bg-[#994b00] transition-all text-white hover:text-[#994b00] hover:bg-[#994b002a] '> Upload profile picture</label>
                <input type="file" onChange={handleFileChange} id="profile_pic_upload"  accept="image/* " class="hidden"></input>
               </div>
            </div>
          </div>
          <div className='flex-col w-full space-y-3 px-3 mt-10'>
            <h2 className='text-gray-800 pl-1  md:pb-2 text-md'>
            About Us
            </h2>
            <textarea required type="text" id='about_us' name='about_us'  onChange={handleInputChange}
              value={userdata.about_us} placeholder={user.about_us} className="mt-2 md:mt-0 w-full md:justify-end h-52  text-gray-500 py-3 px-3 rounded-sm  transition-all outline focus:outline outline-gray-100 focus:outline-gray-200"> </textarea>
            <div className='md:inline-flex justify-evenly py-2 space-y-5 md:space-y-0 md:space-x-3 w-full'>
              <div className='flex-col md:w-1/2 '>
                <h2 className='text-gray-800 pl-1  md:pb-2 text-md'>
                Builder Name
                </h2>
                <div className='w-full'>
                  <input type="text" id='name' name='full_name' required  onChange={handleInputChange}
              value={userdata.full_name} placeholder={user.full_name} className="mt-2 md:mt-0 w-full md:justify-end   text-gray-500 py-3 px-3 rounded-sm bg-transparent transition-all outline focus:outline outline-gray-100 focus:outline-gray-200" />
                </div>
                </div>
              <div className='flex-col md:w-1/2 px-3'>
                <h2 className='text-gray-800 pl-1  md:pb-2 text-md'>
                Email ID
                </h2>
                <div className='w-full'>
                  <input type="text" id='email' name='email' required placeholder={user.email} onChange={handleInputChange}
              value={userdata.email} className="mt-2 md:mt-0 w-full md:justify-end   text-gray-500 py-3 px-3 rounded-sm bg-transparent transition-all outline focus:outline outline-gray-100 focus:outline-gray-200" />
                </div>
                </div>
            </div>
            <div className='md:inline-flex justify-evenly py-2 space-y-5 md:space-y-0 md:space-x-3 w-full'>
              <div className='flex-col md:w-1/2 '>
                <h2 className='text-gray-800 pl-1  md:pb-2 text-md'>
                Mobile Number
                </h2>
                <div className='w-full'>
                  <input type="text" id='phone' name='phone' required  onChange={handleInputChange}
              value={userdata.phone} placeholder={user.phone} className="mt-2 md:mt-0 w-full md:justify-end   text-gray-500 py-3 px-3 rounded-sm bg-transparent transition-all outline focus:outline outline-gray-100 focus:outline-gray-200" />
                </div>
                </div>
              <div className='flex-col md:w-1/2 px-3'>
                <h2 className='text-gray-800 pl-1 md:space-x-3 md:pb-2 text-md'>
                Country
                </h2>
                <div className='w-full'>
                  <input type="text" id='provience' name='provience' required  onChange={handleInputChange}
              value={userdata.provience} placeholder={user.provience} className="mt-2 md:mt-0 w-full md:justify-end   text-gray-500 py-3 px-3 rounded-sm bg-transparent transition-all outline focus:outline outline-gray-100 focus:outline-gray-200" />
                </div>
                </div>
            </div>
            <div className='md:inline-flex justify-evenly py-2 space-y-5 md:space-y-0 md:space-x-3 w-full'>
              <div className='flex-col md:w-1/2 '>
                <h2 className='text-gray-800 pl-1  md:pb-2 text-md'>
                City
                </h2>
                <div className='w-full'>
                  <input type="text" id='city' name='city' required  onChange={handleInputChange}
              value={userdata.city} placeholder={user.city}  className="mt-2 md:mt-0 w-full md:justify-end   text-gray-500 py-3 px-3 rounded-sm bg-transparent transition-all outline focus:outline outline-gray-100 focus:outline-gray-200" />
                </div>
                </div>
              <div className='flex-col md:w-1/2 px-3'>
                <h2 className='text-gray-800 pl-1 md:space-x-3 md:pb-2 text-md'>
                Zip code
                </h2>
                <div className='w-full'>
                  <input type="text" id='zip_code' name='zip_code' required  onChange={handleInputChange} value={userdata.zip_code} placeholder={user.zip_code} className="mt-2 md:mt-0 w-full md:justify-end   text-gray-500 py-3 px-3 rounded-sm bg-transparent transition-all outline focus:outline outline-gray-100 focus:outline-gray-200" />
                </div>
                </div>
            </div>
            <div className='justify-start py-2 pb-16 pd:mb-4 w-full'>
              <div className='flex-col md:w-1/2 '>
                <h2 className='text-gray-800 pl-1  md:pb-2 text-md'>
                Experience
                </h2>
                <div className='w-full'>
                  <input type="text" id='experience' name='experience' required onChange={handleInputChange} value={userdata.experience} placeholder={user.experience} className="mt-2 md:mt-0 w-full md:justify-end   text-gray-500 py-3 px-3 rounded-sm bg-transparent transition-all outline focus:outline outline-gray-100 focus:outline-gray-200" />
                </div>
                </div>
              
            </div>
            <div className='grid md:grid-flow-col mt-10 items-center space-y-5 md:space-y-0 md:space-x-6 w-full justify-center'>

                <button type='submit' className='block uppercase rounded-full py-3 md:py-2 text-md p-2 px-14 bg-[#994b00] transition-all text-white hover:text-[#994b00] hover:bg-[#994b002a] '> update account</button>
              </div>
          </div>
        </div>
      </div>
      </div>
      </form>
    </div>
      
      {/* Other content in the BuilderProfile component */}
    </div>
    </>
  );
}
