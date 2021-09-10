import React from "react";
import "./Header.css";
import HeaderOption from "./HeaderOption";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { logout } from "./features/userSlice";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
function Header() {
  const dispatch = useDispatch();

  const logoutOfApp = () => {
    console.log("logging out");
    dispatch(logout());
    auth.signOut();
  };
  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
          alt=""
        />
        <div className="header__search">
          <SearchIcon className="header__search__icon" />
          <input placeholder="Search" type={Text} />
        </div>
      </div>
      <div className="header__right">
        <Link to="/">
          <HeaderOption title="Home" Icon={HomeIcon} />
        </Link>
        <Link to="/network">
          <HeaderOption title="My Network" Icon={SupervisorAccountIcon} />
        </Link>
        <HeaderOption title="Jobs" Icon={BusinessCenterIcon} />
        <HeaderOption title="Messaging" Icon={ChatIcon} />
        <HeaderOption title="Notifications" Icon={NotificationsIcon} />
        <HeaderOption title="me" avatar={true} onClick={logoutOfApp} />
      </div>
    </div>
  );
}

export default Header;
