import { useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import SearchBar from "../../hooks/Search";

function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);

  const history = useHistory();

  function logout() {
    setAuth(null);
    history.push("/");
  }

  return (
    <Navbar expand="lg">
      <NavLink to="/" exact>
        <Navbar.Brand>Holidaze</Navbar.Brand>
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
          {auth ? (
            <>
              <NavLink to="/admin" className="nav-link">
                Admin
              </NavLink>
              <button onClick={logout}>Log out</button>
            </>
          ) : (
            <NavLink to="/login" className="nav-link">
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
