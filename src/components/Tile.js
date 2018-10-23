import React from 'react'
import { Link } from '@reach/router'

const TileGroup = ({ children }) => (
  <div className="tile is-ancestor">
    <div className="tile is-vertical is-full">{children}</div>
  </div>
)

const TileRow = ({ children }) => <div className="tile">{children}</div>

const Tile = ({ link, title, subtitle = '', color }) => (
  <div className="tile is-parent is-vertical">
    <Link to={link}>
      <article
        className={`tile is-child notification is-${color} has-text-centered`}
      >
        <p className="subtitle">{subtitle}</p>
        <p className="title">{title}</p>
      </article>
    </Link>
  </div>
)

export { TileRow, TileGroup, Tile }
