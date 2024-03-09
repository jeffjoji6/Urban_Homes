import React, { useState, useEffect, Fragment } from "react";
import "../../App.css";
import api from "../../Api.js";
import Cookies from "js-cookie";
import moment from "moment";
import "moment-timezone";
import { Link } from "react-router-dom";
import head_image from "../../images/communnity_top.jpg";
import default_user from "../../images/user_0_img.jpg";
import heart from "../../images/Icons/heart.svg";
import comment from "../../images/Icons/comment.svg";
import reply from "../../images/Icons/reply.svg";
import left from "../../images/Icons/L_arrow.svg";
import right from "../../images/Icons/R_arrow.svg";
import image from "../../images/image.png";
import video from "../../images/Video.png";
import link from "../../images/link.png";
import Modal from "./modal/Modal_community.js";
import Navbar from "../Navbar_transparent";
import { TiImageOutline } from "react-icons/ti";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import { HiLink } from "react-icons/hi2";
import { BsPersonCircle } from "react-icons/bs";
import { FaHeart, FaRegComment, FaRegPaperPlane } from "react-icons/fa";

export default function Community() {
  const [showModal, setShowModal] = useState(true);
  const [topContributor, setTopContributors] = useState([]);
  const [recommended_topic_cookie, setRecommendedTopics_cookie] =
    useState(true);
  const [users, setUsers] = useState([]);
  const [isLiked, setIsLiked] = useState({});
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [views, setViews] = useState([]);
  const [commentCounts, setCommentCounts] = useState({});
  const [formData, setFormData] = useState({
    tag: "",
    question: "",
    description: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  //-----------------------------------PAGINATION--------------------------------------

  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //-----------------------------------LOGIN STATUS--------------------------------------

  // useEffect(() => {
  //   checkLoginStatus();
  // }, []);

  useEffect(() => {
    fetchUser();
  }, [currentPage, category, recommended_topic_cookie]);

  useEffect(() => {
    fetchLikes();
  }, [users]);

  // const checkLoginStatus = () => {
  //     const connectSidCookie = Cookies.get('user_id');
  //     const category_d = Cookies.get('Category');

  //     const category_cookie = decodeURIComponent(category_d);
  //     if (connectSidCookie) {
  //         setCategory(category_cookie);
  //         setIsLoggedIn(true);
  //     } else {
  //         setIsLoggedIn(false);
  //     }
  // };

  //-----------------------------------FETCHING POSTS--------------------------------------

  useEffect(() => {
    const recommended_topic = Cookies.get("recommended_topic");
    setRecommendedTopics_cookie(recommended_topic);
  });

  const fetchUser = async () => {
    try {
      const userIdCookie = Cookies.get("user_id");
      const uid = decodeURIComponent(userIdCookie);
      const recommended_topic = Cookies.get("recommended_topic");
      const response = await api.get(
        `/posts/${recommended_topic}?user_id=${uid}`
      );
      const viewsData = response.data.views;

      setViews(viewsData);
      if (Array.isArray(response.data)) {
        setUsers(response.data.reverse());
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  const changeToIST = (timeStamp) => {
    const localDate = moment(timeStamp)
      .local()
      .add(5, "hours")
      .add(30, "minutes")
      .format("YYYY-MM-DD HH:mm:ss");
    return moment(localDate).fromNow();
  };

  //-----------------------------------COMMENT COUNT--------------------------------------

  useEffect(() => {
    const fetchCommentCounts = async () => {
      const counts = {};
      for (const user of users) {
        const count = await getCommentCount(user.post_id);
        counts[user.post_id] = count;
      }
      setCommentCounts(counts);
    };

    fetchCommentCounts();
  }, [users]);

  const getCommentCount = async (postId) => {
    try {
      const comments = await api.get(`/posts/comments/${postId}`);
      if (Array.isArray(comments.data)) {
        return comments.data.length;
      }
      return 0;
    } catch (error) {
      console.error("Error fetching comment count:", error);
      return 0;
    }
  };

  //-----------------------------------MAKING A POST--------------------------------------

  const handleInputChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  // useEffect(() => {
  //   console.log(file)
  // })
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setPreview(event.target.files[0]);
  };

  const upload = async () => {
    try {
      const fileData = new FormData();
      fileData.append("file", file);
      const res = await api.post("/upload", fileData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let mediaURL = "";
    if (file) {
      mediaURL = await upload(file);
    }
    const userIdCookie = Cookies.get("user_id");
    const user_id = decodeURIComponent(userIdCookie);
    const postData = {
      user_id: user_id,
      recommended_topic: formData.tag,
      question: formData.question,
      description: formData.description,
      media_url: mediaURL,
    };

    try {
      await api.post("/posts", postData);
      fetchUser();
      setFile(null);
      setFormData({
        tag: "",
        question: "",
        description: "",
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  //----------------------------------------UPLOADING A FILE---------------------------------------

  // const upload = async ()=>{
  //   try{
  //   const formata = new FormData () ;
  //   formData-append ("file", file)
  //   const res = await axios-post("/upload", formData)
  //   console. log (res.data)
  //   }catch (err){
  //   console. log (err)
  //   }
  // }
  //----------------------------------------LIKE/DISLIKE-------------------------------------------

  const fetchLikes = async () => {
    try {
      const userIdCookie = Cookies.get("user_id");
      const uid = decodeURIComponent(userIdCookie);
      const likes = await api.get(`/posts/likes/${uid}`);
      if (Array.isArray(users)) {
        const updatedIsLiked = {};
        users.forEach((post) => {
          updatedIsLiked[post.post_id] = likes.data.some(
            (data) => data.post_id === post.post_id
          );
        });

        setIsLiked(updatedIsLiked);
      } else {
        console.error(likes);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLike = async (event, pid) => {
    event.preventDefault();
    const userIdCookie = Cookies.get("user_id");
    const uid = decodeURIComponent(userIdCookie);
    const postData = {
      user_id: uid,
      post_id: pid,
    };
    try {
      await api.post("/posts/likes/", postData);
      fetchUser();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDislike = async (event, pid) => {
    event.preventDefault();
    const userIdCookie = Cookies.get("user_id");
    const uid = decodeURIComponent(userIdCookie);
    try {
      await api.delete("/posts/dislikes/", {
        data: { user_id: uid, post_id: pid },
      });

      fetchUser();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //---------------------------------------VIEW COUNT------------------------------------------

  const renderUserImages = (view) => {
    if (view === null || view === undefined) {
      return <span>No views yet</span>;
    }
    const viewsArray = view.split(",");
    const viewCount = viewsArray.length;
    const maxImages = Math.min(viewCount, 5);
    const images = [];
    for (let i = 0; i < maxImages; i++) {
      images.push(
        <img
          key={i}
          src={default_user}
          alt={`User ${i}`}
          className={`h-10 object-cover rounded-full border-2 border-slate-200${
            viewCount === 1 ? "" : " -ml-6"
          }`}
        />
      );
    }
    if (viewCount > 5) {
      images.push(
        <span
          className="text-slate-400 items-center ml-2"
          key="others"
        >{` and ${
          viewCount - 5 === 1
            ? `${viewCount - 5} other`
            : `${viewCount - 5} others`
        }`}</span>
      );
    }
    return images;
  };

  //----------------------------------- TOP CONTRIbUTOR--------------------------------------
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const fetchDataFromDynamicAPI = async () => {
      try {
        //  const response = await api.get(`/top-contributors/${selectedValue}`);

        const response = await api.get(`/top-contributors/${activeTab}`);
        const data = response.data;

        setTopContributors(data);
      } catch (error) {
        console.error("Error fetching data from the API:", error);
      }
    };
    fetchDataFromDynamicAPI();
  }, [activeTab]);

  //-----------------------------------FRONT END COMPONENT--------------------------------------

  return (
    <Fragment>
      <>
        <Navbar />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap"
        ></link>
        <div className="flex flex-col w-full h-full  ">
          <div className="absolute items-center inset-0 h-[360px] md:h-[800px] bg-gradient-to-b from-black to-transparent opacity-85  -z-10"></div>
          <img
            src={head_image}
            alt="pool-side home"
            className="absolute inset-0 h-[450px] md:h-[800px] w-full object-cover -z-20"
          ></img>
          <h1 className="text-4xl md:text-7xl text-white font-extrabold pt-20 md:pt-60 text-center mx-auto  ">
            Welcome To Our Community
          </h1>
          <p className="justify-center text-center px-6 text-md md:text-xl text-opacity-85 text-white mx-auto pt-6">
            Receive assistance for your projects, collaborate on your
            discoveries,
          </p>
          <p className="justify-center text-md md:text-xl text-white text-opacity-85  md:mb-48 mx-auto">
            and showcase your Transformations.
          </p>
        </div>
        <div className="w-full md:flex mt-20 md:mt-32 flex-row">
          <div className="w-full md:w-1/4 p-8 md:pb-32 md:mx-12">
            <div className="p-4 pt-6 shadow-lg border-2 border-slate-100 rounded-md ">
              <h2 className="text-black font-bold text-lg">Your Activity</h2>
              {category === "Home Owner" && (
                <>
                  <Link to="/UserProfile/Posts">
                    <p className="text-slate-400 font-bold pt-4 pl-6 hover:scale-105 transition-all">
                      Your Posts
                    </p>
                  </Link>
                  <Link to="/UserProfile/Messages">
                    <p className="text-slate-400 font-bold pt-2 pl-6 pb-4 hover:scale-105 transition-all">
                      Your Messages
                    </p>
                  </Link>
                </>
              )}
              {category === "Supplier" && (
                <>
                  <Link to="/SupplierProfile/Portfolio">
                    <p className="text-slate-400 font-bold pt-4 pl-6 hover:scale-105 transition-all">
                      Your Posts
                    </p>
                  </Link>
                  <Link to="/SupplierProfile/Messages">
                    <p className="text-slate-400 font-bold pt-2 pl-6 pb-4 hover:scale-105 transition-all">
                      Your Messages
                    </p>
                  </Link>
                </>
              )}
              {category === "Builder" && (
                <>
                  <Link to="/BuilderProfile/Portfolio">
                    <p className="text-slate-400 font-bold pt-4 pl-6 hover:scale-105 transition-all">
                      Your Posts
                    </p>
                  </Link>
                  <Link to="/BuilderProfile/Messages">
                    <p className="text-slate-400 font-bold pt-2 pl-6 pb-4 hover:scale-105 transition-all">
                      Your Messages
                    </p>
                  </Link>
                </>
              )}
              {category === "Designer" && (
                <>
                  <Link to="/DesignerProfile/Portfolio">
                    <p className="text-slate-400 font-bold pt-4 pl-6 hover:scale-105 transition-all">
                      Your Posts
                    </p>
                  </Link>
                  <Link to="/DesignerProfile/Messages">
                    <p className="text-slate-400 font-bold pt-2 pl-6 pb-4 hover:scale-105 transition-all">
                      Your Messages
                    </p>
                  </Link>
                </>
              )}
            </div>
            <div className="p-4 pt-6 mt-8 border-2 border-slate-100 shadow-lg rounded-md">
              <button
                onClick={() => setShowModal(true)}
                className="w-full inline-flex justify-between pr-6"
              >
                <h2 className="text-black font-bold text-lg">Your Interest</h2>

                <div>
                  <button className="" onClick={() => setShowModal(true)}>
                    &#9998;
                  </button>
                </div>
              </button>
              {recommended_topic_cookie === "0" && (
                <p
                  onClick={() => setShowModal(true)}
                  className="text-slate-400 font-bold pt-4 pl-6"
                >
                  Building a home
                </p>
              )}
              {recommended_topic_cookie === "1" && (
                <p
                  onClick={() => setShowModal(true)}
                  className="text-slate-400 font-bold pt-2 pl-6 pb-4"
                >
                  Home Repair
                </p>
              )}
            </div>
            <div className="p-4 pt-6 mt-8 border-2 border-slate-100 shadow-lg items-center rounded-md">
              <Link to="FindProfessionals/Builder">
                <h2 className="text-black font-bold pt-2 text-lg w-fit  hover:-translate-y-1.5 transition-all bg-transparent ">
                  Find Builders
                </h2>
              </Link>
              <Link to="FindProfessionals/Supplier">
                <h2 className="text-black font-bold pt-2 text-lg hover:-translate-y-1.5 transition-all">
                  Find Supplier
                </h2>
              </Link>
              <Link to="FindProfessionals/Designer">
                <h2 className="text-black font-bold pt-2 pb-4 text-lg hover:-translate-y-1.5 transition-all ">
                  Find Designer
                </h2>
              </Link>
            </div>
            <div className="p-1 pt-6 mt-4 rounded-md">
              <h3 className="  flex text-center text-black font-bold pt-2">
                Top Contributors
              </h3>

              <div className=" w-100% mb-4 border-gray-200 dark:border-gray-700">
                <ul
                  className="w-100% flex -mb-px text-sm font-medium text-center"
                  id="default-tab"
                  role="tablist"
                >
                  <li
                    className={` inline-block p-4 border-b-4  rounded-t-lg ${
                      activeTab === "all" ? "border-[#994b00]" : ""
                    }`}
                    role="presentation"
                  >
                    <button
                      className={`font-bold inline-block ${
                        activeTab === "all" ? "text-[#994b00] font-bold" : ""
                      }`}
                      id="all-tab"
                      onClick={() => handleTabClick("all")}
                      type="button"
                      role="tab"
                      aria-controls="all"
                      aria-selected={activeTab === "all"}
                    >
                      All
                    </button>
                  </li>
                  <li
                    className={` inline-block p-4 border-b-4  rounded-t-lg ${
                      activeTab === "today" ? "border-[#994b00]" : ""
                    }`}
                    role="presentation"
                  >
                    <button
                      className={`font-bold inline-block ${
                        activeTab === "today" ? "text-[#994b00] font-bold" : ""
                      }`}
                      id="today-tab"
                      onClick={() => handleTabClick("today")}
                      type="button"
                      role="tab"
                      aria-controls="today"
                      aria-selected={activeTab === "today"}
                    >
                      Today
                    </button>
                  </li>
                  <li
                    className={`inline-block p-4 border-b-4 rounded-t-lg ${
                      activeTab === "weekly"
                        ? "border-[#994b00]"
                        : " hover:text-[#994b00]   dark:hover:text-[#994b00]"
                    }`}
                    role="presentation"
                  >
                    <button
                      className={`font-bold inline-block ${
                        activeTab === "weekly" ? "text-[#994b00] font-bold" : ""
                      }`}
                      id="weekly-tab"
                      onClick={() => handleTabClick("weekly")}
                      type="button"
                      role="tab"
                      aria-controls="weekly"
                      aria-selected={activeTab === "weekly"}
                    >
                      Weekly
                    </button>
                  </li>
                  <li
                    className={`inline-block p-4 border-b-4 rounded-t-lg ${
                      activeTab === "monthly"
                        ? "border-[#994b00]"
                        : " hover:text-[#994b00]   dark:hover:text-[#994b00]"
                    }`}
                    role="presentation"
                  >
                    <button
                      className={`font-bold inline-block ${
                        activeTab === "monthly"
                          ? "text-[#994b00] font-bold"
                          : ""
                      }`}
                      id="monthly-tab"
                      onClick={() => handleTabClick("monthly")}
                      type="button"
                      role="tab"
                      aria-controls="monthly"
                      aria-selected={activeTab === "monthly"}
                    >
                      Monthly
                    </button>
                  </li>
                </ul>

                <div id="default-tab-content ">
                  <div
                    className={`p-2 rounded-lg  mt-2 ${
                      activeTab === "all" ? "" : "hidden"
                    }`}
                    id="all"
                    role="tabpanel"
                    aria-labelledby="all-tab"
                  >
                    {/* <p className="text-sm text-gray-500 dark:text-gray-400">Content for Today tab.</p> */}

                    {/* Top Contributors list Today */}
                    {topContributor?.map((people, index) => {
                      return (
                        <div
                          key={index}
                          className="w-100% flex items-center space-x-4 p-4 mt-3 bg-white rounded-lg shadow-lg"
                        >
                          <div className="flex-shrink-0">
                            <img
                              src={`../uploads/${people.profile_pic}`}
                              alt="Profile Pic"
                              className="h-12 w-12 object-cover rounded-full"
                            />
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold text-black ">
                              {people.full_name
                                ? people.full_name
                                : "Your Name"}
                            </h5>
                            {/* <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {people.city && people.provience
                                  ? `${people.city}, ${people.provience}`
                                  : "City, Province"}
                              </p> */}
                            <div className="flex items-right space-x-4 mt-2">
                              <div className="flex items-right">
                                <FaHeart className="text-gray-500 text-xs mt-0.5" />
                                <span className="ml-2 text-xs">
                                  {people.like_count}
                                </span>
                              </div>
                              <div className="flex items-right">
                                <FaRegPaperPlane className="text-gray-500 text-xs mt-0.5" />
                                <span className="ml-2 text-xs">
                                  {people.post_count}
                                </span>
                              </div>

                              <div className="flex items-right">
                                <FaRegComment className="text-gray-500 text-xs mt-0.5" />
                                <span className="ml-2 text-xs mt">
                                  {people.comment_count}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className={`p-2 rounded-lg  mt-2 ${
                      activeTab === "today" ? "" : "hidden"
                    }`}
                    id="today"
                    role="tabpanel"
                    aria-labelledby="today-tab"
                  >
                    {/* <p className="text-sm text-gray-500 dark:text-gray-400">Content for Today tab.</p> */}

                    {/* Top Contributors list Today */}
                    {topContributor?.map((people, index) => {
                      return (
                        <div
                          key={index}
                          className="w-100% flex items-center space-x-4 p-4 mt-3 bg-white rounded-lg shadow-lg"
                        >
                          <div className="flex-shrink-0">
                            <img
                              src={`../uploads/${people.profile_pic}`}
                              alt="Profile Pic"
                              className="h-12 w-12 object-cover rounded-full"
                            />
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold text-black ">
                              {people.full_name
                                ? people.full_name
                                : "Your Name"}
                            </h5>
                            {/* <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {people.city && people.provience
                                  ? `${people.city}, ${people.provience}`
                                  : "City, Province"}
                              </p> */}
                            <div className="flex items-right space-x-4 mt-2">
                              <div className="flex items-right">
                                <FaHeart className="text-gray-500 text-xs mt-0.5" />
                                <span className="ml-2 text-xs">
                                  {people.like_count}
                                </span>
                              </div>
                              <div className="flex items-right">
                                <FaRegPaperPlane className="text-gray-500 text-xs mt-0.5" />
                                <span className="ml-2 text-xs">
                                  {people.post_count}
                                </span>
                              </div>

                              <div className="flex items-right">
                                <FaRegComment className="text-gray-500 text-xs mt-0.5" />
                                <span className="ml-2 text-xs mt">
                                  {people.comment_count}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className={`p-2 rounded-lg mt-2 ${
                      activeTab === "weekly" ? "" : "hidden"
                    }`}
                    id="weekly"
                    role="tabpanel"
                    aria-labelledby="weekly-tab"
                  >
                    {/* <p className="text-sm text-gray-500 dark:text-gray-400">
                      Content for Weekly tab.
                    </p> */}

                    {/* Top Contributors list Today */}
                    {topContributor?.map((people, index) => {
                      return (
                        <div
                          key={index}
                          className="w-100% flex items-center space-x-4 p-4 mt-3 bg-white rounded-lg shadow-lg"
                        >
                          <div className="flex-shrink-0">
                            <img
                              src={`../uploads/${people.profile_pic}`}
                              alt="Profile Pic"
                              className="h-12 w-12 object-cover rounded-full"
                            />
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold text-black ">
                              {people.full_name
                                ? people.full_name
                                : "Your Name"}
                            </h5>
                            {/* <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {people.city && people.provience
                                  ? `${people.city}, ${people.provience}`
                                  : "City, Province"}
                              </p> */}
                            <div className="flex items-right space-x-4 mt-2">
                              <div className="flex items-right">
                                <FaHeart className="text-gray-500 text-xs mt-0.5" />
                                <span className="ml-2 text-xs">
                                  {people.like_count}
                                </span>
                              </div>
                              <div className="flex items-right">
                                <FaRegPaperPlane className="text-gray-500 text-xs mt-0.5" />
                                <span className="ml-2 text-xs">
                                  {people.post_count}
                                </span>
                              </div>

                              <div className="flex items-right">
                                <FaRegComment className="text-gray-500 text-xs mt-0.5" />
                                <span className="ml-2 text-xs mt">
                                  {people.comment_count}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className={`p-2 rounded-lg mt-2 ${
                      activeTab === "monthly" ? "" : "hidden"
                    }`}
                    id="monthly"
                    role="tabpanel"
                    aria-labelledby="monthly-tab"
                  >
                    {/* <p className="text-sm text-gray-500 dark:text-gray-400">
                      Content for Monthly tab.
                    </p> */}

                    {/* Top Contributors list Today */}
                    {topContributor?.map((people, index) => {
                      return (
                        <div
                          key={index}
                          className="w-100% flex items-center space-x-4 p-4 mt-3 bg-white rounded-lg shadow-lg"
                        >
                          <div className="flex-shrink-0">
                            <img
                              src={`../uploads/${people.profile_pic}`}
                              alt="Profile Pic"
                              className="h-12 w-12 object-cover rounded-full"
                            />
                          </div>
                          <div>
                            <h5 className=" text-sm font-semibold text-black ">
                              {people.full_name
                                ? people.full_name
                                : "Your Name"}
                            </h5>
                            {/* <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {people.city && people.provience
                                  ? `${people.city}, ${people.provience}`
                                  : "City, Province"}
                              </p> */}
                            <div className="flex items-right space-x-4 mt-2">
                              <div className="flex items-right">
                                <FaHeart className="text-gray-500 text-xs mt-0.5" />
                                <span className="ml-2 text-xs">
                                  {people.like_count}
                                </span>
                              </div>
                              <div className="flex items-right">
                                <FaRegPaperPlane className="text-gray-500 text-xs mt-0.5" />
                                <span className="ml-2 text-xs">
                                  {people.post_count}
                                </span>
                              </div>

                              <div className="flex items-right">
                                <FaRegComment className="text-gray-500 text-xs mt-0.5" />
                                <span className="ml-2 text-xs mt">
                                  {people.comment_count}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mb-20 md:mb-40 md:pr-20">
            <div className="m-8 shadow-lg border-2 border-slate-100 pt-6 p-3 rounded-md text-lg">
              <form
                className=" w-full bg-transparent border-0"
                onSubmit={handleFormSubmit}
              >
                <h2 className="text-black font-bold text-xl mb-5">
                  Create New Post
                </h2>
                <select
                  required
                  id="tag"
                  name="tag"
                  onChange={handleInputChange}
                  value={formData.tag}
                  className="border-2 text-[#994b00] text-base rounded-full my-3 mb-6 bg-[#994B002a] px-3 p-2"
                >
                  <option value="">#Select your Topic</option>
                  <option value="0">Building a Home</option>
                  <option value="1">Home Repair</option>
                </select>
                <input
                  required
                  id="question"
                  name="question"
                  onChange={handleInputChange}
                  value={formData.question}
                  type="text"
                  placeholder="Enter Your Questions"
                  className="w-full text-gray-500 mb-3 pt-2 py-4 pl-4 px-2 bg-gray-200 focus:outline outline-3 outline-slate-200"
                />
                <textarea
                  required
                  id="description"
                  name="description"
                  onChange={handleInputChange}
                  value={formData.description}
                  placeholder="Tell us the specific details here. Share photos to get more replies and answers."
                  className="w-full rounded-md text-gray-500 mb-3 pt-4 pl-4 pb-2 px-2 bg-gray-200 h-56 focus:outline outline-3 outline-slate-200 resize-y"
                />
                {file && (
                  <img
                    className="h-40 object-cover"
                    src={URL.createObjectURL(preview)}
                  ></img>
                )}
                <div className="md:w-2/6 md:mr-auto p-2">
                  <div class="  text-white py-2 text-xl text-center w-full rounded-full">
                    <div className=" sm:flex">
                      <label>
                        <img
                          src={image}
                          for="imageInput"
                          className="cursor-pointer mr-3"
                        ></img>
                        <input
                          type="file"
                          id="imageInput"
                          onChange={handleFileChange}
                          accept="image/* "
                          class="hidden"
                        ></input>
                      </label>
                      <label>
                        <img
                          src={video}
                          for="videoInput"
                          className="cursor-pointer mr-3"
                        ></img>
                        <input
                          type="file"
                          id="videoInput"
                          onChange={handleFileChange}
                          accept="video/* "
                          class="hidden"
                        ></input>
                      </label>
                      <img src={link} className=""></img>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/6 md:ml-auto ">
                  <button
                    type="submit"
                    className="text-xl w-full bg-[#994B00] text-white py-2 rounded-full"
                  >
                    POST
                  </button>
                </div>
              </form>
            </div>

            <h2 className=" justify-center text-center md:text-3xl font-semibold mt-20 md:hidden text-2xl">
              Commmunity Posts
            </h2>
            <div className="pt-1 mt-2 shadow-xl mx-9 bg-[#994b00] md:hidden"></div>

            {isLoggedIn ? (
              <table className="w-full">
                <tbody>
                  {currentPosts.map((user) => (
                    <tr key={user.post_id}>
                      <div className="m-8 shadow-lg  hover:scale-[1.01] transition-all flex border-2 border-slate-100 p-6 pt-6 rounded-md text-lg">
                        <Link
                          className="w-full"
                          to={`/post/?post_id=${user.post_id}`}
                        >
                          <div className=" justify-between space-y-8 w-full">
                            <div className="flex-col">
                              <div className="flex">
                                <img
                                  src={`../uploads/${user.profile_pic}`}
                                  className="h-14 w-14 object-cover rounded-full border-2 mr-4 border-slate-200"
                                ></img>
                                <div className="flex-col">
                                  <h2 className="text-black font-semibold text-xl">
                                    {user.full_name}
                                  </h2>
                                  <h3 className="text-gray-400">
                                    {changeToIST(user.created_at)}
                                  </h3>
                                </div>
                              </div>
                              <div className=" mt-8">
                                <h2 className="text-black font-semibold text-xl">
                                  {user.question}
                                </h2>
                                <p className="text-black text-md pt-2 ">
                                  {truncateText(user.description, 60)}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between pt-5 px-1">
                              <div className="items-center flex space-x-4">
                                {isLiked[user.post_id] ? (
                                  <button
                                    className="inline-flex items-center"
                                    onClick={(event) =>
                                      handleDislike(event, user.post_id)
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="21"
                                      height="18"
                                      viewBox="0 0 21 18"
                                      fill="none"
                                    >
                                      <path
                                        d="M15.1996 0.599609C13.1296 0.599609 11.3396 1.81961 10.4996 3.56961C9.65961 1.81961 7.87961 0.599609 5.79961 0.599609C2.92961 0.599609 0.599609 2.92961 0.599609 5.79961C0.599609 9.90961 6.57961 15.1796 9.23961 17.3196C9.97961 17.9096 11.0196 17.9096 11.7496 17.3196C14.4196 15.1696 20.3896 9.89961 20.3896 5.79961C20.3996 2.92961 18.0696 0.599609 15.1996 0.599609Z"
                                        fill="#F75858"
                                      />
                                    </svg>
                                    <p className="pl-2 text-black">
                                      {user.like_count}
                                    </p>
                                  </button>
                                ) : (
                                  <button
                                    className="inline-flex items-center"
                                    onClick={(event) =>
                                      handleLike(event, user.post_id)
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M20.375 10.9788L12.5 20.375L4.625 10.9401C3.68328 9.63152 3.3125 8.74755 3.3125 7.53743C3.3125 5.28059 4.92359 3.2495 7.25 3.23047C9.16362 3.21472 11.3332 5.16901 12.5 6.6423C13.636 5.22086 15.8364 3.23047 17.75 3.23047C20.0147 3.23047 21.6875 5.28059 21.6875 7.53743C21.6875 8.74755 21.3942 9.69716 20.375 10.9788ZM17.75 2C15.5627 2 13.9077 3.28363 12.5 4.625C11.1593 3.20159 9.43728 2 7.25 2C4.16956 2 2 4.64862 2 7.53743C2 9.08684 2.63459 10.2025 3.32956 11.2511L11.4887 21.0332C12.4042 22.0025 12.5774 22.0025 13.4929 21.0332L21.6704 11.2511C22.4881 10.2025 23 9.08684 23 7.53743C23 4.64862 20.8304 2 17.75 2Z"
                                        fill="black"
                                      />
                                    </svg>
                                    <p className="pl-2 text-black">
                                      {user.like_count}
                                    </p>
                                  </button>
                                )}
                                <img src={comment}></img>
                                <p className=" text-black">
                                  {commentCounts[user.post_id]}
                                </p>
                              </div>
                              <div className="flex space-x-3 text-sm ">
                                <div className="flex items-center">
                                  {renderUserImages(user.views)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <>
                <p className="text-center text-gray-300 font-extrabold text-3xl py-40">
                  No Posts for your chosen Topics
                </p>
              </>
            )}
            <div className="flex space-x-4 mt-20 justify-center">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-2 flex border-black rounded-full py-2 pr-7 hover:bg-[#994B002a] transition-all px-4 "
              >
                <img src={left} className="h-7 object-contain" />
                <img src={left} className="h-7 object-contain -ml-4" />
                <p className="pb-1 ml-2 text-xl font-bold text-black">
                  Previous
                </p>
              </button>
              <div className="bg-[#994B002a] overflow-hidden  h-full items-center rounded-2xl text-[#994B00] font-bold flex ">
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`hidden md:flex rounded-xl hover:bg-[#994B002a] transition-all py-3 px-6 ${
                      currentPage === number ? "bg-[#994b00] text-white" : ""
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastPost >= users.length}
                className="border-2 flex border-black rounded-full hover:bg-[#994B002a] transition-all py-2 px-4 pl-7 "
              >
                <p className="pb-1 text-xl font-bold text-black mr-10">Next</p>
                <img src={right} className="h-7 object-contain" />
                <img src={right} className="h-7 object-contain -ml-4" />
              </button>
            </div>
          </div>
        </div>
      </>
      <Modal
        isvisible={showModal}
        onClose={() => setShowModal((prev) => !prev)}
      />
    </Fragment>
  );
}
