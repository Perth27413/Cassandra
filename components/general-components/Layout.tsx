import React from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar'
import './Layout.scss'

const Layout: React.FC = ({children}) => {
  return (
    <>
      <Head>
        <title>Carbon Footprint</title>
        <meta property="og:title" content="Carbon Footprint" key="title" />
        <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
      </Head>
      <div id="layout">
        <Sidebar/>
        <div id="mainBox">
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout
