import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './navigation'
import Navigation from "./navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

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
    return (
        <div className="App">
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
                    Opportunities:
                    <ul>
                        {results.map(r => <li>{r.objective}</li>)}
                    </ul>
                </Tab>
            </Tabs>
        </div>
    );
}


export default function Home({ allPostsData }) {
  return (
    <Layout home>
        <Navigation/>
      <Head>
        <title>{siteTitle}</title>
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
