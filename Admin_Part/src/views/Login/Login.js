import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import config from "../../config/config";
import { ToastContainer, toast } from "react-toastify";
import image from "../../assets/images/sign_up.jpg";
const initialState = {
  email: "",
  otp: "",
  errors: "",
};

function Login() {
  const history = useHistory();
  const [iState, updateState] = useState(initialState);
  const [error, setError] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { email, otp, errors } = iState;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateState({
      ...iState,
      [name]: value,
    });
  };

  let handleValidation = () => {
    let emailIdError = "";
    let otpError = "";
    let formIsValid = true;

    if (!email) {
      emailIdError = "Please enter email ID.";
      formIsValid = false;
    } else if (!/^.+?@.+?\..+$/.test(email)) {
      emailIdError = "Email format is not valid";
      formIsValid = false;
    }
    if (!otp) {
      otpError = "Please enter OTP.";
      formIsValid = false;
    }
    updateState({
      ...iState,
      errors: { emailIdError, otpError },
    });
    return formIsValid;
  };
  
  const sendOtp = async () => {
    try {

        const apiUrl = `http://halahomes.ca/api/login/otp`;
        const postData = { email };
  
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });
  
        const data = await response.json();
  
        if (data.success) {
          setIsOtpSent(true);
        } else {
          setError('Error sending OTP. Please try again.');
        }
      
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Error sending OTP. Please try again.');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = handleValidation();
    if (formIsValid) {
      const apiUrl = `${config.Url}auth/login`;
      const postData = { email, otp };
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data received22333:", data.token);
          if (data.status === 200) {
            localStorage.setItem("token", data.token);
            setTimeout(() => {
              toast.success(data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                style: { background: '#4CAF50', color: 'red' },
              });
              history.push("/dashboard");
            }, 500);

            //this.setState({ postData: data.data });
          } else {
            toast.error(data.message, {
              position: toast.POSITION.TOP_BOTTOM,
            });
            console.error("Error fetching user data");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  };

  return (
    <>
      <div className="login_sect flex flex-col md:flex-row h-screen">
        <ToastContainer
        />
        <link  rel="stylesheet"  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap"></link>

        {/* Left Section - Image */}
        <div  className="rrelative w-full md:w-1/2 h-64 md:h-full flex items-center"
          style={{ width: "50%", float: "left", height: "100vh" }}>
          <img
            src={image}
            className="w-full h-full object-cover"
            alt="Sign Up Image"
            style={{ height: "100%", width: "100%" }}
          />
        </div>

        {/* Right Section - Form */}
        <div
          className="w-full md:w-1/2 bg-[#fff]"
          style={{ width: "50%", float: "right", height: "100vh" }}
        >
          <h3 className="heading_title">
            <a href="https://halahomes.ca/">Home</a>
          </h3>
          <div className="login_frm_sect">
            <div className="form_crd">
              <form>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <h3>Admin Login</h3>
                  </div>
                </div>
                <div className="inner_bdy">
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <label>Email ID</label>
                        <input
                          type="text"
                          name="email"
                          value={email}
                          onChange={handleChange}
                          id=""
                          className="form-control"
                          placeholder="admin@halahomes.ca"
                        />
                      </div>
                      <span style={{ color: "red" }}>
                        {errors && errors.emailIdError}
                      </span>
                    </div>
                    <div className="col-sm-12">
                      <div className="frm_frog">
                        <div className="otp_grp">
                          <input
                            required
                            name="otp"
                            id="otp"
                            value={otp}
                            onChange={handleChange}
                            type="text"
                            placeholder="* * * *"
                            className="form-control"
                            pattern="[0-9]"
                            minLength={4}
                            maxLength={4}
                          />

                          {/* <input
                            type="text"
                            placeholder="*"
                            className="form-control"
                          />
                          <input
                            type="text"
                            placeholder="*"
                            className="form-control"
                          />
                          <input
                            type="text"
                            placeholder="*"
                            className="form-control"
                          />
                          <input
                            type="text"
                            placeholder="*"
                            className="form-control"
                          /> */}
                        </div>
                        <span style={{ color: "red" }}>
                          {errors && errors.otpError}
                        </span>
                        <div className="pass_rest">
                        <button className="p-2 rounded-full border-0" onClick={sendOtp}>
                                            {!isOtpSent?
                                            (<a>Send OTP</a>)
                                            :
                                            (<a>Resend OTP</a>)}
                                        </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <a className="btn" onClick={handleSubmit}>
                        Login
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
