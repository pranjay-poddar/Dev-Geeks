import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
export default function Navb(){
    return(
        <>
<Navbar collapseOnSelect expand="lg" style={{backgroundColor:"#171616",position:"sticky",top:"0px",zIndex:"2"}} variant="dark">
      <Container>
        <Navbar.Brand href="/"><span style={{color:"#bb0000"}}><b>MovieADDA</b></span></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/">Home</Nav.Link> */}
            {/* <Nav.Link href="/movies">Movies</Nav.Link> */}
          </Nav>
          <Nav>
            <Nav.Link href="/about">About US</Nav.Link>
            <Nav.Link eventKey={2} href="/contact">
              Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
         </>
     );
}