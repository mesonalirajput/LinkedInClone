import React from "react";
import "./Profile.css";
import ProfileSidebar from "./ProfileSidebar";
import Widget from "./Widget";
function Profile() {
  return (
    <div className="profile">
      <ProfileSidebar />
      <Widget />
    </div>
  );
}

export default Profile;
