import Head from 'next/head';
import Link from 'next/link';
import React from "react";

export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children, home }) {
  return (
    <div >
      <Head>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      </Head>
      <main>{children}</main>
      {!home && (
        <div >
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
