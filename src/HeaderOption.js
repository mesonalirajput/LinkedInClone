import React from "react";
import "./HeaderOption.css";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";

function HeaderOption({ avatar, title, Icon, onClick }) {
  const { user } = useSelector((state) => ({ user: state?.user }));
  const usr = user?.user;
  return (
    <div onClick={onClick} className="headerOption">
      {Icon && <Icon className="headerOption__icon" />}
      {avatar && (
        <Avatar src={usr?.photoUrl} className="headerOption__avatar">
          {usr?.email[0].toUpperCase()}
        </Avatar>
      )}
      <h3 className="headerOption__title">{title}</h3>
    </div>
  );
}

export default HeaderOption;
