import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import frameFluid from "./GlobalImages/Frame1.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./GlobalStyles/globalStyles.css";
import Pdf2019 from "../../src/Pdf/2019Step2.pdf";
import Pdf2020 from "../../src/Pdf/2020Step2.pdf";
import Pdf2021 from "../../src/Pdf/2021Step2.pdf";
import PdfNetEarning from "../../src/Pdf/netEarn.pdf";
import { setToken } from "../Redux/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import gifTick from "./GlobalImages/gif-submit.gif";
import taxSet from "./GlobalImages/Tax_set.png";
import newImage from "./GlobalImages/Group 940.png";
import framepng from "./GlobalImages/Frame.png";
import qustMark from "./GlobalImages/Qust_mark.png";
import congrats from "./GlobalImages/congratss.png";
import Confetti from "react-confetti";

import {
  CheckBoxSharp,
  CheckCircle,
  CheckCircleOutline,
  DomainVerification,
  QuestionMark,
  TaskAlt,
} from "@mui/icons-material";
import FileInputComponent from "./FileInputComponent";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

import Check from "@mui/icons-material/Check";
import { styled } from "@mui/system";
import { Avatar } from "@mui/material";
import LoadingScreen from "./LoadingScreen";
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: 5 }}>
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          sx={{ height: "10px", borderRadius: "6px" }}
          variant="determinate"
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          style={{ fontWeight: 600 }}
          variant="body2"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
  "Step 4",
  "Step 5",
  "Step 6",
  "Step 7",
  "Step 8",
  "Step 9",
  "Step 10",
  "Step 11",
  "Step 12",
  "Step 13",
  "Step 14",
  "Step 15",
  "Step 16",
  "Step 17",
  "Step 18",
  "Step 19",
  "Step 20",
];

const steps1 = [
  "Contact Form",
  "Eligibility",
  "1 of 6",
  "2 of 6",
  "3 of 6",
  "4 of 6",
  "5 of 6",
  "6 of 6",
  "Pre-Qualification Complete",
];

const steps2 = [
  "Begin Application",
  "1 of 7",
  "2 of 7",
  "3 of 7",
  "4 of 7",
  "5 of 7",
  "6 of 7",
  "7 of 7",
  // "8 of 8",
  "Estimate Calculator",
];

const steps18 = [
  "Begin application",
  "Estimated Calculator",
  "Upload Documents",
];

