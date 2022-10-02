import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Stays from "./pages/stays/Stays";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import Details from "./pages/details/Details";
import Inquiry from "./pages/inquiry/Inquiry";
import InquiryDetails from "./pages/inquiry/InquiryDetails";
import ContactMessage from "./pages/contactMessage/ContactMessage";
import ContactMessageDetails from "./pages/contactMessage/ContactMessageDetails";
import Establishment from "./pages/establishment/establishment";
import About from "./pages/about/About";
import Admin from "./pages/admin/Admin";
import Nav from "./components/layout/Navigation";
import { AuthProvider } from "./context/AuthContext";
import "./sass/style.scss";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/stays">
            <Stays />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/about">
            <About />
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
          <Route path="/inquiry">
            <Inquiry />
          </Route>
          <Route path="/inquiryDetails/:id">
            <InquiryDetails />
          </Route>
          <Route path="/contactMessage">
            <ContactMessage />
          </Route>
          <Route path="/contactMessageDetails/:id">
            <ContactMessageDetails />
          </Route>
          <Route path="/establishment">
            <Establishment />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
