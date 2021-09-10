import { Fade, Modal } from "@material-ui/core";
import React, { useState } from "react";
import "./SkillModal.css";
import { db } from "./firebase";
import { CloseOutlined } from "@material-ui/icons";
function SkillModal({ open, onClose, userId }) {
  const [skill, setSkill] = useState([]);
  const userRef = db.collection("users").doc(userId);
  const addSkill = (e) => {
    e.preventDefault();
    userRef.child("userSkill").set({});
  };
  return (
    <div>
      <Modal open={open} onClose={onClose} className="skillModal">
        <Fade in={open}>
          <form onSubmit={addSkill}>
            <div className="skillModal__body">
              <div className="skillModal__top">
                <h4>Add Skills</h4>
                <CloseOutlined
                  className="skillModal__top__icon"
                  onClick={onClose}
                />
              </div>
              <div className="skillModal__middle">
                <input
                  value={skill}
                  type="text"
                  placeholder={"Skill (ex: Machine Learning)"}
                  onChange={(e) => setSkill(e.target.value)}
                />
                <h4>You can add 50 skills</h4>
              </div>
              <div className="skillModal__bottom">
                <button type="submit">Add</button>
              </div>
            </div>
          </form>
        </Fade>
      </Modal>
    </div>
  );
}

export default SkillModal;
