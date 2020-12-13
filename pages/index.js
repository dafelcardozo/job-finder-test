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


function SecondComponent() {
    const [data, setData] = useState({ person:{professionalHeadline:''} });
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const fetchProfile = async () => {
        const result = await axios.get('/api/bios?profile=dafelcardozo');
        setData(result.data);
    };
    const searchOpportunities = async () => {
        const res = await axios.post(
            '/api/opportunities?currency=USD%24&page=1&periodicity=hourly&lang=es&size=20&aggregate=false&offset=20',
            {"type":{"code":"full-time-employment"}},
            {headers:{"content-type":"application/json;charset=UTF-8"}});
        setResults(res.data.results);
    };
    useEffect( () => {
        fetchProfile();
        searchOpportunities();
    }, [query]);

    const [visible, setVisible] = useState(false);

    return (
        <Container fluid>
            <input
                type="hidden"
                value={query}
                onChange={event => setQuery(event.target.value)}
            />
            <Tabs defaultActiveKey="persons" id="uncontrolled-tab-example">
                <Tab eventKey="persons" title="Persons">
                    Person:
                    {data.person.professionalHeadline}
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

                                    <Carousel>
                                        {results.map(({id, objective, organizations}) => <Carousel.Item key={id}>
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
