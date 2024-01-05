import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import ApplicationForm from "./Pages/ApplicationForm/ApplicationForm";
import ApplicationStatus from "./Pages/ApplicationStatus/ApplicationStatus";
import Support from "./Pages/Support/Support";
import Login from "./Pages/Login/Login";
import { useSelector } from "react-redux";
import VerifyOtp from "./Pages/VerifyOtp/VerifyOtp";
import { useEffect, useState } from "react";

const App = () => {
  // const { token } = useSelector((state) => state.user);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      // If token exists in local storage, set it in component state
      setToken(storedToken);
    } else {
      // If token doesn't exist, remove it from component state
      setToken(null);
    }
  }, []); // Run this effect only on the initial mount

  return (
    <Router>
      <Switch>
        {/* Route to ApplicationForm component if token exists */}
        <Route
          exact
          path="/"
          render={() => (token ? <Redirect to="/status" /> : <LandingPage />)}
        />
        {/* Private route - Render ApplicationForm if token exists */}
        <Route
          path="/status"
          render={() => (token ? <ApplicationStatus /> : <Redirect to="/" />)}
        />
        {/* Public routes */}
        <Route path="/login" component={Login} />
        <Route path="/verifyOtp" component={VerifyOtp} />
        <Route path="/application-form" component={ApplicationForm} />
        <Route path="/status" component={ApplicationStatus} />
        <Route path="/support" component={Support} />
        {/* Redirect to LandingPage for any other undefined route */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
