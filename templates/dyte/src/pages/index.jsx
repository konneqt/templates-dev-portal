import React, { useState } from 'react';
import Layout from '@theme/Layout';

import HeroSection from '../components/homepage/HeroSection';
import APIReferenceSection from '../components/homepage/APIReferenceSection';
import HomeFooter from '../components/homepage/HomeFooter';
import Head from '@docusaurus/Head';

export default function Homepage() {
  return (
    <Layout
      title="Quantum API Dev Portal"
      wrapperClassName="homepage flex flex-col"
      noFooter
    >
      <Head>
        <link rel="prefetch" href="/assets/css/elements.min.css" />
      </Head>

      <HeroSection />

      <APIReferenceSection />

      <HomeFooter />
    </Layout>
  );
}
