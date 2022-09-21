import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Contact from "./components/contact/Contact";
import Login from "./components/login/Login";
import Details from "./components/details/Details";
import Admin from "./components/admin/Admin";
import Nav from "./components/layout/Navigation";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/details/:id">
            <Details />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
