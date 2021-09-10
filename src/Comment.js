import React, { forwardRef, useState } from "react";
import "./Comment.css";
import ReplyComment from "./ReplyComment";
import { Avatar } from "@material-ui/core";
const Comment = forwardRef(
  ({ postId, commentId, data, replyCommentId, replyCommentData }, ref) => {
    const [replyComment, setReplyComment] = useState(false);
    console.log("replyCommentData:", replyCommentData);
    return (
      <div ref={ref} className="comment__box">
        <Avatar
          src={data.photoUrl && replyCommentData.photoUrl}
          style={{ width: "50px", height: "50px" }}
        >
          <p>{data.name && replyCommentData.name}</p>
        </Avatar>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginLeft: "10px",
          }}
        >
          <div className="comment__info">
            <span>{data.name && replyCommentData.name}</span>
            <p>{data.email && replyCommentData.email}</p>
          </div>
          <div className="comment__comment">
            <p>{data.comment && replyCommentData.replyComment}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="comment__icon">
              <p style={{ marginRight: "5px" }}>Like</p>
              <span style={{ borderLeft: "1px solid gray" }}></span>
              <p
                style={{ marginLeft: "5px" }}
                onClick={() => setReplyComment(true)}
              >
                Reply
              </p>
            </div>
            {replyComment ? (
              <ReplyComment postId={postId} commentId={commentId} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default Comment;
