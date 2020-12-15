import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';


export default function PersonsFilterBar({visible, searchUpdated}) {
    const wrapperClass = `d-flex ${visible?"toggled":''}`;
    const [openTo, setOpenTo] = useState('');

    useEffect(() => {
        if (openTo)
            searchUpdated([{opento:{term:openTo}}]);
        else
            searchUpdated([]);
    }, [openTo]);
    return (<div className={ wrapperClass } >
        <Container className="bg-light border-right">
            <Row className="sidebar-heading">Filtrar personas por</Row>
            <Nav className="flex-column" onSelect={(key) => setOpenTo(key)}>
                <Nav.Link eventKey="full-time-employment">Empleo a tiempo completo</Nav.Link>
                <Nav.Link eventKey="part-time-employment" active>Empleo a medio tiempo</Nav.Link>
                <Nav.Link eventKey='freelance-gigs'>Trabajos temporales freelance</Nav.Link>
            </Nav>
        </Container>
    </div>);
}