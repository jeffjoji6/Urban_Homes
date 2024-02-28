import React from 'react';
import Navbar from '../Navbar_contact.js';
import maps from "../../images/maps.png";
import founder from '../../images/image 553.png'
import img1 from '../../images/1 (5) 1.png'
import img2 from '../../images/1 (17) 1.png'
import img3 from '../../images/1 (2) 1.png'
import back from '../../images/bg sec 2.png';
import $ from 'jquery';

$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 50) {
      $("header").addClass("top-fixed");
  } else {
      $("header").removeClass("top-fixed");
  }
});
const ContactUs = () => {
  return (
    <>

      <Navbar />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap"

      ></link>
      <div className='about_page'>
        <div className='img_media'>
          <img src={founder} />
        </div>
        <div className='about_details'>
          <h3>About Us</h3>
          <h4> Meet Our Visionary Leader </h4>
          <p>Bringing over 15 years of expertise in the financial and investment sectors,
            he has held key positions like Head of Market Analysis, Head of Market Research,
            and Chief Strategy Officer.</p>
          <p> Currently, he also leads as the Founder and Chairman of a well-established
            consulting and investment firm, showcasing his visionary leadership in the
            dynamic realm of finance and investment.</p>
          <p>Passionate about prefabricated housing, our Founder has owned various
            types of prefabricated homes, ranging from shipping container houses to
            manufactured homes. Recognizing the versatility and expandability of Modular
            Homes, he sees it as a comprehensive solution.</p>
          <p>Mr. HUYNH ventures into the Modular housing industry with the aspiration to
            provide affordable housing solutions with rapid construction timelines,
            emphasizing environmental friendliness. His commitment to delivering homes
            that are not only cost-effective but also quick to build aligns with the urgent
            demand for sustainable and accessible housing solutions in Canada.</p>

        </div>

      </div>
      <div className='Journey_sect mt-16 px-5 md:px-32'>
        <div className='head_bx'>
          <h3>How we Started <span> our Journey</span></h3>
        </div>
        <div className='list_journey'>
          <div className='card_bx'>
            <div className='cont_bx'>
              <p>Mr. HUYNH and his spouse embarked on a deeply personal journey, aspiring to provide
                their family with a farmhouse in place of their residence in Ho Chi Minh City, Vietnam.
                Upon realizing the farmhouse couldn't meet their needs, it ignited the evolution of a
                comprehensive project. Setting stringent criteria for their new dwelling became
                imperative: it had to be inviting, cost-effective, locally sourced, expandable,
                off-grid, and capable of self-sustaining energy.</p>
            </div>
            <div className='media_img'>
              <img src={img1} />
            </div>

          </div>
          <div className='card_bx'>
            <div className='media_img'>
              <img src={img2} />
            </div>
            <div className='cont_bx'>
              <p>Realizing that such a home didn't yet exist, they undertook the challenge of
                designing and building it themselves. Leveraging their extensive contacts
                within Vietnam's construction industry, their invaluable support propelled
                the realization of this vision. Beginning in 2020, construction commenced
                with a microhouse, gradually expanding to encompass a bedroom, mud
                room, porch, bathroom, utility room, and an aquaponic greenhouse -
                ultimately culminating in a 2500 sq ft living and working space in
                Ho Chi Minh City ..</p>
            </div>

          </div>
          <div className='card_bx'>
            <div className='cont_bx'>
              <p>During this transformative journey, navigating through trials and errors, they devised
                and perfected a groundbreaking formula that streamlined house construction.
                Their focus on enhancing efficiency and cost-effectiveness yielded impressive results.
                One notable achievement exemplified their innovative approach: a team, predominantly
                novices, built an 800 sq ft aquaponic greenhouse from raw materials within a remarkably
                short span of 5 days. This incredible feat, accomplished at a total cost of $6,000,
                underscored their resourcefulness and pioneering spirit in construction.</p>
            </div>
            <div className='media_img'>
              <img src={img3} />
            </div>

          </div>

        </div>

      </div>
      <div className='get_sect'>
        <img src={back} className='media_img' />
        <div className='get_cont'>
          <h3>Build your Dream <span>Home Now</span></h3>
          <a href="/log-in" className='btn'>Get Started</a>

        </div>
      </div>








    </>
  )
}

export default ContactUs