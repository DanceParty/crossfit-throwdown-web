import React from 'react'
import {Link} from '@reach/router'
import Header from './Header'

const Page = ({header, link, children}) => (
  <div className="container">
    <Header>
      {header === 'CrossFit Yuma Throwdown' ? (
        <Link to={`${link}`}>{header}</Link>
      ) : header === 'Login' ? (
        <span>{header}</span>
      ) : (
        <Link to={`${link}`}>{`< ${header}`}</Link>
      )}
    </Header>
    <div className="section">{children}</div>
  </div>
)

export default Page
