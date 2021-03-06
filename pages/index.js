import Head from 'next/head'
import Layout from '../components/layout'
import React, {useEffect, useState } from 'react';
import axios from 'axios'
import Navigation from "./navigation";
import Carousel from "react-bootstrap/Carousel";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import JobsFilterBar from "../components/jobsFilterBar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from "react-bootstrap/Figure";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/css/brands.css'
import '@fortawesome/fontawesome-free/js/all'
import Form from 'react-bootstrap/Form'
import PersonsFilterBar from "../components/personsFilterBar";
import { throttle } from 'lodash';

function OpportunitiesCarousel() {
    const [opportunities, setOpportunities] = useState([]);

    const searchOpportunities = async () => {
        const res = await axios.post(
            '/api/opportunities?currency=USD%24&page=1&periodicity=hourly&lang=es&size=20&aggregate=false&offset=20',
            {"type":{"code":"full-time-employment"}},
            {headers:{"content-type":"application/json;charset=UTF-8"}});
        setOpportunities(res.data.results);
    };
    useEffect( () => {
        searchOpportunities();
    }, ['']);
    return <Carousel>
        {opportunities.map(({id, objective, organizations}) => <Carousel.Item key={id}>
            {organizations.map(({id, picture}) => <img key={id}
                                                       src={picture}
            />)}
            <Carousel.Caption>
                <h3>{objective}</h3>
                <p>at
                    {organizations.map(({name}) => name).join(', ')}
                </p>
            </Carousel.Caption>
        </Carousel.Item>)}
    </Carousel>
}

function ProfileModal({show, profile_id, onHide, ...props}) {
    const [profile, setDataProfile] = useState({ person:{professionalHeadline:''} });
    const [loading, setLoading] = useState(false);
    const fetchProfile = async () => {
        if (profile_id) {
            setLoading(true);
            const result = await axios.get(`/api/bios?profile=${profile_id}`);
            setDataProfile(result.data);
            setLoading(false);
        } else {
            setDataProfile({person:{professionalHeadline:''}});
        }
    };
    useEffect( () => {
        fetchProfile();
    }, [profile_id ]);
    const {person} = profile;
    const {name, professionalHeadline, pictureThumbnail} = person;
    return (
    <Modal show={show} {...props} aria-labelledby="contained-modal-title-vcenter" size="lg">
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {name}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
            {loading && <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>}
            {!loading && (
                <Container>
                    <Row>
                        <Figure>
                            <Figure.Image src={pictureThumbnail}/>
                        </Figure>
                    </Row>
                    <Row>
                        <Col>
                            {professionalHeadline}
                        </Col>
                    </Row>
                </Container>)}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => onHide()}>Close</Button>
        </Modal.Footer>
    </Modal>)
        ;
}

function StrengthsPaginated({strengths}) {
    const [howMany, setHowMany] = useState(5);
    const all = strengths.slice(0, howMany);
    return <><h5>
        {all.map(({name}) => <Badge key={name}  pill variant="secondary">{name}</Badge>)}
    </h5>
        {strengths.length > howMany && <div>{howMany} de {strengths.length} <a onClick={() => setHowMany(howMany + 15)}>Show more</a></div>}
    </>
}

function FullProfilePage({profile_id}) {
    const noOne = {
        person: {professionalHeadline: '', name: '', links: [], location: {name: ''}},
        experiences: [], strengths: [], languages: [], interests: []
    };
    const [profile, setDataProfile] = useState(noOne);
    const [loading, setLoading] = useState(false);
    const fetchProfile = async () => {
        if (profile_id) {
            setLoading(true);
            const result = await axios.get(`/api/bios?profile=${profile_id}`);
            setDataProfile(result.data);
            setLoading(false);
        } else {
            setDataProfile(noOne);
        }
    };
    useEffect( () => {
        fetchProfile();
    }, [profile_id]);
    const {person, experiences, strengths, interests, languages} = profile;
    const {name, professionalHeadline, pictureThumbnail, links, location} = person;
    const {name:lName, country} = location;
    return <Container fluid>
        {loading && <Spinner animation='grow' />}
            {!loading &&
            <Container>
                <Row>
                    <Col>
                        <Container>
                            <Row>
                                <Figure>
                                    <Figure.Image src={pictureThumbnail} width={171} height={180} rounded />
                                </Figure>
                            </Row>
                            <Row>
                                {name}
                            </Row>
                            <Row>
                                {professionalHeadline}
                            </Row>
                            <Row>
                                {lName || country}
                            </Row>
                            <Row>
                                {links.map(({name, address}, i) =>
                                    <a key={i} href={address} target='_blank'>
                                        <FontAwesomeIcon icon={["fab", name]} />&nbsp;
                                    </a>)}
                            </Row>
                            <Row>Habilidades actuales:</Row>
                            <Row>
                                <StrengthsPaginated strengths={strengths} />
                            </Row>
                            <Row>
                                Habilidades que él/ella quiere desarrollar:
                            </Row>
                            <Row>
                                {interests.map(({name}) => <Badge key={name}  pill variant="secondary">{name}</Badge>)}

                            </Row>
                            <Row>
                                Lenguajes:
                            </Row>
                            <Row>
                                {languages.map(({language, fluency}) => <Badge key={language} pill variant="secondary">{language} - {fluency}</Badge>)}
                            </Row>
                        </Container>
                    </Col>
                    <Col>
                        <Row>Résumé</Row>
                        {experiences.map(({name, organizations, additionalInfo, responsibilities, fromMonth, fromYear, toMonth, toYear}) => (<>
                            <Row>
                                {name} at {organizations.map(({name, picture}) => (
                                <>{name}{picture && <Figure><Figure.Image src={picture} width={42} height={45} /></Figure>}</>))}
                            </Row>
                            <Row>
                                {additionalInfo}
                                De {fromMonth}/{fromYear} a {toMonth}/{toYear}
                                <ul>
                                    {responsibilities.map(r => <li>{r}</li>)}
                                </ul>
                            </Row>
                            </>))}
                    </Col>
                </Row>
            </Container>

    }
    </Container>

}

