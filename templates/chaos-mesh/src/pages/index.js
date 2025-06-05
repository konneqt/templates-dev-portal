import BrowserOnly from '@docusaurus/BrowserOnly'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import Translate, { translate } from '@docusaurus/Translate'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import { clsx } from 'clsx'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useState } from 'react' // Adicione useState aqui
import IconOctocat from '../../static/img/icons/octocat.svg'
import Mesh from '../components/Mesh'
import styles from './index.module.css'
import HomepageFeatures from '../components/features'

gsap.registerPlugin(ScrollTrigger)

const description =
  'Our API Dev Portal is an environment designed to offer a more intuitive and organized experience when viewing your API documentation. Using Docusaurus, we provide a modern and pleasant interface, facilitating access to essential information for developers.'

function Home() {
  const { siteConfig, i18n } = useDocusaurusContext()
  const [isDarkTheme, setIsDarkTheme] = useState(false) // State para o tema

  useEffect(() => {
    // Verifica o tema apenas no browser
    const checkTheme = () => {
      setIsDarkTheme(document.documentElement.getAttribute('data-theme') === 'dark')
    }
    
    checkTheme() // Verifica na montagem
    
    // Observer para mudanças de tema (opcional)
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })

    document.querySelector('.navbar__inner').classList.add(styles.container)

    gsap.from(`.${styles.scrollToDisplay}`, {
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.25,
      scrollTrigger: {
        trigger: `.${styles.scrollToDisplay}`,
        toggleActions: 'restart none none none',
      },
    })

    gsap.from(`.${styles.scrollToDisplayX}`, {
      duration: 1,
      opacity: 0,
      x: 0,
      y: 100,
      stagger: 0.25,
      scrollTrigger: {
        trigger: `.${styles.scrollToDisplayX}`,
        toggleActions: 'restart none none none',
      },
    })

    // Cleanup
    return () => observer.disconnect()
  }, [])

  return (
    <Layout description={translate({ message: description, id: 'home.desc' })}>
      <Head>
        <title>Quantum API Dev Portal</title>
      </Head>
      <main className={styles.main}>
        {/* Mesh como background */}
        <div className={styles.meshBackground}>
          <BrowserOnly>{() => <Mesh />}</BrowserOnly>
        </div>

        <div className={styles.hero}>
          <div className={styles.container}>
            <div>
              <div>
                <h1 className={clsx(styles.heroTitle)}>
                  {i18n.currentLocale === 'en' && (
                    <>
                      <span>Document </span> <br/>
                      <span>Your</span>
                      <span className={clsx(styles.highlight)}> APIs </span> <br/>
                      <span>Efficiently</span>
                    </>
                  )}
                </h1>
                <p className={styles.description}>
                  <Translate id="home.desc">{description}</Translate>
                </p>
                {/* Agora você pode usar isDarkTheme aqui */}
                <div className={clsx(styles.buttonGroup, isDarkTheme && styles.darkTheme)}>
                  <Link to="/quantum-dev-portal/docs/apis/" className={styles.primaryButton}>
                    <Translate id="home.getstarted">Documentation →</Translate>
                  </Link>
                  <Link to="https://github.com/konneqt/quantum-dev-portal" className={styles.secondaryButton}>
                    <IconOctocat className={styles.icon} />
                    GitHub
                  </Link>
                </div>
              </div>
              <div className={styles.imageContainer}></div>
            </div>
          </div>
        </div>

        <HomepageFeatures/>
      </main>
    </Layout>
  )
}

export default Home