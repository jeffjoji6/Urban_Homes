import React, { useState } from "react";
import Navbar from "../Navbar_transparent_home";
import "../../App.css";
import "../Button.css";
import cover_image from "../../images/resized final bg 2.jpg";
import img9 from "../../images/1 (8).jpeg";
import housemax from "../../images/1 (16) 1.jpg";
import founder from "../../images/founder.jpg";
import back from "../../images/bg sec 2.png";
import Feat from "../../images/f-01.png";
import Feat01 from "../../images/f-02.png";
import Feat02 from "../../images/f-03.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import $ from "jquery";
export default function Home() {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
      $("header").addClass("top-fixed");
    } else {
      $("header").removeClass("top-fixed");
    }
  });
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [userdata, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    provience: "",
    zip_code: "",
  });
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        provience: "",
        zip_code: "",
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleInputChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...userdata,
      [event.target.name]: value,
    });
  };

  const handleClick = () => {
    // Handle button click logic here
    console.log("Button clicked!");
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };
  var settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Navbar />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      ></link>

      <div className="inr_bnnr_section">
        <img src={cover_image} className="media_img" />
        <div className="container">
          <div className="bnnr_cntnt">
            <h3>
              Empower Your Dream <span>Construct Your Modular Home</span>with
              Ease
            </h3>
            <p>
              Building a Sustainable Future{" "}
              <span>Transforming Modules into Affordable Homes</span>
            </p>
            <div className="btn_grp">
              <button className="home_btn " onClick={handleClick}>
                {" "}
                Explore More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="About_sect mt-16 px-5 md:px-32" id="About_us">
        <div className="about_img">
          <img className="" src={img9} alt="Image 1" />
        </div>
        <div className="head_about">
          <h3>
            Your <span> Smart Home,</span>
            <br /> Your Way
          </h3>
          <p>
            {" "}
            Introducing user-friendly modular designs for swift home
            construction, our approach fosters a sense of ownership. With
            simplified processes and intuitive blueprints, homeowners can
            efficiently build their spaces. Additionally, we support local
            material creation through providing training.{" "}
          </p>
          <p>
            Urban Homes off-site modular construction remains a popular,
            efficient choice in the housing market, catering to diverse needs
          </p>
          <p>
            Our versatile solutions cater extensively to diverse needs, ensuring
            that each homeowner's vision and requirements are met with precision
            and innovation, while upholding quality, efficiency, and a seamless
            building experience.
          </p>
        </div>
      </div>
      <div className="slider_bx mt-16 px-5 md:px-32">
        <div className="head_bx">
          <h3>
            <span>Exceptional Features</span> of <br /> Our Urban Homes
          </h3>
          <p>
            {" "}
            Discover the exceptional features that make modular homes a standout{" "}
            <span>
              choice, combining flexibility and efficiency for modern living.
            </span>
          </p>
        </div>

        <Slider className="slider_Features" {...settings}>
          <div className="card_bx">
            <h3>
              <span>E</span>conomical{" "}
            </h3>
            <p>
              Develop affordable homes by incorporating off-grid systems and
              locally sourced materials, ensuring cost-effectiveness  and making
              homes more accessible to a wider demographic.
            </p>
            <div className="img_bx">
              <img src={Feat} />
            </div>
          </div>
          <div className="card_bx">
            <h3>
              <span>F</span>aster Turnarounds
            </h3>
            <p>
              Modular homes, which are efficiently structured and operational
              throughout the year, are generally constructed in approximately
              one-third of the time required for building a home on-site.
            </p>
            <div className="img_bx">
              <img src={Feat01} />
            </div>
          </div>
          <div className="card_bx">
            <h3>
              <span>F</span>unctional{" "}
            </h3>
            <p>
              Implement innovative designs and technologies to enhance the
              overall functionality of modular homes, optimizing space
              utilization, and expandabilityas needed.
            </p>
            <div className="img_bx">
              <img src={Feat02} />
            </div>
          </div>
          <div className="card_bx">
            <h3>
              <span>E</span>cological{" "}
            </h3>
            <p>
              Integrate features that promote resource conservation and energy
              efficiency, contributing to a sustainable lifestyle while reducing
              ecological footprints.
            </p>
            <div className="img_bx">
              <img src={Feat} />
            </div>
          </div>
          <div className="card_bx">
            <h3>
              <span>C</span>ustomization
            </h3>
            <p>
              Craft and personalize your modular home precisely to your liking,
              tailoring every detail to match your preferences, creating a space
              that truly reflects your individual style and desires, and
              ensuring a comfortable living environment.
            </p>
            <div className="img_bx">
              <img src={Feat01} />
            </div>
          </div>
          <div className="card_bx">
            <h3>
              <span>T</span>raining
            </h3>
            <p>
              Programs accompany this opportunity, equipping individuals with
              the skills and knowledge needed to effectively utilize locally
              sourced construction materials for crafting personalized modular
              homes.
            </p>
            <div className="img_bx">
              <img src={Feat02} />
            </div>
          </div>
        </Slider>
      </div>
      {/* maximising investment */}
      <div className="maximising_sect  mt-16 px-5 md:px-32" id="values">
        <div className="maximising_lft">
          <div className="head_bx">
            <h3>
              <span>Maximizing</span> your <span>Investment</span>: <br /> The
              Value of Urban Homes
            </h3>
            <p>
              Our modular homes provide exceptional value, merging
              affordability, top-tier construction, and energy efficiency. With
              quicker build times and minimized waste, they amplify your
              investment. Embrace the convenience and eco-friendly nature of
              modular homes—an ideal pick for today's homeowners.
            </p>
            <button className="btn_more animate-pulse">
              KNOW MORE
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                >
                  <path
                    d="M22.0061 24.2088L28.6986 17.5163L22.0061 10.8239L24.0766 8.76807L32.8248 17.5163L24.0766 26.2646L22.0061 24.2088ZM13.2579 24.2088L19.9503 17.5163L13.2579 10.8239L15.3283 8.76807L24.0766 17.5163L15.3283 26.2646L13.2579 24.2088ZM4.50959 24.2088L11.202 17.5163L4.50959 10.8239L6.58002 8.76807L15.3283 17.5163L6.58002 26.2646L4.50959 24.2088Z"
                    fill="url(#paint0_linear_72_1419)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_72_1419"
                      x1="27.7217"
                      y1="14.6002"
                      x2="4.50959"
                      y2="17.5163"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#F5EEE4" />
                      <stop offset="1" stop-color="#F1F1F1" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div className="maxim_img">
          <img src={housemax} alt="Description of the image" />
        </div>
      </div>

      {/*founder*/}

      <div className="Aboutus_sect mt-16 px-4 md:px-32">
        <div className="Aboutus_img">
          <img src={founder} />
        </div>

        <div className="AboutUs_lft">
          <div className="head_about">
            <h3>
              <span>About Us</span> A Look into our Journey
            </h3>
            <p>
              Mr. HUYNH, a finance expert with 15+ years' experience, leads as
              Founder and Chairman of a top consulting firm. His passion for
              prefabricated housing drove him to innovate modular solutions,
              addressing Canada's need for affordable and sustainable homes. His
              journey began with a personal quest to create an innovative and
              self-sustaining farmhouse, leading to transformative construction
              methods.
            </p>
            <Link to="/about-us">
              <button className="btn_more animate-pulse">
                READ OUR STORY
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                  >
                    <path
                      d="M22.0061 24.2088L28.6986 17.5163L22.0061 10.8239L24.0766 8.76807L32.8248 17.5163L24.0766 26.2646L22.0061 24.2088ZM13.2579 24.2088L19.9503 17.5163L13.2579 10.8239L15.3283 8.76807L24.0766 17.5163L15.3283 26.2646L13.2579 24.2088ZM4.50959 24.2088L11.202 17.5163L4.50959 10.8239L6.58002 8.76807L15.3283 17.5163L6.58002 26.2646L4.50959 24.2088Z"
                      fill="url(#paint0_linear_72_1419)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_72_1419"
                        x1="27.7217"
                        y1="14.6002"
                        x2="4.50959"
                        y2="17.5163"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F5EEE4" />
                        <stop
                          offset="1"
                          stop-color="#F1F1F1"
                          stop-opacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-10 md:mt-24 " id="faq">
        <div className="relative w-fit md:w-full flex flex-col mx-2 md:mx-0 md:">
          <div className="head">
            <h3>
              Urban Homes Queries: <span>Get Informed</span>{" "}
            </h3>
            <p>
              Explore the most common queries about modular homes to gain a
              <span>comprehensive understanding of this housing option</span>
            </p>
          </div>
          <div className="accodion_custom mt-16 px-5 md:px-32">
            <Accordion
              className="ac_item"
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                className="ac_head"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
              >
                <Typography className="ac_head_cont">
                  What is the difference between a manufactured home and a
                  modular home?
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="ac_bdy">
                <Typography className="ac_bdy_cont">
                  While both manufactured homes and modular homes are built in a
                  factory environment, there are some differences between the
                  two. The main source of difference between modular and
                  manufactured homes is the code to which they are built.
                  Manufactured homes are built to a federal HUD code, while
                  modular homes are built to state or local residential building
                  codes.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="ac_item"
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                className="ac_head"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography className="ac_head_cont">
                  Where can I go to tour a model that I see online?
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="ac_bdy">
                <Typography className="ac_bdy_cont">
                  You can often tour models of factory-built homes at
                  dealerships, showrooms, or manufacturers' facilities. Contact
                  the manufacturer or dealership associated with the model
                  you're interested in to inquire about available locations for
                  tours or showings. Many companies also participate in home
                  expos or trade shows where they display their models for
                  public viewing.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="ac_item"
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                className="ac_head"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography className="ac_head_cont">
                  Can factory built homes be placed on basements?
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="ac_bdy">
                <Typography className="ac_bdy_cont">
                  Factory-built homes are usually not designed to be placed in
                  basements due to their construction and transportation
                  methods. Their structure isn't typically conducive to basement
                  installation. Site-built homes are more adaptable for basement
                  construction, offering designs that can integrate with
                  basement foundations during on-site building.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="ac_item"
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                className="ac_head"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography className="ac_head_cont">
                  Do your Cape Cod models come with a finished upstairs??
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="ac_bdy">
                <Typography className="ac_bdy_cont">
                  Cape Cod-style homes traditionally feature unfinished upstairs
                  spaces like attics or lofts. However, some modern variations
                  or customized designs may offer finished upstairs areas,
                  providing additional living space or bedrooms. It varies based
                  on the specific model, customization options, and builder
                  preferences.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="ac_item"
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
            >
              <AccordionSummary
                className="ac_head"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5bh-content"
                id="panel5bh-header"
              >
                <Typography className="ac_head_cont">
                  How is factory built housing different than site built homes?
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="ac_bdy">
                <Typography className="ac_bdy_cont">
                  Factory-built homes are constructed in controlled
                  environments, then transported and assembled on-site, offering
                  faster, standardized construction. However site-built homes
                  offer limitless customization, allowing owners to create
                  unique designs. They promote local employment, fostering
                  community ties and craftsmanship. Their on-site construction
                  process enables adaptation to specific needs, and they often
                  showcase higher architectural complexity and individuality,
                  reflecting personal preferences and creativity.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
      {/*secure financing*/}
      <div className="get_sect">
        <img src={back} className="media_img" />
        <div className="get_cont">
          <h3>
            Build your Dream <span>Home Now</span>
          </h3>
          <a href="/log-in" className="btn">
            Get Started
          </a>
        </div>
      </div>
    </>
  );
}