function PersonList({persons, onProfileSelected}) {
    const rows = persons.reduce((acc, p) => {
        if (acc[acc.length - 1].length === 4)
            acc.push([]);
        acc[acc.length - 1].push(p);
        return acc;
    }, [[]]);
    return <Container fluid className='persons-list'>
        {rows.map((r, i) => <Row key={i}>
            {r.map(({picture, name, username}, j) => (
                <Col key={j}>
                    <Container fluid className='person-vignette bg-dark'>
                        <Row className='d-flex justify-content-center'>
                            <Figure>
                                <Figure.Image src={picture} width={113} height={121} rounded/>
                            </Figure>
                        </Row>
                        <Row className='d-flex justify-content-center'><h3>{name}</h3></Row>
                    </Container>
                </Col>
            ))}
        </Row>)}
    </Container>
        ;
}

function SearchPage({onProfileSelected}) {
    const [persons, setPersons] = useState([]);
    const [filters, setFilters] = useState([]);
    const [search, setSearch] = useState('');
    const [clicks, setClicks] = useState(0);

    const searchPeople = () => {
        let clauses = [...filters];
        if (search)
            clauses.push({name:{term: search}});
        let payload ;
        if (clauses.length === 1) {
            payload = filters[0];
        } else if (clauses.length > 1) {
            payload = {"and": clauses};
        } else  {
            payload = {};
        }
        axios.post(
            '/api/people?currency=USD%24&page=1&periodicity=hourly&lang=es&size=20&aggregate=false&offset=20',
            payload,
            {headers:{"content-type":"application/json;charset=UTF-8"}})
            .then(res => setPersons(res.data.results))
        ;
    };
    useEffect(() => {
        searchPeople()
    }, [filters, clicks]);

    return <Container fluid>
            <Row>
                <Col className='col-2'><PersonsFilterBar visible={true} searchUpdated={setFilters}/></Col>
                <Col>
                    <Container   fluid >
                        <Row>
                            <Form>
                                <label>
                                <Form.Control type='text' placeholder='Buscar personas' value={search}
                                              onChange={(event) => setSearch(event.target.value)}
                                              className='field'/>
                                Buscar personas</label>
                                <Button onClick={() => setClicks(clicks+1)}>Search</Button>
                            </Form>
                        </Row>
                        <Row>
                            <PersonList persons={persons} onProfileSelected={onProfileSelected}/>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
}



function PagesList({page}) {
    const [visible, setVisible] = useState(false);
    const [profileId, setProfileId] = useState('');
    useEffect(() => {
       setProfileId('')
    }, [page]);
    return (
        <Container fluid style={{'background-color': 'black'}} >
            {!profileId && page === 'persons' &&  <PersonList persons={[]} onProfileSelected={setProfileId}/>}
            {!profileId && page === 'opportunities' && <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <JobsFilterBar visible={visible}/>
                    </div>
                    <div className="col-10">
                        <Jumbotron>
                            <button className="btn btn-primary" id="menu-toggle" onClick={() => setVisible(!visible)}>Toggle Menu</button>
                            <OpportunitiesCarousel />
                        </Jumbotron>
                    </div>
                </div>
            </div>}
            {!profileId && page === 'genome' && <FullProfilePage profile_id='dafelcardozo'/>}
            {profileId && <FullProfilePage profile_id={profileId} />}
            {!profileId && page === 'search' && <SearchPage onProfileSelected={setProfileId}/>}
        </Container>

    );
}


export default function Home({}) {
    const [page, setPage] = useState('');
    return (
        <Layout home>
            <Navigation OnSelect={(key) => setPage(key)}/>
            <Head>
                <title>Torre title</title>
            </Head>
            <PagesList page={page}/>
        </Layout>
    )
}
