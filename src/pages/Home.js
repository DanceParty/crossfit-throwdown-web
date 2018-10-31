import React from 'react'
import Page from '../components/Page'
import {TileGroup, TileRow, Tile} from '../components/Tile'

const Home = () => (
  <Page header="Throwdown" link="/">
    <TileGroup>
      <TileRow>
        <Tile
          color="info"
          title="COMPETITOR"
          subtitle="ADD"
          link="/new-competitor"
        />
        <Tile color="info" title="WORKOUT" subtitle="ADD" link="/new-workout" />
      </TileRow>
      <TileRow>
        <Tile
          color="primary"
          title="COMPETITORS"
          subtitle="VIEW"
          link="/competitors"
        />
        <Tile
          color="primary"
          title="WORKOUTS"
          subtitle="VIEW"
          link="/workouts"
        />
      </TileRow>
      <TileRow>
        <Tile color="success" title="LEADERBOARD" link="/leaderboard" />
      </TileRow>
    </TileGroup>
  </Page>
)

export default Home
