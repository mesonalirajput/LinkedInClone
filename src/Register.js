import React, { useState } from "react";
import "./Register.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { Link } from "react-router-dom";
import { db } from "./firebase";
import firebase from "firebase";
import googleImg from "./google.png";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const register = (e) => {
    // if (!name) {
    //   return alert("Please enter a full name!");
    // }
    auth
      .createUserWithEmailAndPassword(email, password)
      // .then((userAuth) => {
      //   userAuth.user
      //     .updateProfile({
      //       displayName: name,
      //       photoURL: profilePic,
      //     })
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            // displayName: name,
            // photoURL: profilePic,
          })
        );
      })
      .catch((err) => console.log("Register.js create user err: ", err))
      // })
      // .catch((error) => console.log("Register.js updateprofile err: ", error))
      // .then(() => {
      //   alert("Registered successfully!");
      // })
      // .catch((err) => alert(err))
      .then(() => {
        let usr = firebase.auth().currentUser;
        db.collection("users").doc(usr?.uid).set({
          // name: usr?.displayName,
          email: usr?.email,
          // photoUrl: usr?.photoURL,
          uid: usr?.uid,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      })
      .catch((err) => console.log("error creating user collection: ", err));
    e.preventDefault();
  };

  return (
    <div className="register">
      {/* <img src={linkinImag} alt="" /> */}
      <div className="register__body">
        <div className="register__top">
          <div className="register__top__logo">
            <div className="register__top__linked">
              <b>Linked</b>
            </div>
            <div className="register__top__in">
              <b>in</b>
            </div>
          </div>
          <div className="register__top__heading">
            <p>Make the most of your professional life</p>
          </div>
        </div>
        <div className="register__middle">
          <form onSubmit={register}>
            <div className="register__middle__input">
              <span>Email or phone number</span>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // placeholder="Email"
                type="email"
              />
            </div>
            <div className="register__middle__input">
              <span>Password (6 or more characters)</span>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // placeholder="Password"
                type="password"
              />
            </div>

            <button type="submit">Register</button>
          </form>
          <div className="or__line">
            <hr />
            <p>Or</p>
            <hr />
          </div>
          <div className="google__button">
            <img
              style={{
                width: "25px",
                height: "25px",
                position: "absolute",
                marginTop: "10px",
                marginLeft: "70px",
              }}
              src={googleImg}
            />

            <button>Join with google</button>
          </div>

          <p>
            Already a member?{" "}
            <Link to={"/login"} className="register__login">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
