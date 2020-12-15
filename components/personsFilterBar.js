import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';


export default function PersonsFilterBar({visible, searchUpdated}) {
    const wrapperClass = `bg-dark  ${visible?"toggled":''}`;
    const [openTo, setOpenTo] = useState('');

    useEffect(() => {
        if (openTo)
            searchUpdated([{opento:{term:openTo}}]);
        else
            searchUpdated([]);
    }, [openTo]);
    return (<Container className={wrapperClass } >
            <Row className="sidebar-heading"></Row>
            <Nav className="flex-column" onSelect={(key) => setOpenTo(key)}>
                <Nav.Item>
                    <h3>Filtrar personas por</h3>
                </Nav.Item>
                <Nav.Item>
                    <h4>Tipo de Trabajo</h4>
                </Nav.Item>
                <Nav.Link eventKey="full-time-employment">Empleo a tiempo completo (2M+)</Nav.Link>
                <Nav.Link eventKey="part-time-employment" active>Empleo a medio tiempo (2M+)</Nav.Link>
                <Nav.Link eventKey='freelance-gigs'>Trabajos temporales freelance (2M+)</Nav.Link>
                <Nav.Link eventKey='internships'>Pasantías (2M+)</Nav.Link>
                <Nav.Link eventKey='assesment'>Asesorar a otros (2M+)</Nav.Link>
                <Nav.Link eventKey='mentorship'>Dar una mentoría (2M+)</Nav.Link>
                <Nav.Link eventKey='mentorship'>Contratar talento (232k++)</Nav.Link>
                <Nav.Item>
                    <h4>Idioma(s)</h4>
                </Nav.Item>
                <Nav.Item>
                    <input type="text" placeholder='Idioma(s)' className='field'/>
                </Nav.Item>
                <Nav.Item>
                    <h4>Ubicaciones</h4>
                </Nav.Item>
                <Nav.Item>
                    <input type="text" placeholder='Ubicaciones específicas' />
                </Nav.Item>
                <Nav.Item>
                    <h4>Habilidades destacadas</h4>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey='mentorship'>Communication (359k+)</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey='mentorship'>Customer Service (150k)</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey='mentorship'>Management (122k)</Nav.Link>
                </Nav.Item>
            </Nav>
        </Container>
    );
}