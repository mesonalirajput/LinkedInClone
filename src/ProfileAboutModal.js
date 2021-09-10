import { Fade, Modal } from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { db } from "./firebase";
import "./ProfileAboutModal.css";
function ProfileAboutModal({ open, onClose, userData }) {
  const [about, setAbout] = useState(userData?.about);
  const userRef = db.collection("users").doc(userData.userId);
  // console.log("About > userId: ", userData.userId);
  const sendAbout = (e) => {
    e.preventDefault();
    userRef
      .update({
        about: about,
      })
      .then(() => {
        alert("About saved successfully!");
      })
      .catch((err) =>
        console.log("profileAboutModal > about update error: ", err)
      );
  };
  return (
    <div>
      <Modal open={open} onClose={onClose} className="profileAboutModal">
        <Fade in={open}>
          <form onSubmit={sendAbout}>
            <div className="profileAboutModal__body">
              <div className="profileAboutModal__top">
                <h4>About</h4>
                <CloseOutlined
                  onClick={onClose}
                  className="profileAboutModal__top__icon"
                />
              </div>
              <div className="profileAboutModal__middle">
                <h4>Description</h4>
                <textarea
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  required
                  maxLength="2600"
                  rows="9"
                ></textarea>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "4px",
                  }}
                >
                  <h4
                    style={{
                      color: "gray",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    {about.length}/1260
                  </h4>
                </div>
              </div>
              <div className="profileAboutModal__bottom">
                <button type="submit">Save</button>
              </div>
            </div>
          </form>
        </Fade>
      </Modal>
    </div>
  );
}

export default ProfileAboutModal;
