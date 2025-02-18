import React from 'react';
import Link from '@docusaurus/Link';
import {
  LiveRegular,
  ArchiveRegular,
  GridRegular,
} from '@fluentui/react-icons';

import clsx from 'clsx';

interface HeroProductProps {
  link: string;
  title: string;
  icon: React.ComponentType<{ className: string }>;
  text: string;
}

const PRODUCTS = [
  {
    title: 'Introduction',
    link: '/intro',
    icon: GridRegular,
    text: 'Understand the structure of the project, and if it is not necessary for you, feel free to delete this page.',
  },
  {
    title: 'Tutorial Basics',
    link: '/guides/voice-conf/intro-voice-conf',
    icon: ArchiveRegular,
    text: 'Learn how to create your documents and how to organize them within your project.',
  },
  {
    title: 'Quantum Api Dev Portal',
    link: '/guides/livestream/livestream-overview',
    icon: LiveRegular,
    text: 'Use our Dev Portal and document your APIs in a dynamic way, with a pleasant and easy-to-understand layout.',
  },
];

function HeroProduct({ link, title, icon: Icon, text }: HeroProductProps) {
  return (
    <React.Fragment>
      <Link
        to={link}
        style={{
          borderWidth: '1px',
        }}
        className={clsx(
          'group cursor-pointer overflow-clip rounded-3xl from-primary/30 via-transparent to-transparent text-black transition-all hover:bg-gradient-to-tr hover:text-primary hover:no-underline dark:text-white',
          'w-[90vw] border-secondary-700 bg-secondary-900 hover:!border-primary dark:border-secondary-800 sm:w-[440px]',
        )}
      >
        <div className="p-6 !pb-0">
          <h3 className="mb-1.5 flex items-center gap-3 font-jakarta group-hover:text-primary">
            <Icon className="h-7 w-7" />
            <div>{title}</div>
          </h3>
          <p className="mb-5 text-sm text-zinc-400">{text}</p>
        </div>
      </Link>
    </React.Fragment>
  );
}

export default function HeroSection() {
  return (
    <div className="noise-bg pb-14">
      <section className="no-underline-links px-4 pt-16 lg:py-0">
        <div className="flex flex-col items-center justify-between py-14">
          <h2 className="mb-4 font-jakarta text-5xl font-bold">
            Welcome to the Quantum API Dev-Portal!
          </h2>
          <p className="max-w-xl text-center text-text-400">
            Our API Dev Portal is an environment designed to offer a more
            intuitive and organized experience when viewing your API
            documentation. Using Docusaurus, we provide a modern and pleasant
            interface, facilitating access to essential information for
            developers.
          </p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-6 px-4">
        {PRODUCTS.map((product) => (
          <HeroProduct {...product} key={product.title} />
        ))}
      </section>
    </div>
  );
}
