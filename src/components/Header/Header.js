/* eslint-disable */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Header = ({ onLogout,user }) => {
  const navigate = useNavigate();

  const handleRegister = () => {
      navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    // Llamar a la función de cierre de sesión proporcionada por el componente principal
    onLogout();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{ color: "gold" }}>
          <FontAwesomeIcon icon={faVideoSlash} /> {'Movies - API'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/watchList">Watch List</NavLink>
          </Nav>
          {/* Mostrar diferentes opciones dependiendo del estado de inicio de sesión */}
          {user ? (
            <>
              <Nav>
                <Nav.Link disabled style={{ color: "white" }}>Welcome, {user.sub}</Nav.Link>
              </Nav>
              <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button variant="outline-info" onClick={handleLogin}>Login</Button>
              <Button variant="outline-info" onClick={handleRegister}>Register</Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
