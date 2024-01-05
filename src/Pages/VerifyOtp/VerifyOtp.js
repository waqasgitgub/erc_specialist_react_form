import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { setToken } from "../../Redux/Slices/userSlice";
import { useDispatch } from "react-redux";

const VerifyOtp = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const inputValue = value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  const handleToken = (token) => {
    localStorage.setItem("token", token);
    // const existingToken = localStorage.getItem('token');
    // if (!existingToken) {
    //   localStorage.setItem('token', token);
    // }
    dispatch(setToken(token));
  };
  const handleSubmitLink = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://beta.setczone.com/user/verify", {
        otp: formData.email,
      });

      if (response.status === 200) {
        const { data } = response;
        alert("verify success");
        // localStorage.setItem('loginTrue', loginTrue);

        handleToken(data.user.token);
        history.push("/application-form");
        // dispatch(createUser({ user: data.user }));
      } else {
        console.error("Error in API call");
        // dispatch(loginFailure());
      }
    } catch (error) {
      console.error("Network error", error);
      // dispatch(loginFailure());
    }
  };

  return (
    <div>
      <Navbar />

      <section class="login-form">
        <div class="d-flex justify-content-center container my-5 py-3">
          <div class="base-container-small">
            <div class="text-center mb-5">
              <h1>Verification</h1>
              <h3 class="plain">Enter your Otp</h3>
            </div>
            <div class="d-flex flex-column align-items-center">
              <div class="base-container-small">
                <form>
                  <input
                    type="hidden"
                    name="csrfmiddlewaretoken"
                    value="ASdGk4wSUlaBRxh0UX64RBZFGkuWcHvNgv7ySAQUw9RG33qP0SLLTapgvk4dxHOz"
                  />
                  <div id="div_id_email" class="mb-3">
                    <label for="id_email" class="form-label requiredField">
                      Otp
                    </label>
                    <input
                      type="text"
                      name="email"
                      placeholder="S-123456"
                      class="emailinput form-control"
                      required=""
                      id="id_email"
                      onChange={handleInputChange}
                      value={formData.email}
                    />
                  </div>
                  <div class="text-end mt-4">
                    <button
                      onClick={handleSubmitLink}
                      type="submit"
                      class="btn btn-primary"
                      id="submit-button"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default VerifyOtp;
