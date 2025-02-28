import { IconAdjustments, IconFileInfinity, IconPlugConnected, TablerIcon } from '@tabler/icons-react'
import React from 'react'

interface Feature {
  icon: TablerIcon
  title: string
  content: string
}

const featureList: Feature[] = [
  {
    icon: IconPlugConnected,
    title: 'OpenAPI Integration',
    content:
      ' Our Dev Portal uses docusaurus-plugin-openapi-docs, which is highly compatible with the OpenAPI 3.x and Swagger 2.0 specifications. This allows you to easily integrate your API with the portal, transforming your OpenAPI definitions into clear and precise documentation without manual effort. ',
  },
  {
    icon: IconFileInfinity,
    title: 'Quick Documentation',
    content:
      'Our platform offers a fast and efficient way of generating documentation for your API, using your OpenAPI definition files. This means that you can obtain up-to-date documentation continuously and without interruption and without the need for constant manual updates.',
  },
  {
    icon: IconAdjustments,
    title: 'Customizable Interface',
    content:
      'As well as being functional, our solution offers a visually appealing and easy-to-use interface, built with Docusaurus and Infima, which provides a professional and responsive appearance for your Dev Portal. The result is a platform that is both useful for developers and easy to navigate for API consumers.',
  },
]

function FeatureComponent({ icon: Icon, title, content }: Feature) {
  return (
    <div className="feature-card">
      <div className="feature-header">
        <div className="feature-icon">
          <Icon size={40} />
        </div>
        <h3 className="feature-title">{title}</h3>
      </div>
      <p className="feature-content">{content}</p>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <>
      <h1 className="feature-mainText">
        Your API Documentation: <br/>
        <span className="feature-subtitle"> Integrated, Automated, Customized</span>
      </h1>
      <div className="feature-container">
        {featureList.map((feature, idx) => (
          <FeatureComponent key={idx} {...feature} />
        ))}
      </div>
    </>
  )
}
