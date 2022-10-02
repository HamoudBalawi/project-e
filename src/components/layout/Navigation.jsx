import { useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import SearchBar from "../search/Search";

function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);

  const history = useHistory();

  function logout() {
    setAuth(null);
    history.push("/");
  }

  return (
    <Navbar className="header" expand="lg">
      <NavLink to="/" exact>
        <Navbar.Brand className="company-name">Holidaze</Navbar.Brand>
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/stays" className="nav-link">
            Stays
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          {auth ? (
            <>
              <NavLink to="/admin" className="nav-link">
                Admin
              </NavLink>
              <NavLink onClick={logout} to="/" className="nav-link login">
                Log out
              </NavLink>
            </>
          ) : (
            <NavLink to="/login" className="nav-link login">
              Login
            </NavLink>
          )}
        </Nav>
        <SearchBar />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
