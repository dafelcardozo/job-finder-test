import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import React from "react";

export default function Navigation({OnSelect}) {
    return <Navbar bg="dark" expand="lg" variant="dark" onSelect={(key) => OnSelect(key)}>
        <Navbar.Brand href="#home">
            <Image src="/Torre_logo_small_uubm3e.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="ml-auto">
            <Nav.Link href='#search'  eventKey='search'>Buscar</Nav.Link>
            <Nav.Link href="#persons" eventKey="persons">Personas</Nav.Link>
            <Nav.Link href='#jobs' eventKey='opportunities'>Trabajos</Nav.Link>
            <Nav.Link href="#publish" eventKey='publish'>Publicar trabajo</Nav.Link>
            <Nav.Link href="#genome" eventKey='genome'>Tu genoma</Nav.Link>
            <Nav.Link href="#signals" eventKey='signals'>Signals</Nav.Link>
        </Nav>

    </Navbar>
}