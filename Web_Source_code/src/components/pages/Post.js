import React,{useState, useEffect, Fragment} from 'react';
import '../../App.css';
import Navbar from '../Navbar_white';
import { Link } from 'react-router-dom';
import userImage from "../../images/user_profile.jpg";
import profilePic from "../../images/annie_cooper.jpg";
import profilePic_1 from "../../images/user_0_img.jpg";
import post from "../../images/post_1.png";
import Modal from './modal/Modal_post.js';
import post1 from "../../images/post1.png";
import post2 from "../../images/post2.png";
import post3 from "../../images/post3.png";
import post4 from "../../images/post4.png";
import post5 from "../../images/post5.jpg";
import Cookies from 'js-cookie';
import moment from 'moment';
import 'moment-timezone';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min.js';
import api from '../../Api.js'
import Share from './modal/modal_share.js'




export default function UserProfile_post() {
    const [showModal, setShowModal] = useState(false);
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [Recommended,setRecommended]=useState([])
    const post_query = useLocation().search;
    const location = useLocation();
    const [selectedFullName, setSelectedFullName] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [userId, setUserId] = useState('');
    const params = new URLSearchParams(post_query);    
    const [postId,setPostId] = useState(params.get('post_id'))
    const [commentIsLiked, setCommentIsLiked] = useState({});
    const [showShare, setShowShare] = useState(false);
    
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const postIdFromParams = params.get('post_id');
      setPostId(postIdFromParams);
    },[useLocation()]);
  
    useEffect(() => {
      fetchUser();
      fetchRecommended();
    },[useLocation()]);

    useEffect(() => {
      // Check if userComment is an empty string
      if (userComment === '') {
        fetchComments();
      }
    }, [userComment,commentIsLiked, useLocation()]);
    useEffect(() => {
      incrementView()
    },[useLocation()]);

    const handleModal = (fullName, userId) => {
      setSelectedFullName(fullName);
      setSelectedUserId(userId);
      setShowModal(true);
    };


    const changeToIST=(timeStamp) =>{
        const localDate = moment(timeStamp).local().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        return moment(localDate).fromNow();  
      }

      const fetchComments = async () => {
        try {  
          const userIdCookie = Cookies.get('user_id');
          const uid = decodeURIComponent(userIdCookie);
        const commentsFetch = await api.get(`posts/comments/${postId}?user_id=${uid}`)
        setComments(commentsFetch.data);}
        catch (error){
          console.error('Error:', error);
        }
      }

      const fetchRecommended = async () => {
        const recommended_topic= Cookies.get('recommended_topic')
        try {
        const response = await api.get(`/posts/${recommended_topic}`);
        setRecommended(response.data.slice(0, 5));}
        catch (error){
          console.error('Error:', error);
        }
      }
      
      const incrementView = async () => {
        try {
          const userIdCookie = Cookies.get('user_id');
          const uid = decodeURIComponent(userIdCookie);
          await api.post('/posts/view_count', {
            post_id: postId,
            user_id: uid
          });
        } catch (error) {
          console.error('Error:', error); // Handle any errors that occurred during the request
        }
      }

    const fetchUser = async () => {
        try {
          const response = await api.get(`/posts${post_query}`);
          const userIdCookie = Cookies.get('user_id');
          const uid = decodeURIComponent(userIdCookie);
          setUserId(uid)
          const likes =await api.get(`/posts/likes/${uid}`);
          const wishlists =await api.get(`wishlist/posts/${uid}`);
          const commentLikes = await api.get(`/comments/likes/${uid}`); 
          const updatedCommentIsLiked = {};
          comments.forEach(comment => {
            updatedCommentIsLiked[comment.id] = commentLikes.data.some(data => data.comments_id === comment.id);
          });
          setCommentIsLiked(updatedCommentIsLiked);
          if (Array.isArray(response.data)) 
          { 
            const like_value=likes.data.some(data => data.post_id === response.data[0].post_id);
            const wishlist_value=wishlists.data.some(data => Number(data.wishlist_post_id) === response.data[0].post_id);
            setIsWishlisted(wishlist_value);
            setIsLiked(like_value);
            setPost(response.data[0]);            
          } else {
            console.error(response);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
    const handleCommentChange = (event) => {
        setUserComment(event.target.value);
      };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        const userIdCookie = Cookies.get('user_id');
        const uid = Number(decodeURIComponent(userIdCookie));
        const commentData = {
            user_id: uid,
            post_id: post.post_id,
            content: userComment,
          };
        try {
            console.log(commentData)
            
            await api.post(`/posts/comments/`,commentData);
            setUserComment('')
           
          } catch (error) {
            console.error("Error posting data:", error);
          }
        };

      

      const handleLike = async (event,pid) => {
        event.preventDefault();
        const userIdCookie = Cookies.get('user_id');
        const uid = decodeURIComponent(userIdCookie);
        const postData = {
          user_id: uid, // Ensure userid is properly set
          post_id: pid,
        };
        try {
          await api.post('/posts/likes/', postData);
          fetchUser();
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        // setIsLiked(prevState => ({
        //   ...prevState,
        //   [pid]: true
        // }));
        // console.log(uid)
        // console.log(pid)
    
        };
        
        
        
        const handleDislike = async (event,pid) => {
          event.preventDefault();
          const userIdCookie = Cookies.get('user_id');
          const uid = decodeURIComponent(userIdCookie);
          try {
            await api.delete('/posts/dislikes/', {
              data: { user_id: uid, post_id: pid }
            });
            fetchUser();
          } catch (error) {
            console.error("Error fetching data:", error);
          }

      };

      const handleAddToWishlist = async (event, pid) => {
        event.preventDefault();
        const userIdCookie = Cookies.get('user_id');
        const uid = decodeURIComponent(userIdCookie);
        const wishlistData = {
          user_id: uid,
          wishlist_post_id: pid,
        };
        try {
          await api.post('/wishlist/add', wishlistData);
          fetchUser(); // Assuming fetchUser() is a function to update user data after the wishlist is updated
        } catch (error) {
          console.error("Error adding to wishlist:", error);
        }
      };
      
      // Function to handle removing a post from the wishlist
      const handleRemoveFromWishlist = async (event, pid) => {
        event.preventDefault();
        const userIdCookie = Cookies.get('user_id');
        const uid = decodeURIComponent(userIdCookie);
        try {
          await api.delete('/wishlist/remove', {
            data: { user_id: uid, wishlist_post_id: pid }
          });
          fetchUser(); // Assuming fetchUser() is a function to update user data after the wishlist is updated
        } catch (error) {
          console.error("Error removing from wishlist:", error);
        }
      };

      const handleCommentLike = async (event, commentId) => {
        event.preventDefault();
        const userIdCookie = Cookies.get('user_id');
        const uid = decodeURIComponent(userIdCookie);
        const postData = {
          user_id: uid,
          comment_id: commentId,
        };
        try {
          await api.post('/comments/likes/', postData);
          fetchUser();
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      const handleCommentDislike = async (event, commentId) => {
        event.preventDefault();
        const userIdCookie = Cookies.get('user_id');
        const uid = decodeURIComponent(userIdCookie);
        try {
          await api.delete('/comments/dislikes/', {
            data: { user_id: uid, comment_id: commentId }
          });
          fetchUser();
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

  return (
    <Fragment>
    <>
    <Navbar />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap"></link>

        <div className='w-screen md:w-full mb-40 p-10 md:p-20 justify-center'>
            <div className='md:flex w-full md:space-x-10 justify-center'>
               <div className=' md:w-3/5 w-full flex space-y-10 flex-col'> 
                <div className='md:p-10 md:w-full shadow-lg'>
                    <div className='flex md:space-x-4 '>
                        <img src={`../uploads/${post.profile_pic}`} className=' hidden sm:block h-[50px] min-w-[50px] rounded-full object-cover '></img>
                        <div className='flex flex-col  space-y-8'>
                            <div>
                                <h2 className='text-2xl pr-5'>{post.question}</h2>
                                <Link to={`/profile/?user_id=${post.user_id}`} className=' text-sm font-bold'>{post.full_name} | <span className='text-gray-400'>{changeToIST(post.created_at)}</span></Link>
                            </div>
                            <div className='pr-6'>
                                <p>{post.description}</p>
                            </div>
                            <img className=' bg-black md:h-60 h-56 w-56 md:w-80 object-cover' src={`../uploads/${post.media_url}`}></img>
                            {/* <img src={post} className='w-3/5 object-cover '></img> */}
                            <div className='inline-flex space-x-5 items-center'>
                            {isLiked ?
                                (
                                <button className='inline-flex items-center' onClick={(event) => handleDislike(event, post.post_id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18" fill="none">
                                    <path d="M15.1996 0.599609C13.1296 0.599609 11.3396 1.81961 10.4996 3.56961C9.65961 1.81961 7.87961 0.599609 5.79961 0.599609C2.92961 0.599609 0.599609 2.92961 0.599609 5.79961C0.599609 9.90961 6.57961 15.1796 9.23961 17.3196C9.97961 17.9096 11.0196 17.9096 11.7496 17.3196C14.4196 15.1696 20.3896 9.89961 20.3896 5.79961C20.3996 2.92961 18.0696 0.599609 15.1996 0.599609Z" fill="#F75858"/>
                                    </svg>
                                    <p className='pl-2 text-black'>{post.like_count}</p>
                                    </button>
                                )
                                :
                                (
                                
                                    <button className='inline-flex items-center' onClick={(event) => handleLike(event, post.post_id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.375 10.9788L12.5 20.375L4.625 10.9401C3.68328 9.63152 3.3125 8.74755 3.3125 7.53743C3.3125 5.28059 4.92359 3.2495 7.25 3.23047C9.16362 3.21472 11.3332 5.16901 12.5 6.6423C13.636 5.22086 15.8364 3.23047 17.75 3.23047C20.0147 3.23047 21.6875 5.28059 21.6875 7.53743C21.6875 8.74755 21.3942 9.69716 20.375 10.9788ZM17.75 2C15.5627 2 13.9077 3.28363 12.5 4.625C11.1593 3.20159 9.43728 2 7.25 2C4.16956 2 2 4.64862 2 7.53743C2 9.08684 2.63459 10.2025 3.32956 11.2511L11.4887 21.0332C12.4042 22.0025 12.5774 22.0025 13.4929 21.0332L21.6704 11.2511C22.4881 10.2025 23 9.08684 23 7.53743C23 4.64862 20.8304 2 17.75 2Z" fill="black"/></svg>
                                    <p className='pl-2 text-black'>{post.like_count}</p>
                                </button>
                                    )}
                                <div className='flex space-x-2'>
                                  <div >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M13.0605 10.42H8.28055" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.5703 13.71H10.2803" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M17.9303 17.94C21.6003 14.27 21.1603 8.05002 16.6203 4.99002C13.7903 3.08002 9.97026 3.14002 7.19026 5.11002C3.35026 7.83002 2.59026 12.87 4.91026 16.51L3.83026 19.19C3.58026 19.8 4.19026 20.41 4.81026 20.17L7.49026 19.09C10.7303 21.16 15.0903 20.78 17.9303 17.94Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                </div>
                                <p>{comments.length}</p>
                                </div>
                                {/* this is the button to share  */} 
                                {isOpen && (
                                        <div className='pt-1'>
                                        <button onClick={() => setShowShare(true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 24" fill="none" >
                                        <path d="M10.7248 6.07502V4.50002C10.7248 3.90002 10.1248 3.52502 9.6748 3.90002L4.7998 8.40002C4.4248 8.70002 4.4248 9.30002 4.7998 9.60002L9.6748 14.1C10.1248 14.475 10.7248 14.1 10.7248 13.5V12H11.3248C16.4248 12 21.0748 15.225 23.1748 20.25C23.2498 12.6 17.6998 6.45002 10.7248 6.07502Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.6998 3.75L1.0498 8.4C0.674805 8.7 0.674805 9.3 1.0498 9.675L5.6998 14.25" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        </button>
                                    </div>
                                    )}
                                
                                
                                
                                <div className=' w-full flex justify-end pr-4'>
                                {isWishlisted ? (
                                  <button  onClick={(event) => handleRemoveFromWishlist(event, post.post_id)}>
                                  
                                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 1792 1792">
                                    <path d="M1420 128q23 0 44 9 33 13 52.5 41t19.5 62v1289q0 34-19.5 62t-52.5 41q-19 8-44 8-48 0-83-32l-441-424-441 424q-36 33-83 33-23 0-44-9-33-13-52.5-41t-19.5-62V240q0-34 19.5-62t52.5-41q21-9 44-9h1048z"></path>
                                  </svg>
                                  </button>):(
                                    
                                      <button onClick={(event) => handleAddToWishlist(event, post.post_id)}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 20 20" fill="none">
                                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.625 5L6.25 4.375H13.75L14.375 5V16.0968L10 13.5042L5.625 16.0968V5ZM6.875 5.625V13.9032L10 12.0512L13.125 13.9032V5.625H6.875Z" fill="#080341"/>
                                          </svg>
                                        </button>
                                  )}
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                  <div className='p-10 w-full shadow-lg'>
                    <div className='pl-10 w-full flex flex-col '>
                        <div>
                            <h2 className='text-2xl font-bold'>Comments ({comments.length})</h2>
                        </div>
                        <div className=' w-full'>
                  {comments[0]? (
                    <table className=" w-full">
                <tbody>
                    {comments.map((comment)=>(
                    <tr key={comment.id}>
                        <li className='flex w-full mt-10 space-x-4'>
                        <img src={`../uploads/${comment.profile_pic}`} className='md:h-10 md:w-10 h-5 w-5 rounded-full object-cover '></img>
                        <div className='flex flex-col w-full pr-20 items-ceter space-y-8'>
                                <div className='flex w-full justify-between'>
                                    <div>
                                        <h2 className='font-bold'>{comment.full_name}</h2>
                                        <p className=' text-sm font-bold'> <span className='text-gray-400'>{changeToIST(comment.created_at)}</span></p>
                                    </div>
                                    {isOpen && (
                                        <div>
                                            <button className='' onClick={()=>handleModal(comment.full_name, comment.user_id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M4.79199 0.833313C5.13717 0.833313 5.41699 1.11314 5.41699 1.45831V2.99998L6.85088 2.7132C8.22633 2.43811 9.65208 2.56901 10.9544 3.08995L11.2988 3.22772C12.4862 3.70267 13.7931 3.79137 15.0337 3.4812C15.5596 3.34975 15.9818 3.91965 15.703 4.38441L14.6376 6.16015C14.353 6.63445 14.2107 6.8716 14.1769 7.12955C14.1629 7.23715 14.1629 7.34614 14.1769 7.45374C14.2107 7.71169 14.353 7.94884 14.6376 8.42315L15.9381 10.5907C16.1971 11.0224 15.9655 11.5816 15.4771 11.7037L15.3937 11.7246C13.919 12.0932 12.3657 11.9878 10.9544 11.4233C9.65208 10.9023 8.22633 10.7715 6.85088 11.0466L5.41699 11.3333V18.125C5.41699 18.4701 5.13717 18.75 4.79199 18.75C4.44682 18.75 4.16699 18.4701 4.16699 18.125V1.45831C4.16699 1.11314 4.44682 0.833313 4.79199 0.833313Z" fill="#767676"/>
                                            </svg>
                                            </button>
                                        </div>
                                        )}
                                </div> 
                                <div>
                                    
                                    <p>{comment.content}</p>
                                </div>
                                <div className='inline-flex space-x-5 items-center'>

                                {commentIsLiked[comment.id] ?
                        (
                          <button className='inline-flex items-center' onClick={(event) => handleCommentDislike(event, comment.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18" fill="none">
                            <path d="M15.1996 0.599609C13.1296 0.599609 11.3396 1.81961 10.4996 3.56961C9.65961 1.81961 7.87961 0.599609 5.79961 0.599609C2.92961 0.599609 0.599609 2.92961 0.599609 5.79961C0.599609 9.90961 6.57961 15.1796 9.23961 17.3196C9.97961 17.9096 11.0196 17.9096 11.7496 17.3196C14.4196 15.1696 20.3896 9.89961 20.3896 5.79961C20.3996 2.92961 18.0696 0.599609 15.1996 0.599609Z" fill="#F75858"/>
                            </svg>
                            <p className='pl-2 text-black'>{comment.like_count}</p>
                            </button>
                          )
                          :
                          (
                          
                            <button className='inline-flex items-center' onClick={(event) => handleCommentLike(event,comment.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.375 10.9788L12.5 20.375L4.625 10.9401C3.68328 9.63152 3.3125 8.74755 3.3125 7.53743C3.3125 5.28059 4.92359 3.2495 7.25 3.23047C9.16362 3.21472 11.3332 5.16901 12.5 6.6423C13.636 5.22086 15.8364 3.23047 17.75 3.23047C20.0147 3.23047 21.6875 5.28059 21.6875 7.53743C21.6875 8.74755 21.3942 9.69716 20.375 10.9788ZM17.75 2C15.5627 2 13.9077 3.28363 12.5 4.625C11.1593 3.20159 9.43728 2 7.25 2C4.16956 2 2 4.64862 2 7.53743C2 9.08684 2.63459 10.2025 3.32956 11.2511L11.4887 21.0332C12.4042 22.0025 12.5774 22.0025 13.4929 21.0332L21.6704 11.2511C22.4881 10.2025 23 9.08684 23 7.53743C23 4.64862 20.8304 2 17.75 2Z" fill="black"/></svg>
                            <p className='pl-2 text-black'>{comment.like_count}</p>
                          </button>
                            )}
                             
                                    <Link to={`/portfolio/?user_id=${comment.user_id}`} className='rounded-full px-3 p-1 bg-[#994b002a] text-[9px] md:text-base text-[#994b00]'>
                                        Show Portfolio
                                    </Link>
                                </div>
                    </div>
                    </li>
                    </tr>
                    ))}
                    </tbody>
                    </table>
                    ):(
                        <p className='text-xl text-gray-400 text-center w-full p-2 font-bold'>{}</p>
                    )}
                    {/* <div className='flex mt-10 space-x-4'>
                        <img src={profilePic_1} className='h-10 w-10 rounded-full object-cover '></img>
                        <div className='flex flex-col  items-ceter space-y-8'>
                                <div className='flex w-full justify-between'>
                                    <div>
                                        <h2 className='font-bold'>Patracia Colwell</h2>
                                        <p className=' text-sm font-bold'><span className='text-gray-400'>13 days ago</span></p>
                                    </div>
                                    {isOpen && (
                                        <div>
                                            <button className='' onClick={() => setShowModal(true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M4.79199 0.833313C5.13717 0.833313 5.41699 1.11314 5.41699 1.45831V2.99998L6.85088 2.7132C8.22633 2.43811 9.65208 2.56901 10.9544 3.08995L11.2988 3.22772C12.4862 3.70267 13.7931 3.79137 15.0337 3.4812C15.5596 3.34975 15.9818 3.91965 15.703 4.38441L14.6376 6.16015C14.353 6.63445 14.2107 6.8716 14.1769 7.12955C14.1629 7.23715 14.1629 7.34614 14.1769 7.45374C14.2107 7.71169 14.353 7.94884 14.6376 8.42315L15.9381 10.5907C16.1971 11.0224 15.9655 11.5816 15.4771 11.7037L15.3937 11.7246C13.919 12.0932 12.3657 11.9878 10.9544 11.4233C9.65208 10.9023 8.22633 10.7715 6.85088 11.0466L5.41699 11.3333V18.125C5.41699 18.4701 5.13717 18.75 4.79199 18.75C4.44682 18.75 4.16699 18.4701 4.16699 18.125V1.45831C4.16699 1.11314 4.44682 0.833313 4.79199 0.833313Z" fill="#767676"/>
                                            </svg>
                                            </button>
                                        </div>
                                        )}
                                    </div>
                                <div>
                                    
                                    <p>I'm not satisfied with the current plan, as it's excessively long and results in certain areas being too dim. It's frustrating that it lacks natural light. Moreover, the access to the backyard is far from ideal, which is quite disappointing.</p>
                                </div>
                                <div className='inline-flex space-x-5 items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M17.1996 3.59998C15.1296 3.59998 13.3396 4.81998 12.4996 6.56998C11.6596 4.81998 9.87961 3.59998 7.79961 3.59998C4.92961 3.59998 2.59961 5.92998 2.59961 8.79998C2.59961 12.91 8.57961 18.18 11.2396 20.32C11.9796 20.91 13.0196 20.91 13.7496 20.32C16.4196 18.17 22.3896 12.9 22.3896 8.79998C22.3996 5.92998 20.0696 3.59998 17.1996 3.59998Z" fill="#F75858"/>
                                    </svg>
                                    40
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.625 5L6.25 4.375H13.75L14.375 5V16.0968L10 13.5042L5.625 16.0968V5ZM6.875 5.625V13.9032L10 12.0512L13.125 13.9032V5.625H6.875Z" fill="#080341"/>
                                    </svg>
                                    4
                                    <Link to='/portfolio' className='rounded-full px-3 p-1 bg-[#994b002a] text-[#994b00]'>
                                        Show Portfolio
                                    </Link>
                                </div>
                                
                                
                            </div>
                            
                    </div> */}
                    
                    <form onSubmit={handleCommentSubmit} className='flex mt-10 bg-transparent p-0 border-0 space-x-4'>
                        <img src={profilePic_1} className='h-10 w-10 rounded-full object-cover '></img>
                        <div className='flex flex-col w-full items-center space-y-6'>
                    <textarea type="text" id="textarea" name="example" value={userComment} onChange={handleCommentChange} placeholder="Wrtie your comment here." className='p-2 h-40  px-3  text-sm w-full rounded-xl  bg-gray-100'/>

                                <div className='w-full flex justify-end'>
                                    <button type='submit' className='border text-white rounded-full bg-yellow-700 w-20 h-10 shadow-sm'>Submit</button>

                </div>
                                
                               
                                
                    </div>
                    </form>
                    </div>
                    </div>
                    
                
                  </div>
                </div>
            <div className='shadow-lg max-h-[650px] space-y-6 p-4 md:p-8 md:w-1/4'>
                <p className='uppercase text-xl  text-black'>More Discussions</p>
                <div>
                <tbody className='w-full'>
                    {Recommended.map((recommended)=>(
                    <tr className='' key={recommended.post_id}>
                      <Link to={`/post/?post_id=${recommended.post_id}`}>
                      <div className='p-3 justify-right inline-flex w-full hover:scale-105 transition-all hover:shadow-md'>
                        <img src={profilePic_1} className='w-20 h-20 rounded-sm'></img>
                        <div className='pl-2'>
                        <p className='text-sm text-gray-500'>{recommended.question}</p>
                        <div className='items-center pt-2 space-x-2 flex'>
                        <p className='text-sm font-bold text-gray-400'>{changeToIST(recommended.created_at)}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M13.0605 10.42H8.28055" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.5703 13.71H10.2803" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M17.9303 17.94C21.6003 14.27 21.1603 8.05002 16.6203 4.99002C13.7903 3.08002 9.97026 3.14002 7.19026 5.11002C3.35026 7.83002 2.59026 12.87 4.91026 16.51L3.83026 19.19C3.58026 19.8 4.19026 20.41 4.81026 20.17L7.49026 19.09C10.7303 21.16 15.0903 20.78 17.9303 17.94Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                        </div>
                        </div>

                        
                    </div></Link>
                    </tr>))}
                    </tbody>
                    {/* <div className='p-3 justify-between inline-flex w-full bg-transparent'>
                    <img src={post2} className='w-20 h-20 rounded-sm'></img>
                        <div className='pl-2'>
                        <p className='text-sm text-gray-500'>Marvin windows ugly etching
update</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M13.0605 10.42H8.28055" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.5703 13.71H10.2803" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M17.9303 17.94C21.6003 14.27 21.1603 8.05002 16.6203 4.99002C13.7903 3.08002 9.97026 3.14002 7.19026 5.11002C3.35026 7.83002 2.59026 12.87 4.91026 16.51L3.83026 19.19C3.58026 19.8 4.19026 20.41 4.81026 20.17L7.49026 19.09C10.7303 21.16 15.0903 20.78 17.9303 17.94Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                        </div>
                    </div>
                    <div className='p-3 justify-between inline-flex w-full'>
                    <img src={post3} className='w-20 h-20 rounded-sm'></img>
                        <div className='pl-2'>
                        <p className='text-sm text-gray-500'>Has anyone experienced
these marks on their quartzite?</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M13.0605 10.42H8.28055" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.5703 13.71H10.2803" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M17.9303 17.94C21.6003 14.27 21.1603 8.05002 16.6203 4.99002C13.7903 3.08002 9.97026 3.14002 7.19026 5.11002C3.35026 7.83002 2.59026 12.87 4.91026 16.51L3.83026 19.19C3.58026 19.8 4.19026 20.41 4.81026 20.17L7.49026 19.09C10.7303 21.16 15.0903 20.78 17.9303 17.94Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                        </div>
                    </div>
                    <div className='p-3 justify-between inline-flex w-full bg-transparent'>
                    <img src={post4} className='w-20 h-20 rounded-sm'></img>
                        <div className='pl-2'>
                        <p className='text-sm text-gray-500'>Where to place the fire place?</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M13.0605 10.42H8.28055" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.5703 13.71H10.2803" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M17.9303 17.94C21.6003 14.27 21.1603 8.05002 16.6203 4.99002C13.7903 3.08002 9.97026 3.14002 7.19026 5.11002C3.35026 7.83002 2.59026 12.87 4.91026 16.51L3.83026 19.19C3.58026 19.8 4.19026 20.41 4.81026 20.17L7.49026 19.09C10.7303 21.16 15.0903 20.78 17.9303 17.94Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                        </div>
                    </div>
                    <div className='p-3 justify-between inline-flex w-full '>
                    <img src={post5} className='w-20 h-20 rounded-sm'></img>
                        <div className='pl-2'>
                        <p className='text-sm text-gray-500'>Newbie question on subfloor gapping</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M13.0605 10.42H8.28055" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.5703 13.71H10.2803" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M17.9303 17.94C21.6003 14.27 21.1603 8.05002 16.6203 4.99002C13.7903 3.08002 9.97026 3.14002 7.19026 5.11002C3.35026 7.83002 2.59026 12.87 4.91026 16.51L3.83026 19.19C3.58026 19.8 4.19026 20.41 4.81026 20.17L7.49026 19.09C10.7303 21.16 15.0903 20.78 17.9303 17.94Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                        </div>
                    </div> */}
                </div>            
            </div>

            </div>
        </div>
    </>
    <Modal isvisible ={showModal} onClose={() =>{setShowModal(false);fetchComments()}} full_name={selectedFullName}  reported_id={selectedUserId}/>
    <Share isvisible ={showShare} onClose={() =>setShowShare(false)} url={useLocation().pathname+useLocation().search}/>
    
    </Fragment>
  );
}
