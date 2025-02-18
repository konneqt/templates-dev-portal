import BrowserOnly from '@docusaurus/BrowserOnly'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import Translate, { translate } from '@docusaurus/Translate'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import { clsx } from 'clsx'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect } from 'react'

import IconOctocat from '../../static/img/icons/octocat.svg'
import Mesh from '../components/Mesh'
import PickVersion from '../components/PickVersion'
import styles from './index.module.css'

gsap.registerPlugin(ScrollTrigger)

const description =
  'Our API Dev Portal is an environment designed to offer a more intuitive and organized experience when viewing your API documentation. Using Docusaurus, we provide a modern and pleasant interface, facilitating access to essential information for developers.'

function Home() {
  const { siteConfig, i18n } = useDocusaurusContext()
  const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark'

  useEffect(() => {
    document.querySelector('.navbar__inner').classList.add('tw-container', 'tw-mx-auto')

    gsap.from('.scroll-to-display', {
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.25,
      scrollTrigger: {
        trigger: '.scroll-to-display',
        toggleActions: 'restart none none none',
      },
    })

    gsap.from('.scroll-to-display-x', {
      duration: 1,
      opacity: 0,
      x: 0,
      y: 100,
      stagger: 0.25,
      scrollTrigger: {
        trigger: '.scroll-to-display-x',
        toggleActions: 'restart none none none',
      },
    })
  }, [])

  return (
    <Layout description={translate({ message: description, id: 'home.desc' })}>
      <Head>
        <title>Quantum API Dev Portal</title>
      </Head>
      <main>
        <div className="hero tw-relative tw-h-[768px] tw-pt-0 tw-overflow-hidden">
          <BrowserOnly>{() => <Mesh />}</BrowserOnly>
          <div className="tw-container tw-mx-auto tw-z-10">
            <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-justify-between lg:tw-items-center">
              <div className="tw-flex-[.8] 2xl:tw-flex-[.6] tw-p-6 lg:tw-p-3 tw-max-w-[600px]">
                <h1
                  className={clsx(
                    'tw-inline-block tw-text-5xl xl:tw-text-6xl tw-text-left tw-rounded-2xl tw-backdrop-blur-sm lg:tw-backdrop-blur',
                  )}
                >
                  {/* Due to the below texts are not simple strings, so we can't use <Translate /> here. */}
                  {i18n.currentLocale === 'en' && (
                    <>
                      <span>Document</span>
                      <br />
                      <span>Your</span>
                      <span className={clsx(styles.heroTitle)}> APIs </span>
                      <br />
                      <span>Efficiently</span>
                    </>
                  )}
                </h1>
                <p className="lg:tw-text-lg tw-font-medium tw-rounded-2xl tw-backdrop-blur-sm lg:tw-backdrop-blur tw-mt-4">
                  <Translate id="home.desc">{description}</Translate>
                </p>
                <div className="tw-flex tw-gap-3">
                  <Link
                    to="/docs/production-installation-using-helm"
                    className="tw-btn tw-bg-[#6379f2] tw-text-[#FFF] hover:-tw-translate-y-[3px] hover:tw-bg-[#6379f2] hover:tw-text-[#FFF]"
                  >
                    <Translate id="home.getstarted">Documentation →</Translate>
                  </Link>
                  <Link
                    to="https://github.com/chaos-mesh/chaos-mesh"
                    className="tw-btn !tw-btn-neutral tw-gap-2 dark:tw-glass hover:-tw-translate-y-[3px]"
                  >
                    <IconOctocat className="tw-w-4 tw-h-4 tw-fill-white" />
                    GitHub
                  </Link>
                </div>
              </div>

              <div className="lg:max-xl:tw-w-[500px] tw-p-6 lg:tw-p-3"></div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Home
