import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import { useSelector } from "react-redux";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/userSlice";
import Names from "./Names";
import Location from "./Location";
import firebase from "firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Network from "./Network";
import { db } from "./firebase";
import "@brainhubeu/react-file-input/dist/react-file-input.css";
import Profile from "./Profile";

function App() {
  const { user } = useSelector((state) => ({ user: state?.user?.user }));
  const [userData, setUserData] = useState("");
  const [checking, setChecking] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    // fetchuserData();
    authStateChange();
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
        console.log("adding the user to redux");
        let usr = doc.data();
        usr.timestamp = ""; //will change later is needed
        dispatch(login(usr));
        setUserData(doc.data());
      })
      .catch((err) => console.log("Names.js > fetchUserData: err > ", err));
  };
  console.log("App.js > user: ", user);
  // console.log("App.js > userData: ", userData);
  const authStateChange = () => {
    auth.onAuthStateChanged((userAuth) => {
      setChecking(false);
      if (userAuth) {
        console.log("dispatch user login!");
        //user is logged in
        // console.log("dispatching!");
        fetchuserData();

        // console.log("userAuth", userAuth);
      } else {
        //user is logged out
        dispatch(logout());
      }
    });
  };

  if (checking) {
    return <div>loading...</div>;
  }
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact>
            {!user && <Redirect to={"/login"} />}
            <Header />
            <HomeFun />
          </Route>
          <Route path="/profile" exact>
            {!user && <Redirect to={"/login"} />}
            <Header />
            <ProfileFun />
          </Route>
          <Route path="/network" exact>
            {!user && <Redirect to={"/login"} />}
            <Header />
            <NetworkFun />
          </Route>
          <Route path="/register">
            {user?.email && <Redirect to={"/names"} />}
            <RegisterFun />
          </Route>
          <Route path="/login">
            {user && <Redirect to={"/"} />}
            <LoginFun />
          </Route>
          <Route path="/names">
            {/* {!user?.user?.email && <Redirect to={"/register"} />} */}
            {user?.email && user?.firstName && user?.lastName && (
              <Redirect to={"/location"} />
            )}
            <NamesFun user={user} />
          </Route>
          <Route path="/location">
            {!user?.firstName ||
              (!user?.lastName && <Redirect to={"/names"} />)}
            <LocationFun />
          </Route>
        </Switch>
      </div>
    </Router>

    // <div className="app">
    //   {!user?.user ? (
    //     <Login />
    //   ) : (
    //     <>
    //       <Header />
    //       <div className="app__body">
    //         <SideBar />
    //         <Feed />
    //         {/* Widgets */}
    //       </div>
    //     </>
    //   )}
    // </div>
  );
}

function HomeFun() {
  return (
    <div>
      <Home />
    </div>
  );
}
function ProfileFun() {
  return (
    <div>
      <Profile />
    </div>
  );
}
function NetworkFun() {
  return (
    <div>
      <Network />
    </div>
  );
}
function RegisterFun() {
  return <Register />;
}
function LoginFun() {
  return <Login />;
}
function NamesFun(props) {
  return <Names {...props} />;
}
function LocationFun() {
  return <Location />;
}
export default App;
