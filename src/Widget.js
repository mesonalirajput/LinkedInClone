import React from "react";
import "./Widget.css";
import InfoIcon from "@material-ui/icons/Info";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
function Widget() {
  const newsArticle = (heading, subtitle) => {
    return (
      <div className="widgets__article">
        <div className="widgets__articleLeft">
          <FiberManualRecordIcon />
        </div>
        <div className="widgets__articleRight">
          <h2>{heading}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
    );
  };
  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>
      {newsArticle("PAPA React is back", "Top news - 9999 views")}
      {newsArticle("NICK is BATman!!", "Breaking news - 199878 views")}
      {newsArticle("SONALI is immortal", "Top news - 986 views")}
      {newsArticle("Muskan met Sonali", "yayy - 56778 views")}
      {newsArticle("YUUUHHHHUUUU", "Huhahahaha - 4567 views")}
    </div>
  );
}

export default Widget;
