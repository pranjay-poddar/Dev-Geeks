import React, { useEffect, useState, useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import Logo from '../../assets/iCons/Logo.png';
import Logout from '../../assets/logout.png';

const Header = () => {
  const auth = getAuth();
  const { activeUser } = useContext(AuthContext);
  return (
    <Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
      <Container>
        <Navbar.Brand href='#home'>
          <img
            src={Logo}
            width='70'
            height='80'
            className='d-inline-block align-bottom text-danger'
            alt='Logo'
          />
          {/* <span className="app-name">iKeep</span> */}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            {activeUser && (
              <p className='m-0 font-weight-bold'>
                Welcome:{' '}
                {activeUser?.displayName ? activeUser.displayName : ' New User'}
              </p>
            )}
          </Navbar.Text>
          <Nav>
            {activeUser && (
              <Nav.Link
                onClick={() =>
                  signOut(auth)
                    .then(() => {})
                    .catch((error) => {})
                }
              >
                <img
                  src={Logout}
                  srcSet={Logout}
                  width='30'
                  radius='0'
                  alt='google'
                />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