const MultiStepForm = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  const [finalCreditAmountStorage, setFinalCreditAmountStorage] =
    useState(null);

  const [uploadCompleteTimes, setUploadCompleteTimes] = useState({
    driving_licence: null,
    schedule_pdf: null,
    Tax_Return_2020: null,
    Tax_Return_2021: null,
    supplemental_attachment_2020: null,
    supplemental_attachment_2021: null,
    FormA1099: null,
    FormB1099: null,
    ks2020: null,
    ks22020: null,
  });

  console.log(uploadCompleteTimes.driving_licence, "timewaqas");

  const [finalIncomeValue, setFinalIncomeValue] = useState(null);

  const [activeErrorQualifyOne, setActiveErrorQualifyOne] = useState(false);

  const [activeErrorQualifyTwoo, setActiveErrorQualifyTwoo] = useState(false);
  const [activeErrorQualifyTen, setActiveErrorQualifyTen] = useState(false);

  const [activeErrorQualifyThree, setActiveErrorQualifyThree] = useState(false);
  const [activeErrorQualifyFive, setActiveErrorQualifyFive] = useState(false);
  const [activeErrorQualifySix, setActiveErrorQualifySix] = useState(false);
  const [activeErrorQualify17, setActiveErrorQualify17] = useState(false);

  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [userData, setUserData] = useState();
  const [selectedFiles, setSelectedFiles] = useState({
    driving_licence: [],
    schedule_pdf: [],
    Tax_Return_2020: [],
    Tax_Return_2021: [],
    supplemental_attachment_2020: [],
    supplemental_attachment_2021: [],
    FormA1099: [],
    FormB1099: [],
    ks2020: [],
    ks22020: [],
  });

  const [uploadProgress, setUploadProgress] = useState({
    driving_licence: 0,
    schedule_pdf: 0,
    Tax_Return_2020: 0,
    Tax_Return_2021: 0,
    supplemental_attachment_2020: 0,
    supplemental_attachment_2021: 0,
    FormA1099: 0,
    FormB1099: 0,
    ks2020: 0,
    ks22020: 0,
  });

  const [uploadingFile, setUploadingFile] = useState("");

  const [addingFileType, setAddingFileType] = useState(null);

  const width = 800; // Set your desired width here
  const height = 600; // Set your desired height here
  const [showRemoveButton, setShowRemoveButton] = useState(true);

  const handleAddFileClick = (type) => {

    setAddingFileType(type);
  };

  const confettiStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    pointerEvents: "none",
  };

  const boxStyle = {
    position: "relative",
    width: "100%",
    maxWidth: "1500px",
    boxShadow: "0 0 5px 5px rgb(60 125 147 / 30%)",
    borderRadius: "8px",
    margin: "0 auto",
    padding: "90px 20px",
    display: "block",
  };
  const boxSttyle = {
    position: "relative",
    width: "100%",
    maxWidth: "1500px",
    // boxShadow: '0 0 1px 1px rgb(60 125 147 / 30%)',
    borderRadius: "8px",
    margin: "0 auto",
    padding: "189px 20px",
    display: "block",
  };

  const mobileBoxStyle = {
    width: "100%",
    maxWidth: "none",
    display: "none",
    padding: "30px 20px",
  };

  // Media query for mobile screens
  const mediaQuery = "@media (max-width: 768px)";

  const styles = {
    [mediaQuery]: {
      ".desktop-box": {
        display: "block",
      },
      ".mobile-box": {
        display: "none",
      },
    },
  };

  const handleRemoveInput = () => {
    setAddingFileType(null);
  };

  const handleGo = () => {
    history.push("/status")
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  
  
  const handleFileChange = (inputName, event) => {
    const selectedFiles = event.target.files;
    const fileNames = Array.from(selectedFiles).map((file) => file.name); // Extract file names

    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [inputName]: selectedFiles, // Assign an array of files
    }));

    const formData = new FormData(); // Create a new FormData object

    // Append all selected files for the inputName
    for (const file of selectedFiles) {
      formData.append(inputName, file);
    }

    // Call the upload function with the prepared formData
    uploadFile(formData, inputName, fileNames);
  };

  // Function to upload the file

  const handleCheckboxChange = (event) => {
    setCheckboxChecked(event.target.checked);
  };

 

  const allFilesSelected = () => {
    return (
      selectedFiles?.driving_licence?.length > 0 &&
      selectedFiles?.schedule_pdf?.length > 0 &&
      selectedFiles?.Tax_Return_2020?.length > 0 &&
      selectedFiles?.Tax_Return_2021?.length > 0
    );
  };

  const allFilesSelectedAdditional = () => {
    return (
      selectedFiles?.driving_licence?.length > 0 &&
      selectedFiles?.schedule_pdf?.length > 0 &&
      selectedFiles?.Tax_Return_2020?.length > 0 &&
      selectedFiles?.Tax_Return_2021?.length > 0 &&
      selectedFiles?.supplemental_attachment_2020?.length > 0 &&
      selectedFiles?.supplemental_attachment_2021?.length > 0 &&
      selectedFiles?.FormA1099?.length > 0 &&
      selectedFiles?.FormB1099?.length > 0 &&
      selectedFiles?.ks2020?.length > 0 &&
      selectedFiles?.ks22020?.length > 0
    );
  };

  const shouldDisableButtons = () => {
    return !(checkboxChecked && allFilesSelected());
  };

  const shouldDisableButtonsAdditional = () => {
    return !(checkboxChecked && allFilesSelectedAdditional());
  };

  const shouldDisableButtonLater = () => {
    return !checkboxChecked;
  };

  useEffect(() => {
    // Fetch final_roundedValue from local storage when the component mounts
    const storedFinalCreditAmount = localStorage.getItem("final_roundedValue");
    if (storedFinalCreditAmount) {
      setFinalCreditAmountStorage(storedFinalCreditAmount);
    }
  }, []);

  const handleSubmitLater = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true); // Set loading to true to display the loader

      const response = await axios.put(
        "https://beta.setczone.com/user/updateApplication",
        {}, // You might need to pass data here if required by the API
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Change content type if not sending multipart/form-data
          },
          onUploadProgress: (progressEvent) => {
            // Update progress for each file
            // Handle progress tracking for multiple files as needed
          },
        }
      );

      console.log(`Files uploaded successfully`, response.data);
      await fetchUserDataa();
      // Handle success response
    } catch (error) {
      console.error(`Error uploading files:`, error);
      // Handle error
    } finally {
    setLoading(false); // Hide the loader when the request is completed (either success or failure)
  }
  };

  // const handleSubmiDocuments = async () => {
  //   const token = localStorage.getItem("token");

  //   try {
  //     const response = await axios.put(
  //       "https://beta.setczone.com/user/updateDocumentStatus",
  //       {}, // You might need to pass data here if required by the API
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json", // Change content type if not sending multipart/form-data
  //         },
  //         onUploadProgress: (progressEvent) => {
  //           // Update progress for each file
  //           // Handle progress tracking for multiple files as needed
  //         },
  //       }
  //     );
  //     alert("Complete Application");
  //     console.log(`Files uploaded successfully`, response.data);
  //     await fetchUserDataa();

  //     await submitHubspotForm();
  //     // Handle success response
  //   } catch (error) {
  //     console.error(`Error uploading files:`, error);
  //     // Handle error
  //   }
  // };
  const handleSubmiDocuments = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true); // Set loading to true to display the loader

      const response = await axios.put(
        "https://beta.setczone.com/user/updateDocumentStatus",
        {}, // You might need to pass data here if required by the API
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Change content type if not sending multipart/form-data
          },
          onUploadProgress: (progressEvent) => {
            // Update progress for each file
            // Handle progress tracking for multiple files as needed
          },
        }
      );
      alert("Complete Application");
      console.log(`Files uploaded successfully`, response.data);
      await fetchUserDataa();
      await submitHubspotForm();
      // Handle success response
    } catch (error) {
      console.error(`Error uploading files:`, error);
      // Handle error
    } finally {
      setLoading(false); // Hide the loader when the request is completed (either success or failure)
    }
  };
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);

  console.log(token, "selectttttt token");

  const initialFormData = {
    firstName: "",
    lastName: "",
    adGroupDetails: "",
    phone: "",
    email: "",
    bussinessName: "",
    tradeName: "",
    streetAddressOne: "",
    streetAddressTwo: "",
    city: "",
    province: "",
    zipCode: "",
    knowAbout: "",
    accounting_professional: "",
    accounting_partnership: "",
    isChecked: false,

    selfEmployedFrom: "",
    isCheckedStepThree: false,

    scheduleSelfEmployement: "",
    positive_net_earning: "",
    covid_related_issues: "",
    setc_program: "",
    isCheckedStepNine: false,
    mandatory_questions: "",

    netIncome2019: "",
    netIncome2020: "",
    netIncome2021: "",

    bussinessNegatively: "",

    personallySick2020: "",

    personal_startdate2020: "",
    personal_enddate2020: "",
    numberOfDays: "", // Added field for number of days

    personallySick2021: "",

    personal_startdate2021: "",
    personal_enddate2021: "",
    numberOfDays2021: "",

    symptoms2020: "",
    cared_startdate2020: "",
    cared_enddate2020: "",
    symptomsdays2020: "",

    symptoms2021: "",
    cared_startdate2021: "",
    cared_enddate2021: "",
    symptomsdays2021: "",

    closure2020: "",
    minor_startdate2020: "",
    minor_enddate2020: "",
    minordays2020: "",

    closure2021: "",
    minor_startdate2021: "",
    minor_enddate2021: "",
    minordays2021: "",

    employed_as_W2: "",
    family_sick: "",
    amount2020: "",
    amount2021: "",

    // Add other form fields here
  };

  const [formData, setFormData] = useState(initialFormData);
  const [emailValidated, setEmailValidated] = useState(false);

  console.log(formData.symptomsdays2020, "dayssssssssssss");

  const [errors, setErrors] = useState({});

  const handleToken = (token) => {
    localStorage.setItem("token", token);
    // const existingToken = localStorage.getItem('token');
    // if (!existingToken) {
    //   localStorage.setItem('token', token);
    // }
    dispatch(setToken(token));
  };

  const formDataPreparing = async (step) => {
    try {
      setLoading(true);
      const response = await fetch("https://beta.setczone.com/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          step: step,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          business_name: formData.bussinessName,
          trade_name: formData.tradeName,
          address_line_1: formData.streetAddressOne,
          city: formData.city, // Add more fields as needed
          state: formData.province,
          address_line_2: formData.streetAddressTwo,
          zip: formData.zipCode,
          know_about_us: formData.knowAbout,
          accounting_professional: formData.accounting_professional,
          accounting_partnership: formData.accounting_partnership
        }),
      });
      if (response.ok) {
        // alert(selectToken)
        const data = await response.json();
        handleToken(data.user.token);

        console.log(data.user.first_name, data.user.last_name, "hamzawaqas");

        localStorage.setItem("fName", data.user.first_name);
        localStorage.setItem("lName", data.user.last_name);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        // Handle error
        console.error("Error in API call");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error", error);
    } finally {
    // Reset loading to false after the API call is completed or errored
    setLoading(false);
  }
  };

  const formDataUpdate = async (step) => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");

      if (!token) {
        // Handle missing token - Redirect or handle the situation accordingly
        console.error("Token is missing");
        // For example, redirect to the step where the token should be available
        setActiveStep(0); // Redirect to step 0 for token creation
        return;
      }

      const response = await fetch(
        `https://beta.setczone.com/user/${step}/updateuser`,
        {
          method: "PUT", // Change the method to PUT
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            step: step,
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            business_name: formData.bussinessName,
            trade_name: formData.tradeName,
            address_line_1: formData.streetAddressOne,
            city: formData.city,
            state: formData.province,
            address_line_2: formData.streetAddressTwo,
            zip: formData.zipCode,
            know_about_us: formData.knowAbout,
            accounting_professional: formData.accounting_professional,
            accounting_partnership: formData.accounting_partnership,
            
            self_employed_from: formData.selfEmployedFrom,
            net_income_2019: formData.netIncome2019,
            net_income_2020: formData.netIncome2020,
            net_income_2021: formData.netIncome2021,
            business_negatively_impacted: formData.bussinessNegatively,

            personal_startdate2020: formData.personal_startdate2020,
            personal_enddate2020: formData.personal_enddate2020,
            onedays: formData.numberOfDays,

            personal_startdate2021: formData.personal_startdate2021,
            personal_enddate2021: formData.personal_enddate2021,
            twodays: formData.numberOfDays2021,

            cared_startdate2020: formData.cared_startdate2020,
            cared_enddate2020: formData.cared_enddate2020,
            threedays: formData.symptomsdays2020,

            cared_startdate2021: formData.cared_startdate2021,
            cared_enddate2021: formData.cared_enddate2021,
            fourdays: formData.symptomsdays2021,

            minor_startdate2020: formData.minor_startdate2020,
            minor_enddate2020: formData.minor_enddate2020,
            fivedays: formData.minordays2020,

            minor_startdate2021: formData.minor_startdate2021,
            minor_enddate2021: formData.minor_enddate2021,
            sixdays: formData.minordays2021,

            employed_as_W2: formData.employed_as_W2,
            Family_Sick_Leave: formData.family_sick,

            amount2020: formData.amount2020,
            amount2021: formData.amount2021,

            your_file_schedule: formData.scheduleSelfEmployement,
            mandatory_questions: formData.mandatory_questions,
            if_you_have_positive_earning: formData.positive_net_earning,
            did_you_miss_SEWDTC: formData.covid_related_issues,
            have_you_filed_already_for_setc: formData.setc_program,
          }),
        }
      );

      if (response.ok) {
        // alert(`success ${step}`);
        const data = await response.json();

        console.log(data);

        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        // Call the separate function for calculation API

        // await callSetcformData(token, formData);

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        // Handle error
        console.error("Error in API call");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error", error);
    } finally {
      // Reset loading to false after the API call is completed or errored
      setLoading(false);
    }
  };
  
  const formDataUpdateCalculation = async (step) => {
    try {
      setLoading(true)
      let token = localStorage.getItem("token");

      if (!token) {
        // Handle missing token - Redirect or handle the situation accordingly
        console.error("Token is missing");
        // For example, redirect to the step where the token should be available
        setActiveStep(0); // Redirect to step 0 for token creation
        return;
      }

      const response = await fetch(
        `https://beta.setczone.com/user/${step}/updateuser`,
        {
          method: "PUT", // Change the method to PUT
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            step: step,
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            business_name: formData.bussinessName,
            trade_name: formData.tradeName,
            address_line_1: formData.streetAddressOne,
            city: formData.city,
            state: formData.province,
            address_line_2: formData.streetAddressTwo,
            zip: formData.zipCode,
            know_about_us: formData.knowAbout,
            self_employed_from: formData.selfEmployedFrom,
            net_income_2019: formData.netIncome2019,
            net_income_2020: formData.netIncome2020,
            net_income_2021: formData.netIncome2021,
            business_negatively_impacted: formData.bussinessNegatively,

            personal_startdate2020: formData.personal_startdate2020,
            personal_enddate2020: formData.personal_enddate2020,
            onedays: formData.numberOfDays,

            personal_startdate2021: formData.personal_startdate2021,
            personal_enddate2021: formData.personal_enddate2021,
            twodays: formData.numberOfDays2021,

            cared_startdate2020: formData.cared_startdate2020,
            cared_enddate2020: formData.cared_enddate2020,
            threedays: formData.symptomsdays2020,

            cared_startdate2021: formData.cared_startdate2021,
            cared_enddate2021: formData.cared_enddate2021,
            fourdays: formData.symptomsdays2021,

            minor_startdate2020: formData.minor_startdate2020,
            minor_enddate2020: formData.minor_enddate2020,
            fivedays: formData.minordays2020,

            minor_startdate2021: formData.minor_startdate2021,
            minor_enddate2021: formData.minor_enddate2021,
            sixdays: formData.minordays2021,

            employed_as_W2: formData.employed_as_W2,
            Family_Sick_Leave: formData.family_sick,

            amount2020: formData.amount2020,
            amount2021: formData.amount2021,

            your_file_schedule: formData.scheduleSelfEmployement,
            mandatory_questions: formData.mandatory_questions,
            if_you_have_positive_earning: formData.positive_net_earning,
            did_you_miss_SEWDTC: formData.covid_related_issues,
            have_you_filed_already_for_setc: formData.setc_program,
          }),
        }
      );

      if (response.ok) {
        // alert(`success ${step}`);
        const data = await response.json();

        console.log(data);

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);

        // Call the separate function for calculation API

        await callSetcformData(token, formData);

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        // Handle error
        console.error("Error in API call");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error", error);
    } finally {
      // Reset loading to false after the API call is completed or errored
      setLoading(false);
    }
  };

  const callSetcformData = async (token, formData) => {
    setLoading(true)
    try {
      const response = await fetch("https://beta.setczone.com/user/setcformData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          net_income_2019: formData.netIncome2019,
          net_income_2020: formData.netIncome2020,
          net_income_2021: formData.netIncome2021,
          "1days": formData.numberOfDays,
          "2days": formData.numberOfDays2021,
          "3days": formData.symptomsdays2020,
          "4days": formData.symptomsdays2021,
          "5days": formData.minordays2020,
          "6days": formData.minordays2021,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        // Check if final_credit_amount is not null and store it in local storage
        if (data.user && data.user.final_roundedValue !== null) {
          setFinalIncomeValue(data.user.final_roundedValue);

          localStorage.setItem(
            "final_roundedValue",
            data.user.final_roundedValue
          );
        }
      } else {
        console.error("Error in calculation API call");
      }
    } catch (error) {
      console.error("Network error", error);
    } finally {
      // Reset loading to false after the API call is completed or errored
      setLoading(false);
    }
  };

  const formDataUpdateStepTwo = async (step) => {
    try {
      let token = localStorage.getItem("token");

      if (!token) {
        // Handle missing token - Redirect or handle the situation accordingly
        console.error("Token is missing");
        // For example, redirect to the step where the token should be available
        setActiveStep(0); // Redirect to step 0 for token creation
        return;
      }

      const response = await fetch(
        `https://beta.setczone.com/user/${step}/updateuser`,
        {
          method: "PUT", // Change the method to PUT
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            business_name: formData.bussinessName,
            trade_name: formData.tradeName,
            address_line_1: formData.streetAddressOne,
            city: formData.city,
            state: formData.province,
            address_line_2: formData.streetAddressTwo,
            zip: formData.zipCode,
            know_about_us: formData.knowAbout,
            self_employed_from: formData.selfEmployedFrom,
          }),
        }
      );

      if (response.ok) {
        // alert(`success ${step}`);
        const data = await response.json();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        // Handle error
        console.error("Error in API call");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error", error);
    }
  };
  const formDataUpdateWithoutNextStep = async (step) => {
    try {
      let token = localStorage.getItem("token");

      if (!token) {
        // Handle missing token - Redirect or handle the situation accordingly
        console.error("Token is missing");
        // For example, redirect to the step where the token should be available
        setActiveStep(0); // Redirect to step 0 for token creation
        return;
      }

      const response = await fetch(
        `https://beta.setczone.com/user/${step}/updateuser`,
        {
          method: "PUT", // Change the method to PUT
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            step: step,
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            business_name: formData.bussinessName,
            trade_name: formData.tradeName,
            address_line_1: formData.streetAddressOne,
            city: formData.city,
            state: formData.province,
            address_line_2: formData.streetAddressTwo,
            zip: formData.zipCode,
            know_about_us: formData.knowAbout,
            accounting_professional: formData.accounting_professional,
            accounting_partnership: formData.accounting_partnership,
            
            self_employed_from: formData.selfEmployedFrom,
            net_income_2019: formData.netIncome2019,
            net_income_2020: formData.netIncome2020,
            net_income_2021: formData.netIncome2021,
            business_negatively_impacted: formData.bussinessNegatively,

            personal_startdate2020: formData.personal_startdate2020,
            personal_enddate2020: formData.personal_enddate2020,
            onedays: formData.numberOfDays,

            personal_startdate2021: formData.personal_startdate2021,
            personal_enddate2021: formData.personal_enddate2021,
            twodays: formData.numberOfDays2021,

            cared_startdate2020: formData.cared_startdate2020,
            cared_enddate2020: formData.cared_enddate2020,
            threedays: formData.symptomsdays2020,

            cared_startdate2021: formData.cared_startdate2021,
            cared_enddate2021: formData.cared_enddate2021,
            fourdays: formData.symptomsdays2021,

            minor_startdate2020: formData.minor_startdate2020,
            minor_enddate2020: formData.minor_enddate2020,
            fivedays: formData.minordays2020,

            minor_startdate2021: formData.minor_startdate2021,
            minor_enddate2021: formData.minor_enddate2021,
            sixdays: formData.minordays2021,

            employed_as_W2: formData.employed_as_W2,
            Family_Sick_Leave: formData.family_sick,

            amount2020: formData.amount2020,
            amount2021: formData.amount2021,

            your_file_schedule: formData.scheduleSelfEmployement,
            mandatory_questions: formData.mandatory_questions,
            if_you_have_positive_earning: formData.positive_net_earning,
            did_you_miss_SEWDTC: formData.covid_related_issues,
            have_you_filed_already_for_setc: formData.setc_program,
          }),
        }
      );

      if (response.ok) {
        // alert(`success ${step}`);
        const data = await response.json();

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        // Handle error
        console.error("Error in API call");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error", error);
    }
  };

  const formDataUpdateWithoutNextStepTwo = async (step) => {
    try {
      let token = localStorage.getItem("token");

      if (!token) {
        // Handle missing token - Redirect or handle the situation accordingly
        console.error("Token is missing");
        // For example, redirect to the step where the token should be available
        setActiveStep(0); // Redirect to step 0 for token creation
        return;
      }

      const response = await fetch(
        `https://beta.setczone.com/user/${step}/updateuser`,
        {
          method: "PUT", // Change the method to PUT
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            business_name: formData.bussinessName,
            trade_name: formData.tradeName,
            address_line_1: formData.streetAddressOne,
            city: formData.city,
            state: formData.province,
            address_line_2: formData.streetAddressTwo,
            zip: formData.zipCode,
            know_about_us: formData.knowAbout,
            self_employed_from: formData.selfEmployedFrom,
          }),
        }
      );

      if (response.ok) {
        // alert(`success ${step}`);
        const data = await response.json();

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        // Handle error
        console.error("Error in API call");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error", error);
    }
  };

  const checkEmailAvailability = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        "https://beta.setczone.com/user/checkMail",
        {
          email: formData.email,
        }
      );

      if (response.status === 200) {
        console.log(response.data.message); // Log the message from the response
        // Email is available
        setEmailValidated(true);
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is available",
        }));
      } else {
        setEmailValidated(false);

        // Email is not available
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email already in use!",
        }));
      }
    } catch (error) {
      setEmailValidated(false);
      // Handle API error
      console.error("Error checking email availability", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email already in use!",
      }));
    } finally {
      // Reset loading to false after the API call is completed or errored
      setLoading(false);
    }
  };

  const handleNext = async () => {
    console.log(activeStep, "here is my active step");
    const isValid = validateInputs();
    if (!isValid) {
      return;
    }

    // if (!emailValidated) {
    //   // Validate email before proceeding to the next step
    //   await checkEmailAvailability();
    const token = localStorage.getItem("token");

    // }

    if (token) {
      if (activeStep === 0) {
        formDataUpdate(activeStep);
      }
    } else {
      if (activeStep === 0) {
        formDataPreparing(activeStep);
      }
    }

    if (activeStep === 1) {
      // await submitHubspotForm();
      // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      formDataUpdate(activeStep);
    }

    if (activeStep === 2) {
      formDataUpdate(activeStep);
      // formDataUpdateStepTwo(activeStep);
    }

    // if (activeStep === 3) {

    //   alert(formData.netIncome2019);

    //   formDataUpdateCalculation(activeStep);

    // }
    if (activeStep === 3) {
      formDataUpdate(activeStep);
    }

    // if (activeStep === 4) {
    //   formDataUpdate(activeStep);
    // }
    if (activeStep === 4) {
      formDataUpdate(activeStep);
    }

    // if (activeStep === 5) {
    //   formDataUpdateCalculation(activeStep);
    // }
    if (activeStep === 5) {
      formDataUpdate(activeStep);
    }

    // if (activeStep === 6) {
    //   formDataUpdateCalculation(activeStep);
    // }
    if (activeStep === 6) {
      formDataUpdate(activeStep);
    }

    // if (activeStep === 7) {
    //   formDataUpdateCalculation(activeStep);
    // }
    if (activeStep === 7) {
      formDataUpdate(activeStep);
    }

    // if (activeStep === 8) {
    //   formDataUpdate(activeStep);
    // }
    if (activeStep === 8) {
      formDataUpdate(activeStep);
    }
    if (activeStep === 9) {
      formDataUpdate(activeStep);
    }

    // if (activeStep === 9) {
    //   formDataUpdate(activeStep);
    // }
    // if (activeStep === 10) {
    //   formDataUpdate(activeStep);
    // }
    if (activeStep === 10) {
      formDataUpdateCalculation(activeStep);
    }
    if (activeStep === 11) {
      formDataUpdateCalculation(activeStep);
    }
    if (activeStep === 12) {
      formDataUpdateCalculation(activeStep);
    }

    if (activeStep === 13) {
      formDataUpdateCalculation(activeStep);
    }
    if (activeStep === 14) {
      formDataUpdateCalculation(activeStep);
    }
    if (activeStep === 15) {
      formDataUpdateCalculation(activeStep);
    }

    if (activeStep === 16) {
      formDataUpdateCalculation(activeStep);
    }

    if (activeStep === 17) {
      formDataUpdate(activeStep);
    }

    window.scrollTo(0, 0);
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    let inputValue = value;

    if (name.startsWith("netIncome")) {
      inputValue = value.replace(/\D/g, ""); // Remove non-digit characters
      inputValue = inputValue ? `$${Number(inputValue).toLocaleString()}` : "$"; // Format as currency with dollar sign
    }

    if (type === "checkbox") {
      inputValue = event.target.checked;
    } else if (type === "date") {
      if (value === "") {
        inputValue = ""; // Set to an empty string for no date selected
      } else {
        const dateValue = new Date(value);
        const formattedDate = dateValue.toISOString().substr(0, 10);
        inputValue = formattedDate;
      }
    }

    if (name === "personallySick2020" && inputValue === "No") {
      // Clear values for 2020 if "No" is selected
      setFormData((prevFormData) => ({
        ...prevFormData,
        personal_startdate2020: "",
        personal_enddate2020: "",
        numberOfDays: "",
        [name]: inputValue,
      }));
    } else if (name === "personallySick2021" && inputValue === "No") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        personal_startdate2021: "",
        personal_enddate2021: "",
        numberOfDays: "",
        [name]: inputValue,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    }

    if (name === "symptoms2020" && inputValue === "No") {
      // Clear values for 2020 if "No" is selected
      setFormData((prevFormData) => ({
        ...prevFormData,
        cared_startdate2020: "",
        cared_enddate2020: "",
        symptomsdays2020: "",
        [name]: inputValue,
      }));
    } else if (name === "symptoms2021" && inputValue === "No") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        cared_startdate2021: "",
        cared_enddate2021: "",
        symptomsdays2021: "",
        [name]: inputValue,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    }

    if (name === "closure2020" && inputValue === "No") {
      // Clear values for 2020 if "No" is selected
      setFormData((prevFormData) => ({
        ...prevFormData,
        minor_startdate2020: "",
        minor_enddate2020: "",
        minordays2020: "",
        [name]: inputValue,
      }));
    } else if (name === "closure2021" && inputValue === "No") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        minor_startdate2021: "",
        minor_enddate2021: "",
        minordays2021: "",
        [name]: inputValue,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    }

    if (
      (name === "family_sick" && inputValue === "No") ||
      (name === "employed_as_W2" && inputValue === "No")
    ) {
      // Clear values for 2020 if "No" is selected
      setFormData((prevFormData) => ({
        ...prevFormData,
        amount2020: "",
        amount2021: "",
        [name]: inputValue,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    }

    if (name === "numberOfDays" && inputValue === "0") {
      // Reset date values to empty strings if numberOfDays becomes zero
      setFormData((prevFormData) => ({
        ...prevFormData,
        personal_startdate2020: "",
        personal_enddate2020: "",
        [name]: value,
      }));
    } else if (name === "numberOfDays2021" && inputValue === "0") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        personal_startdate2021: "",
        personal_enddate2021: "",
        [name]: value,
      }));
    } else if (name === "symptomsdays2020" && inputValue === "0") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        cared_startdate2020: "",
        cared_enddate2020: "",
        [name]: inputValue,
      }));
    } else if (name === "symptomsdays2021" && inputValue === "0") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        cared_startdate2021: "",
        cared_enddate2021: "",
        [name]: inputValue,
      }));
    } else if (name === "minordays2020" && inputValue === "0") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        minor_startdate2020: "",
        minor_enddate2020: "",
        [name]: inputValue,
      }));
    } else if (name === "minordays2021" && inputValue === "0") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        minor_startdate2021: "",
        minor_enddate2021: "",
        [name]: inputValue,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    }
  };
  const handleEmailBlur = async () => {
    const token = localStorage.getItem("token");
    if (!token && formData.email.trim() !== "") {
      await checkEmailAvailability();
    } else {
      console.log("nothing");
    }
  };

  const validateInputs = () => {
    let hasErrors = false;
    const errorsObj = {};
    let largerThan25KCount = 0;
    const token = localStorage.getItem("token");

    if (activeStep === 0) {
      if (formData.firstName.trim() === "") {
        errorsObj.firstName = "First name cannot be empty";
        hasErrors = true;
      }

      if (formData.lastName.trim() === "") {
        errorsObj.lastName = "Last name cannot be empty";
        hasErrors = true;
      }

      if (formData.phone.trim() === "") {
        errorsObj.phone = "Phone number cannot be empty";
        hasErrors = true;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email.trim() === "" || !emailRegex.test(formData.email)) {
        errorsObj.email = "Invalid email format";
        hasErrors = true;
      }

      if (!emailValidated && !token) {
        errorsObj.email = "Email already in use!";
        hasErrors = true;
        window.scrollTo(0, 0);
      }

      if (formData.bussinessName.trim() === "") {
        errorsObj.bussinessName = "Bussiness name cannot be empty";
        hasErrors = true;
      }

      if (formData.tradeName.trim() === "") {
        errorsObj.tradeName = "Trade name cannot be empty";
        hasErrors = true;
      }

      if (formData.streetAddressOne.trim() === "") {
        errorsObj.streetAddressOne = "Street address cannot be empty";
        hasErrors = true;
      }

      if (formData.city.trim() === "") {
        errorsObj.city = "City name cannot be empty";
        hasErrors = true;
      }

      if (formData.province.trim() === "") {
        errorsObj.province = "Province name cannot be empty";
        hasErrors = true;
      }

      if (formData.zipCode.trim() === "") {
        errorsObj.zipCode = "Zip code cannot be null";
        hasErrors = true;
      }

      if (formData?.knowAbout?.trim() === "") {
        errorsObj.knowAbout = "Required field";
        hasErrors = true;
      }

      if (!formData.accounting_professional) {
        errorsObj.accounting_professional = "Please select an option";
        hasErrors = true;
      }

      if (
        !formData.accounting_partnership &&
        formData.accounting_professional === "Yes"
      ) {
        errorsObj.accounting_partnership = "Please select an option";
        hasErrors = true;
      }

      if (!formData.isChecked) {
        errorsObj.isChecked = "Please check the box";
        hasErrors = true;
      }
    }

    if (activeStep === 2) {
      if (!formData.selfEmployedFrom) {
        errorsObj.selfEmployedFrom = "Please select an option";
        hasErrors = true;
      }

      if (
        formData.selfEmployedFrom === "No" &&
        formData.selfEmployedFrom !== "Yes"
      ) {
        setActiveErrorQualifyOne(true);
        formDataUpdateWithoutNextStep(activeStep);
        hasErrors = true;
      }
      if (formData.selfEmployedFrom === "Yes") {
        setActiveErrorQualifyOne(false);
        hasErrors = false;
      }
    }

    if (activeStep === 3) {
      if (!formData.scheduleSelfEmployement) {
        errorsObj.scheduleSelfEmployement = "Please select an option";
        hasErrors = true;
      }
      if (
        formData.scheduleSelfEmployement === "No" &&
        formData.scheduleSelfEmployement !== "Yes"
      ) {
        setActiveErrorQualifyTwoo(true);
        formDataUpdateWithoutNextStep(activeStep);
        hasErrors = true;
      }
      if (formData.scheduleSelfEmployement === "Yes") {
        setActiveErrorQualifyTwoo(false);
        hasErrors = false;
      }
    }

    if (activeStep === 4) {
      if (!formData.positive_net_earning) {
        errorsObj.positive_net_earning = "Please select an option";
        hasErrors = true;
      }
      if (
        formData.positive_net_earning === "No" &&
        formData.positive_net_earning !== "Yes"
      ) {
        setActiveErrorQualifyThree(true);
        formDataUpdateWithoutNextStep(activeStep);
        hasErrors = true;
      }
      if (formData.positive_net_earning === "Yes") {
        setActiveErrorQualifyThree(false);
        hasErrors = false;
      }
    }
    if (activeStep === 5) {
      if (!formData.covid_related_issues) {
        errorsObj.covid_related_issues = "Please select an option";
        hasErrors = true;
      }
      if (
        formData.covid_related_issues === "No" &&
        formData.covid_related_issues !== "Yes"
      ) {
        setActiveErrorQualifyFive(true);
        formDataUpdateWithoutNextStep(activeStep);
        hasErrors = true;
      }
      if (formData.covid_related_issues === "Yes") {
        setActiveErrorQualifyFive(false);
        hasErrors = false;
      }
    }
    if (activeStep === 6) {
      if (!formData.setc_program) {
        errorsObj.setc_program = "Please select an option";
        hasErrors = true;
      }
      if (formData.setc_program === "Yes" && formData.setc_program !== "No") {
        setActiveErrorQualifySix(true);
        formDataUpdateWithoutNextStep(activeStep);
        hasErrors = true;
      }
      if (formData.setc_program === "No") {
        setActiveErrorQualifySix(false);
        hasErrors = false;
      }
    }

    if (activeStep === 16) {
      if (!formData.netIncome2019 || formData.netIncome2019 === "$") {
        errorsObj.netIncome2019 = "Please enter a value";
        hasErrors = true;
      }

      if (Number(formData.netIncome2019.replace(/\D/g, "")) < 25000) {
        largerThan25KCount++;
      }

      if (!formData.netIncome2020 || formData.netIncome2020 === "$") {
        errorsObj.netIncome2020 = "Please enter a value";
        hasErrors = true;
      }

      if (Number(formData.netIncome2020.replace(/\D/g, "")) < 25000) {
        largerThan25KCount++;
      }

      if (!formData.netIncome2021 || formData.netIncome2021 === "$") {
        errorsObj.netIncome2021 = "Please enter a value";
        hasErrors = true;
      }

      if (Number(formData.netIncome2021.replace(/\D/g, "")) < 25000) {
        largerThan25KCount++;
      }

      if (largerThan25KCount >= 2) {
        hasErrors = true;
        setActiveErrorQualify17(true);
      } else {
        hasErrors = false;
        setActiveErrorQualify17(false);
      }
    }

    if (activeStep === 10) {
      if (!formData.personallySick2020) {
        errorsObj.personallySick2020 = "Please select an option";
        hasErrors = true;
      }

      if (
        !formData.personal_startdate2020 &&
        formData.numberOfDays !== "0" &&
        formData.personallySick2020 === "Yes"
      ) {
        errorsObj.personal_startdate2020 = "Please select date";
        hasErrors = true;
      }

      if (
        !formData.personal_enddate2020 &&
        formData.numberOfDays !== "0" &&
        formData.personallySick2020 === "Yes"
      ) {
        errorsObj.personal_enddate2020 = "Please select date";
        hasErrors = true;
      }

      if (!formData.numberOfDays && formData.personallySick2020 === "Yes") {
        errorsObj.numberOfDays = "Please select number";
        hasErrors = true;
      }
    }

    if (activeStep === 11) {
      if (!formData.personallySick2021) {
        errorsObj.personallySick2021 = "Please select an option";
        hasErrors = true;
      }

      if (
        !formData.personal_startdate2021 &&
        formData.numberOfDays2021 !== "0" &&
        formData.personallySick2021 === "Yes"
      ) {
        errorsObj.personal_startdate2021 = "Please select date";
        hasErrors = true;
      }

      if (
        !formData.personal_enddate2021 &&
        formData.numberOfDays2021 !== "0" &&
        formData.personallySick2021 === "Yes"
      ) {
        errorsObj.personal_enddate2021 = "Please select date";
        hasErrors = true;
      }
      if (!formData.numberOfDays2021 && formData.personallySick2021 === "Yes") {
        errorsObj.numberOfDays2021 = "Please select number";
        hasErrors = true;
      }
    }

    if (activeStep === 12) {
      if (!formData.symptoms2020) {
        errorsObj.symptoms2020 = "Please select an option";
        hasErrors = true;
      }

      if (
        !formData.cared_startdate2020 &&
        formData.symptomsdays2020 !== "0" &&
        formData.symptoms2020 === "Yes"
      ) {
        errorsObj.cared_startdate2020 = "Please select date";
        hasErrors = true;
      }

      if (
        !formData.cared_enddate2020 &&
        formData.symptomsdays2020 !== "0" &&
        formData.symptoms2020 === "Yes"
      ) {
        errorsObj.cared_enddate2020 = "Please select date";
        hasErrors = true;
      }

      if (!formData.symptomsdays2020 && formData.symptoms2020 === "Yes") {
        errorsObj.symptomsdays2020 = "Please select number";
        hasErrors = true;
      }
    }

    if (activeStep === 13) {
      if (!formData.symptoms2021) {
        errorsObj.symptoms2021 = "Please select an option";
        hasErrors = true;
      }

      if (
        !formData.cared_startdate2021 &&
        formData.symptomsdays2021 !== "0" &&
        formData.symptoms2021 === "Yes"
      ) {
        errorsObj.cared_startdate2021 = "Please select date";
        hasErrors = true;
      }

      if (
        !formData.cared_enddate2021 &&
        formData.symptomsdays2021 !== "0" &&
        formData.symptoms2021 === "Yes"
      ) {
        errorsObj.cared_enddate2021 = "Please select date";
        hasErrors = true;
      }

      if (!formData.symptomsdays2021 && formData.symptoms2021 === "Yes") {
        errorsObj.symptomsdays2021 = "Please select number";
        hasErrors = true;
      }
    }

    if (activeStep === 14) {
      if (!formData.closure2020) {
        errorsObj.closure2020 = "Please select an option";
        hasErrors = true;
      }

      if (
        !formData.minor_startdate2020 &&
        formData.minordays2020 !== "0" &&
        formData.closure2020 === "Yes"
      ) {
        errorsObj.minor_startdate2020 = "Please select date";
        hasErrors = true;
      }

      if (
        !formData.minor_enddate2020 &&
        formData.minordays2020 !== "0" &&
        formData.closure2020 === "Yes"
      ) {
        errorsObj.minor_enddate2020 = "Please select date";
        hasErrors = true;
      }

      if (!formData.minordays2020 && formData.closure2020 === "Yes") {
        errorsObj.minordays2020 = "Please select number";
        hasErrors = true;
      }
    }

    if (activeStep === 15) {
      if (!formData.closure2021) {
        errorsObj.closure2021 = "Please select an option";
        hasErrors = true;
      }

      if (
        !formData.minor_startdate2021 &&
        formData.minordays2021 !== "0" &&
        formData.closure2021 === "Yes"
      ) {
        errorsObj.minor_startdate2021 = "Please select date";
        hasErrors = true;
      }

      if (
        !formData.minor_enddate2021 &&
        formData.minordays2021 !== "0" &&
        formData.closure2021 === "Yes"
      ) {
        errorsObj.minor_enddate2021 = "Please select date";
        hasErrors = true;
      }

      if (!formData.minordays2021 && formData.closure2021 === "Yes") {
        errorsObj.minordays2021 = "Please select number";
        hasErrors = true;
      }
    }

    if (activeStep === 7) {
      if (!formData.employed_as_W2) {
        errorsObj.employed_as_W2 = "Please select an option";
        hasErrors = true;
      }
      if (!formData.family_sick && formData.employed_as_W2 === "Yes") {
        errorsObj.family_sick = "Please select an option";
        hasErrors = true;
      }

      if (
        formData.employed_as_W2 === "Yes" &&
        formData.family_sick === "Yes" &&
        formData.amount2020 === ""
      ) {
        errorsObj.amount2020 = "Please select an option";
        // errorsObj.amount2021 = "Please select an option";
        hasErrors = true;
      }
      if (
        formData.employed_as_W2 === "Yes" &&
        formData.family_sick === "Yes" &&
        formData.amount2021 === ""
      ) {
        errorsObj.amount2021 = "Please select an option";
        // errorsObj.amount2021 = "Please select an option";
        hasErrors = true;
      }
    }
    // Add more validations for other steps if needed

    setErrors(errorsObj);
    return !hasErrors;
  };

  const getProgressPercentage = () => {
    return ((activeStep + 1) / steps.length) * 100; // Calculate progress percentage
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && formData.email !== "") {
      checkEmailAvailability();
    }
  }, [formData.email]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        //  alert(token, 'useeffect tokeeeeeeeeeeeennnnnnnnnnnnnn')
        try {
          const response = await fetch("https://beta.setczone.com/user/getUser", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setUserData(userData);
            // alert(userData.self_employed_from);
            const currentStep = userData.step;
            setActiveStep(currentStep || 0);

            setFormData((prevData) => ({
              ...prevData,
              firstName: userData.first_name || prevData.firstName,
              lastName: userData.last_name || prevData.lastName,
              // Add other fields accordingly

              phone: userData.last_name || "",
              email: userData.email || "",
              bussinessName: userData.business_name || "",
              tradeName: userData.trade_name || "",
              streetAddressOne: userData.address_line_1 || "",
              city: userData.city || "",
              province: userData.state || "",
              streetAddressTwo: userData.address_line_2 || "",
              zipCode: userData.zip || "",

              accounting_professional: userData.accounting_professional || "",

              accounting_partnership: userData.accounting_partnership || "",

              isChecked: userData.email ? true : false || false,
              knowAbout: userData.know_about_us || "",
              selfEmployedFrom: userData.self_employed_from || "",
              isCheckedStepThree:
                userData.self_employed_from === "Yes" ? true : false || false,
              netIncome2019: userData.net_income_2019 || "",
              netIncome2020: userData.net_income_2020 || "",
              netIncome2021: userData.net_income_2021 || "",
              bussinessNegatively: userData.business_negatively_impacted || "",

              personal_startdate2020: userData.personal_startdate2020 || "",
              personallySick2020:
                userData.personal_startdate2020 || userData.onedays === "0"
                  ? "Yes"
                  : "" || "",
              personal_enddate2020: userData.personal_enddate2020 || "",
              numberOfDays: userData.onedays || "",

              personal_startdate2021: userData.personal_startdate2021 || "",

              personallySick2021:
                userData.personal_enddate2021 || userData.twodays === "0"
                  ? "Yes"
                  : "" || "",

              personal_enddate2021: userData.personal_enddate2021 || "",
              numberOfDays2021: userData.twodays || "",

              cared_startdate2020: userData.cared_startdate2020 || "",
              symptoms2020:
                userData.cared_startdate2020 || userData.threedays === "0"
                  ? "Yes"
                  : "" || "",
              cared_enddate2020: userData.cared_enddate2020 || "",
              symptomsdays2020: userData.threedays || "",

              cared_startdate2021: userData.cared_startdate2021 || "",

              symptoms2021:
                userData.cared_enddate2021 || userData.fourdays
                  ? "Yes"
                  : "" || "",

              cared_enddate2021: userData.cared_enddate2021 || "",
              symptomsdays2021: userData.fourdays || "",

              minor_startdate2020: userData.minor_startdate2020 || "",
              closure2020:
                userData.minor_startdate2020 || userData.fivedays === "0"
                  ? "Yes"
                  : "" || "",
              minor_enddate2020: userData.minor_enddate2020 || "",
              minordays2020: userData.fivedays || "",

              minor_enddate2021: userData.minor_enddate2021 || "",
              closure2021:
                userData.minor_enddate2021 || userData.sixdays === "0"
                  ? "Yes"
                  : "" || "",
              minor_enddate2020: userData.minor_enddate2020 || "",
              minordays2021: userData.sixdays || "",

              employed_as_W2: userData.employed_as_W2 || "",

              family_sick: userData.Family_Sick_Leave || "",

              amount2020: userData.amount2020 || "",

              amount2021: userData.amount2021 || "",

              scheduleSelfEmployement: userData.your_file_schedule || "",
              mandatory_questions: userData.mandatory_questions || "",
              positive_net_earning: userData.if_you_have_positive_earning || "",
              covid_related_issues: userData.did_you_miss_SEWDTC || "",
              setc_program: userData.have_you_filed_already_for_setc || "",
            }));
            setSelectedFiles((prevSelectedFiles) => ({
              ...prevSelectedFiles,
              driving_licence: userData?.driving_licence,
              schedule_pdf: userData?.schedule_pdf,

              Tax_Return_2020: userData?.Tax_Return_2020,
              Tax_Return_2021: userData?.Tax_Return_2021,
              supplemental_attachment_2020:
                userData?.supplemental_attachment_2020,
              supplemental_attachment_2021:
                userData?.supplemental_attachment_2021,
              FormA1099: userData?.FormA1099,
              FormB1099: userData?.FormB1099,
              ks2020: userData?.ks2020,
              ks22020: userData?.ks22020,
            }));
          } else {
            console.error("Error fetching user data");
          }
        } catch (error) {
          console.error("Network error", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const fetchUserDataa = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("https://beta.setczone.com/user/getUser", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json(); // Use await to wait for the JSON parsing
          setUserData(userData);

          // ... (rest of the function remains unchanged)
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Network error", error);
      }
    }
  };

  const submitHubspotForm = async () => {
    const apiUrl = "https://beta.setczone.com/user/dataPosttoHubspot";
    const token = localStorage.getItem("token");

    const data = {
      properties: {
        email: userData?.email,
        firstname: userData?.first_name,
        lastname: userData?.last_name,
        business_name: userData?.business_name,
        address_line_1: userData?.address_line_1,
        country: "",
        phone_number: userData?.phone,
        city: userData?.city,
        state: userData?.state,
        industry: userData?.trade_name,
        files_folder: "files.com",
        final_credit: userData?.final_credit_amount,
      },
    };

    axios
      .post(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const openFileInNewTab = (fileKey, index, originalFileName) => {
    // if (fileKey && userData) {
    //   const fileUrls = userData[fileKey]; // Array of file URLs
    //   if (fileUrls && fileUrls[index]) {
    //     window.open(`https://beta.setczone.com/${fileUrls[index]}`, "_blank");
    //   } else {
    //     console.error("File URL not found for the provided index");
    //   }
    // } else {
    //   console.error("Invalid fileKey or userData is missing");
    // }
    if (fileKey && userData && originalFileName ) {
        window.open(`https://beta.setczone.com/${originalFileName}`, "_blank");
      } else {
        console.error("File URL not found for the provided index");
      }
  };

  const removeFile = async (fileKey, index, originalFileName) => {
    const token = localStorage.getItem("token");

    // // Check if both token and fileKey are present
    if (!token || !fileKey) {
      console.error("Token and fileKey are required.");
      return;
    }
    if (fileKey && userData) {
      const fileUrls = userData[fileKey];
      if (fileUrls && fileUrls[index]) {
        alert("Are you sure to remove file");

        try {
          const url = "https://beta.setczone.com/user/deleteFile";
          const payload = {
            // fieldName: fileKey,
            // fileName: fileUrls[index],
            // originalFieldName: `${fileKey}_name`,
            // originalName: originalFileName
            fieldName: `${fileKey}_name` ,
            fileName: originalFileName  ,
            originalFieldName: fileKey,
            originalName: fileUrls[index],
          };

          const response = await fetch(url, {
            method: "DELETE", // Change the method to DELETE
            headers: {
              Authorization: `Bearer ${token}`, // Add the token to the headers
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            // Call fetchData() upon successful response
            await fetchUserDataa();

            // setSelectedFiles((prevSelectedFiles) => ({
            //   ...prevSelectedFiles,
            //   [fileKey]: null,
            // }));
            setSelectedFiles((prevSelectedFiles) => {
              const updatedFiles = { ...prevSelectedFiles };
              // Remove the specific file from the array
              updatedFiles[fileKey] = fileUrls.filter((_, i) => i !== index);
              return updatedFiles;
            });

            console.log("File removed successfully.");
          } else {
            console.error("Failed to remove file.");
          }
        } catch (error) {
          console.error("Error removing file:", error);
        }
      }
    }
  };

  const uploadFile = async (formData, inputName, fileNames) => {
    const token = localStorage.getItem("token");

    if (formData) {
      try {
        setUploadingFile(inputName);
        formData.append("step", activeStep);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress((prevProgress) => ({
              ...prevProgress,
              [inputName]: percentCompleted,
            }));
          },
        };

        const response = await axios.put(
          "https://beta.setczone.com/user/multiple-form-data",
          formData,
          config
        );

        let lastFileName = "";

        if (inputName === "driving_licence") {
          const lastDrivingLicenceIndex =
            response.data.user.driving_licence_name.length - 1;
          lastFileName =
            response.data.user.driving_licence_name[lastDrivingLicenceIndex];
        } else if (inputName === "schedule_pdf") {
          const lastScheduleIndex =
            response.data.user.schedule_pdf_name.length - 1;
          lastFileName =
            response.data.user.schedule_pdf_name[lastScheduleIndex];
        } else if (inputName === "Tax_Return_2020") {
          const lastScheduleIndex =
            response.data.user.Tax_Return_2020_name.length - 1;
          lastFileName =
            response.data.user.Tax_Return_2020_name[lastScheduleIndex];
        } else if (inputName === "Tax_Return_2021") {
          const lastScheduleIndex =
            response.data.user.Tax_Return_2021_name.length - 1;
          lastFileName =
            response.data.user.Tax_Return_2021_name[lastScheduleIndex];
        } else if (inputName === "supplemental_attachment_2020") {
          const lastScheduleIndex =
            response.data.user.supplemental_attachment_2020_name.length - 1;
          lastFileName =
            response.data.user.supplemental_attachment_2020_name[
              lastScheduleIndex
            ];
        } else if (inputName === "supplemental_attachment_2021") {
          const lastScheduleIndex =
            response.data.user.supplemental_attachment_2021_name.length - 1;
          lastFileName =
            response.data.user.supplemental_attachment_2021_name[
              lastScheduleIndex
            ];
        } else if (inputName === "FormA1099") {
          const lastScheduleIndex =
            response.data.user.FormA1099_name.length - 1;
          lastFileName = response.data.user.FormA1099_name[lastScheduleIndex];
        } else if (inputName === "FormB1099") {
          const lastScheduleIndex =
            response.data.user.FormB1099_name.length - 1;
          lastFileName = response.data.user.FormB1099_name[lastScheduleIndex];
        } else if (inputName === "ks2020") {
          const lastScheduleIndex = response.data.user.ks2020_name.length - 1;
          lastFileName = response.data.user.ks2020_name[lastScheduleIndex];
        } else if (inputName === "ks22020") {
          const lastScheduleIndex = response.data.user.ks22020_name.length - 1;
          lastFileName = response.data.user.ks22020_name[lastScheduleIndex];
        }

        await handleSuccessfulUpload(inputName, lastFileName);
        await fetchUserDataa();
        setAddingFileType(null)
   
      } catch (error) {
        console.error(`Error uploading file:`, error);
      } finally {
        setUploadingFile("");
        setUploadProgress((prevProgress) => ({
          ...prevProgress,
          [inputName]: 0,
        }));
      }
    }
  };

  const handleSuccessfulUpload = (inputName, fileName) => {
    const currentTime = Date.now(); // Get the current time in milliseconds
    setUploadCompleteTimes((prevUploadTimes) => ({
      ...prevUploadTimes,
      [inputName]: currentTime,
    }));

    // Save upload completion time as a string to localStorage
    localStorage.setItem(fileName, currentTime.toString());
  };

  // Check if 30 seconds have passed since upload completion
  const isThirtySecondsPassed = (fileName) => {
    const storedTime = localStorage.getItem(fileName);
    if (storedTime) {
      const uploadTime = parseInt(storedTime, 10); // Parse stored string to a number
      const currentTime = Date.now();
      return currentTime - uploadTime >= 30000; // Check if 30 seconds have passed
    }
    return false;
  };
  // Function to retrieve upload completion times from localStorage on component mount
  useEffect(() => {
    const storedUploadTimes = {
      driving_licence: localStorage.getItem("driving_licence"),
      schedule_pdf: localStorage.getItem("schedule_pdf"),
      Tax_Return_2020: localStorage.getItem("Tax_Return_2020"),
      Tax_Return_2021: localStorage.getItem("Tax_Return_2021"),
      supplemental_attachment_2020: localStorage.getItem(
        "supplemental_attachment_2020"
      ),
      supplemental_attachment_2021: localStorage.getItem(
        "supplemental_attachment_2021"
      ),
      FormA1099: localStorage.getItem("FormA1099"),
      FormB1099: localStorage.getItem("FormB1099"),
      ks2020: localStorage.getItem("ks2020"),
      ks22020: localStorage.getItem("ks22020"),
    };

    // Convert stored timestamps back to numbers before setting state
    const parsedUploadTimes = Object.keys(storedUploadTimes).reduce(
      (acc, key) => {
        acc[key] = storedUploadTimes[key]
          ? parseInt(storedUploadTimes[key], 10)
          : null;
        return acc;
      },
      {}
    );

    setUploadCompleteTimes(parsedUploadTimes);
  }, []);

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <div className="row justify-content-center pb-3">
              <div className="col-lg-8 col-md-8 col-sm-12">
                <div
                  className="step step-1 bg-white shadow  pb-5"
                  style={{ borderRadius: "20px" }}
                >
                  <h3
                    className="text-center mb-3 py-3 text-white"
                    style={{
                      backgroundColor: "rgb(13, 189, 243)",
                      borderRadius: "10px",
                    }}
                  >
                    Getting Started
                  </h3>
                  <div className="px-3">
                    <input
                      type="hidden"
                      name="record_id"
                      id="record_id"
                      value=""
                    />

                    <div className="row mt-4">
                      <label
                        for="id_first_name"
                        className="form-label requiredField"
                      >
                        Self-Employed Owner's Name
                      </label>
                      <div className="col-sm-6 mb-3">
                        <input
                          type="text"
                          value={formData.firstName}
                          name="firstName"
                          maxLength="1024"
                          placeholder="First Name"
                          class={`textinput form-control ${
                            errors.firstName ? "border-danger" : ""
                          }`}
                          required=""
                          id="id_first_name"
                          onChange={handleInputChange}
                        />

                        {errors.firstName && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            {errors.firstName}
                          </div>
                        )}
                      </div>
                      <div id="last_name" className="col-sm-6 mb-3">
                        <input
                          type="text"
                          value={formData.lastName}
                          name="lastName"
                          placeholder="Last Name"
                          maxlength="1024"
                          class={`textinput form-control ${
                            errors.lastName ? "border-danger" : ""
                          }`}
                          required=""
                          id="id_last_name"
                          onChange={handleInputChange}
                        />

                        {errors.lastName && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            {errors.lastName}
                          </div>
                        )}
                      </div>
                      <div id="div_id_phone_number" className="col-sm-6 mb-3">
                        <label
                          for="id_phone_number"
                          className="form-label requiredField"
                        >
                          Owners Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          name="phone"
                          maxlength="128"
                          placeholder="(555) 555-5555"
                          class={`textinput form-control ${
                            errors.phone ? "border-danger" : ""
                          }`}
                          required=""
                          id="id_phone_number"
                          onChange={handleInputChange}
                        />

                        {errors.phone && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            {errors.phone}
                          </div>
                        )}
                      </div>
                      <div id="div_id_email" className="col-sm-6 mb-3">
                        <label
                          for="id_email"
                          className="form-label requiredField"
                        >
                          Email
                        </label>
                        <input
                          value={formData.email}
                          type="email"
                          name="email"
                          maxLength="254"
                          placeholder="e.g. example@example.com"
                          class={`form-control ${
                            errors.email === "Email is available"
                              ? "border-success text-success"
                              : errors.email
                              ? "border-danger"
                              : ""
                          }`}
                          required=""
                          id="id_email"
                          onChange={handleInputChange}
                          onBlur={handleEmailBlur}
                        />
                        {errors.email && (
                          <div
                            className={
                              errors.email === "Email is available"
                                ? "text-success"
                                : "text-danger"
                            }
                            style={{ fontSize: "14px" }}
                          >
                            {errors.email}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row mt-4">
                      <label
                        for="Business-Legal-Name"
                        className="form-label requiredField"
                      >
                        Business Legal Name
                      </label>
                      <div className="col-sm-6 mb-3">
                        <input
                          type="text"
                          value={formData.bussinessName}
                          name="bussinessName"
                          maxLength="1024"
                          placeholder="Business Legal Name"
                          class={`textinput form-control ${
                            errors.bussinessName ? "border-danger" : ""
                          }`}
                          required=""
                          id="Business-Legal-Name"
                          onChange={handleInputChange}
                        />

                        {errors.bussinessName && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            {errors.bussinessName}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          value={formData.employees}
                          class={` form-control ${
                            errors.employees ? "border-danger" : ""
                          }`}
                          id="employees"
                          placeholder=" Number of  Employees"
                          name="employees"
                          required=""
                          onChange={handleInputChange}
                        />
                        {errors.employees && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.employees}
                          </div>
                        )}

                        <div className="invalid-feedback emailError"></div>
                      </div>
                    </div>

                    <div className="mb-2">
                      <div className="col-sm-6">
                        <label for="Trade-Name" className="form-label">
                          Trade Name, if any(indicate none, if none)
                        </label>

                        <input
                          type="text"
                          value={formData.tradeName}
                          class={` form-control ${
                            errors.tradeName ? "border-danger" : ""
                          }`}
                          id="Trade-Name"
                          placeholder=""
                          name="tradeName"
                          required=""
                          onChange={handleInputChange}
                        />
                        {errors.tradeName && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.tradeName}
                          </div>
                        )}

                        <div className="invalid-feedback emailError"></div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <label for="Self-employed" className="form-label">
                        Self-employed business address. This may likely be your
                        home address unless you use a separate business address
                      </label>
                      <input
                        type="text"
                        value={formData.streetAddressOne}
                        class={`form-control  ${
                          errors.streetAddressOne ? "border-danger" : ""
                        }`}
                        id="Street-Address"
                        placeholder="Street Address"
                        name="streetAddressOne"
                        required=""
                        onChange={handleInputChange}
                      />

                      {errors.streetAddressOne && (
                        <div
                          className="text-danger"
                          style={{ fontSize: "14px" }}
                        >
                          {errors.streetAddressOne}
                        </div>
                      )}

                      <input
                        type="text"
                        value={formData.streetAddressTwo}
                        onChange={handleInputChange}
                        className="form-control mt-3"
                        id="Street-Address-Line-2"
                        placeholder="Street Address Line 2"
                        name="streetAddressTwo"
                      />
                      <div className="invalid-feedback company_nameError"></div>
                    </div>
                    <div className="row">
                      <div id="div_id_first_name" className="col-sm-6 mt-3">
                        <label for="City" className="form-label requiredField">
                          City
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          class={`textinput form-control  ${
                            errors.city ? "border-danger" : ""
                          }`}
                          onChange={handleInputChange}
                          name="city"
                          required=""
                          id="City"
                        />
                        {errors.city && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.city}
                          </div>
                        )}
                      </div>
                      <div id="div_id_last_name" className="col-sm-6 mt-3 mb-3">
                        <label
                          for="State_Province"
                          className="form-label requiredField"
                        >
                          State/Province
                        </label>
                        <input
                          type="text"
                          value={formData.province}
                          name="province"
                          maxlength="1024"
                          class={`textinput form-control 
                      ${errors.province ? "border-danger" : ""}`}
                          required=""
                          id="State_Province"
                          onChange={handleInputChange}
                        />
                        {errors.province && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.province}
                          </div>
                        )}
                      </div>
                      <div id="div_id_last_name" className="col-sm-6 ">
                        <label
                          for="zipcode"
                          className="form-label requiredField"
                        >
                          Postal / Zip Code
                        </label>
                        <input
                          type="Number"
                          value={formData.zipCode}
                          name="zipCode"
                          maxlength="1024"
                          placeholder="00000"
                          class={`textinput form-control 
 ${errors.zipCode ? "border-danger" : ""}`}
                          required=""
                          id="zipcode"
                          onChange={handleInputChange}
                        />
                        {errors.zipCode && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.zipCode}
                          </div>
                        )}
                      </div>
                      <div id="know_about_us" className="col-sm-6  ">
                        <label
                          for="know-about"
                          className="form-label requiredField"
                        >
                          How did you hear about us?
                        </label>
                        <input
                          type="text"
                          value={formData.knowAbout}
                          name="knowAbout"
                          maxlength="1024"
                          class={`textinput form-control 
                    ${errors.knowAbout ? "border-danger" : ""}`}
                          required=""
                          id="know-about"
                          onChange={handleInputChange}
                        />
                        {errors.knowAbout && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.knowAbout}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-2 mt-3">
                      <label
                        for="accounting_professional"
                        className="form-label requiredField "
                        style={{ fontWeight: "600" }}
                      >
                        Are you an accounting professional? (Bookkeeper, CPA,
                        Accountant, Payroll Specialists)?
                      </label>

                      <div className="optio mb-2">
                      <label for="accounting_professional_yes">
                        <p
                          style={{
                            padding: "7px 10px",
                            border: "1px solid lightgray",
                            backgroundColor: formData.accounting_professional === "Yes" ? "lightblue" : "initial" 
                          }}
                        >
                          <input
                            className="form-check-input"
                            class={`form-check-input ${
                              errors.accounting_professional
                                ? "border-danger"
                                : ""
                            }`}
                            type="radio"
                            name="accounting_professional"
                            checked={formData.accounting_professional === "Yes"}
                            value="Yes"
                            id="accounting_professional_yes"
                            onChange={handleInputChange}
                          />
                          Yes
                        </p>
                        </label>
                      </div>
                      <div className="optio">
                      <label for="accounting_professional_no">
                        <p
                          style={{
                            padding: "7px 10px",
                            border: "1px solid lightgray",
                            backgroundColor: formData.accounting_professional === "No" ? "lightblue" : "initial" 
                          }}
                        >
                          <input
                            className="form-check-input"
                            class={`form-check-input ${
                              errors.accounting_professional
                                ? "border-danger"
                                : ""
                            }`}
                            type="radio"
                            name="accounting_professional"
                            checked={formData.accounting_professional === "No"}
                            value="No"
                            id="accounting_professional_no"
                            onChange={handleInputChange}
                          />
                          No
                        </p>
                        </label>
                      </div>
                      {formData.accounting_professional === "Yes" && (
                        <>
                          <div id="additional">
                            <label
                              for="accounting_partnership"
                              // className="form-label bg-light py-3 px-1 fs-5"
                              className="form-label requiredField"
                            >
                              Are you interested in our accounting partnership
                              that would allow you to purchase the downloadable
                              calculation?
                            </label>
                            <div className="optio mb-2">
                            <label for="accounting_partnership_yes">
                              <p
                                style={{
                                  padding: "7px 10px",
                                  border: "1px solid lightgray",
                                  backgroundColor: formData.accounting_partnership === "Yes" ? "lightblue" : "initial"
                                }}
                              >
                                <input
                                  className="form-check-input"
                                  class={`form-check-input ${
                                    errors.accounting_partnership
                                      ? "border-danger"
                                      : ""
                                  }`}
                                  type="radio"
                                  name="accounting_partnership"
                                  checked={
                                    formData.accounting_partnership === "Yes"
                                  }
                                  value="Yes"
                                  id="accounting_partnership_yes"
                                  onChange={handleInputChange}
                                />
                                Yes
                              </p>
                              </label>
                            </div>
                            <div className="optio">
                            <label for="accounting_partnership_no">
                              <p
                                style={{
                                  padding: "7px 10px",
                                  border: "1px solid lightgray",
                                  backgroundColor: formData.accounting_partnership === "No" ? "lightblue" : "initial"
                                }}
                              >
                                <input
                                  className="form-check-input"
                                  class={`form-check-input ${
                                    errors.accounting_partnership
                                      ? "border-danger"
                                      : ""
                                  }`}
                                  type="radio"
                                  name="accounting_partnership"
                                  checked={
                                    formData.accounting_partnership === "No"
                                  }
                                  value="No"
                                  id="accounting_partnership_no"
                                  onChange={handleInputChange}
                                />
                                No
                              </p>
                              </label>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                      
                    <div className="impot mt-3">
                      <p>
                        The address you provide above will be used as the
                        mailing address for your SETC refund check. If you meet
                        the eligibility criteria, the IRS generally takes 3 – 5
                        months to process your application. To ensure the check
                        reaches you without any complications, kindly provide an
                        address where you intend to reside for the next 6
                        months. This will help guarantee accurate and timely
                        delivery to the correct address.
                      </p>
                    </div>
                    <div
                      className="d-flex mt-3"
                      style={{ alignItems: "start " }}
                    >
                      <input
                        checked={formData.isChecked}
                        class={`checkBoxStepOne form-check-input me-1 mt-1 ${
                          errors.isChecked ? "border-danger" : ""
                        }`}
                        type="checkbox"
                        id="flexCheckDefault1"
                        name="isChecked"
                        onChange={handleInputChange}
                      />

                      <p class="mb-3 mt-0">
                        By checking the box, you agree to our{" "}
                        <a
                          href=""
                          data-bs-toggle="modal"
                          data-bs-target="#term_condition"
                        >
                          {" "}
                          terms & conditions
                        </a>{" "}
                        and will allow SETC Zone and its partners to contact you
                        via phone, text, and/or email.
                      </p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        onClick={handleNext}
                        type="button"
                        className="px-3 py-2 next-step"
                      >
                        {activeStep === steps.length - 1
                          ? "Submit"
                          : "Lets Get Started"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <div className="step step-2 ">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="start-application">
                    <div
                      className="row roww"
                      style={{ marginTop: "0px !important" }}
                    >
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div class="img-applic-content border-0">
                          <div class="step2_content w-100 pb-2">
                            <div class="step_1_de">
                              <h1
                                style={{
                                  color: "#1A2C57",
                                  fontSize: "clamp(22px, 4vw, 42px) !important",
                                  width: "70%",
                                  margin: "auto",
                                }}
                              >
                                How Does The Pre-Qualification Application Work?
                              </h1>
                            </div>
                            <div class="row justify-content-center">
                              <div class="col-lg-12">
                                <div class="row align-items-center eret pb-3">
                                  <div class="col-lg-12 col-md-12 d-flex justify-content-center">
                                    <div class="">
                                      <div class="st_2_we d-flex align-items-start my-2">
                                        <div style={{ marginTop: "18.5px" }}>
                                          <span class="text-white">
                                            <CheckCircle
                                              style={{
                                                color: "#DC3545",
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                          </span>
                                        </div>
                                        <h5
                                          class="step2_h5"
                                          style={{
                                            color: "#00b6ff",
                                            marginLeft: 2,
                                          }}
                                        >
                                          {" "}
                                          Answer 6 questions to determine
                                          Pre-qualifications for upto:
                                        </h5>
                                      </div>
                                      <div class="d-flex align-items-start justify-content-center">
                                        <h2
                                          class="tep2_h5 text-center"
                                          style={{
                                            color: "#00b6ff",
                                            fontWeight: "bold",
                                            fontSize:
                                              "clamp(30px, 4vw, 42px) !important",
                                          }}
                                        >
                                          {" "}
                                          $32,220.00
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="step2_content mt-4 w-100">
                            <div class="text-center d-flex justify-content-center">
                              <h1
                                class="mb-3 text-center"
                                style={{
                                  width: "fit-content",
                                  fontSize: "clamp(22px, 4vw, 42px) !important",
                                  color: "#1A2C57",
                                }}
                              >
                                What if I am pre-qualified?
                              </h1>
                            </div>
                            <div class="row justify-content-center mt-md-4 mt-sm-3">
                              <div class="col-lg-12">
                                <div class="row align-items-center">
                                  <div class="col-lg-12 d-flex justify-content-center">
                                    <div class="d-flex flex-column gap-2">
                                      <div class=" st_2_we d-flex align-items-start w-100">
                                        <div style={{ marginTop: "18.5px" }}>
                                          <span class="text-white">
                                            <CheckCircle
                                              style={{
                                                color: "#DC3545",
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                          </span>
                                        </div>
                                        <h5
                                          class="step2_h5"
                                          style={{ color: "#00b6ff" }}
                                        >
                                          Continue the application by answering
                                          7 additional questions.
                                        </h5>
                                      </div>

                                      <div class="st_2_we d-flex align-items-start w-100">
                                        <div style={{ marginTop: "18.5px" }}>
                                          <span class="text-white">
                                            <CheckCircle
                                              style={{
                                                color: "#DC3545",
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                          </span>
                                        </div>
                                        <h5
                                          class="step2_h5"
                                          style={{ color: "#00b6ff" }}
                                        >
                                          Upload necesary documents
                                        </h5>
                                      </div>
                                      <div class="st_2_we d-flex align-items-start w-100">
                                        <div style={{ marginTop: "18.5px" }}>
                                          <span class="text-white">
                                            <CheckCircle
                                              style={{
                                                color: "#DC3545",
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                          </span>
                                        </div>
                                        <h5
                                          class="step2_h5"
                                          style={{ color: "#00b6ff" }}
                                        >
                                          Receive a calculated refund amount
                                        </h5>
                                      </div>
                                      <div class="st_2_we d-flex align-items-start w-100">
                                        <div style={{ marginTop: "18.5px" }}>
                                          <span class="text-white">
                                            <CheckCircle
                                              style={{
                                                color: "#DC3545",
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                          </span>
                                        </div>
                                        <h5
                                          class="step2_h5"
                                          style={{ color: "#00b6ff" }}
                                        >
                                          Our professinal Team will process and
                                          file your return
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="d-flex justify-content-center  mt-5 mb-5 w-100">
                            <button
                              onClick={handlePrevious}
                              type="button"
                              className="px-3 py-3 prev-step"
                            >
                              Previous
                            </button>
                            <button
                              onClick={handleNext}
                              type="button"
                              class="btn btn-primary next-step step2_next mx-1"
                            >
                              Let's Get Started!
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step step-3">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Are you eligible?
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            Question 1 of 6
                          </h3>
                          <div style={{ marginTop: 40 }}>
                            <label
                              for="self_employed_from"
                              className="form-label headng "
                              style={{ fontWeight: "600" }}
                            >
                              Were you self-employed from 4/1/2020-9/30/2021?
                            </label>
                            <div className="optio mb-2">
                              <label for="self_employed_from_yes">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.selfEmployedFrom === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.selfEmployedFrom
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="selfEmployedFrom"
                                    checked={
                                      formData.selfEmployedFrom === "Yes"
                                    }
                                    value="Yes"
                                    id="self_employed_from_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </label>
                            </div>

                            <div className="optio">
                              <label for="self_employed_from_no">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.selfEmployedFrom === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    class={`form-check-input ${
                                      errors.selfEmployedFrom
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="selfEmployedFrom"
                                    value="No"
                                    checked={formData.selfEmployedFrom === "No"}
                                    id="self_employed_from_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </label>
                            </div>

                            {formData.selfEmployedFrom === "No" &&
                              activeErrorQualifyOne && (
                                <div>
                                  <h4 style={{ color: "#e62e2d" }}>
                                    Were Sorry. By answering “No” to the above
                                    question, you will not be eligible for the
                                    SETC program.
                                  </h4>
                                </div>
                              )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
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
        );
      case 3:
        return (
          <div className="step step-4">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Are you eligible?
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            Question 2 of 6
                          </h3>
                          <div style={{ marginTop: 40 }}>
                            <h1
                              style={{
                                fontSize: "24px",
                                color: "rgb(13, 189, 243)",
                              }}
                            >
                              Did you file your schedule SE (Self-Employment
                              Tax) for the years of 2020 or 2021?
                            </h1>

                            <div className="optio mb-2">
                              <label for="self_employment_from_yes">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.scheduleSelfEmployement === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className={`form-check-input ${
                                      errors.scheduleSelfEmployement
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="scheduleSelfEmployement"
                                    checked={
                                      formData.scheduleSelfEmployement === "Yes"
                                    }
                                    value="Yes"
                                    id="self_employment_from_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </label>
                            </div>

                            <div className="optio">
                              <label for="self_employment_from_no">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.scheduleSelfEmployement === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className={`form-check-input ${
                                      errors.scheduleSelfEmployement
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="scheduleSelfEmployement"
                                    checked={
                                      formData.scheduleSelfEmployement === "No"
                                    }
                                    value="No"
                                    id="self_employment_from_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </label>
                            </div>

                            {formData.scheduleSelfEmployement === "No" &&
                              activeErrorQualifyTwoo && (
                                <div>
                                  <h4 style={{ color: "#e62e2d" }}>
                                    Were Sorry. By answering “No” to the above
                                    question, you will not be eligible for the
                                    SETC program.
                                  </h4>
                                </div>
                              )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
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
        );
      case 4:
        return (
          <div className="step step-5">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Are you eligible?
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            Question 3 of 6
                          </h3>
                          <div style={{ marginTop: 40 }}>
                            <label
                              for="positive_net_earning"
                              className="form-label headng "
                              style={{ fontWeight: "600" }}
                            >
                              Did you have positive net earnings for the years
                              of 2020 or 2021? This can be found in{" "}
                              <span
                                style={{
                                  color: "red",
                                  cursor: "pointer",
                                  fontSize: 23,
                                  textDecoration: "underline",
                                }}
                                onClick={() =>
                                  window.open(PdfNetEarning, "_blank")
                                }
                              >
                                line 6 of your schedule SE
                              </span>
                              . (If this line is blank or negative, select No.)
                            </label>

                            <div className="optio mb-2">
                              <label for="positive_net_earning_yes">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.positive_net_earning === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className={`form-check-input ${
                                      errors.positive_net_earning
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="positive_net_earning"
                                    checked={
                                      formData.positive_net_earning === "Yes"
                                    }
                                    value="Yes"
                                    id="positive_net_earning_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </label>
                            </div>
                            <div className="optio">
                              <label for="positive_net_earning_no">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.positive_net_earning === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    class={`form-check-input ${
                                      errors.positive_net_earning
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="positive_net_earning"
                                    checked={
                                      formData.positive_net_earning === "No"
                                    }
                                    value="No"
                                    id="positive_net_earning_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </label>
                            </div>
                            {formData.positive_net_earning === "No" &&
                              activeErrorQualifyThree && (
                                <div>
                                  <h4 style={{ color: "#e62e2d" }}>
                                    Were Sorry. By answering “No” to the above
                                    question, you will not be eligible for the
                                    SETC program.
                                  </h4>
                                </div>
                              )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
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
        );
      case 5:
        return (
          <div className="step step-6">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Are you eligible?
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            Question 4 of 6
                          </h3>
                          <div style={{ marginTop: 40 }}>
                            <label
                              for="covid_related_issues"
                              className="form-label headng "
                              style={{ fontWeight: "600" }}
                            >
                              Did you miss any self employment work in 2020 or
                              2021 due to Covid-19 related issues.{" "}
                              <span>
                                <a
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal_step_6"
                                  className="d-none d-md-inline"
                                  style={{ color: "red" }}
                                >
                                  Click here for examples
                                </a>
                                <a
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModalS_step_6"
                                  className="d-inline d-md-none"
                                  style={{ color: "red" }}
                                >
                                  Click here for examples
                                </a>
                              </span>
                            </label>

                            <div className="optio mb-2">
                              <label for="covid_related_issues_yes">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.covid_related_issues === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    class={`form-check-input ${
                                      errors.covid_related_issues
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="covid_related_issues"
                                    checked={
                                      formData.covid_related_issues === "Yes"
                                    }
                                    value="Yes"
                                    id="covid_related_issues_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </label>
                            </div>
                            <div className="optio">
                              <label for="covid_related_issues_no">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.covid_related_issues === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    class={`form-check-input ${
                                      errors.covid_related_issues
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="covid_related_issues"
                                    checked={
                                      formData.covid_related_issues === "No"
                                    }
                                    value="No"
                                    id="covid_related_issues_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </label>
                            </div>
                            {formData.covid_related_issues === "No" &&
                              activeErrorQualifyFive && (
                                <div>
                                  <h4 style={{ color: "#e62e2d" }}>
                                    Were Sorry. By answering “No” to the above
                                    question, you will not be eligible for the
                                    SETC program.
                                  </h4>
                                </div>
                              )}
                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
                            </div>

                            <div
                              className="modal fade"
                              id="exampleModal_step_6"
                              tabindex="-1"
                              aria-labelledby="exampleModalLabel"
                              style={{
                                display: "none",
                                padding: "0px 40px 20px 40px",
                              }}
                              aria-hidden="true"
                            >
                              <div
                                className="modal-dialog modal-dialog-centered "
                                style={{ maxWidth: "800px" }}
                              >
                                <div
                                  className="modal-content"
                                  style={{ height: "auto" }}
                                >
                                  <div
                                    className="modal-header"
                                    style={{ borderBottom: "none" }}
                                  >
                                    <h1
                                      className="modal-title fs-5"
                                      id="exampleModalLabel"
                                    ></h1>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div
                                    className="modal-body"
                                    style={{ padding: "0px 40px" }}
                                  >
                                    <div style={{ padding: "20px 30px" }}>
                                      <div className="text-center">
                                        <h2
                                          style={{
                                            color: "#0cc0df",
                                            fontsize: "clamp(16px, 2vw, 24px)",
                                          }}
                                        >
                                          Am I eligible for SETC Tax Credits?
                                        </h2>
                                      </div>

                                      <div>
                                        <p>
                                          During 2020 and 2021 millions of small
                                          businesses were negatively impacted by
                                          covid-19. If you were unable to work
                                          or your business experienced any of
                                          the following issues during 2020 and
                                          2021 due to covid-19 you may be
                                          eligible for the SETC program:
                                        </p>
                                        <ul>
                                          <li>
                                            You took time off of work in 2020 or
                                            2021 due to covid-19 or to care for
                                            someone with covid-19 during the
                                            same period.
                                          </li>
                                          <li>
                                            You took time off of work in 2020 or
                                            2021 to care for a child under 18
                                            years old due to school or daycare
                                            closures.
                                          </li>
                                          <li>
                                            You took time off in 2020 or 2021
                                            due to covid-19 to care for a loved
                                            one such as a spouse, parents, etc.
                                          </li>
                                          <li>
                                            A government order imposed a
                                            quarantine or isolation.
                                          </li>
                                          <li>
                                            You were having symptoms related to
                                            Covid-19 while also waiting for an
                                            appointment with your doctor.
                                          </li>
                                          <li>
                                            You were waiting for test results
                                            related to COVID-19.
                                          </li>
                                          <li>
                                            You were getting a Covid-19
                                            Vaccination
                                          </li>
                                          <li>
                                            You were experiencing side effects
                                            from the COVID-19 vaccine
                                          </li>
                                          <li>
                                            Your doctor recommended you
                                            self-quarantine
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div
                              className="modal fade"
                              id="exampleModalS_step_6"
                              tabIndex="-1"
                              aria-labelledby="exampleModalLabel"
                              style={{ display: "none" }}
                              aria-hidden="true"
                            >
                              <div
                                className="modal-dialog modal-dialog-centered"
                                style={{
                                  maxWidth: "100%",
                                  margin: "0",
                                  width: "100%",
                                }}
                              >
                                <div
                                  className="modal-content"
                                  style={{
                                    minHeight: "100vh",
                                    maxHeight: "100vh",
                                    overflowY: "auto",
                                  }}
                                >
                                  <div
                                    className="modal-header"
                                    style={{ borderBottom: "none" }}
                                  >
                                    <h1
                                      className="modal-title fs-5"
                                      id="exampleModalLabel"
                                    ></h1>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div
                                    className="modal-body"
                                    style={{
                                      padding: "20px",
                                      fontSize: "clamp(16px, 2vw, 24px)",
                                    }}
                                  >
                                    <div style={{ padding: "20px 0" }}>
                                      <div className="text-center">
                                        <h2 style={{ color: "#0cc0df" }}>
                                          Am I eligible for SETC Tax Credits?
                                        </h2>
                                      </div>

                                      <div>
                                        <p>
                                          During 2020 and 2021, millions of
                                          small businesses were negatively
                                          impacted by COVID-19. If you were
                                          unable to work or your business
                                          experienced any of the following
                                          issues during 2020 and 2021 due to
                                          COVID-19, you may be eligible for the
                                          SETC program:
                                        </p>
                                        <ul style={{ paddingLeft: "20px" }}>
                                          <li>
                                            You took time off of work in 2020 or
                                            2021 due to COVID-19 or to care for
                                            someone with COVID-19 during the
                                            same period.
                                          </li>
                                          <li>
                                            You took time off of work in 2020 or
                                            2021 to care for a child under 18
                                            years old due to school or daycare
                                            closures.
                                          </li>
                                          <li>
                                            You took time off in 2020 or 2021
                                            due to COVID-19 to care for a loved
                                            one such as a spouse, parent, etc.
                                          </li>
                                          <li>
                                            A government order imposed a
                                            quarantine or isolation.
                                          </li>
                                          <li>
                                            You were having symptoms related to
                                            COVID-19 while also waiting for an
                                            appointment with your doctor.
                                          </li>
                                          <li>
                                            You were waiting for test results
                                            related to COVID-19.
                                          </li>
                                          <li>
                                            You were getting a COVID-19
                                            vaccination.
                                          </li>
                                          <li>
                                            You were experiencing side effects
                                            from the COVID-19 vaccine.
                                          </li>
                                          <li>
                                            Your doctor recommended you
                                            self-quarantine.
                                          </li>
                                        </ul>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="step step-7">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Are you eligible?
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            Question 5 of 6
                          </h3>
                          <div style={{ marginTop: 40 }}>
                            <label
                              for="setc_program"
                              className="form-label headng "
                              style={{ fontWeight: "600" }}
                            >
                              Have you already filed for the SETC program/FFCRA
                              for the years of 2020 and 2021?
                            </label>

                            <div className="optio mb-2">
                              <label for="setc_program_yes">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.setc_program === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className={`form-check-input ${
                                      errors.setc_program ? "border-danger" : ""
                                    }`}
                                    type="radio"
                                    name="setc_program"
                                    checked={formData.setc_program === "Yes"}
                                    value="Yes"
                                    id="setc_program_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </label>
                            </div>
                            <div className="optio">
                              <label for="setc_program_no">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.setc_program === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className={`form-check-input ${
                                      errors.setc_program ? "border-danger" : ""
                                    }`}
                                    type="radio"
                                    name="setc_program"
                                    checked={formData.setc_program === "No"}
                                    value="No"
                                    id="setc_program_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </label>
                            </div>

                            {formData.setc_program === "Yes" &&
                              activeErrorQualifySix && (
                                <div>
                                  <h4 style={{ color: "#e62e2d" }}>
                                    Were Sorry. By answering “YES” to the above
                                    question, you will not be eligible for the
                                    SETC program.
                                  </h4>
                                </div>
                              )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
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
        );
      case 7:
        return (
          <div className="step step-8">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Are you eligible?
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            Question 6 of 6
                          </h3>
                          <div style={{ marginTop: 40 }}>
                            <label
                              for="setc_program"
                              className="form-label headng "
                              style={{ fontWeight: "600" }}
                            >
                              Were you self-employed and also a W2 employee in
                              2020 or 2021?
                            </label>

                            <div className="optio mb-2">
                            <label for="self_employed_from_yes">
                              <p  style={{
                                    backgroundColor:
                                      formData.employed_as_W2 === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}>
                                <input
                                  className="form-check-input"
                                  class={`form-check-input ${
                                    errors.employed_as_W2 ? "border-danger" : ""
                                  }`}
                                  type="radio"
                                  name="employed_as_W2"
                                  checked={formData.employed_as_W2 === "Yes"}
                                  value="Yes"
                                  id="self_employed_from_yes"
                                  onChange={handleInputChange}
                                />
                                Yes
                              </p>
                              </label>
                            </div>
                            <div className="optio">
                            <label for="self_employed_from_no">
                             
                              <p style={{
                                    backgroundColor:
                                      formData.employed_as_W2 === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}>
                                <input
                                  className="form-check-input"
                                  class={`form-check-input ${
                                    errors.employed_as_W2 ? "border-danger" : ""
                                  }`}
                                  type="radio"
                                  name="employed_as_W2"
                                  checked={formData.employed_as_W2 === "No"}
                                  value="No"
                                  id="self_employed_from_no"
                                  onChange={handleInputChange}
                                />
                                No
                              </p>
                              </label>
                            </div>
                            {formData.employed_as_W2 === "Yes" && (
                              <>
                                <div id="additional">
                                  <label
                                    for="Self-employed"
                                    className="form-label bg-light py-3 px-1 fs-5"
                                  >
                                    If yes, did your employer pay Family Sick
                                    Leave during Covid, and what amount?
                                  </label>
                                  <div className="optio mb-2">
                                  <label for="family_sick_yes">
                                    <p style={{
                                    backgroundColor:
                                      formData.family_sick === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}>
                                      <input
                                        className="form-check-input"
                                        class={`form-check-input ${
                                          errors.family_sick
                                            ? "border-danger"
                                            : ""
                                        }`}
                                        type="radio"
                                        name="family_sick"
                                        checked={formData.family_sick === "Yes"}
                                        value="Yes"
                                        id="family_sick_yes"
                                        onChange={handleInputChange}
                                      />
                                      Yes
                                    </p>
                                    </label>
                                  </div>
                                  <div className="optio">
                                  <label for="family_sick_no">
                                    <p style={{
                                    backgroundColor:
                                      formData.family_sick === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}>
                                      <input
                                        className="form-check-input"
                                        class={`form-check-input ${
                                          errors.family_sick
                                            ? "border-danger"
                                            : ""
                                        }`}
                                        type="radio"
                                        name="family_sick"
                                        checked={formData.family_sick === "No"}
                                        value="No"
                                        id="family_sick_no"
                                        onChange={handleInputChange}
                                      />
                                      No
                                    </p>
                                    </label>
                                  </div>
                                </div>
                                {formData.family_sick === "Yes" && (
                                  <div
                                    id="amount"
                                    style={{ marginTop: "5.5px" }}
                                  >
                                    <div className="optio mb-2">
                                      <input
                                      style={{width: '100%'}}
                                        type="text"
                                        value={formData.amount2020}
                                        name="amount2020"
                                        class={` for mb-2 ${
                                          errors.amount2020
                                            ? "border-danger"
                                            : ""
                                        }`}
                                        placeholder="2021 Income"
                                        onChange={handleInputChange}
                                        id="amount2020"
                                      />

                                      <input
                                         style={{width: '100%'}}
                                        type="text"
                                        value={formData.amount2021}
                                        name="amount2021"
                                        class={` for ${
                                          errors.amount2021
                                            ? "border-danger"
                                            : ""
                                        }`}
                                        placeholder="2021 Income"
                                        onChange={handleInputChange}
                                        id="amount2021"
                                      />
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
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
        );
      case 8:
        return (
          <div className="step step-9">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content-congrts border-0">
                          <div
                            style={boxStyle}
                            className="desktop-box"
                            css={styles[mediaQuery]}
                          >
                            <Confetti
                              width={width}
                              height={height}
                              style={confettiStyle}
                            />
                            <div style={{ textAlign: "center" }}>
                              <h1>Congratulations!</h1>
                              <p
                                style={{
                                  color: "green",
                                  fontSize: 25,
                                  fontWeight: 600,
                                  fontStyle: "Outfitt",
                                }}
                              >
                                Your Pre-Qualified for up to $32,220.00!!!
                              </p>
                              <label
                                htmlFor="congrats"
                                className="form-label headng text-center mt-3"
                                style={{
                                  fontWeight: "500",
                                  textAlign: "center !important",
                                }}
                              >
                                Based on the information you submitted, you are
                                prequalified to receive the Self Employed Tax
                                Credit.
                              </label>
                            </div>
                          </div>
                          <div
                            style={{ ...boxStyle, ...mobileBoxStyle }}
                            className="mobile-box"
                            css={styles[mediaQuery]}
                          >
                            <Confetti
                              width={width * 0.6} // Adjusted width for mobile screens
                              height={height * 0.6} // Adjusted height for mobile screens
                              style={confettiStyle}
                            />
                            <div style={{ textAlign: "center" }}>
                              <h1 style={{ fontSize: "22px !important" }}>
                                Congratulations!
                              </h1>
                              <p style={{ fontSize: "14px !important" }}>
                                Your Pre-Qualified for up to $32,220.00!!!
                              </p>
                              <label
                                htmlFor="congrats"
                                className="form-label headng text-center"
                                style={{
                                  fontWeight: "600",
                                  textAlign: "center !important",
                                  fontSize: "13px !important",
                                }}
                              >
                                Based on the information you submitted, you are
                                prequalified to receive the Self Employed Tax
                                Credit.
                              </label>
                              <p>Click below to continue your application!</p>
                            </div>
                          </div>
                          <div style={{ marginTop: 40 }}>
                            <div class="d-flex justify-content-center  mt-5 mb-5 w-100">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-3 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                class="btn btn-primary next-step step2_next mx-1"
                              >
                                Continue Application
                              </button>
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
        );
      case 9:
        return (
          <div className="step step-10 ">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="start-application">
                    <div
                      className="row ROWW"
                      style={{ marginTop: "0px !important" }}
                    >
                      <div className="col-lg-8 col-md-8 col-sm-12 ">
                        <div className="img-applic-content border-0">
                          <div
                            className="step2_content"
                            style={{ marginTop: "8px !important" }}
                          >
                            <h2 style={{ color: "#DC3545" }}>
                              Welcome To the SETC Eligibility Application!
                            </h2>
                            <h1>How does this work?</h1>

                            <div class="step2_content mt-0 w-100">
                              <div class="row justify-content-center mt-md-4 mt-sm-3">
                                <div
                                  class="col-lg-12"
                                  style={{ marginTop: "-20px" }}
                                >
                                  <div class="row align-items-center">
                                    <div class="col-lg-12 d-flex justify-content-center">
                                      <div class="d-flex flex-column">
                                        <div class=" st_2_we d-flex align-items-start w-100">
                                          <div style={{ marginTop: "18.5px" }}>
                                            <span class="text-white">
                                              <CheckCircle
                                                style={{
                                                  color: "#DC3545",
                                                  width: "30px",
                                                  height: "30px",
                                                }}
                                              />
                                            </span>
                                          </div>
                                          <h5
                                            class="step2_h5"
                                            style={{ color: "#00b6ff" }}
                                          >
                                            Answer 7 Eligibility Questions
                                          </h5>
                                        </div>

                                        <div class="st_2_we d-flex align-items-start w-100">
                                          <div style={{ marginTop: "18.5px" }}>
                                            <span class="text-white">
                                              <CheckCircle
                                                style={{
                                                  color: "#DC3545",
                                                  width: "30px",
                                                  height: "30px",
                                                }}
                                              />
                                            </span>
                                          </div>
                                          <h5
                                            class="step2_h5"
                                            style={{ color: "#00b6ff" }}
                                          >
                                            Receive an estimated refund amount
                                          </h5>
                                        </div>
                                        <div class="st_2_we d-flex align-items-start w-100">
                                          <div style={{ marginTop: "18.5px" }}>
                                            <span class="text-white">
                                              <CheckCircle
                                                style={{
                                                  color: "#DC3545",
                                                  width: "30px",
                                                  height: "30px",
                                                }}
                                              />
                                            </span>
                                          </div>
                                          <h5
                                            class="step2_h5"
                                            style={{ color: "#00b6ff" }}
                                          >
                                            Upload your documents
                                          </h5>
                                        </div>
                                        <div class="st_2_we d-flex align-items-start w-100">
                                          <div style={{ marginTop: "18.5px" }}>
                                            <span class="text-white">
                                              <CheckCircle
                                                style={{
                                                  color: "#DC3545",
                                                  width: "30px",
                                                  height: "30px",
                                                }}
                                              />
                                            </span>
                                          </div>
                                          <h5
                                            class="step2_h5"
                                            style={{ color: "#00b6ff" }}
                                          >
                                            Receive your Exact calculation
                                          </h5>
                                        </div>

                                        <div class="st_2_we d-flex align-items-start w-100">
                                          <div style={{ marginTop: "18.5px" }}>
                                            <span class="text-white">
                                              <CheckCircle
                                                style={{
                                                  color: "#DC3545",
                                                  width: "30px",
                                                  height: "30px",
                                                }}
                                              />
                                            </span>
                                          </div>
                                          <h5
                                            class="step2_h5"
                                            style={{ color: "#00b6ff" }}
                                          >
                                            Our CPA Team will Process and file
                                            your return
                                          </h5>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="step2_content mt-4 w-100">
                            <div class="text-center d-flex justify-content-center">
                              <h1
                                class="mb-3 text-center"
                                style={{
                                  width: "fit-content",
                                  fontSize: "clamp(22px, 4vw, 42px) !important",
                                  color: "#1A2C57",
                                }}
                              >
                                What if I am pre-qualified?
                              </h1>
                            </div>
                            <div class="row justify-content-center mt-md-4 mt-sm-3">
                              <div class="col-lg-12">
                                <div class="row align-items-center">
                                  <div class="col-lg-12 d-flex justify-content-center">
                                    <div class="d-flex flex-column ">
                                      <div class=" st_2_we d-flex align-items-start w-100">
                                        <div style={{ marginTop: "18.5px" }}>
                                          <span class="text-white">
                                            <CheckCircle
                                              style={{
                                                color: "#DC3545",
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                          </span>
                                        </div>
                                        <h5
                                          class="step2_h5"
                                          style={{ color: "#00b6ff" }}
                                        >
                                          2019 Schedule C (Form 1040){" "}
                                          <span
                                            style={{
                                              color: "red",
                                              marginTop: 1,
                                              fontWeight: "600",
                                              cursor: "pointer",
                                              textDecoration: "underline",
                                            }}
                                            onClick={() =>
                                              window.open(Pdf2019, "_blank")
                                            }
                                          >
                                            {" "}
                                            Click For Example
                                          </span>
                                        </h5>
                                      </div>

                                      <div class="st_2_we d-flex align-items-start w-100">
                                        <div style={{ marginTop: "18.5px" }}>
                                          <span class="text-white">
                                            <CheckCircle
                                              style={{
                                                color: "#DC3545",
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                          </span>
                                        </div>
                                        <h5
                                          class="step2_h5"
                                          style={{ color: "#00b6ff" }}
                                        >
                                          2020 Schedule C (Form 1040){" "}
                                          <span
                                            style={{
                                              color: "red",
                                              marginTop: 1,
                                              fontWeight: "600",
                                              cursor: "pointer",
                                              textDecoration: "underline",
                                            }}
                                            onClick={() =>
                                              window.open(Pdf2020, "_blank")
                                            }
                                          >
                                            {" "}
                                            Click For Example
                                          </span>
                                        </h5>
                                      </div>
                                      <div class="st_2_we d-flex align-items-start w-100">
                                        <div style={{ marginTop: "18.5px" }}>
                                          <span class="text-white">
                                            <CheckCircle
                                              style={{
                                                color: "#DC3545",
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                          </span>
                                        </div>
                                        <h5
                                          class="step2_h5"
                                          style={{ color: "#00b6ff" }}
                                        >
                                          2021 Schedule C (Form 1040){" "}
                                          <span
                                            style={{
                                              color: "red",
                                              marginTop: 1,
                                              fontWeight: "600",
                                              cursor: "pointer",
                                              textDecoration: "underline",
                                            }}
                                            onClick={() =>
                                              window.open(Pdf2021, "_blank")
                                            }
                                          >
                                            {" "}
                                            Click For Example
                                          </span>
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="d-flex justify-content-center  mt-5 mb-5 w-100">
                            <button
                              onClick={handlePrevious}
                              type="button"
                              className="px-3 py-3 prev-step"
                            >
                              Previous
                            </button>
                            <button
                              onClick={handleNext}
                              type="button"
                              class="btn btn-primary next-step step2_next mx-1"
                            >
                              Let's Get Started
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="step step-11">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className=""
                            style={{
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                          >
                            Are you eligible?
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                            className=" mb-4"
                          >
                            Question 1 of 7
                          </h3>
                          {/* </div> */}
                          <label
                            for="self_employed_from"
                            className="form-label headng"
                            style={{ fontWeight: "600" }}
                          >
                            Were you personally sick with Covid, experienced
                            Covid like symptoms, needed to quarantine, underwent
                            testing, were unable to perform services including
                            tele-work and took time off in 2020?
                          </label>

                          <div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className="optio mb-2">
                              <label for="personallySick2020_yes">
                                <p style={{
                                    backgroundColor:
                                      formData.personallySick2020 === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}>
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.personallySick2020
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="personallySick2020"
                                    checked={
                                      formData.personallySick2020 === "Yes"
                                    }
                                    value="Yes"
                                    id="personallySick2020_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                                </label>
                              </div>
                              <div className="optio">
                              <label for="personallySick2020_no">
                                <p style={{
                                    backgroundColor:
                                      formData.personallySick2020 === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}>
                                  <input
                                    class={`form-check-input ${
                                      errors.personallySick2020
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="personallySick2020"
                                    value="No"
                                    checked={
                                      formData.personallySick2020 === "No"
                                    }
                                    id="personallySick2020_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                                </label>
                              </div>
                            </div>

                            {formData.personallySick2020 === "Yes" && (
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="personal_startdate2020"
                                      className="form-label fs-6"
                                    >
                                      Start
                                    </label>
                                    <input
                                      type="date"
                                      min="2020-04-01"
                                      max="2020-12-31"
                                      // className="date-picker"
                                      className={` date-picker ${
                                        errors.personal_startdate2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="personal_startdate2020"
                                      name="personal_startdate2020"
                                      value={formData.personal_startdate2020}
                                      onChange={handleInputChange}
                                      disabled={formData.numberOfDays === "0"}
                                    />{" "}
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="personal_enddate2020"
                                      className="form-label fs-6"
                                    >
                                      End
                                    </label>
                                    <input
                                      type="date"
                                      min="2020-04-01"
                                      max="2020-12-31"
                                      className={` date-picker ${
                                        errors.personal_enddate2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="personal_enddate2020"
                                      name="personal_enddate2020"
                                      value={formData.personal_enddate2020}
                                      onChange={handleInputChange}
                                      disabled={formData.numberOfDays === "0"}
                                    />
                                  </div>
                                </div>
                                {formData.numberOfDays === "0" && (
                                  <p
                                    style={{
                                      color: "rgb(255, 149, 0)",
                                      fontFamily: "sans-serif",
                                      fontSize: 15,
                                    }}
                                  >
                                    Start and end date is not significant for
                                    days zero.
                                  </p>
                                )}
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="1days"
                                      className="form-label fs-6"
                                    >
                                      Number of days:
                                    </label>
                                    <input
                                      type="number"
                                      className={` date-picker ${
                                        errors.numberOfDays
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="1days"
                                      name="numberOfDays"
                                      value={formData.numberOfDays}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
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
        );
      case 11:
        return (
          <div className="step step-12">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className=""
                            style={{
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                          >
                            Are you eligible?
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                            className=" mb-4"
                          >
                            Question 2 of 7
                          </h3>
                          <label
                            for="self_employed_from"
                            className="form-label headng "
                            style={{ fontWeight: "600" }}
                          >
                            Were you personally sick with Covid, experienced
                            Covid like symptoms, needed to quarantine, underwent
                            testing, were unable to perform services including
                            tele-work and took time off in 2021?
                          </label>

                          <div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className="optio mb-2">
                              <label for="personallySick2021_yes">
                                <p style={{
                                    backgroundColor:
                                      formData.personallySick2021 === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}>
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.personallySick2021
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="personallySick2021"
                                    checked={
                                      formData.personallySick2021 === "Yes"
                                    }
                                    value="Yes"
                                    id="personallySick2021_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                                </label>
                              </div>
                              <div className="optio">
                              <label for="personallySick2021_no">
                                <p style={{
                                    backgroundColor:
                                      formData.personallySick2021 === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}>
                                  <input
                                    class={`form-check-input ${
                                      errors.personallySick2021
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="personallySick2021"
                                    value="No"
                                    checked={
                                      formData.personallySick2021 === "No"
                                    }
                                    id="personallySick2021_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                                </label>
                              </div>
                            </div>

                            {formData.personallySick2021 === "Yes" && (
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="personal_startdate2021"
                                      className="form-label fs-6"
                                    >
                                      Start
                                    </label>
                                    <input
                                      type="date"
                                      min="2021-01-01"
                                      max="2021-09-30"
                                      className={` date-picker ${
                                        errors.personal_startdate2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="personal_startdate2021"
                                      name="personal_startdate2021"
                                      value={formData.personal_startdate2021}
                                      onChange={handleInputChange}
                                      disabled={
                                        formData.numberOfDays2021 === "0"
                                      }
                                    />{" "}
                                  </div>
                                </div>

                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="personal_enddate2021"
                                      className="form-label fs-6"
                                    >
                                      End
                                    </label>

                                    <input
                                      type="date"
                                      min="2021-01-01"
                                      max="2021-09-30"
                                      className={` date-picker ${
                                        errors.personal_enddate2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="personal_enddate2021"
                                      name="personal_enddate2021"
                                      value={formData.personal_enddate2021}
                                      onChange={handleInputChange}
                                      disabled={
                                        formData.numberOfDays2021 === "0"
                                      }
                                    />
                                  </div>
                                </div>
                                {formData.numberOfDays2021 === "0" && (
                                  <p
                                    style={{
                                      color: "rgb(255, 149, 0)",
                                      fontFamily: "sans-serif",
                                      fontSize: 15,
                                    }}
                                  >
                                    Start and end date is not significant for
                                    days zero.
                                  </p>
                                )}
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="2days"
                                      className="form-label fs-6"
                                    >
                                      Number of days:
                                    </label>

                                    <input
                                      type="number"
                                      class={` date-picker ${
                                        errors.numberOfDays2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="2days"
                                      name="numberOfDays2021"
                                      value={formData.numberOfDays2021}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
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
        );
      case 12:
        return (
          <div className="step step-13">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className=""
                            style={{
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                          >
                            Are you eligible?
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                            className=" mb-4"
                          >
                            Question 3 of 7
                          </h3>
                          <label
                            for="self_employed_from"
                            className="form-label headng "
                            style={{ fontWeight: "600" }}
                          >
                            Did you care for someone else who was affected by
                            Covid, experienced Covid like symptoms, needed to
                            quarantine, underwent testing, and took time off in
                            2020?
                          </label>

                          <div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className="optio mb-2">
                              <label for="symptoms2020_yes">
                                <p style={{
                                    backgroundColor:
                                      formData.symptoms2020 === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}>
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.symptoms2020 ? "border-danger" : ""
                                    }`}
                                    type="radio"
                                    name="symptoms2020"
                                    checked={formData.symptoms2020 === "Yes"}
                                    value="Yes"
                                    id="symptoms2020_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                                </label>
                              </div>
                              <div className="optio">
                              <label for="symptoms2020_no">
                                <p style={{
                                    backgroundColor:
                                      formData.symptoms2020 === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}>
                                  <input
                                    class={`form-check-input ${
                                      errors.symptoms2020 ? "border-danger" : ""
                                    }`}
                                    type="radio"
                                    name="symptoms2020"
                                    value="No"
                                    checked={formData.symptoms2020 === "No"}
                                    id="symptoms2020_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                                </label>
                              </div>
                            </div>

                            {formData.symptoms2020 === "Yes" && (
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="cared_startdate2020"
                                      className="form-label fs-6"
                                    >
                                      Start
                                    </label>
                                    <input
                                      type="date"
                                      min="2020-04-01"
                                      max="2020-12-31"
                                      // className="date-picker"
                                      className={` date-picker ${
                                        errors.cared_startdate2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="cared_startdate2020"
                                      name="cared_startdate2020"
                                      value={formData.cared_startdate2020}
                                      onChange={handleInputChange}
                                      disabled={
                                        formData.symptomsdays2020 === "0"
                                      }
                                    />{" "}
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="cared_enddate2020"
                                      className="form-label fs-6"
                                    >
                                      End
                                    </label>
                                    <input
                                      type="date"
                                      min="2020-04-01"
                                      max="2020-12-31"
                                      // className="date-picker"
                                      className={` date-picker ${
                                        errors.cared_enddate2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="cared_enddate2020"
                                      name="cared_enddate2020"
                                      value={formData.cared_enddate2020}
                                      onChange={handleInputChange}
                                      disabled={
                                        formData.symptomsdays2020 === "0"
                                      }
                                    />{" "}
                                  </div>
                                </div>
                                {formData.symptomsdays2020 === "0" && (
                                  <p
                                    style={{
                                      color: "rgb(255, 149, 0)",
                                      fontFamily: "sans-serif",
                                      fontSize: 15,
                                    }}
                                  >
                                    Start and end date is not significant for
                                    days zero.
                                  </p>
                                )}
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="3days"
                                      className="form-label fs-6"
                                    >
                                      Number of days:
                                    </label>

                                    <input
                                      type="number"
                                      className={` date-picker ${
                                        errors.symptomsdays2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="3days"
                                      name="symptomsdays2020"
                                      value={formData.symptomsdays2020}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
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
        );
      case 13:
        return (
          <div className="step step-14">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className=""
                            style={{
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                          >
                            Are you eligible?
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                            className=" mb-4"
                          >
                            Question 4 of 7
                          </h3>
                          <label
                            for="self_employed_from"
                            className="form-label headng "
                            style={{ fontWeight: "600" }}
                          >
                            Did you care for someone else who was affected by
                            Covid, experienced Covid like symptoms, needed to
                            quarantine, underwent testing, and took time off in
                            2021?
                          </label>

                          <div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className="optio mb-2">
                              <label for="symptoms2021_yes">
                                <p style={{
                                    backgroundColor:
                                      formData.symptoms2021 === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}>
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.symptoms2021 ? "border-danger" : ""
                                    }`}
                                    type="radio"
                                    name="symptoms2021"
                                    checked={formData.symptoms2021 === "Yes"}
                                    value="Yes"
                                    id="symptoms2021_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                                </label>
                              </div>
                              <div className="optio">
                              <label for="symptoms2021_no">
                                <p style={{
                                    backgroundColor:
                                      formData.symptoms2021 === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}>
                                  <input
                                    class={`form-check-input ${
                                      errors.symptoms2021 ? "border-danger" : ""
                                    }`}
                                    type="radio"
                                    name="symptoms2021"
                                    value="No"
                                    checked={formData.symptoms2021 === "No"}
                                    id="symptoms2021_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                                </label>
                              </div>
                            </div>

                            {formData.symptoms2021 === "Yes" && (
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="cared_startdate2021"
                                      className="form-label fs-6"
                                    >
                                      Start
                                    </label>
                                    <input
                                      type="date"
                                      min="2021-01-01"
                                      max="2021-09-30"
                                      // className="date-picker"
                                      className={` date-picker ${
                                        errors.cared_startdate2021 &&
                                        formData.symptomsdays2021 !== "0"
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="cared_startdate2021"
                                      name="cared_startdate2021"
                                      value={formData.cared_startdate2021}
                                      onChange={handleInputChange}
                                      disabled={
                                        formData.symptomsdays2021 === "0"
                                      }
                                    />{" "}
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="cared_enddate2021"
                                      className="form-label fs-6"
                                    >
                                      End
                                    </label>
                                    <input
                                      type="date"
                                      min="2021-01-01"
                                      max="2021-09-30"
                                      // className="date-picker"
                                      className={` date-picker ${
                                        errors.cared_enddate2021 &&
                                        formData.symptomsdays2021 !== "0"
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="cared_enddate2021"
                                      name="cared_enddate2021"
                                      value={formData.cared_enddate2021}
                                      onChange={handleInputChange}
                                      disabled={
                                        formData.symptomsdays2021 === "0"
                                      }
                                    />{" "}
                                  </div>
                                </div>

                                {formData.symptomsdays2021 === "0" && (
                                  <p
                                    style={{
                                      color: "rgb(255, 149, 0)",
                                      fontFamily: "sans-serif",
                                      fontSize: 15,
                                    }}
                                  >
                                    Start and end date is not significant for
                                    days zero.
                                  </p>
                                )}

                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="4days"
                                      className="form-label fs-6"
                                    >
                                      Number of days:
                                    </label>

                                    <input
                                      type="number"
                                      className={` date-picker ${
                                        errors.symptomsdays2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="4days"
                                      name="symptomsdays2021"
                                      value={formData.symptomsdays2021}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
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
        );
      case 14:
        return (
          <div className="step step-15">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className=""
                            style={{
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                          >
                            Are you eligible?
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                            className=" mb-4"
                          >
                            Question 5 of 7
                          </h3>
                          <label
                            for="self_employed_from"
                            className="form-label headng "
                            style={{ fontWeight: "600" }}
                          >
                            Were you affected by the closure of your child's
                            school/daycare due to COVID restrictions, or how
                            many days did you care for your minor child who was
                            affected by COVID, which impacted your work in 2020?
                          </label>

                          <div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className="optio mb-2">
                              <label for="closure2020_yes">
                                <p style={{
                                    backgroundColor:
                                      formData.closure2020 === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}>
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.closure2020 ? "border-danger" : ""
                                    }`}
                                    type="radio"
                                    name="closure2020"
                                    checked={formData.closure2020 === "Yes"}
                                    value="Yes"
                                    id="closure2020_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                                </label>
                              </div>
                              <div className="optio">
                              <label for="closure2020_no">
                                <p style={{
                                    backgroundColor:
                                      formData.closure2020 === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}>
                                  <input
                                    class={`form-check-input ${
                                      errors.closure2020 ? "border-danger" : ""
                                    }`}
                                    type="radio"
                                    name="closure2020"
                                    value="No"
                                    checked={formData.closure2020 === "No"}
                                    id="closure2020_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                                </label>
                              </div>
                            </div>

                            {formData.closure2020 === "Yes" && (
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="minor_startdate2020"
                                      className="form-label fs-6"
                                    >
                                      Start
                                    </label>
                                    <input
                                      type="date"
                                      min="2020-04-01"
                                      max="2020-12-31"
                                      // className="date-picker"
                                      className={` date-picker ${
                                        errors.minor_startdate2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="minor_startdate2020"
                                      name="minor_startdate2020"
                                      value={formData.minor_startdate2020}
                                      onChange={handleInputChange}
                                      disabled={formData.minordays2020 === "0"}
                                    />{" "}
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="minor_enddate2020"
                                      className="form-label fs-6"
                                    >
                                      End
                                    </label>
                                    <input
                                      type="date"
                                      min="2020-04-01"
                                      max="2020-12-31"
                                      // className="date-picker"
                                      className={` date-picker ${
                                        errors.minor_enddate2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="minor_enddate2020"
                                      name="minor_enddate2020"
                                      value={formData.minor_enddate2020}
                                      onChange={handleInputChange}
                                      disabled={formData.minordays2020 === "0"}
                                    />{" "}
                                  </div>
                                </div>

                                {formData.minordays2020 === "0" && (
                                  <p
                                    style={{
                                      color: "rgb(255, 149, 0)",
                                      fontFamily: "sans-serif",
                                      fontSize: 15,
                                    }}
                                  >
                                    Start and end date is not significant for
                                    days zero.
                                  </p>
                                )}

                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="5days"
                                      className="form-label fs-6"
                                    >
                                      Number of days:
                                    </label>

                                    <input
                                      type="number"
                                      placeholder="(50 days max)"
                                      className={` date-picker ${
                                        errors.minordays2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="5days"
                                      name="minordays2020"
                                      value={formData.minordays2020}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
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
        );
      case 15:
        return (
          <div className="step step-16">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className=""
                            style={{
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                          >
                            Are you eligible?
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                            className=" mb-4"
                          >
                            Question 6 of 7
                          </h3>
                          <label
                            for="self_employed_from"
                            className="form-label headng "
                            style={{ fontWeight: "600" }}
                          >
                            Were you affected by the closure of your child's
                            school/daycare due to COVID restrictions, or how
                            many days did you care for your minor child who was
                            affected by COVID, which impacted your work in 2021?
                          </label>

                          <div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className="optio mb-2">
                              <label for="closure2021_yes">
                                <p style={{
                                    backgroundColor:
                                      formData.closure2021 === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}>
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.closure2021 ? "border-danger" : ""
                                    }`}
                                    type="radio"
                                    name="closure2021"
                                    checked={formData.closure2021 === "Yes"}
                                    value="Yes"
                                    id="closure2021_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                                </label>
                              </div>
                              <div className="optio">
                              <label for="closure2021_no">
                                <p style={{
                                    backgroundColor:
                                      formData.closure2021 === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}>
                                  <input
                                    class={`form-check-input ${
                                      errors.closure2021 ? "border-danger" : ""
                                    }`}
                                    type="radio"
                                    name="closure2021"
                                    value="No"
                                    checked={formData.closure2021 === "No"}
                                    id="closure2021_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                                </label>
                              </div>
                            </div>

                            {formData.closure2021 === "Yes" && (
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="minor_startdate2021"
                                      className="form-label fs-6"
                                    >
                                      Start
                                    </label>
                                    <input
                                      type="date"
                                      min="2021-01-01"
                                      max="2021-09-30"
                                      // className="date-picker"
                                      className={` date-picker ${
                                        errors.minor_startdate2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="minor_startdate2021"
                                      name="minor_startdate2021"
                                      value={formData.minor_startdate2021}
                                      onChange={handleInputChange}
                                      disabled={formData.minordays2021 === "0"}
                                    />{" "}
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="minor_enddate2021"
                                      className="form-label fs-6"
                                    >
                                      End
                                    </label>
                                    <input
                                      type="date"
                                      min="2021-01-01"
                                      max="2021-09-30"
                                      // className="date-picker"
                                      className={` date-picker ${
                                        errors.minor_enddate2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="minor_enddate2021"
                                      name="minor_enddate2021"
                                      value={formData.minor_enddate2021}
                                      onChange={handleInputChange}
                                      disabled={formData.minordays2021 === "0"}
                                    />{" "}
                                  </div>
                                </div>

                                {formData.minordays2021 === "0" && (
                                  <p
                                    style={{
                                      color: "rgb(255, 149, 0)",
                                      fontFamily: "sans-serif",
                                      fontSize: 15,
                                    }}
                                  >
                                    Start and end date is not significant for
                                    days zero.
                                  </p>
                                )}

                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="6days"
                                      className="form-label fs-6"
                                    >
                                      Number of days:
                                    </label>

                                    <input
                                      type="number"
                                      placeholder="(60 days max)"
                                      className={` date-picker ${
                                        errors.minordays2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="6days"
                                      name="minordays2021"
                                      value={formData.minordays2021}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
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
        );
      case 16:
        return (
          <div className="step step-17">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <div>
                            <label
                              for="net_income_2019"
                              className="form-label fs-5"
                              style={{ color: "#00B6FF" }}
                            >
                              Total NET Income For 2019?
                            </label>
                            <div className="optio mb-2">
                              <input
                                type="text"
                                value={formData.netIncome2019}
                                class={` full-width for ${
                                  errors.netIncome2019 ? "border-danger" : ""
                                }`}
                                name="netIncome2019"
                                onChange={handleInputChange}
                                placeholder="$"
                                id="net_income_2019"
                              />
                            </div>
                            <label
                              for="net_income_2020"
                              className="form-label fs-5"
                              style={{ color: "#00B6FF" }}
                            >
                              Total NET Income For 2020?
                            </label>
                            <div className="optio mb-2">
                              <input
                                type="text"
                                value={formData.netIncome2020}
                                name="netIncome2020"
                                class={` full-width for ${
                                  errors.netIncome2020 ? "border-danger" : ""
                                }`}
                                placeholder="$"
                                onChange={handleInputChange}
                                id="net_income_2020"
                              />
                            </div>
                            <label
                              for="net_income_2021"
                              className="form-label fs-5"
                              style={{ color: "#00B6FF" }}
                            >
                              Total NET Income For 2021?
                            </label>
                            <div className="optio mb-2">
                              <input
                                type="text"
                                value={formData.netIncome2021}
                                name="netIncome2021"
                                class={`full-width for ${
                                  errors.netIncome2021 ? "border-danger" : ""
                                }`}
                                placeholder="$"
                                onChange={handleInputChange}
                                id="net_income_2021"
                              />
                            </div>
                            {activeErrorQualify17 && (
                              <div>
                                <h4 style={{ color: "#e62e2d" }}>
                                  Value must be more or equal to 25k for two
                                  input fileds.
                                </h4>
                              </div>
                            )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
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
        );
      case 17:
        return (
          <div className="step step-18">
            <input type="hidden" name="record_id" id="record_id" value="" />
            <div className="container">
              <div className="row justify-content-center">
                {/* <canvas id="confetti"></canvas> */}
                <div className="col-lg-12">
                  <div className="start-application">
                    <div className="customRow">
                      <div
                        className="col-lg-6 col-md-6 col-sm-12 pe-0 backGround"
                        style={{
                          backgroundImage: "linear-gradient(#dff5fc, #dff5fc)",
                          borderRadius: "12px",
                        }}
                      >
                        <div
                          className="img-applci sd h-100"
                          style={{ backgroundImage: "none " }}
                        >
                          <div className="col-lg-12">
                            <div
                              style={boxSttyle}
                              className="desktop-box"
                              css={styles[mediaQuery]}
                            >
                              <Confetti
                                width={width}
                                height={height}
                                style={confettiStyle}
                              />
                              <div style={{ textAlign: "center" }}>
                                <h1>Congratulations!</h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 ">
                        <div
                          className="img-applic-content d-flex align-items-center"
                          style={{ padding: "14px" }}
                        >
                          <div className="row justify-content-center align-items-center">
                            <div className="col-lg-12">
                              <div className="h-100 d-flex align-items-center flex-column">
                                <div className="h-90">
                                  <h3 className="text-success text-center fs-1 mb-3">
                                    Hurray!
                                  </h3>

                                  <h3 className="fs-4">
                                    Based on the information you provided, we’ve
                                    estimated that you might be eligible for up
                                    to
                                    <span
                                      className="text-success text-success text-center h3 fs-1 mb-3"
                                      id="final_amount"
                                    >
                                      {" "}
                                      {finalIncomeValue ||
                                        finalCreditAmountStorage}
                                    </span>
                                    <br />
                                  </h3>

                                  <h3 className="mt-4">
                                    The next step is to upload your documents
                                    for our CPAs to calculate your exact credit
                                    amount.
                                  </h3>
                                </div>
                                <div className="d-flex justify-content-end mt-3">
                                  <button
                                    onClick={handlePrevious}
                                    type="button"
                                    className="px-3 py-2 prev-step"
                                  >
                                    Previous
                                  </button>
                                  <button
                                    onClick={handleNext}
                                    type="button"
                                    className="px-3 py-2 next-step"
                                  >
                                    {activeStep === steps.length - 1
                                      ? "Submit"
                                      : "Next"}
                                  </button>
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
            </div>
          </div>
        );
      case 18:
        return (
          <div className="row justify-content-center step step-19">
            <div className="col-lg-8" style={{ marginTop: "32px" }}>
              <div
                className="step step-10 bg-white shadow px-3 py-5"
                style={{ borderRadius: "20px" }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "13.5px",
                      color: "gray",
                      background:
                        "linear-gradient(45deg, transparent, #c1ebf4, transparent)",
                      fontStyle: "italic",
                    }}
                  >
                    <span style={{ color: "#e62e2d", fontWeight: "bold" }}>
                      Notice:{" "}
                    </span>{" "}
                    Kindly make sure that each document is uploaded before
                    selecting the "submit now" button to prevent any loss of
                    data. If you don't have all the paperwork completed and
                    would like to submit them again at a later time. Please
                    submit any papers that are accessible, then click "Submit
                    Documents Later". We will provide you a link to submit the
                    remaining files after we get the ones you have already
                    uploaded.
                  </p>
                </div>
                <h3 style={{ fontWeight: "bold" }}>Documents</h3>

                <div className="mb-3 file_div">
                  <label for="driving_licence" className="form-label">
                    A PDF Copy of a Current ID or Driver's License
                  </label>
                  {userData?.driving_licence &&
                  userData?.driving_licence.length > 0 ? (
                    userData.driving_licence.map((file, index) => {
                      const fileName = userData.driving_licence_name[index];
                      const shouldHideRemoveButton =
                        isThirtySecondsPassed(fileName);

                      return (
                        <div key={index} className="containerr">
                          <div className="itemm">
                            <TaskAlt />
                            <span className="namee">
                              {userData.driving_licence_name[index]}
                            </span>
                          </div>
                          <div
                            className="itemm"
                            style={{ padding: "0px 20px !important" }}
                          >
                            <div
                              onClick={() =>
                                openFileInNewTab("driving_licence", index, userData.driving_licence_name[index])
                              }
                              className="buttonn"
                            >
                              View
                            </div>
                            {/* {!shouldHideRemoveButton && ( */}
                            <div
                              onClick={() =>
                                removeFile("driving_licence", index, fileName)
                              }
                              className="buttonn"
                            >
                              Remove
                            </div>
                            {/* )} */}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <input
                      style={{ marginTop: 20 }}
                      type="file"
                      name="driving_licence"
                      className="form-control file"
                      id="driving_licence"
                      accept=".pdf"
                      required
                      // multiple // Allow multiple file selection
                      onChange={(e) => handleFileChange("driving_licence", e)}
                    />
                  )}

                  {userData?.driving_licence &&
                    userData?.driving_licence.length > 0 && (
                      <button
                        style={{
                          marginTop: "20px",
                          borderRadius: "6px",
                          border: "1px solid transparent",
                          fontWeight: "bold",
                          color: "white",
                          background: "#3c4d77",
                        }}
                        onClick={() => handleAddFileClick("driving_licence")}
                      >
                        Add File
                      </button>
                    )}

                  {addingFileType === "driving_licence" && (
                    <FileInputComponent
                      inputName="driving_licence"
                      onRemove={handleRemoveInput}
                      handleFileChange={handleFileChange} // Pass the file change handler
                    />
                  )}

                  {uploadingFile === "driving_licence" && (
                    <LinearProgressWithLabel
                      value={uploadProgress.driving_licence}
                    />
                  )}
                </div>

                <div className="mb-3 file_div">
                  <label for="schedule_pdf" className="form-label">
                    A PDF Copy of your 2019 Form 1040 (Tax Return), including
                    ALL schedules, if the 2019 Self-Employed Income is higher
                    than 2020. We would prefer one PDF file.
                  </label>

                  {userData?.schedule_pdf &&
                  userData?.schedule_pdf.length > 0 ? (
                    userData.schedule_pdf.map((file, index) => {
                      const fileName = userData.schedule_pdf_name[index];
                      const shouldHideRemoveButton =
                        isThirtySecondsPassed(fileName);

                      return (
                        <div key={index} className="containerr">
                          <div className="itemm">
                            <TaskAlt />
                            <span className="namee">
                              {userData.schedule_pdf_name[index]}
                            </span>
                          </div>
                          <div
                            className="itemm"
                            style={{ padding: "0px 20px !important" }}
                          >
                            <div
                              onClick={() =>
                                openFileInNewTab("schedule_pdf", index, userData.schedule_pdf_name[index])
                              }
                              className="buttonn"
                            >
                              View
                            </div>
                          
                              <div
                                onClick={() =>
                                  removeFile(
                                    "schedule_pdf",
                                    index,
                                    userData.schedule_pdf_name[index]
                                  )
                                }
                                className="buttonn"
                              >
                                Remove
                              </div>
                          
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <input
                      style={{ marginTop: 20 }}
                      type="file"
                      name="schedule_pdf"
                      className="form-control file"
                      id="schedule_pdf"
                      accept=".pdf"
                      required
                      // multiple // Allow multiple file selection
                      onChange={(e) => handleFileChange("schedule_pdf", e)}
                    />
                  )}

                  {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
            <button >Add File</button>
          )} */}

                  {userData?.schedule_pdf &&
                    userData?.schedule_pdf.length > 0 && (
                      <button
                        style={{
                          marginTop: "20px",
                          borderRadius: "6px",
                          border: "1px solid transparent",
                          fontWeight: "bold",
                          color: "white",
                          background: "#3c4d77",
                        }}
                        onClick={() => handleAddFileClick("schedule_pdf")}
                      >
                        Add File
                      </button>
                    )}

                  {addingFileType === "schedule_pdf" && (
                    <FileInputComponent
                      inputName="schedule_pdf"
                      onRemove={handleRemoveInput}
                      handleFileChange={handleFileChange} // Pass the file change handler
                    />
                  )}

                  {uploadingFile === "schedule_pdf" && (
                    <LinearProgressWithLabel
                      value={uploadProgress.schedule_pdf}
                    />
                  )}
                </div>

                <div className="mb-3 file_div">
                  <label for="Tax_Return_2020" className="form-label">
                    {" "}
                    A PDF Copy of your 2020 Form 1040 (Tax Return), including
                    ALL schedules.{" "}
                  </label>

                  {userData?.Tax_Return_2020 &&
                  userData?.Tax_Return_2020.length > 0 ? (
                    userData.Tax_Return_2020.map((file, index) => (
                      <div key={index} className="containerr">
                        <div className="itemm">
                          <TaskAlt />
                          <span className="namee">
                            {userData.Tax_Return_2020_name[index]}
                          </span>
                        </div>
                        <div
                          className="itemm"
                          style={{ padding: "0px 20px !important" }}
                        >
                          <div
                            onClick={() =>
                              openFileInNewTab("Tax_Return_2020", index, userData.Tax_Return_2020_name[index])
                            }
                            className="buttonn"
                          >
                            View
                          </div>
                          {showRemoveButton && (
                            <div
                              onClick={() =>
                                removeFile(
                                  "Tax_Return_2020",
                                  index,
                                  userData.Tax_Return_2020_name[index]
                                )
                              }
                              className="buttonn"
                            >
                              Remove
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <input
                      style={{ marginTop: 20 }}
                      type="file"
                      name="Tax_Return_2020"
                      className="form-control file"
                      id="Tax_Return_2020"
                      accept=".pdf"
                      required
                      // multiple // Allow multiple file selection
                      onChange={(e) => handleFileChange("Tax_Return_2020", e)}
                    />
                  )}

                  {userData?.Tax_Return_2020 &&
                    userData?.Tax_Return_2020.length > 0 && (
                      <button
                        style={{
                          marginTop: "20px",
                          borderRadius: "6px",
                          border: "1px solid transparent",
                          fontWeight: "bold",
                          color: "white",
                          background: "#3c4d77",
                        }}
                        onClick={() => handleAddFileClick("Tax_Return_2020")}
                      >
                        Add File
                      </button>
                    )}

                  {addingFileType === "Tax_Return_2020" && (
                    <FileInputComponent
                      inputName="Tax_Return_2020"
                      onRemove={handleRemoveInput}
                      handleFileChange={handleFileChange} // Pass the file change handler
                    />
                  )}

                  {uploadingFile === "Tax_Return_2020" && (
                    <LinearProgressWithLabel
                      value={uploadProgress.Tax_Return_2020}
                    />
                  )}
                </div>
                <div className="mb-3 file_div">
                  <label for="Tax_Return_2021" className="form-label">
                    A PDF Copy of your 2021 Form 1040 (Tax Return), including
                    ALL schedules.{" "}
                  </label>
                  {userData?.Tax_Return_2021 &&
                  userData?.Tax_Return_2021.length > 0 ? (
                    userData.Tax_Return_2021.map((file, index) => (
                      <div key={index} className="containerr">
                        <div className="itemm">
                          <TaskAlt />
                          <span className="namee">
                            {userData.Tax_Return_2021_name[index]}
                          </span>
                        </div>
                        <div
                          className="itemm"
                          style={{ padding: "0px 20px !important" }}
                        >
                          <div
                            onClick={() =>
                              openFileInNewTab("Tax_Return_2021", index, userData.Tax_Return_2021_name[index])
                            }
                            className="buttonn"
                          >
                            View
                          </div>
                          {showRemoveButton && (
                            <div
                              onClick={() =>
                                removeFile(
                                  "Tax_Return_2021",
                                  index,
                                  userData.Tax_Return_2021_name[index]
                                )
                              }
                              className="buttonn"
                            >
                              Remove
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <input
                      style={{ marginTop: 20 }}
                      type="file"
                      name="Tax_Return_2021"
                      className="form-control file"
                      id="Tax_Return_2021"
                      accept=".pdf"
                      required
                      // multiple // Allow multiple file selection
                      onChange={(e) => handleFileChange("Tax_Return_2021", e)}
                    />
                  )}

                  {userData?.Tax_Return_2021 &&
                    userData?.Tax_Return_2021.length > 0 && (
                      <button
                        style={{
                          marginTop: "20px",
                          borderRadius: "6px",
                          border: "1px solid transparent",
                          fontWeight: "bold",
                          color: "white",
                          background: "#3c4d77",
                        }}
                        onClick={() => handleAddFileClick("Tax_Return_2021")}
                      >
                        Add File
                      </button>
                    )}

                  {addingFileType === "Tax_Return_2021" && (
                    <FileInputComponent
                      inputName="Tax_Return_2021"
                      onRemove={handleRemoveInput}
                      handleFileChange={handleFileChange} // Pass the file change handler
                    />
                  )}

                  {uploadingFile === "Tax_Return_2021" && (
                    <LinearProgressWithLabel
                      value={uploadProgress.Tax_Return_2021}
                    />
                  )}
                </div>

                {formData.family_sick === "Yes" &&
                  formData.employed_as_W2 === "Yes" && (
                    <div className="pdf-upload-extra">
                      <div className="mb-3 file_div">
                        <label
                          for="supplemental_attachment_2020"
                          className="form-label"
                        >
                          PDF Copy of All your 2020 Form W-2(s), including ANY
                          Family First Coronavirus Response Act (FFCRA)
                          supplemental attachment(s).*
                        </label>
                        {userData?.supplemental_attachment_2020 &&
                        userData?.supplemental_attachment_2020.length > 0 ? (
                          userData.supplemental_attachment_2020.map(
                            (file, index) => (
                              <div key={index} className="containerr">
                                <div className="itemm">
                                  <TaskAlt />
                                  <span className="namee">
                                    {
                                      userData
                                        .supplemental_attachment_2020_name[
                                        index
                                      ]
                                    }
                                  </span>
                                </div>
                                <div
                                  className="itemm"
                                  style={{ padding: "0px 20px !important" }}
                                >
                                  <div
                                    onClick={() =>
                                      openFileInNewTab(
                                        "supplemental_attachment_2020",
                                        index,
                                        userData
                                          .supplemental_attachment_2020_name[
                                          index
                                        ]
                                      )
                                    }
                                    className="buttonn"
                                  >
                                    View
                                  </div>
                                  {showRemoveButton && (
                                    <div
                                      onClick={() =>
                                        removeFile(
                                          "supplemental_attachment_2020",
                                          index,
                                          userData
                                            .supplemental_attachment_2020_name[
                                            index
                                          ]
                                        )
                                      }
                                      className="buttonn"
                                    >
                                      Remove
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <input
                            style={{ marginTop: 20 }}
                            type="file"
                            name="supplemental_attachment_2020"
                            className="form-control file"
                            id="supplemental_attachment_2020"
                            accept=".pdf"
                            required
                            // multiple // Allow multiple file selection
                            onChange={(e) =>
                              handleFileChange(
                                "supplemental_attachment_2020",
                                e
                              )
                            }
                          />
                        )}

                        {userData?.supplemental_attachment_2020 &&
                          userData?.supplemental_attachment_2020.length > 0 && (
                            <button
                              style={{
                                marginTop: "20px",
                                borderRadius: "6px",
                                border: "1px solid transparent",
                                fontWeight: "bold",
                                color: "white",
                                background: "#3c4d77",
                              }}
                              onClick={() =>
                                handleAddFileClick(
                                  "supplemental_attachment_2020"
                                )
                              }
                            >
                              Add File
                            </button>
                          )}

                        {addingFileType === "supplemental_attachment_2020" && (
                          <FileInputComponent
                            inputName="supplemental_attachment_2020"
                            onRemove={handleRemoveInput}
                            handleFileChange={handleFileChange} // Pass the file change handler
                          />
                        )}

                        {uploadingFile === "supplemental_attachment_2020" && (
                          <LinearProgressWithLabel
                            value={uploadProgress.supplemental_attachment_2020}
                          />
                        )}
                      </div>

                      <div className="mb-3 file_div">
                        <label
                          for="2021_supplemental_attachment_2021"
                          className="form-label"
                        >
                          PDF Copy of All your 2021 Form W-2(s), including ANY
                          Family First Coronavirus Response Act (FFCRA)
                          supplemental attachment(s).
                        </label>
                        {userData?.supplemental_attachment_2021 &&
                        userData?.supplemental_attachment_2021.length > 0 ? (
                          userData.supplemental_attachment_2021.map(
                            (file, index) => (
                              <div key={index} className="containerr">
                                <div className="itemm">
                                  <TaskAlt />
                                  <span className="namee">
                                    {
                                      userData
                                        .supplemental_attachment_2021_name[
                                        index
                                      ]
                                    }
                                  </span>
                                </div>
                                <div
                                  className="itemm"
                                  style={{ padding: "0px 20px !important" }}
                                >
                                  <div
                                    onClick={() =>
                                      openFileInNewTab(
                                        "supplemental_attachment_2021",
                                        index,
                                        userData
                                          .supplemental_attachment_2021_name[
                                          index
                                        ]
                                      )
                                    }
                                    className="buttonn"
                                  >
                                    View
                                  </div>
                                  {showRemoveButton && (
                                    <div
                                      onClick={() =>
                                        removeFile(
                                          "supplemental_attachment_2021",
                                          index,
                                          userData
                                            .supplemental_attachment_2021_name[
                                            index
                                          ]
                                        )
                                      }
                                      className="buttonn"
                                    >
                                      Remove
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <input
                            style={{ marginTop: 20 }}
                            type="file"
                            name="supplemental_attachment_2021"
                            className="form-control file"
                            id="supplemental_attachment_2021"
                            accept=".pdf"
                            required
                            // multiple // Allow multiple file selection
                            onChange={(e) =>
                              handleFileChange(
                                "supplemental_attachment_2021",
                                e
                              )
                            }
                          />
                        )}

                        {userData?.supplemental_attachment_2021 &&
                          userData?.supplemental_attachment_2021.length > 0 && (
                            <button
                              style={{
                                marginTop: "20px",
                                borderRadius: "6px",
                                border: "1px solid transparent",
                                fontWeight: "bold",
                                color: "white",
                                background: "#3c4d77",
                              }}
                              onClick={() =>
                                handleAddFileClick(
                                  "supplemental_attachment_2021"
                                )
                              }
                            >
                              Add File
                            </button>
                          )}

                        {addingFileType === "supplemental_attachment_2021" && (
                          <FileInputComponent
                            inputName="supplemental_attachment_2021"
                            onRemove={handleRemoveInput}
                            handleFileChange={handleFileChange} // Pass the file change handler
                          />
                        )}

                        {uploadingFile === "supplemental_attachment_2021" && (
                          <LinearProgressWithLabel
                            value={uploadProgress.supplemental_attachment_2021}
                          />
                        )}
                      </div>

                      <div className="mb-3 file_div">
                        <label for="FormA1099" className="form-label">
                          PDF Copy of All your 2020 Form 1099-R(s), if any
                        </label>

                        {userData?.FormA1099 &&
                        userData?.FormA1099.length > 0 ? (
                          userData.FormA1099.map((file, index) => (
                            <div key={index} className="containerr">
                              <div className="itemm">
                                <TaskAlt />
                                <span className="namee">
                                  {userData.FormA1099_name[index]}
                                </span>
                              </div>
                              <div
                                className="itemm"
                                style={{ padding: "0px 20px !important" }}
                              >
                                <div
                                  onClick={() =>
                                    openFileInNewTab("FormA1099", index,
                                    userData.FormA1099_name[index] )
                                  }
                                  className="buttonn"
                                >
                                  View
                                </div>
                                {showRemoveButton && (
                                  <div
                                    onClick={() =>
                                      removeFile(
                                        "FormA1099",
                                        index,
                                        userData.FormA1099_name[index]
                                      )
                                    }
                                    className="buttonn"
                                  >
                                    Remove
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <input
                            style={{ marginTop: 20 }}
                            type="file"
                            name="FormA1099"
                            className="form-control file"
                            id="FormA1099"
                            accept=".pdf"
                            required
                            // multiple // Allow multiple file selection
                            onChange={(e) => handleFileChange("FormA1099", e)}
                          />
                        )}

                        {userData?.FormA1099 &&
                          userData?.FormA1099.length > 0 && (
                            <button
                              style={{
                                marginTop: "20px",
                                borderRadius: "6px",
                                border: "1px solid transparent",
                                fontWeight: "bold",
                                color: "white",
                                background: "#3c4d77",
                              }}
                              onClick={() => handleAddFileClick("FormA1099")}
                            >
                              Add File
                            </button>
                          )}

                        {addingFileType === "FormA1099" && (
                          <FileInputComponent
                            inputName="FormA1099"
                            onRemove={handleRemoveInput}
                            handleFileChange={handleFileChange} // Pass the file change handler
                          />
                        )}

                        {uploadingFile === "FormA1099" && (
                          <LinearProgressWithLabel
                            value={uploadProgress.FormA1099}
                          />
                        )}
                      </div>

                      <div className="mb-3 file_div">
                        <label for="FormB1099" className="form-label">
                          PDF Copy of All your 2021 Form 1099-R(s), if any
                        </label>

                        {userData?.FormB1099 &&
                        userData?.FormB1099.length > 0 ? (
                          userData.FormB1099.map((file, index) => (
                            <div key={index} className="containerr">
                              <div className="itemm">
                                <TaskAlt />
                                <span className="namee">
                                  {userData.FormB1099_name[index]}
                                </span>
                              </div>
                              <div
                                className="itemm"
                                style={{ padding: "0px 20px !important" }}
                              >
                                <div
                                  onClick={() =>
                                    openFileInNewTab("FormB1099", index,
                                    userData.FormB1099_name[index])
                                  }
                                  className="buttonn"
                                >
                                  View
                                </div>
                                {showRemoveButton && (
                                  <div
                                    onClick={() =>
                                      removeFile(
                                        "FormB1099",
                                        index,
                                        userData.FormB1099_name[index]
                                      )
                                    }
                                    className="buttonn"
                                  >
                                    Remove
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <input
                            style={{ marginTop: 20 }}
                            type="file"
                            name="FormB1099"
                            className="form-control file"
                            id="FormB1099"
                            accept=".pdf"
                            required
                            // multiple // Allow multiple file selection
                            onChange={(e) => handleFileChange("FormB1099", e)}
                          />
                        )}

                        {userData?.FormB1099 &&
                          userData?.FormB1099.length > 0 && (
                            <button
                              style={{
                                marginTop: "20px",
                                borderRadius: "6px",
                                border: "1px solid transparent",
                                fontWeight: "bold",
                                color: "white",
                                background: "#3c4d77",
                              }}
                              onClick={() => handleAddFileClick("FormB1099")}
                            >
                              Add File
                            </button>
                          )}

                        {addingFileType === "FormB1099" && (
                          <FileInputComponent
                            inputName="FormB1099"
                            onRemove={handleRemoveInput}
                            handleFileChange={handleFileChange} // Pass the file change handler
                          />
                        )}

                        {uploadingFile === "FormB1099" && (
                          <LinearProgressWithLabel
                            value={uploadProgress.FormB1099}
                          />
                        )}
                      </div>

                      <div className="mb-3 file_div">
                        <label for="ks2020" className="form-label">
                          PDF Copy of All your 2020 K-1s, if any
                        </label>
                        {userData?.ks2020 && userData?.ks2020.length > 0 ? (
                          userData.ks2020.map((file, index) => (
                            <div key={index} className="containerr">
                              <div className="itemm">
                                <TaskAlt />
                                <span className="namee">
                                  {userData.ks2020_name[index]}
                                </span>
                              </div>
                              <div
                                className="itemm"
                                style={{ padding: "0px 20px !important" }}
                              >
          
                                <div
                                  onClick={() =>
                                    openFileInNewTab("ks2020", index,
                                    userData.ks2020_name[index])
                                  }
                                  className="buttonn"
                                >
                                  View
                                </div>
                                {showRemoveButton && (
                                  <div
                                    onClick={() =>
                                      removeFile(
                                        "ks2020",
                                        index,
                                        userData.ks2020_name[index]
                                      )
                                    }
                                    className="buttonn"
                                  >
                                    Remove
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <input
                            style={{ marginTop: 20 }}
                            type="file"
                            name="ks2020"
                            className="form-control file"
                            id="ks2020"
                            accept=".pdf"
                            required
                            // multiple // Allow multiple file selection
                            onChange={(e) => handleFileChange("ks2020", e)}
                          />
                        )}

                        {userData?.ks2020 && userData?.ks2020.length > 0 && (
                          <button
                            style={{
                              marginTop: "20px",
                              borderRadius: "6px",
                              border: "1px solid transparent",
                              fontWeight: "bold",
                              color: "white",
                              background: "#3c4d77",
                            }}
                            onClick={() => handleAddFileClick("ks2020")}
                          >
                            Add File
                          </button>
                        )}

                        {addingFileType === "ks2020" && (
                          <FileInputComponent
                            inputName="ks2020"
                            onRemove={handleRemoveInput}
                            handleFileChange={handleFileChange} // Pass the file change handler
                          />
                        )}

                        {uploadingFile === "ks2020" && (
                          <LinearProgressWithLabel
                            value={uploadProgress.ks2020}
                          />
                        )}
                      </div>

                      <div className="mb-3 file_div">
                        <label for="ks22020" className="form-label">
                          PDF Copy of All your 2020 K-1s, if any
                        </label>
                        {userData?.ks22020 && userData?.ks22020.length > 0 ? (
                          userData.ks22020.map((file, index) => (
                            <div key={index} className="containerr">
                              <div className="itemm">
                                <TaskAlt />
                                <span className="namee">
                                  {userData.ks22020_name[index]}
                                </span>
                              </div>
                              <div
                                className="itemm"
                                style={{ padding: "0px 20px !important" }}
                              >
                                <div
                                  onClick={() =>
                                    openFileInNewTab("ks22020", index,
                                    userData.ks22020_name[index] )
                                  }
                                  className="buttonn"
                                >
                                  View
                                </div>
                                {showRemoveButton && (
                                  <div
                                    onClick={() =>
                                      removeFile(
                                        "ks22020",
                                        index,
                                        userData.ks22020_name[index]
                                      )
                                    }
                                    className="buttonn"
                                  >
                                    Remove
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <input
                            style={{ marginTop: 20 }}
                            type="file"
                            name="ks22020"
                            className="form-control file"
                            id="ks22020"
                            accept=".pdf"
                            required
                            // multiple // Allow multiple file selection
                            onChange={(e) => handleFileChange("ks22020", e)}
                          />
                        )}

                        {userData?.ks22020 && userData?.ks22020.length > 0 && (
                          <button
                            style={{
                              marginTop: "20px",
                              borderRadius: "6px",
                              border: "1px solid transparent",
                              fontWeight: "bold",
                              color: "white",
                              background: "#3c4d77",
                            }}
                            onClick={() => handleAddFileClick("ks22020")}
                          >
                            Add File
                          </button>
                        )}

                        {addingFileType === "ks22020" && (
                          <FileInputComponent
                            inputName="ks22020"
                            onRemove={handleRemoveInput}
                            handleFileChange={handleFileChange} // Pass the file change handler
                          />
                        )}

                        {uploadingFile === "ks22020" && (
                          <LinearProgressWithLabel
                            value={uploadProgress.ks22020}
                          />
                        )}
                      </div>
                    </div>
                  )}

                <div className="data-p py-2 mb-2">
                  <p>
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      value=""
                      id="flexCheckD"
                      onChange={handleCheckboxChange}
                    />
                    By checking this box you attest that the answers and
                    information provided are true and accurate to the best of
                    your knowledge, and understand that once submitted your
                    responses cannot be changed. You agree to our{" "}
                    <a
                      href=""
                      data-bs-toggle="modal"
                      data-bs-target="#term_condition"
                    >
                      {" "}
                      terms & conditions
                    </a>
                    , and also agree to keep documentation on file that
                    substantiates claims made in this application.
                  </p>
                </div>
                <div className="d-flex justify-content-center flex-wrap">
                  <button
                    onClick={handlePrevious}
                    type="button"
                    className=" prev-step mb-2"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    id="confirmSubmitModalLaterBtn"
                    data-bs-target="#confirmSubmitModalwithout"
                    className="btn btn-primary px-5 py-2 me-2 mb-2 next-step"
                    disabled={shouldDisableButtonLater()}
                    onClick={handleSubmitLater}
                  >
                    Submit Documents Later
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary px-5 py-2 mb-2 next-step"
                    style={{ backgroundColor: "#29abe2" }}
                    data-bs-target="#confirmSubmitModalLater"
                    disabled={
                      formData.family_sick === "Yes" &&
                      formData.employed_as_W2 === "Yes"
                        ? shouldDisableButtonsAdditional()
                        : shouldDisableButtons()
                    }
                    onClick={handleSubmiDocuments}
                  >
                    Submit Now
                  </button>

                  <div
                    className="modal fade"
                    id="confirmSubmitModalLater"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content confirm-modal">
                        <div
                          className="modal-header py-2"
                          style={{ borderBottom: "none" }}
                        >
                          <h5
                            className="modal-title"
                            id="exampleModalLabel"
                          ></h5>

                          <a href="#">
                            <i
                              className="fa-solid fa-xmark fs-3"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></i>
                          </a>
                        </div>

                        <div className="modal-body d-flex justify-content-center flex-column align-items-center pt-0">
                          <img
                            src="./images/gif-submit.gif"
                            style={{ width: "120px" }}
                          />
                          <h5 className="text-center pb-4">
                            <span className="text-success">Congratultion</span>{" "}
                            Your application has been submitted!{" "}
                          </h5>
                          <h5 className="text-center">
                            Our team will get back to you in 24-72 hours. Thank
                            you.
                          </h5>

                          <a
                            href="#"
                            className="btn btn-primary px-5 go-on-btn"
                          >
                            Go on
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="modal fade"
                    id="confirmSubmitModalwithout"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content confirm-modal2">
                        <div
                          className="modal-header py-2"
                          style={{ borderBottom: "none" }}
                        >
                          <h5
                            className="modal-title"
                            id="exampleModalLabel"
                          ></h5>

                          <a href="">
                            <i
                              className="fa-solid fa-xmark fs-3"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></i>
                          </a>
                        </div>

                        <div className="modal-body d-flex justify-content-center flex-column align-items-center pt-0">
                          <img
                            src="./images/gif-submit.gif"
                            style={{ width: "120px" }}
                          />
                          <h5 className="text-center pb-4">
                            <span className="text-success">Great</span>, your
                            application has been submittd.We will send you a
                            personalupload link for your documents.
                          </h5>
                          <a
                            href="#"
                            className="btn btn-primary px-5 go-on-btn2"
                          >
                            Go on
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return "File is here";
    }
  };
  const ColorlibConnector = (props) => (
    <StepConnector
      {...props}
      style={{
        marginLeft: "12px", // Adjust the space between the labels and the connector
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "2px", // Width of the vertical line
          backgroundColor: props.active ? "green" : "gray", // Color of the line
          flex: "1", // Expand the line to fill available space
        }}
      />
    </StepConnector>
  );
  const QontoStepIconRoot = styled("div")({
    display: "flex",
    height: 22,
    alignItems: "center",
    color: "#eaeaf0",
    "&.active": {
      color: "#784af4",
    },
    "&.completed": {
      color: "#784af4",
    },
  });
  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#00b6ff",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#00b6ff",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor:
        theme.palette.mode === "dark" ? theme.palette.grey[900] : "#eaeaf0",
      borderTopWidth: 7,
      borderRadius: 1,
    },
  }));
  function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
      <>
        <QontoStepIconRoot
          className={`${className} ${active ? "active" : ""} ${
            completed ? "completed" : ""
          }`}
        >
          {completed ? (
            <Avatar
              style={{
                backgroundColor: "#00b6ff",
                width: "30px", // Adjust size as needed
                height: "30px", // Adjust size as needed
              }}
            >
              <Check
                sx={{
                  fontSize: { sm: 12, xs: 12, md: 20, lg: 20 },
                  fontWeight: "bold",
                }}
              />
            </Avatar>
          ) : (
            <Avatar
              style={{
                backgroundColor: "#00b6ff",
                width: "30px", // Adjust size as needed
                height: "30px", // Adjust size as needed
              }}
            >
              <Check style={{ color: "#00b6ff" }} />
            </Avatar>
          )}
        </QontoStepIconRoot>
      </>
    );
  }

  const CustomConnector = styled(StepConnector)(({ theme }) => ({
    // Your connector styles here
    "& .MuiStepConnector-line": {
      borderColor: "green", // Change the connector color
      borderColor: "#00b6ff",
      borderTopWidth: 7,
      borderRadius: 1,
    },
  }));

  // Customized StepIcon with Check icon
  const CustomStepIcon = styled("div")(
    ({ theme, active, completed, isIndex7 }) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "30px",
      height: "30px",
      color: "green", // Change icon color for completed and active steps
      backgroundColor: "#00b6ff",
      borderRadius: "50%",

      borderColor: "#e0e0e0", // Change border color for completed and active steps
      zIndex: 1,
      fontSize: 14,
      // "& span": {
      //   color: isIndex7 ? "#00b6ff" : "white", // Change color of step number
      // },
    })
  );

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: 15,
        backgroundImage:
          " linear-gradient(direction, color-stop1, color-stop2)",
      }}
    >
      {loading && <LoadingScreen />}
      {activeStep !== 0 &&
        activeStep !== 1 &&
        userData?.applicationWithDocument !== true &&
        userData?.applicationStatus !== true && (
          <>
            {activeStep <= 8 && (
              <Stepper
                className="first-stepper container"
                activeStep={activeStep}
                alternativeLabel
                connector={<QontoConnector />}
              >
                {activeStep <= 8 &&
                  steps1.map((label) => (
                    <Step key={label}>
                      {/* <StepLabel
              sx={{
                '& .MuiStepLabel-label': {
                  color: activeStep === index ? 'green' : 'gray', // Change label color based on active step
                },
              }}
            >
              {label}
            </StepLabel> */}
                      <StepLabel
                        sx={{
                          "& .MuiStepLabel-label.Mui-completed": {
                            color: "#00b6ff", // Change label color based on active step
                            fontWeight: "300",
                            fontSize: 16,
                          },
                          "& .MuiStepLabel-label.Mui-active": {
                            color: "#00b6ff", // Change label color based on active step
                            fontWeight: "300",
                            fontSize: 16,
                          },
                          "& .MuiStepLabel-label": {
                            color: "gray", // Change label color based on active step
                            fontWeight: "300",
                            fontSize: 16,
                          },
                        }}
                        StepIconComponent={QontoStepIcon}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
              </Stepper>
            )}
          </>
        )}
      {activeStep > 8 &&
        activeStep !== 18 &&
        userData?.applicationWithDocument !== true &&
        userData?.applicationStatus !== true && (
          <Stepper
            className="container secondStepper"
            style={{ width: "40px !important" }}
            activeStep={activeStep - 9}
            alternativeLabel
            connector={<QontoConnector />}
          >
            {steps2.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label.Mui-completed": {
                      color: index === 8 ? "red" : "#00b6ff", // Change label color based on active step
                      fontWeight: "300",
                      fontSize: 16,
                    },
                    "& .MuiStepLabel-label.Mui-active": {
                      color: index === 8 ? "red" : "#00b6ff", // Change label color based on active step
                      fontWeight: "300",
                      fontSize: 16,
                    },
                    "& .MuiStepLabel-label": {
                      color: index === 8 ? "red" : "gray", // Change label color based on active step
                      fontWeight: "300",
                      fontSize: 16,
                    },
                  }}
                  StepIconComponent={QontoStepIcon}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
      {activeStep === 18 &&
        userData?.applicationWithDocument !== true &&
        userData?.applicationStatus !== true && (
          <Stepper
            className="nineteenStepper container"
            activeStep={1}
            alternativeLabel
            connector={<CustomConnector />}
          >
            {steps18.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-alternativeLabel": {
                      color:
                        index === 2
                          ? "gray !important"
                          : index === 1
                          ? "red !important"
                          : "#00b6ff !important",
                      fontWeight: "500",
                      fontSize: 17,
                    },
                  }}
                  StepIconComponent={(props) => (
                    <CustomStepIcon
                      {...props}
                      completed={index < 1}
                      active={index === 1}
                      // isIndex7={index === 7} // Change based on the current active step
                    >
                      {index === 2 ? (
                        <Check style={{ color: "#00b6ff" }} />
                      ) : (
                        <Check style={{ color: "white" }} />
                      )}
                    </CustomStepIcon>
                  )}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

      {userData?.applicationStatus !== true &&
        userData?.applicationWithDocument !== true && <>{getStepContent()}</>}

      {userData?.applicationStatus === true && (
        <>
          <div className="myClas2" style={{ marginBottom: 100 }}>
            <div className="modal-body d-flex justify-content-center flex-column align-items-center pt-0">
              <img src={gifTick} style={{ width: "120px" }} />
              <h5 className="text-center pb-4">
                <span className="text-success">Great</span>, your application
                has been submitted. We will send you a personal upload link for
                your documents.
              </h5>

              <button
                type="button"
                onClick={handleGo}
                
                className="btn btn-primary"
               
              >
                Check your application Status
              </button>
            </div>
          </div>
        </>
      )}

      {userData?.applicationWithDocument === true && (
        <>
          <div className="myClas2" style={{ marginBottom: 100 }}>
            <div className="modal-body d-flex justify-content-center flex-column align-items-center pt-0">
              <img src={gifTick} style={{ width: "120px" }} />
              <h5 className="text-center">
                <span className="text-success">Congratulations!</span> Your
                application has been submitted!{" "}
              </h5>
              <h5 className="text-center">
                {" "}
                Our team will get back to you in 24-72 hours. Thank you.
              </h5>

              <button
                style={{ marginTop: 33 }}
                onClick={handleGo}
                type="button"
               
                className="btn btn-primary"
              
              >
                Check you application status
              </button>
            </div>
          </div>
        </>
      )}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }} />
      </Box>
    </Box>
  );
};

export default MultiStepForm;
