import React from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import logo from "../../Components/GlobalImages/logo-set.png";
import standUp from "../../Components/GlobalImages/Standup.png";
import RTNIMG from "../../Components/GlobalImages/landing.jpg";
import "../../Components/GlobalStyles/globalStyles.css";
import { useHistory } from "react-router-dom";

const LandingPage = () => {
  const history = useHistory();
  const handleClickNewApp = () => {
    history.push("/application-form");
  };
  const handleLogin = () => {
    history.push("/login");
  };
  return (
    <div>
      <Navbar />
      <div class="row justify-content-center">
        <div class="col-lg-11" style={{ marginTop: 52.5 }}>
          <div class="start-application">
            <div class="row">
              {/* <div class="col-lg-6 col-md-6 col-sm-12 pe-0 d-none d-md-block">
                <div
                  class="img-applci h-100 ahme"
                  style={{ backgroundSize: "100% 100%" }}
                >
                  <img src={logo} class="img-fluid lo" alt="" />
                  <img src={standUp} class="img-fluid" alt="" />
                </div>
              </div> */}

              <div class="col-lg-12 col-md-12 col-sm-12 ps-0">
                <div
                  class="img-applic-content align-items-center ahm"
                  style={{ border: "2px solid #dff5fc" }}
                >
                  <h2>Apply for the Employee Retention Credit!</h2>
                <div  class="d-flex justify-content-center align-items-center w-100"
 >  
  <img src={RTNIMG} /> 
                   
                    </div>

              
                  <div class="d-flex justify-content-center flex-column align-items-center w-100">
                    <div class="btn-apli">
                      <a>
                        <button
                          type="button"
                          class="apli-button"
                          onClick={handleClickNewApp}
                        >
                          Start a new application
                          <span class="ms-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="27"
                              height="16"
                              viewBox="0 0 27 16"
                              fill="none"
                            >
                              <path
                                d="M26.7021 8.59499C27.0963 8.20812 27.1022 7.57499 26.7153 7.18083L20.411 0.757753C20.0242 0.3636 19.391 0.357691 18.9969 0.744553C18.6027 1.13142 18.5968 1.76455 18.9837 2.15871L24.5875 7.86811L18.8781 13.4719C18.4839 13.8588 18.478 14.4919 18.8649 14.8861C19.2517 15.2802 19.8849 15.2861 20.279 14.8993L26.7021 8.59499ZM0.853459 8.64662L25.9923 8.88127L26.011 6.88135L0.872126 6.64671L0.853459 8.64662Z"
                                fill=""
                              ></path>
                            </svg>
                          </span>
                        </button>
                      </a>
                      <a>
                        <button
                          type="button"
                          class="apli-button-1"
                          onClick={handleClickNewApp}
                        >
                          Pick up where I left off
                          <span class="ms-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="27"
                              height="16"
                              viewBox="0 0 27 16"
                              fill="none"
                            >
                              <path
                                d="M26.7021 8.59499C27.0963 8.20812 27.1022 7.57499 26.7153 7.18083L20.411 0.757753C20.0242 0.3636 19.391 0.357691 18.9969 0.744553C18.6027 1.13142 18.5968 1.76455 18.9837 2.15871L24.5875 7.86811L18.8781 13.4719C18.4839 13.8588 18.478 14.4919 18.8649 14.8861C19.2517 15.2802 19.8849 15.2861 20.279 14.8993L26.7021 8.59499ZM0.853459 8.64662L25.9923 8.88127L26.011 6.88135L0.872126 6.64671L0.853459 8.64662Z"
                                fill=""
                              ></path>
                            </svg>
                          </span>
                        </button>
                      </a>
                    </div>

                    <div class="btn-aplii mb-3">
                      <p class="mb-1 fw-bold text-start">Already filed?</p>

                      <a>
                        <button
                          type="button"
                          class="apli-buttonn"
                          onClick={handleLogin}
                        >
                          Check Application Status
                          <span class="ms-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="27"
                              height="16"
                              viewBox="0 0 27 16"
                              fill="none"
                            >
                              <path
                                d="M26.7021 8.59499C27.0963 8.20812 27.1022 7.57499 26.7153 7.18083L20.411 0.757753C20.0242 0.3636 19.391 0.357691 18.9969 0.744553C18.6027 1.13142 18.5968 1.76455 18.9837 2.15871L24.5875 7.86811L18.8781 13.4719C18.4839 13.8588 18.478 14.4919 18.8649 14.8861C19.2517 15.2802 19.8849 15.2861 20.279 14.8993L26.7021 8.59499ZM0.853459 8.64662L25.9923 8.88127L26.011 6.88135L0.872126 6.64671L0.853459 8.64662Z"
                                fill=""
                              ></path>
                            </svg>
                          </span>
                        </button>
                      </a>
                    </div>

                    <div
                      class="accordion accordion-flush"
                      id="accordionPanelsStayOpenExample"
                    >
                      <div class="accordion-item">
                        <h5 class="accordion-header">
                          <p class="mb-1 text-start border-bottom-none fw-bold">
                            Help?
                          </p>

                          <button
                            class="apli-buttonn  collapsed  justify-content-center"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                            style={{
                              borderRadius: "0px",
                              backgroundColor: "#29abe2",
                              color: "white",
                              fontWeight: "500",
                            }}
                          >
                            Get Support
                            <span class="ms-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="27"
                                height="16"
                                viewBox="0 0 27 16"
                                fill="none"
                              >
                                <path
                                  d="M26.7021 8.59499C27.0963 8.20812 27.1022 7.57499 26.7153 7.18083L20.411 0.757753C20.0242 0.3636 19.391 0.357691 18.9969 0.744553C18.6027 1.13142 18.5968 1.76455 18.9837 2.15871L24.5875 7.86811L18.8781 13.4719C18.4839 13.8588 18.478 14.4919 18.8649 14.8861C19.2517 15.2802 19.8849 15.2861 20.279 14.8993L26.7021 8.59499ZM0.853459 8.64662L25.9923 8.88127L26.011 6.88135L0.872126 6.64671L0.853459 8.64662Z"
                                  fill=""
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </h5>

                        <div
                          id="flush-collapseOne"
                          class="accordion-collapse collapse mt-2"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div
                            class="accordion-body"
                            style={{ borderRadius: "10px" }}
                          >
                            <a class="text-white" href="tel:(855) 701-3678"></a>
                            <p class="text-white">
                              <a class="text-white" href="tel:(855) 701-3678">
                                <i class="fa-solid fa-phone me-1"></i>
                                (855) 701-3678
                              </a>
                            </p>

                            <a
                              class="text-white"
                              href="mailto:support@setczone.com"
                            ></a>
                            <p>
                              <a
                                class="text-white"
                                href="mailto:support@setczone.com"
                              >
                                <i class="fa-regular fa-envelope me-1"></i>
                                support@setczone.com
                              </a>
                            </p>

                            <a
                              class="text-white"
                              href="https://calendly.com/setc-expert-kayembe/book-an-appointment-with-an-setc-expert-today"
                              target="_blank"
                            >
                              <div class="d-flex">
                                {/* <img src="./images/calendly.svg" class="img-fluid me-1" alt="" style={{width: "21px", height: "fit-content"}} /> */}
                                <p class="text-white">
                                  Book an appointment with
                                  <br />
                                  an SETC Expert
                                </p>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div class="btn-aplii mb-3">
                      <p class="mb-1 fw-bold text-start">Did  you  know?</p>

                      <a>
                        <div
                         
                         class="apli-note"
                       
                        >
                        <p style={{fontSize: '17px', color:'black'}}>We've helped over <span style={{color:'green',fontWeight: 600, fontSize: '21px'}}>50,000</span> companies claim the Employee Retention Credit!</p> 
                          <span class="ms-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="27"
                              height="16"
                              viewBox="0 0 27 16"
                              fill="none"
                            >
                              <path
                                d="M26.7021 8.59499C27.0963 8.20812 27.1022 7.57499 26.7153 7.18083L20.411 0.757753C20.0242 0.3636 19.391 0.357691 18.9969 0.744553C18.6027 1.13142 18.5968 1.76455 18.9837 2.15871L24.5875 7.86811L18.8781 13.4719C18.4839 13.8588 18.478 14.4919 18.8649 14.8861C19.2517 15.2802 19.8849 15.2861 20.279 14.8993L26.7021 8.59499ZM0.853459 8.64662L25.9923 8.88127L26.011 6.88135L0.872126 6.64671L0.853459 8.64662Z"
                                fill=""
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </a>
                    </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
