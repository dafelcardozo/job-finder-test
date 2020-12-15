import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import React from "react";
export default function Navigation({OnSelect}) {
    return <Navbar bg="dark" expand="lg" variant="dark" onSelect={(key) => OnSelect(key)} id="main_navbar">
        <Navbar.Brand href="#home">
            <Image src="/Torre_logo_small_uubm3e.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="ml-auto">
            <Nav.Link href='#search'  eventKey='search' className='nav-link d-flex flex-column'>
                <i className="fas fa-search"> </i>
                <span className="d-none d-sm-inline">Buscar</span>
            </Nav.Link>
            <Nav.Link href="#persons" eventKey="persons" className='nav-link d-flex flex-column'>
                <i className="fas fa-user-friends"> </i>
                <span className="d-none d-sm-inline">Personas</span>
            </Nav.Link>
            <Nav.Link href='#jobs' eventKey='opportunities' className='nav-link d-flex flex-column'>
                <i className="fas fa-suitcase"> </i>
                <span className="d-none d-sm-inline">Trabajos</span>
            </Nav.Link>
            <Nav.Link href="#publish" eventKey='publish' className='nav-link d-flex flex-column'>
                <i className="fas fa-upload"> </i>
                <span className="d-none d-sm-inline">Publicar</span>
            </Nav.Link>
            <Nav.Link href="#genome" eventKey='genome' className='nav-link d-flex flex-column'>
                <i className="fas fa-user-secret"> </i>
                <span className="d-none d-sm-inline">
                    Tu genoma</span>
            </Nav.Link>
            <Nav.Link href="#signals" eventKey='signals' className='nav-link d-flex flex-column'>
                <i className="fas fa-hand-paper"> </i>
                <span className="d-none d-sm-inline">
                Signals
                </span></Nav.Link>
        </Nav>

    </Navbar>
}