import React from "react";
import "../GlobalStyles/globalStyles.css";
import logoSite from "../GlobalImages/logo-set.png";
import menuImage from "../GlobalImages/menu.png";
import profilePic from "../GlobalImages/desin.png";
import Menuu from "@mui/icons-material/Menu";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import "./Navbar.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../Redux/Slices/userSlice";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { AccountCircleRounded } from "@mui/icons-material";

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const localToken = localStorage.getItem("token");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [isHovered, setIsHovered] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  console.log(firstName, lastName, "format");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if (event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };
  // Function to handle hover events
  const handleHover = () => {
    setIsHovered(!isHovered);
  };
  const handleClose = (event) => {
    event.preventDefault();
    setAnchorEl(null);
    dispatch(removeToken());

    localStorage.removeItem("activeTab");

    history.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    history.push("/login");
  };

  const handleNewApp = () => {
    history.push("/application-form");
  };
  const handleLogout = () => {
    dispatch(removeToken());
    history.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    if (token || localToken) {
      const storedFirstName = localStorage.getItem("fName");
      const storedLastName = localStorage.getItem("lName");

      console.log(
        storedFirstName,
        storedLastName,
        "storedFirstName&storedLastName"
      );

      setFirstName(storedFirstName);
      setLastName(storedLastName);
    }
  }, [token, localToken]);

  return (
    <>
      {token || localToken ? (
        <section class="navbar">
          <nav className="navbar navbar-expand-lg bg-light fixed-top py-2">
            <div className="container">
              <NavLink className="navbar-brand" to="/">
                <img className="logo-set" src={logoSite} alt="" />
              </NavLink>

              <button
                style={{ marginRight: "16px" }}
                class="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasMenu"
                aria-controls="offcanvasMenu"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <img
                  src={menuImage}
                  style={{ width: "20px", height: "20px" }}
                />
              </button>

              <div
                class="offcanvas offcanvas-end"
                tabindex="-1"
                id="offcanvasMenu"
                aria-labelledby="offcanvasMenuLabel"
              >
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasMenuLabel">
                    <a class="navbar-brand" href="index.php">
                      <img class="logo-set" src={logoSite} alt="" />
                    </a>
                  </h5>

                  <button
                    type="button"
                    class="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>

                <div class="offcanvas-body justify-content-end">
                  <ul className="navbar-nav">
                    <li className="about nav-item me-1">
                      <NavLink
                        className="nav-link cool-link"
                        to="/application-form"
                        activeClassName="active"
                        style={{ marginTop: 4 }}
                      >
                        Application
                      </NavLink>
                    </li>

                    <li
                      className="about nav-item me-1"
                      onClick={() => window.location.reload()}
                    >
                      <NavLink
                        className="nav-link cool-link"
                        to="/status"
                        activeClassName="active"
                      >
                        Status
                      </NavLink>
                    </li>

                    <li className="about nav-item me-1">
                      <NavLink
                        className="nav-link cool-link"
                        to="/support"
                        activeClassName="active"
                      >
                        Support
                      </NavLink>
                    </li>

                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      onMouseEnter={handleHover}
                      onMouseLeave={handleHover}
                    >
                      {/* Dashboard */}
                      <span
                        style={{
                          color: isHovered ? "#192c57" : "#192c57",
                          fontWeight: 400,
                          textTransform: "capitalize",
                          textDecoration: "none",
                          fontWeight: "400",
                          fontSize: "18px",
                        }}
                      >
                        {firstName} {lastName}
                      </span>
                      <AccountCircleRounded
                        style={{
                          color: isHovered ? "#1a2c57" : "#908c8c",
                          fontSize: 30,
                          marginLeft: 3,
                        }}
                      />
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleCloseMenu}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </section>
      ) : (
        <section class="navbar">
          <nav class="navbar navbar-expand-lg bg-light fixed-top py-2">
            <div class="container">
              <a class="navbar-brand" href="index.php">
                <img class="logo-set" src={logoSite} alt="" />
              </a>

              <button
                style={{ marginRight: "16px" }}
                class="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasMenu"
                aria-controls="offcanvasMenu"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <img
                  src={menuImage}
                  style={{ width: "20px", height: "20px" }}
                />
              </button>

              <div
                class="offcanvas offcanvas-end"
                tabindex="-1"
                id="offcanvasMenu"
                aria-labelledby="offcanvasMenuLabel"
              >
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasMenuLabel">
                    <a class="navbar-brand" href="index.php">
                      <img class="logo-set" src={logoSite} alt="" />
                    </a>
                  </h5>

                  <button
                    type="button"
                    class="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>

                <div class="offcanvas-body justify-content-end">
                  <ul class="navbar-nav">
                    <li
                      class="about nav-item active me-1"
                      onClick={handleLogin}
                    >
                      <NavLink
                        className="nav-link cool-link"
                        to="/login"
                        activeClassName="active"
                        style={{ marginTop: 4 }}
                      >
                        Login
                      </NavLink>
                    </li>

                    <li
                      class="about nav-item active me-1"
                      onClick={handleNewApp}
                    >
                      <NavLink
                        className="nav-link cool-link"
                        to="/application-form"
                        activeClassName="active"
                        style={{ marginTop: 4 }}
                      >
                        Start a new application
                      </NavLink>
                    </li>

                    <li class="about nav-item active"></li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </section>
      )}
    </>
  );
};

export default Navbar;
