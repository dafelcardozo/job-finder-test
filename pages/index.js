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

function Profile() {
    const [profile, setDataProfile] = useState({ person:{professionalHeadline:''} });
    const fetchProfile = async () => {
        const result = await axios.get('/api/bios?profile=dafelcardozo');
        setDataProfile(result.data);
    };
    useEffect( () => {
        fetchProfile();
    }, ['' ]);
    return <>
        The profile:
        {profile.person.professionalHeadline}
        </>;
}


function PersonList() {
    const [persons, setPersons] = useState([]);
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
            {rows.map(r => <Row>
                {r.map(person => <Col> <Jumbotron>
                    {person.name}
                    <Figure>
                        <Figure.Image src={person.picture}/>
                    </Figure>
                </Jumbotron></Col>)}
            </Row>)}
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
                <Tab eventKey="profile" title="Profile">
                    <Profile/>
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
