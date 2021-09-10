import { Fade, Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddIcon from "@material-ui/icons/Add";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import "./EditProfileModal.css";
import { db } from "./firebase";
import firebase from "firebase";
import { CloseOutlined } from "@material-ui/icons";
function EditProfileModal({ open, onClose, userId, userData }) {
  const [firstName, setFirstName] = useState(userData?.firstName);
  const [lastName, setLastName] = useState(userData?.lastName);
  const [formerName, setFormerName] = useState(userData?.formerName);
  const [education, setEducation] = useState(userData?.education);
  const [headline, setHeadline] = useState(userData?.headline);
  const [country, setCountry] = useState(userData?.country);
  const [state, setState] = useState(userData?.state);
  const userRef = db.collection("users").doc(userData?.userId);
  const [industry, setIndustry] = useState(userData?.industry);

  // console.log(userData);
  const sendIntro = (e) => {
    e.preventDefault();
    userRef
      .update({
        uid: userId,
        firstName: firstName,
        lastName: lastName,
        formerName: formerName,
        headline: headline,
        education: education,
        country: country,
        state: state,
        industry: industry,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        alert("Intro saved successfully!");
      })
      .catch((err) =>
        console.log("EditProfileModal.js > sendIntro error: ", err)
      );
  };
  return (
    <div>
      <Modal open={open} onClose={onClose} className="EditProfileModal">
        <Fade in={open}>
          <form onSubmit={sendIntro}>
            <div className="profileModal__body">
              <div className="profileModal__top">
                <h4>Edit intro</h4>
                <CloseOutlined
                  className="profileModal__top__icon"
                  onClick={onClose}
                />
              </div>
              <div className="profileModal__middle">
                <div className="profileModal__middle__name">
                  <div className="profileModal__name">
                    <p>First Name *</p>
                    <input
                      type="text"
                      value={firstName}
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="profileModal__name">
                    <p>Last Name *</p>
                    <input
                      type="text"
                      value={lastName}
                      required
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="formerName">
                  <p>Former Name</p>
                  <input
                    type="text"
                    value={formerName}
                    onChange={(e) => setFormerName(e.target.value)}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "5px",
                    }}
                  >
                    <VisibilityIcon
                      style={{ color: "rgb(10, 102, 194)", fontSize: "18px" }}
                    />
                    <p
                      style={{
                        color: "rgb(10, 102, 194)",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginLeft: "5px",
                      }}
                    >
                      Visible to: your Connections
                    </p>
                  </div>
                </div>
                <div className="headline">
                  <p>Headline *</p>
                  <textarea
                    type="text"
                    headline={true}
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                  ></textarea>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "25px",
                    }}
                  >
                    <AddIcon
                      style={{ color: "rgb(10, 102, 194)", fontSize: "22px" }}
                    />
                    <p
                      style={{
                        color: "rgb(10, 102, 194)",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginLeft: "5px",
                      }}
                    >
                      Add current position
                    </p>
                  </div>
                </div>
                <div className="education">
                  <p>Education</p>
                  <input
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                  />
                  <p
                    style={{
                      color: "rgb(10, 102, 194)",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      marginTop: "10px",
                      marginLeft: "5px",
                    }}
                  >
                    Add new education
                  </p>
                  <div className="checkbox">
                    <input type="checkbox" />
                    <p>Show education in my bio</p>
                  </div>
                </div>
                <div className="country_region">
                  <p>Country/Region *</p>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="country_region">
                  <p>Location in this Country/Region *</p>
                  <input
                    type="text"
                    headline={true}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div className="country_region">
                  <p>Industry </p>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  />
                </div>
                <div className="contact_info">
                  <p>Contact info</p>
                  <div className="info">
                    <span>
                      Profile URL, Phone, Address, Email, Birthday, WeChat ID
                    </span>
                    <CreateOutlinedIcon className="info_icon" />
                  </div>
                </div>
              </div>
              <div className="profileModal__bottom">
                <button type="submit">Save</button>
              </div>
            </div>
          </form>
        </Fade>
      </Modal>
    </div>
  );
}

export default EditProfileModal;
