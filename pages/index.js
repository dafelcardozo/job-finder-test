import Head from 'next/head'
import Layout from '../components/layout'
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
import Spinner from 'react-bootstrap/Spinner';


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
                        <Figure.Image src={person.picture} width={171} height={180} rounded />
                    </Figure>
                    <Button onClick={() => setProfile_id(person.username)}>Show</Button>
                </Jumbotron></Col>)}
            </Row>)}
            <ProfileModal profile_id={profile_id} show={!!profile_id} onHide={() => setProfile_id('')}/>
        </Container>
        ;
}



function MainTabs() {
    const [visible, setVisible] = useState(false);
    return (
        <Container fluid>
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
        <MainTabs/>
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
