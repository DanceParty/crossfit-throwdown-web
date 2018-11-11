import React, {Component} from 'react'
import {Router} from '@reach/router'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import NewCompetitor from './pages/NewCompetitor'
import NewWorkout from './pages/NewWorkout'
import Workouts from './pages/Workouts'
import Competitors from './pages/Competitors'
import Leaderboard from './pages/Leaderboard'
import WorkoutDetail from './pages/WorkoutDetail'
import CompetitorDetail from './pages/CompetitorDetail'
import Auth from './components/Auth'

class App extends Component {
  render() {
    return (
      <Auth>
        <Router>
          <Home path="/" />
          <Workouts path="/workouts" />
          <Competitors path="/competitors" />
          <NewCompetitor path="/new-competitor" />
          <NewWorkout path="/new-workout" />
          <Leaderboard path="/leaderboard" />
          <WorkoutDetail path="/workouts/:workoutId" />
          <CompetitorDetail path="/competitors/:gender/:competitorId" />
          <NotFound default />
        </Router>
      </Auth>
    )
  }
}

export default App
