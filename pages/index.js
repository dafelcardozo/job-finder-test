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
    const fetchData = async () => {
        const result = await axios.get('/api/bios?profile=dafelcardozo');
        setData(result.data);
    }
    useEffect( () => {
        fetchData();

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
