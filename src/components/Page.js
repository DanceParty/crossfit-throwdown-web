import React from 'react'
import {Link} from '@reach/router'
import Header from './Header'

const Page = ({header, link, children}) => (
  <div className="container">
    <Header>
      {header === 'Throwdown' ? (
        <Link to={`${link}`}>{header}</Link>
      ) : (
        <Link to={`${link}`}>{`< ${header}`}</Link>
      )}
    </Header>
    <div className="section">{children}</div>
  </div>
)

export default Page
