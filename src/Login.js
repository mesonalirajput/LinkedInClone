import React, { useState } from "react";
import "./Login.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import loginImg from "./LinkedIn_login.jpg";
import { Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  // const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();
  const loginToApp = (e) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        console.log(userAuth);
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
          })
        );
      })
      .catch((error) => alert(error));
    e.preventDefault();
  };
  // const register = () => {
  //   if (!name) {
  //     return alert("Please enter a full name!");
  //   }
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((userAuth) => {
  //       userAuth.user
  //         .updateProfile({
  //           displayName: name,
  //           photoURL: profilePic,
  //         })
  //         .then(() => {
  //           dispatch(
  //             login({
  //               email: userAuth.user.email,
  //               uid: userAuth.user.uid,
  //               displayName: name,
  //               photoURL: profilePic,
  //             })
  //           );
  //         });
  //     })
  //     .catch((error) => alert(error));
  // };

  return (
    <div className="login__body">
      <div className="login__top">
        <div className="login__top__left">
          <div className="linked">
            <b>Linked</b>
          </div>
          <div className="in">
            <b>in</b>
          </div>
          {/* <img src={linkinImag} alt="" /> */}
        </div>
        <div className="login__top__right">
          <Link to="/register">
            <button className="join__button">Join now</button>
          </Link>
          <button className="signin__button">Sign in</button>
        </div>
      </div>
      <div className="login__bottom">
        <div className="login__left">
          <div className="login__left__heading">
            <p>Welcome to your</p>
            <p>professional community</p>
          </div>

          <form>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              required
            />
            <button onClick={(e) => loginToApp(e)}>Sign In</button>
          </form>
          <p>
            Not a member?{" "}
            <Link to="/register" className="login__register">
              Register Now
            </Link>
          </p>
        </div>
        <div className="login__right">
          <img src={loginImg} />
        </div>
      </div>
    </div>
  );
}

export default Login;
