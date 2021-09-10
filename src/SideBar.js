import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./SideBar.css";
function SideBar() {
  const { user } = useSelector((state) => ({ user: state?.user }));
  const usr = user?.user;
  const recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <span className="sidebar__hash">#</span>
      <p>{topic}</p>
    </div>
  );
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://media-exp1.licdn.com/dms/image/C561BAQHgoGaDP5Q-CA/company-background_10000/0?e=2159024400&v=beta&t=J30poo3eRMsEYqGjI1iyA38blHEfOYn_iKYnzf4tduI"
          alt=""
        />
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <Avatar src={usr?.photoUrl} className="sidebar__avatar">
            {usr?.email[0].toUpperCase()}
          </Avatar>
        </Link>

        <Link to="/profile" className="sidebar__profileLink">
          <h2>{usr?.displayName}</h2>
        </Link>

        <h4>{usr?.email}</h4>
      </div>
      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who viewed your profile</p>
          <p className="sidebar__statNumber">2,349</p>
        </div>
        <div className="sidebar__stat">
          <p>Views on your post</p>
          <p className="sidebar__statNumber">2,435</p>
        </div>
      </div>
      <div className="sidebar__bottom">
        <p>Recent</p>
        {recentItem("reactjs")}
        {recentItem("reactNative")}
        {recentItem("SoftwareEngineering")}
        {recentItem("developer")}
        {recentItem("creator")}
      </div>
    </div>
  );
}

export default SideBar;
