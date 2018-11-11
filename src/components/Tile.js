import React from 'react'
import styled from 'styled-components'
import {Link} from '@reach/router'

const Body = styled.article`
  transition: all 0.15s ease;
  &:hover {
    transform: translateY(-0.5px);
    box-shadow: 0 7px 14px hsla(240, 30%, 28%, 0.1), 0 3px 6px hsla(0, 0%, 0%, 0.1);
  }
  &:active {
    transform: translateY(0.5px);
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  }
`

const TileGroup = ({children}) => (
  <div className="tile is-ancestor">
    <div className="tile is-vertical is-full">{children}</div>
  </div>
)

const TileRow = ({children}) => <div className="tile">{children}</div>

const Tile = ({link, title, subtitle = '', color}) => (
  <div className="tile is-parent is-vertical">
    <Link to={link}>
      <Body className={`tile is-child notification is-${color} has-text-centered`}>
        <p className="subtitle">{subtitle}</p>
        <p className="title">{title}</p>
      </Body>
    </Link>
  </div>
)

export {TileRow, TileGroup, Tile}
