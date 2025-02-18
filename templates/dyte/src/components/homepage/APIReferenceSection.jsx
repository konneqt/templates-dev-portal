import React from 'react';
import Link from '@docusaurus/Link';
import { ArrowUpRight } from 'react-feather';
import Head from '@docusaurus/Head';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function APIReferenceSection() {
  // Usando useBaseUrl para garantir o caminho correto das imagens
  const lightImage = useBaseUrl('/apiWhite.png');
  const darkImage = useBaseUrl('/apiDark.png');

  return (
    <section className="no-underline-links relative px-6">
      <Head>
        <link rel="prefetch" href={lightImage} />
        <link rel="prefetch" href={darkImage} />
      </Head>
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-10 rounded-2xl bg-gradient-to-r from-black to-zinc-800 px-6 py-20 text-center text-white dark:from-zinc-100 dark:to-white dark:text-black lg:flex-row lg:p-20 lg:text-left">
        <Link
          href="/quantum-dev-portal/docs"
          aria-label="API Reference"
          target="_blank"
          className="absolute top-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-600/40 dark:bg-transparent"
        >
          <ArrowUpRight className="h-6 w-6 text-zinc-400 dark:text-black" />
        </Link>
        <div className="flex-1">
          <h2 className="text-4xl">Quantum API Dev Portal</h2>
          <p className="text-zinc-400">
            Explore the Quantum API Dev Portal and discover an intuitive,
            easy-to-navigate interface designed to make documenting your APIs
            more accessible and understandable. Navigate through clear and
            organized documentation, making the process of exploring and using
            your APIs more agile and efficient.
          </p>
          <Link
            href="/quantum-dev-portal/docs"
            className="font-medium text-primary-100 dark:text-primary"
          >
            Get started with Quantum API Dev Portal &rarr;
          </Link>
        </div>
        <div className="flex flex-1 justify-end">
          <ThemedImage
            sources={{
              light: lightImage,
              dark: darkImage,
            }}
            alt="API Reference Preview"
            style={{
              maxHeight: '400px',
              objectFit: 'contain',
            }}
            onError={(e) => {
              console.error('Image failed to load:', e.target.src);
            }}
          />
        </div>
      </div>
    </section>
  );
}
