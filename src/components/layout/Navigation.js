import { useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);

  const history = useHistory();

  function logout() {
    setAuth(null);
    history.push("/");
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <NavLink to="/" exact>
        <Navbar.Brand>Animal Kingdom</Navbar.Brand>
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <NavLink to="/" className="nav-link">
            Home
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
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
