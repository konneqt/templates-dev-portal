import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import { IconArrowRight } from '@tabler/icons-react';
import clsx from 'clsx';
import styles from '../../../../pages/index.module.css';

export default function HomeHero() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner, styles.hero)}>
      <div className="container" style={{ zIndex: 1,  textAlign: 'center' }}>
        <div className="row">
          <div className="col">
            <h1 className="hyphens-auto font-extrabold">Quantum API Dev Portal</h1>
            <p className={'text-2xl'}>
              Our API Dev Portal is an environment designed to offer a more intuitive and organized
              experience when viewing your API documentation. Using Docusaurus, we provide a modern
              and pleasant interface, facilitating access to essential information for developers.
            </p>

            <Link
              data-umami-event="Install button"
              className={
                'button button--secondary button--lg rounded-3xl dark:border-zinc-600 dark:bg-zinc-800'
              }
              to="/docs/getting-started"
            >
              <div className={'flex items-center gap-3'}>
                <span className={'dark:text-gray-200'}>Get Started</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}


