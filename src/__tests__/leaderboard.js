import {splitScoresByValidity} from '../utils/scoring'
import {sortCompetitorsListByScore} from '../utils/helpers'

describe('Leaderboard', () => {
  test('splitScoresByValidity - normal scores and competitors', () => {})
  test('sortCompetitorsByNormalWorkout - normal scores', () => {
    const competitors = [
      {
        id: '1',
        firstName: 'Keevan',
        lastName: 'Dance',
        division: 'RX',
        affiliate: 'Crossfit Chicago',
      },
      {
        id: '2',
        firstName: 'Colby',
        lastName: 'Carr',
        division: 'RX',
        affiliate: '',
      },
    ]
    const scores = [
      {
        id: '1',
        competitorId: '1',
        workoutId: '1',
        score: 100,
      },
      {
        id: '2',
        competitorId: '2',
        workoutId: '1',
        score: 200,
      },
      {
        id: '3',
        competitorId: '1',
        workoutId: '2',
        score: 150,
      },
      {
        id: '4',
        competitorId: '2',
        workoutId: '2',
        score: 125,
      },
    ]
  })
})
