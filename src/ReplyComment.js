import React, { useState, useEffect } from "react";
import MoodOutlinedIcon from "@material-ui/icons/MoodOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import "./Post.css";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import Comment from "./Comment";
import { db } from "./firebase";
import { useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
const ReplyComment = ({ postId, commentId }) => {
  const { user } = useSelector((state) => ({ user: state?.user }));
  const usr = user?.user;
  const [replyComments, setReplyComments] = useState([]);
  const increment = firebase.firestore.FieldValue.increment(1);
  const [replyCommentInput, setReplyCommentInput] = useState("");
  const [rcCount, setrcCount] = useState(0);
  const commentRef = db
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .doc(commentId);
  useEffect(() => {
    fetchReplyComments();
  }, []);

  const fetchReplyComments = () => {
    commentRef
      .collection("replyComments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setReplyComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  };
  console.log("replyComments:", replyComments);
  const sendReplyComment = (e) => {
    e.preventDefault();
    commentRef
      .collection("replyComments")
      .add({
        name: firebase.auth()?.currentUser?.displayName,
        email: firebase.auth()?.currentUser?.email,
        photoUrl: firebase.auth().currentUser?.photoURL,
        replyComment: replyCommentInput,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        commentRef
          .update({
            rcCount: increment,
          })
          .then(() => {
            setrcCount(rcCount + 1);
          })
          .catch((err) => console.log("Comment.js > rcCount err :", err));
      });
    setReplyCommentInput("");
  };
  return (
    <>
      <div className="post__commentSection">
        <Avatar style={{ width: "40px", height: "40px" }} src={usr?.photoUrl}>
          {usr?.email[0].toUpperCase()}
        </Avatar>
        <form>
          <div style={{ width: "112%" }} className="post__commentInput">
            <input
              type="text"
              value={replyCommentInput}
              placeholder="Add a comment..."
              onChange={(e) => setReplyCommentInput(e.target.value)}
            />
            <button type="submit" onClick={sendReplyComment}>
              Send
            </button>

            <MoodOutlinedIcon className="post__comment__icon" />
            <ImageOutlinedIcon className="post__comment__icon" />
          </div>
        </form>
        <div className="post__comment"></div>
      </div>
      {
        <FlipMove>
          {replyComments.map(({ id, data }) => (
            <Comment replyCommentId={id} replyCommentData={data} />
          ))}
        </FlipMove>
      }
    </>
  );
};

export default ReplyComment;
