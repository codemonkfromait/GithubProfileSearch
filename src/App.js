import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

//firebase
import firebase from "firebase/app";
import "firebase/auth";

//Components
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import PageNotFound from "./Pages/PageNotFound";
import { useState } from "react";
import { UserContext } from "./Context/UserContext";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import firebaseConfig from "./config/firebaseConfiguration";

//intializing firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const localuser = localStorage.getItem("user");
      if (localuser) {
        setUser(JSON.parse(localuser));
      }
    }
  }, []);

  return (
    <Router>
      <ToastContainer />
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>

        <Footer />
      </UserContext.Provider>
    </Router>
  );
}
