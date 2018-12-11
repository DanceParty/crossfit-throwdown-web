import React from 'react'
import 'jest-dom/extend-expect'
import {waitForElement, cleanup} from 'react-testing-library'
import renderWithRouter from '../utils/testRouter'
import App from '../App'
import * as api from '../utils/api'
import * as data from '../testData'

afterEach(cleanup)

jest.mock('../utils/api')

describe('Workouts', () => {
  const ROUTE = '/workouts'
  const {workouts} = data
  let render

  beforeEach(() => {
    render = renderWithRouter(<App />, {route: ROUTE})
  })

  test('displaying all workouts', async () => {
    const nameHeader = 'Name'
    const typeHeader = 'Type'
    const workoutsArr = Object.keys(workouts).map(key => workouts[key])

    await waitForElement(() => [render.getByText(nameHeader), render.getByText(typeHeader)])

    workoutsArr.forEach(workout => {
      expect(render.getByText(workout.name)).toBeInTheDocument()
      expect(render.getByText(workout.type)).toBeInTheDocument()
    })

    expect(api.fetchWorkouts).toHaveBeenCalledTimes(1)
  })
})
