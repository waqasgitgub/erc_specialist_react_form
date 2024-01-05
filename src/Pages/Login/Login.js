import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({

    email: '',
     });

     const handleInputChange = (event) => {
      const { name, value} = event.target;
      const inputValue =  value;
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    };


  const handleSendLink = async (event) => {
    
    event.preventDefault();
   
      try {
        const response = await axios.post('https://beta.setczone.com/user/send-invitation', {
         email: formData.email
        });
    
        if (response.status === 200) {
          const { data } = response;
          // handleToken(data.user.token);
          // alert(data.user.token)
          // dispatch(createUser({ user: data.user }));
          history.push("/verifyOtp");
        } else {
          console.error('Error in API call');
          // dispatch(loginFailure());
        }
      } catch (error) {
        console.error('Network error', error);
        // dispatch(loginFailure());
      }
   
  };


  return (
    <div>
        <Navbar/>

          <section class="login-form">
      <div class="d-flex justify-content-center container my-5 py-3">
        <div class="base-container-small">
          <div class="text-center mb-5">
            <h1>Login</h1>
            <h3 class="plain">Enter your email and we’ll send you a link</h3>
          </div>
          <div class="d-flex flex-column align-items-center">
            <div class="base-container-small">
              <form >
                <input
                  type="hidden"
                  name="csrfmiddlewaretoken"
                  value="ASdGk4wSUlaBRxh0UX64RBZFGkuWcHvNgv7ySAQUw9RG33qP0SLLTapgvk4dxHOz"
                />
                <div id="div_id_email" class="mb-3">
                  <label for="id_email" class="form-label requiredField">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. example@example.com"
                    class="emailinput form-control"
                    required=""
                    id="id_email"
                    onChange={handleInputChange}
                    value={formData.email}
                  />
                </div>
                <div class="text-end mt-4">
                  <button
                  onClick={handleSendLink}
                    type="submit"
                    class="btn btn-primary"
                    id="submit-button"
                  >
                    Send me a link
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </div>
  )
}

export default Login
