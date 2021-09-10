import { Avatar, Modal } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./ProfileSidebar.css";
import { db } from "./firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import AddIcon from "@material-ui/icons/Add";
import EditProfileModal from "./EditProfileModal";
import ProfileAboutModal from "./ProfileAboutModal";
import SkillModal from "./SkillModal";
function ProfileSidebar() {
  const { user } = useSelector((state) => ({ user: state?.user }));
  const usr = user?.user;
  const [userData, setUserData] = useState("");
  const userRef = db.collection("users").doc(userData.userId);
  const [openProfileEdit, setOpentProfileEdit] = useState(false);
  const [openProfileAbout, setOpenProfileAbout] = useState(false);
  const [openSkillsModal, setOpenSkillsModal] = useState(false);

  useEffect(() => {
    fetchuserData();
  }, []);
  console.log("userData: ", userData);
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
        setUserData(doc.data());
      })
      .catch((err) => console.log("Feed.js > fetchUserData: err > ", err));
  };

  console.log(userData);
  console.log("Profile > userId: ", userData.uid);
  return (
    <div className="profile__body">
      <div className="profileSidebar">
        <div className="profileSidebar__top">
          <img
            src="https://media-exp1.licdn.com/dms/image/C561BAQHgoGaDP5Q-CA/company-background_10000/0?e=2159024400&v=beta&t=J30poo3eRMsEYqGjI1iyA38blHEfOYn_iKYnzf4tduI"
            alt=""
          />
          <div className="profileSidebar__top__">
            <Avatar src={usr?.photoUrl} className="profileSidebar__avatar">
              {usr?.email[0].toUpperCase()}
            </Avatar>
            <CreateOutlinedIcon
              className="profileSidebar__top_icon"
              onClick={() => setOpentProfileEdit(true)}
            />
            <EditProfileModal
              open={openProfileEdit}
              onClose={() => setOpentProfileEdit(false)}
              userData={userData}
            />
          </div>
        </div>

        <div className="profileSidebar__bottom">
          <h2>{`${userData.firstName} ${userData.lastName}`}</h2>
          <h4>Student at {userData.education}</h4>
          <div className="profileSidebar__btm">
            <h4>{`${userData.state} ${userData.country}`}</h4>
            <p
              style={{
                color: "rgb(10, 102, 194)",
                marginLeft: "15px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Contact info
            </p>
          </div>
          <p
            style={{
              color: "rgb(10, 102, 194)",
              fontSize: "14px",
              marginTop: "10px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            56 Connections
          </p>
          <div className="profileSidebar__buttons">
            <button className="profileSidebar__buttons__opento" type="submit">
              Open to
            </button>
            <button type="submit">Add section</button>
            <button type="submit">More</button>
          </div>
          <div className="profileSidebar__openToOptions">
            <div className="profileSidebar__openToOption">
              <div style={{ display: "flex" }}>
                <p style={{ fontSize: "14px" }}>
                  <b>Show recruiters you’re open to work</b>— you control who
                  sees this.
                </p>
                <CloseIcon className="profileSidebar__openToOption__closeIcon" />
              </div>
              <p
                style={{
                  color: "rgb(10, 102, 194)",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Get started
              </p>
            </div>
            <div className="profileSidebar__openToOption">
              <div style={{ display: "flex" }}>
                <p style={{ fontSize: "14px" }}>
                  <b>Share that you’re hiring</b> and attract qualified
                  candidates.
                </p>
                <CloseIcon className="profileSidebar__openToOption__closeIcon" />
              </div>
              <p
                style={{
                  color: "rgb(10, 102, 194)",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Get started
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="profileSidebar__about">
        <div className="profileSidebar__about__top">
          <h4>About</h4>
          <CreateOutlinedIcon
            className="profileSidebar__about__top__icon"
            onClick={() => setOpenProfileAbout(true)}
          />
        </div>

        <div className="profileSidebar__about__bottom">
          <p>{userData.about}</p>
        </div>
      </div>
      <ProfileAboutModal
        open={openProfileAbout}
        onClose={() => setOpenProfileAbout(false)}
        userData={userData}
      />
      <div className="profileSidebar__education">
        <div className="profileSidebar__education__top">
          <h4>Education</h4>
          <AddIcon className="profileSidebar__education__top__icon" />
        </div>
        <div className="profileSidebar__education__bottom">
          <div className="profileSidebar__education__bottom__left">
            <img
              style={{ width: "10%", height: "83%" }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW9D8M8MHgloxFDrzMxygNUGkZvrxBM-b87w&usqp=CAU"
              className="profileSidebar__education__bottom__avatar"
            />
            <div className="profileSidebar__education__bottom__left__content">
              <h2>CGC College of Engineering, Landran</h2>
              <p style={{ fontSize: "15px" }}>Btech,cse</p>
              <p style={{ fontSize: "15px", color: "gray" }}>2019 – 2023</p>
            </div>
          </div>
          <div className="profileSidebar__education__bottom__right">
            <CreateOutlinedIcon className="profileSidebar__about__top__icon" />
          </div>
        </div>
      </div>
      <div className="profileSidebar__skills">
        <div className="profileSidebar__skills__top">
          <h4>Skills and endorsements</h4>
          <div className="profileSidebar__skills__top__right">
            <h2 onClick={() => setOpenSkillsModal(true)}>Add new skill</h2>
            <CreateOutlinedIcon className="profileSidebar__about__top__icon" />
          </div>
        </div>
        <div className="profileSidebar__topSkills">
          <div className="profileSidebar__topSkills__heading">
            <h4>Top skills</h4>
          </div>
          <div className="skill">
            <li className="skill__list">
              <h2>Reactjs</h2>
            </li>

            <li className="skill__list">
              <h2>React Native</h2>
            </li>
            <li className="skill__list">
              <h2>Web development</h2>
            </li>
            <li className="skill__list">
              <h2>App development</h2>
            </li>
          </div>
        </div>

        <div className="profileSidebar__topSkills">
          <div className="profileSidebar__topSkills__heading">
            <h4>Industrial skills</h4>
          </div>
          <div className="skill">
            <li className="skill__list">
              <h2>Reactjs</h2>
            </li>

            <li className="skill__list">
              <h2>React Native</h2>
            </li>
          </div>
        </div>
        <div className="profileSidebar__topSkills">
          <div className="profileSidebar__topSkills__heading">
            <h4>interpersonal skills</h4>
          </div>
          <div className="skill">
            <li className="skill__list">
              <h2>Reactjs</h2>
            </li>

            <li className="skill__list">
              <h2>React Native</h2>
            </li>
            <li className="skill__list">
              <h2>Web development</h2>
            </li>
          </div>
        </div>
        <div className="profileSidebar__topSkills">
          <div className="profileSidebar__topSkills__heading">
            <h4>Other skills</h4>
          </div>
          <div className="skill">
            <li className="skill__list">
              <h2>Reactjs</h2>
            </li>

            <li className="skill__list">
              <h2>React Native</h2>
            </li>
            <li className="skill__list">
              <h2>Web development</h2>
            </li>
            <li className="skill__list">
              <h2>App development</h2>
            </li>
          </div>
        </div>
      </div>
      <SkillModal
        open={openSkillsModal}
        onClose={() => setOpenSkillsModal(false)}
        userId={userData.uid}
      />
    </div>
  );
}

export default ProfileSidebar;
