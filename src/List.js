import React from "react";
import { Avatar } from "@material-ui/core";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import "./List.css";
function List({ image, email, name, id, data }) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "10px",
        paddingTop: "10px",
        paddingBottom: "0px",
      }}
    >
      <div className="list__left">
        <Avatar src={data.photoUrl} className="list__avatar">
          {data.email[0].toUpperCase()}
        </Avatar>
        <ThumbUpIcon className="list__likeIcon" />
      </div>
      <div className="list__right">
        <h2>{data.name}</h2>
        <p>{data.email}</p>
      </div>
    </div>
  );
}

export default List;
