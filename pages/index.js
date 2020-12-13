import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './navigation'
import Navigation from "./navigation";
import 'bootstrap/dist/css/bootstrap.min.css';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Carousel from "react-bootstrap/Carousel";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import JobsFilterBar from "../components/jobsFilterBar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from "react-bootstrap/Figure";
import Button from 'react-bootstrap/Button';
import Modal from  'react-bootstrap/Modal';


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
    const fetchProfile = async () => {
        if (profile_id) {
            const result = await axios.get(`/api/bios?profile=${profile_id}`);
            setDataProfile(result.data);
        } else {
            setDataProfile({person:{professionalHeadline:''}});
        }
    };
    useEffect( () => {
        fetchProfile();
    }, [profile_id ]);
    return (
    <Modal show={show} {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Profile of {profile.person.professionalHeadline}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
            <Container>
                <Row>
                    <Col xs={12} md={8}>

                    </Col>
                    <Col xs={6} md={4}>
                        .col-xs-6 .col-md-4
                    </Col>
                </Row>

                <Row>
                    <Col xs={6} md={4}>
                        .col-xs-6 .col-md-4
                    </Col>
                    <Col xs={6} md={4}>
                        .col-xs-6 .col-md-4
                    </Col>
                    <Col xs={6} md={4}>
                        .col-xs-6 .col-md-4
                    </Col>
                </Row>
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => onHide()}>Close</Button>
        </Modal.Footer>
    </Modal>)
        ;
}


function PersonList() {
    const [persons, setPersons] = useState([]);
    const [profile_id, setProfile_id] = useState('');

    const searchPeople = async () => {
        const res = await axios.post(
            '/api/people?currency=USD%24&page=1&periodicity=hourly&lang=es&size=20&aggregate=false&offset=20',
            {"type":{"code":"full-time-employment"}},
            {headers:{"content-type":"application/json;charset=UTF-8"}});
        setPersons(res.data.results);
    };
    useEffect(() => {
        searchPeople();
    }, ['']);
    const rows = persons.reduce((acc, p) => {
        if (acc[acc.length-1].length === 4 )
            acc.push([]);
        acc[acc.length-1].push(p);
        return acc;
    },[[]]);
    return <Container fluid>
            {rows.map((r, i) => <Row key={i}>
                {r.map((person, j) => <Col key={j}> <Jumbotron>
                    {person.name}
                    <Figure>
                        <Figure.Image src={person.picture}/>
                    </Figure>
                    <Button onClick={() => {i
                        console.info({username:person.username});
                        setProfile_id(person.username)
                    }}>Show</Button>
                </Jumbotron></Col>)}
            </Row>)}
            <ProfileModal profile_id={profile_id} show={!!profile_id} onHide={() => setProfile_id('')}/>
        </Container>
        ;
}



function SecondComponent() {
    const [query, setQuery] = useState('');
    const [visible, setVisible] = useState(false);
    return (
        <Container fluid>
            <input
                type="hidden"
                value={query}
                onChange={event => setQuery(event.target.value)}
            />
            <Tabs defaultActiveKey="persons" id="uncontrolled-tab-example">
                <Tab eventKey='persons' title="Persons">
                    <PersonList/>
                </Tab>
                <Tab eventKey="opportunities" title="Opportunities">
                    <div className="container-fluid">
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
                    </div>
                </Tab>
            </Tabs>
        </Container>

    );
}


export default function Home({  }) {
  return (
    <Layout home>
        <Navigation/>
      <Head>
        <title>Torre title</title>
      </Head>
        <SecondComponent/>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
