import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import React from "react";

export default function Navigation({}) {
    return <Navbar bg="light" expand="lg" variant="dark">
        <Navbar.Brand href="#home">
            <Image src="/Torre_logo_small_uubm3e.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href='#search'>Buscar</Nav.Link>
                <Nav.Link href='#jobs'>Trabajos</Nav.Link>
                <Nav.Link href="#publish">Publicar trabajo</Nav.Link>
                <Nav.Link href="#genome">Tu genoma</Nav.Link>
                <Nav.Link href="#signals">Signals</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
}