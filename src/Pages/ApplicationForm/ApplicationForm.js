import React from 'react'
import MultiStepForm from '../../Components/MultiStepForm'
import ErcMultiStepForm from '../../Components/ErcMultiStepForm'

import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
// import Footer from '../../Components/Footer/Footer'

const ApplicationForm = () => {
  return (
    <div>
      <Navbar/>
      {/* <MultiStepForm/> */}
      <ErcMultiStepForm/>
      {/* <Footer/> */}
    </div>
  )
}

export default ApplicationForm;
