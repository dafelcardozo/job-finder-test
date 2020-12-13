import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Date from '../components/date'
import axios from 'axios'



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
            <header className="App-header">
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>

            </header>
            <input
                type="text"
                value={query}
                onChange={event => setQuery(event.target.value)}
            />
            Person:
            {data.person.professionalHeadline}
            Opportunities:
            <ul>
                {results.map(r => <li>{r.objective}</li>)}
            </ul>
        </div>
    );
}


export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <SecondComponent/>
      </section>
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
