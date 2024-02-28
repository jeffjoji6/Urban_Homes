// import React from 'react';
import React,{useState, useEffect, Fragment} from 'react';

import api from '../../../Api';
import Cookies from 'js-cookie';

const Modal_community = ({ isvisible,onClose}) => {
  const [formData, setFormData] = useState({
    email_id: "",
    question: "",
    description: "",
  });
  

  const [recommendedTopics, setRecommendedTopics] = useState("");
  const [featuredDiscussions, setFeaturedDiscussions] = useState([]);

  const handleRecommendedTopicsChange = (event) => {
    const { value } = event.target;
    setRecommendedTopics(value);
  };

  const handleFeaturedDiscussionsChange = (event) => {
    const { value } = event.target;
    if (featuredDiscussions.includes(value)) {
      setFeaturedDiscussions(featuredDiscussions.filter((discussion) => discussion !== value));
    } else {
      setFeaturedDiscussions([...featuredDiscussions, value]);
    }
  };
  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userIdCookie = Cookies.get('user_id');
    const user_id = Number(userIdCookie);

    const id = user_id;
  
    try {
      Cookies.set('recommended_topic', recommendedTopics);
      const response = await api.post('/interests', {
        id,
        user_id,
        recommended_topic: recommendedTopics, // Use the selectedRecommendedTopic instead of recommendedTopics.join(',')
        featured_home_disscussion: featuredDiscussions.join(','), // Assuming featuredDiscussions remains as an array
      });
      // Handle response if needed
    } catch (error) {
      console.error("Error posting interest: ", error);
    }
    onClose();
  // Any other necessary actions after form submission
};


  if ( !isvisible) return null;

  return (
    <div className='fixed top-0  w-full h-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
      <form onSubmit={handleSubmit} className=' bg-transparent scale-105 border-0'>
        <div className='bg-white  h-2/3 sm:w-[510px] sm:h-[550px] rounded-xl'>
        
          <h1 className='sm:text-4xl text-2xl text-center pt-10'>
          What Suits You {}
          <span className='bg-gradient-to-r from-yellow-900 via-cream-light via-yellow-700 to to-white bg-clip-text text-transparent'>
          Better?
          </span>
          </h1>
          <div className='px-6'>
          <input
              id='search' name='search' 
              type="text"
              onChange={handleInputChange}
              placeholder="Search Home"
              className=' rounded-3xl w-full pl-5 mt-4 text-yellow-600  pt-2 py-4 px-2 bg-gray-100 focus:outline outline-3 outline-slate-200 shadow-lg'
              />
          </div>
          
          <div className=' text-xs'>
            <div className='pt-5 pl-4 bg-clip-border  rounded-2xl shadow-md '>
              <h2 className='font-bold text-lg pl-5'>Recommended topic for you</h2>
              <div class="grid grid-cols-3  pt-3 pl-5">
  
              <div className="flex items-center mb-1 mr-4">
              <input
                  className="mr-2 w-4 h-4 rounded-full border-gray-300 text-gray-600 bg-gray-100 focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50"
                  type="radio"
                  id="recommended_topics_1"
                  name="recommended_topic"
                  value="0"
                  onChange={handleRecommendedTopicsChange}
                  checked={recommendedTopics === "0"}
                />
                <label className="cursor-pointer" htmlFor="recommended_topics_1">
                Kitchen Designer
                </label>
              </div>
              <div className="flex items-center mb-1 mr-4">
              <input
                  className="mr-2 w-4 h-4 rounded-full border-gray-300 text-gray-600 bg-gray-100 focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50"
                  type="radio"
                  id="recommended_topics_2"
                  name="recommended_topic"
                  value="1"
                  onChange={handleRecommendedTopicsChange}
                  checked={recommendedTopics === "1"}
                />
                <label className="cursor-pointer" htmlFor="recommended_topics_1">
                Home Office
                </label>
              </div>
              <div className="flex mb-1 mr-4">
                <input
                  className="mr-2 w-4 h-4 rounded-full border-gray-300 text-gray-600 bg-gray-100 focus:border-blue-500 focus:ring-yellow-500 focus:ring-opacity-50"
                  type="radio"
                  id="recommended_topics_2"
                  name="recommended_topic"
                  value="2"
                  onChange={handleRecommendedTopicsChange}
                  checked={recommendedTopics === "2"}
                />
              <label className="cursor-pointer" htmlFor="recommended_topics_2">
              Living Room
              </label>
            </div>
              </div>
              <div className=' pt-8 pl-5'>
                <h2 className='font-bold text-lg'>Featured home disussions</h2>
                <div class=" grid grid-rows-3 justify-left pt-3 ">
      <div className='grid grid-cols-3 '>
  
  <div class="flex items-center mb-1 mr-4">
  <input
                className="mr-2 w-4 h-4 rounded-md border-gray-300 text-gray-600 bg-gray-100 focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50"
                type="checkbox"
                id="recommended_topics_1"
                value="Building a home"
                onChange={handleRecommendedTopicsChange}
                checked={recommendedTopics.includes("Building a home")}
              />
              <label className="cursor-pointer" htmlFor="recommended_topics_1">
              Kitchen Designer
              </label>
  </div>

  
  <div class="flex items-center mb-1 mr-4">
    <input
      className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600"
      type="checkbox"
      id="home_discussion_2"
      value="Laundry Room"
      onChange={handleFeaturedDiscussionsChange}
      // checked={featuredDiscussions.includes('Laundry Room')} 
      />
    <label
      class="inline-block pl-[0.15rem] hover:cursor-pointer"
      for="home_discussion_2"
      >Powder Room</label
    >
  </div>
  <div class="flex items-center mb-1 mr-4">
    <input
      className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600"
      type="checkbox"
      id="home_discussion_3"
      value="Paint"
      onChange={handleFeaturedDiscussionsChange}
      // checked={featuredDiscussions.includes('Paint')} 
      />
    <label
      class="inline-block pl-[0.15rem] hover:cursor-pointer"
      for="home_discussion_3"
      >Entry</label
    >
  </div>
  </div>
  <div className=' grid grid-cols-3 pt-3 '>
  <div class="flex items-center mb-1 mr-4">
    <input
      className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600"
      type="checkbox"
      id="home_discussion_4"
      value="Kitchens"
      onChange={handleFeaturedDiscussionsChange}
      // checked={featuredDiscussions.includes('Kitchen')}
       />
    <label
      class="inline-block pl-[0.15rem] hover:cursor-pointer"
      for="home_discussion_4"
      >Laundry Room</label
    >
  </div>
  <div class="flex items-center mb-1 mr-4">
  <input
                className="mr-2 w-4 h-4 rounded-md border-gray-300 text-gray-600 bg-gray-100 focus:border-blue-500 focus:ring-yellow-500 focus:ring-opacity-50"
                type="checkbox"
                id="recommended_topics_2"
                value="Home repair"
                onChange={handleRecommendedTopicsChange}
                checked={recommendedTopics.includes("Home repair")}
              />
              <label className="cursor-pointer" htmlFor="recommended_topics_2">
              Bathroom
              </label>
  </div>
  <div class="flex items-center mb-1 mr-4">
    <input
      className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600"
      id="home_discussion_6"
      type="checkbox"
      value="Pets"
      onChange={handleFeaturedDiscussionsChange}
      // checked={featuredDiscussions.includes('Pets')}
       />
    <label
      class="inline-block pl-[0.15rem] hover:cursor-pointer"
      for="home_discussion_6"
      >Home bar</label
    >
    </div>
  
  </div>
  <div className='grid grid-cols-3 pt-3'>
  
  <div class="flex items-center mb-1 mr-4">
    <input
      className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600"
      type="checkbox"
      id="home_discussion_8"
      value="Bathrooms"
      onChange={handleFeaturedDiscussionsChange}
      // checked={featuredDiscussions.includes('Bathrooms')}
       />
    <label
      class="inline-block pl-[0.15rem] hover:cursor-pointer"
      for="home_discussion_8"
      >Family Room</label
    >
  </div>
  <div class="flex items-center mb-1 mr-4">
    <input
      className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600"
      type="checkbox"
      id="home_discussion_9"
      value="Furniture"
      onChange={handleFeaturedDiscussionsChange}
      // checked={featuredDiscussions.includes('Furniture')}
       />
    <label
      class="inline-block pl-[0.15rem] hover:cursor-pointer"
      for="home_discussion_9"
      >Home Office</label
    >
  </div>
  </div>
  <div className='grid grid-cols-3 pt-3'>
  <div class="flex items-center mb-1 mr-4">
    <input
      className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-600"
      type="checkbox"
      id="home_discussion_10"
      value="Home decor" 
      onChange={handleFeaturedDiscussionsChange}
      // checked={featuredDiscussions.includes('Home Decor')}
      />
    <label
      class="inline-block pl-[0.15rem] hover:cursor-pointer"
      for="home_discussion_10"
      >Living rooms</label
    >
  </div>

  
  </div>
  
  </div>
  <div><br/></div>
  </div>
  </div>
  
  
          <div className='flex  pt-10 pl-64  '>
          <button className='hover:border-slate-500 rounded-3xl shadow-lg hover:bg-yellow-700 h-10 w-24 text-slate-500 hover:text-white' onClick={() => onClose()}>Close</button>
          <div className='mx-3'>
          <button type='submit' className='hover:border-slate-500 rounded-3xl shadow-lg hover:bg-yellow-700  text-slate-500 hover:text-white h-10 w-24' >Done</button>
          
          </div>
          </div>
          
  
          
          
          



        

      
      
      
      
          </div>
  </div>
      </form>    
    </div>
    
  );
};

export default Modal_community;
