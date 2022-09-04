import React from 'react';
import { logout } from '../../features/authSlice';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
/**
* @author
* @function Header
**/

export const Header = (props) => {

  const user = useSelector(state => state.authStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLogout = (e) => {
    dispatch(logout()).then(() => {
      // window.location.reload();
      // console.log(props.history)
      // console.log("$$$$");
      navigate('/signin');
    });
  }
  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className='nav-item'>
          <span className='nav-link' onClick={onClickLogout}>Signout</span>
        </li>
      </Nav>
    )
  }

  const renderNonLoggedInLinks = () => {

    return (<Nav>
      <li className='nav-item'>
        <NavLink className='nav-link' to="/signin">Signin</NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className='nav-link' to="/signup">Signup</NavLink>
      </li>
      {/* <Nav.Link href="#deets">Sign In</Nav.Link> */}
    </Nav>);

  }

  return (
    <Navbar collapseOnSelect fixed = "top" expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
      <Container fluid>
        {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
        <Link to="/" className='navbar-brand'>Admin Dashboard</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
          </Nav>
          {user.isLoggedIn ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )

}