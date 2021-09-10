import React, { useState, useEffect } from "react";
import "./Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import InputOptions from "./InputOptions";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import { useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DescriptionIcon from "@material-ui/icons/Description";

import { Link } from "react-router-dom";
import { Avatar, Button, Modal } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import Post from "./Post.js";
import { db } from "./firebase";
import { storage } from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import Modal2 from "./Modal";
import { auth } from "./firebase";
function Feed() {
  const { user } = useSelector((state) => ({ user: state?.user }));
  const usr = user?.user;
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [inputImage, setInputImage] = useState();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [closeIcon, setCloseIcon] = React.useState(false);
  const [uploadOption, setUploadOption] = React.useState(false);
  const [posts, setPosts] = useState([]);

  const [postInputImage, setPostInputImage] = useState("");
  const [userData, setUserData] = useState("");
  const userRef = db.collection("users").doc(userData.userId);
  const [postInputImageUrl, setPostInputImageUrl] = useState("");
  useEffect(() => {
    fetchuserData();
    fetchPosts();
  }, []);

  const fetchuserData = () => {
    let uid = firebase.auth().currentUser?.uid;
    db.collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("doc not found!");
          return;
        }
        console.log(doc.data());
        setUserData({
          userId: doc.id,
          userdata: doc.data(),
        });
      })
      .catch((err) => console.log("Feed.js > fetchUserData: err > ", err));
  };

  const fetchPosts = () => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot(async (snapshot) => {
        // setPosts(
        //   snapshot.docs.map((doc) => ({
        //     id: doc.id,
        //     data: doc.data(),
        //   }))
        // )
        let tempPosts = [];
        for (let doc of snapshot.docs) {
          let liked = await db
            .collection("posts")
            .doc(doc.id)
            .collection("likes")
            .where("uid", "==", firebase.auth().currentUser.uid)
            .get()
            .catch((err) => console.log("Feed.js, get if liekd err: ", err));

          tempPosts.push({
            id: doc.id,
            data: { ...doc.data(), liked: liked.size },
          });
        }
        setPosts(tempPosts);
      });
  };
  const sendPost = (e) => {
    e.preventDefault();
    db.collection("posts").add({
      name: usr?.displayName,
      email: usr?.email,
      // message: input,
      description: message,
      postImageUrl: postInputImageUrl,
      photoUrl: usr.photoUrl || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  const upload = () => {
    if (postInputImage == null) {
      alert("No image selected!");
      return;
    }
    console.log(postInputImage);

    let fileRef = storage.ref(`/images/${postInputImage.name}`);

    fileRef
      .put(postInputImage)
      .then(() => {
        fileRef
          .getDownloadURL()
          .then((url) => {
            setPostInputImageUrl(url);
            console.log("fileURL: ", url);
          })
          .catch((err) => console.log("getDownload url err: ", err));
      })
      .catch((err) => console.log("file put err: ", err))
      .then(() => {
        alert("Image uploaded!!", alert);
      });
  };
  // const handleImgChange = (e) => {
  //   setInputImage(URL.createObjectURL(e.target.files[0]));
  // };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onDone = (inputImage) => {
    setPostInputImage(inputImage);
    setOpen2(false);
    setCloseIcon(true);
    setUploadOption(true);
  };
  const onClickCloseIcon = () => {
    setPostInputImage("");
    setCloseIcon(false);
  };
  // console.log(inputImage);
  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input" onClick={handleOpen}>
          <CreateIcon />
          <p>Create a post</p>
        </div>
        <div className="feed__inputOptions">
          <div>
            <InputOptions
              Icon={ImageIcon}
              title="Photo"
              color="#7005F9"
              onClick={handleOpen}
            />
            <Modal
              className="modal"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className="modal__body">
                  <div className="modal__top">
                    <p>Create a Post</p>
                    <CloseIcon
                      onClick={handleClose}
                      className="modal__top__icon"
                    />
                  </div>
                  <div className="modal__middle">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        marginBottom: "15px",
                      }}
                    >
                      <Avatar src={usr?.photoUrl} className="modal__avatar">
                        {usr?.email[0].toUpperCase()}
                      </Avatar>
                      <h4 style={{ fontSize: "20px", marginLeft: "10px" }}>
                        {usr?.displayName}
                      </h4>
                    </div>
                    <textarea
                      placeholder="What do you want to share about?"
                      className="modal__textarea"
                      type="textarea"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>

                    {/* <div className="modal__postImage"> */}
                    {closeIcon ? (
                      <CloseIcon
                        className="modal__closeIcon"
                        onClick={onClickCloseIcon}
                      />
                    ) : (
                      <></>
                    )}

                    {postInputImage && (
                      <img
                        className="modal__image"
                        src={URL.createObjectURL(postInputImage)}
                      ></img>
                    )}
                    {/* </div> */}
                  </div>
                  <div className="modal__bottom">
                    <h4>Add hashtag</h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="modal__icons">
                        <a onClick={() => setOpen2(true)}>
                          <ImageIcon className="modal__icon" />
                        </a>
                        <a onClick={() => setOpen3(true)}>
                          <SubscriptionsIcon className="modal__icon" />
                        </a>

                        <DescriptionIcon className="modal__icon" />
                        <EventNoteIcon className="modal__icon" />
                        <MoreHorizIcon className="modal__icon" />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        {uploadOption ? (
                          <button className="modal__button" onClick={upload}>
                            Upload
                          </button>
                        ) : (
                          <></>
                        )}

                        <button
                          className="modal__button"
                          onClick={sendPost}
                          type="submit"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            </Modal>

            <Modal2
              title="Edit your video"
              subTitle="Select a video to share"
              open={open3}
              onClose={() => setOpen3(false)}
            />
            <Modal2
              title="Edit your photo"
              subTitle="Select a image to share"
              open={open2}
              onClose={() => setOpen2(false)}
              onDone={onDone}
            />
          </div>

          <InputOptions
            Icon={SubscriptionsIcon}
            title="Video"
            color="#E7A33E"
          />
          <InputOptions Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOptions
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7FC15E"
          />
        </div>
      </div>
      {/* POsts */}
      <FlipMove>
        {posts.map(({ id, data }) => (
          <Post
            postId={id}
            {...data}
            userId={userData.userId}
            userdata={userData.userdata}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
