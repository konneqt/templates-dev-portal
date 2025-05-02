// src/components/sidebar/index.jsx
import React from 'react';
import Layout from '@theme/Layout';
import SimpleSidebar from './SimpleSidebar';
// Removemos a importação do useColorMode daqui

// Componente filho que usa useColorMode
function PageContent({children}) {
  // useColorMode será usado aqui depois que Layout for montado
  return (
    <div className="container">
      <div className="row">
        <div className="col col--3">
          <div 
            style={{
              position: 'sticky',
              top: 'var(--ifm-navbar-height)',
              height: 'calc(100vh - var(--ifm-navbar-height))',
              overflowY: 'auto',
              paddingTop: '1rem',
              borderRight: '1px solid var(--ifm-toc-border-color)',
            }}
          >
            <SimpleSidebar />
          </div>
        </div>
        <div className="col col--9">
          <main>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function CustomPageLayout({children, title, description, notification}) {
  return (
    <Layout title={title} description={description}>
      {notification}
      <PageContent>
        {children}
      </PageContent>
    </Layout>
  );
}