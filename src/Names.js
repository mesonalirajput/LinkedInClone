import React, { useState, useEffect } from "react";
import "./Names.css";
import firebase from "firebase";
import { db } from "./firebase";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";

function Names(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState("");

  const dispatch = useDispatch();
  let uid = firebase.auth().currentUser?.uid;
  const userRef = db.collection("users").doc(uid);
  useEffect(() => {
    fetchuserData();
  }, []);
  console.log("Names.js > userData: ", userData);
  console.log("Names.js > user:", props.user);
  const fetchuserData = () => {
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
      .catch((err) => console.log("Names.js > fetchUserData: err > ", err));
  };
  const Continue = (e) => {
    e.preventDefault();
    userRef
      .update({
        firstName: firstName,
        lastName: lastName,
      })
      .then(() => {
        dispatch(
          login({
            ...props.user,
            firstName: firstName,
            lastName: lastName,
          })
        );
        alert("Names submitted successfully!!");
      })
      .catch((err) => console.log("Name.js > firebase update error:", err));
  };

  return (
    <div className="names">
      <div className="names__body">
        <div className="names__top">
          <div className="names__top__logo">
            <div className="names__top__linked">
              <b>Linked</b>
            </div>
            <div className="names__top__in">
              <b>in</b>
            </div>
          </div>
          <div className="names__top__heading">
            <p>Make the most of your professional life</p>
          </div>
        </div>
        <div className="names__middle">
          <form onSubmit={Continue}>
            <div className="names__middle__input">
              <span>First Name</span>
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="names__middle__input">
              <span>Last Name</span>
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <button type="submit">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Names;
