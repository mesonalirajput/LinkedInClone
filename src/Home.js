import React from "react";
import "./Home.css";
import SideBar from "./SideBar";
import Feed from "./Feed";
import Widget from "./Widget";
function Home() {
  return (
    <div className="home">
      <SideBar />
      <Feed />
      <Widget />
    </div>
  );
}

export default Home;
