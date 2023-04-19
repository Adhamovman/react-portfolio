import React from "react";
import { Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Container>
        <Nav className="w-100 d-flex justify-content-center mainNavbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </Nav>
      </Container>
    </div>
  );
};

export default Navbar;
