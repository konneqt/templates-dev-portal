import React from 'react';

import Layout from '@theme/Layout';

import HomepageFeatures from '../components/pages/home/features/features';
import HomeHero from '../components/pages/home/hero/hero';
import styles from './index.module.css';
import { SectionContainer } from '@site/src/components/pages/home/container/section-container';


export default function Home() {
  return (
    <Layout
    >
      <HomeHero />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 320"
        className={styles.heroWave}
      >
        <path
          fill="var(--ifm-color-primary)"
          fillOpacity="1"
          d="M0,224L48,202.7C96,181,192,139,288,133.3C384,128,480,160,576,149.3C672,139,768,85,864,58.7C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      <SectionContainer>
        <HomepageFeatures />
      </SectionContainer>
    </Layout>
  );
}
