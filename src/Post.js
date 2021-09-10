import React, { forwardRef, useEffect, useState } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import firebase from "firebase";
import { db } from "./firebase";
import InputOptions from "./InputOptions";
import FlipMove from "react-flip-move";
import { useSelector } from "react-redux";
import ThumbUpTwoToneIcon from "@material-ui/icons/ThumbUpTwoTone";
import ForumTwoToneIcon from "@material-ui/icons/ForumTwoTone";
import NearMeTwoToneIcon from "@material-ui/icons/NearMeTwoTone";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import MoodOutlinedIcon from "@material-ui/icons/MoodOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import Comment from "./Comment";
import LikesModal from "./LikesModal";
const Post = forwardRef(
  (
    {
      postId,
      name,
      email,
      photoUrl,
      description,
      postImageUrl,
      userId,
      userdata,
      ...post
    },
    ref
  ) => {
    const [commentInputSection, setCommentInputSection] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const increment = firebase.firestore.FieldValue.increment(1);
    const postRef = db.collection("posts").doc(postId);
    const [cCount, setcCount] = useState(post?.cCount);
    const [lCount, setlCount] = useState(post?.lCount);
    const [liked, setLiked] = useState(post?.liked);
    const [openLikesModal, setOpenLikesModal] = useState(false);
    const { user } = useSelector((state) => ({ user: state?.user }));
    const usr = user?.user;
    const usrr = firebase.auth().currentUser;
    console.log("showComments:", showComments);
    console.log("comments", comments);
    useEffect(() => {
      fetchComments();
      fetchLikes();
    }, []);

    const fetchComments = () => {
      console.log("posstId: ", postId);
      postRef
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot(
          (snapshot) => {
            setComments(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
            console.log("comments received: ", snapshot.docs, snapshot.size);
          },
          (err) => console.log("fetchComments err: ", err)
        );
    };
    const fetchLikes = () => {
      postRef
        .collection("likes")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setLikes(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    };

    const sendComment = (e) => {
      e.preventDefault();
      postRef
        .collection("comments")
        .add({
          name: firebase.auth()?.currentUser?.displayName,
          email: firebase.auth()?.currentUser?.email,
          photoUrl: firebase.auth()?.currentUser?.photoURL,
          comment: commentInput,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          postRef
            .update({
              cCount: increment,
            })
            .then(() => {
              setcCount(cCount + 1);
              // fetchComments();
            })
            .catch((err) =>
              console.log("Post.js > cCount increment err: ", err)
            );
        });
      setCommentInput("");
      setShowComments(true);
    };
    const sendLikes = (num) => {
      postRef
        .collection("likes")
        .add({
          name: firebase.auth()?.currentUser?.displayName,
          email: firebase.auth()?.currentUser?.email,
          photoUrl: firebase.auth()?.currentUser?.photoURL,
          uid: firebase.auth()?.currentUser?.uid,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          postRef
            .update({
              lCount: firebase.firestore.FieldValue.increment(num),
            })
            .catch((err) => console.log("like lcount update err: ", err));
        })
        .catch((err) => console.log("update err: ", err))
        .then(() => {
          setlCount(lCount + num);
        })
        .catch((err) => console.log(err));
    };
    const sendUnLikes = () => {
      postRef
        .collection("likes")
        .where("uid", "==", firebase.auth().currentUser.uid)
        .get()
        .then((docs) => {
          if (docs.size) {
            docs.forEach((doc) =>
              doc.ref
                .delete()
                .then(() => console.log("like deleted!"))
                .catch((err) => console.log("Post.js > delete err: ", err))
            );
          }
        })
        .catch((err) => console.log(err));
    };
    const likePost = () => {
      setLiked(true);
      sendLikes(1);
    };
    const unLikePost = () => {
      setLiked(false);
      sendUnLikes();
    };
    return (
      <div ref={ref} className="post">
        <div className="post__header">
          <Avatar className="post__avatar" src={photoUrl}>
            {name[0].toUpperCase()}
          </Avatar>
          <div className="post__info">
            <h2>{name}</h2>
            <p>{email}</p>
          </div>
        </div>
        <div className="post__body">
          <div className="post__description">
            <p>{description}</p>
          </div>
          <div className="post__imageBody">
            {postImageUrl ? (
              <img
                style={{ width: "100%", height: "100%" }}
                src={postImageUrl}
              ></img>
            ) : (
              <></>
            )}
          </div>
          <div className="post__icon">
            <ThumbUpTwoToneIcon
              style={{
                color: "gray",
                marginLeft: "5px",
                fontSize: "17px",
              }}
            />
            <ForumTwoToneIcon
              style={{ color: "gray", marginLeft: "5px", fontSize: "17px" }}
            />
            <NearMeTwoToneIcon
              style={{ color: "gray", marginLeft: "5px", fontSize: "17px" }}
            />
            <p
              onClick={() => setOpenLikesModal(true)}
            >{`${likes.length} likes`}</p>

            <LikesModal
              likes={likes}
              open={openLikesModal}
              onClose={() => setOpenLikesModal(false)}
            />
            <p onClick={() => setShowComments(!showComments)}>
              {cCount && `${cCount} comments`}
            </p>
          </div>
        </div>
        <div className="post__buttons">
          {liked ? (
            <InputOptions
              Icon={ThumbUpAltOutlinedIcon}
              title="Like"
              color="#0c73cf"
              onClick={unLikePost}
            />
          ) : (
            <InputOptions
              Icon={ThumbUpAltOutlinedIcon}
              title="Like"
              color="rgba(0, 0, 0, 0.6)"
              onClick={likePost}
            />
          )}

          <InputOptions
            Icon={CommentOutlinedIcon}
            title="Comment"
            color="rgba(0, 0, 0, 0.6)"
            onClick={() => setCommentInputSection(true)}
          />
          <InputOptions
            Icon={ShareOutlinedIcon}
            title="Share"
            color="rgba(0, 0, 0, 0.6)"
          />
          <InputOptions
            Icon={SendOutlinedIcon}
            title="Send"
            color="rgba(0, 0, 0, 0.6)"
          />
        </div>

        {commentInputSection ? (
          <>
            <div className="post__commentSection">
              <Avatar style={{ width: "41px", height: "41px" }} src={photoUrl}>
                {usr?.email[0].toUpperCase()}
              </Avatar>
              <form>
                <div className="post__commentInput">
                  <input
                    type="text"
                    value={commentInput}
                    placeholder="Add a comment..."
                    onChange={(e) => setCommentInput(e.target.value)}
                  />
                  <button type="submit" onClick={sendComment}>
                    Send
                  </button>

                  <MoodOutlinedIcon className="post__comment__icon" />
                  <ImageOutlinedIcon className="post__comment__icon" />
                </div>
              </form>
              <div className="post__comment"></div>
            </div>
            {showComments ? (
              <FlipMove>
                {comments.map(({ id, data }) => (
                  <Comment commentId={id} data={data} postId={postId} />
                ))}
              </FlipMove>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
);
export default Post;
