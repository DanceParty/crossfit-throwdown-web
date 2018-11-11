import React from 'react'
import 'jest-dom/extend-expect'
import {fireEvent, waitForElement, cleanup, wait} from 'react-testing-library'
import renderWithRouter from '../utils/testRouter'
import App from '../App'
import * as dataHelpers from '../utils/dataHelpers'
import * as data from '../../seedData.json'
import {normalizeDataIntoArray} from '../utils/helpers'

afterEach(cleanup)

jest.mock('../utils/dataHelpers')

describe('adding a workout', () => {
  test('trying to insert a blank workout', () => {
    const {getByText} = renderWithRouter(<App />, {route: '/new-workout'})
    fireEvent.click(getByText('Submit'))
    expect(getByText('Please check the fields and try again')).toBeInTheDocument()
  })

  test('adding a workout', () => {
    const {getByText, getByLabelText, getByTestId} = renderWithRouter(<App />, {
      route: '/new-workout',
    })
    fireEvent.change(getByLabelText('Name*'), {target: {value: 'Moon Landing'}})
    fireEvent.change(getByTestId('type-select'), {target: {value: 'Timed'}})
    fireEvent.change(getByLabelText('Standards*'), {target: {value: 'Jump ship'}})
    fireEvent.change(getByTestId('rx-0'), {target: {value: 'RX 1'}})
    fireEvent.change(getByTestId('rx-1'), {target: {value: 'RX 2'}})
    fireEvent.change(getByTestId('scaled-0'), {target: {value: 'Scaled 1'}})
    fireEvent.change(getByTestId('scaled-1'), {target: {value: 'Scaled 2'}})
    fireEvent.click(getByText('Submit'))
    waitForElement(() => getByText('Workout added!'))
    expect(dataHelpers.postWorkout).toHaveBeenCalledTimes(1)
    dataHelpers.postWorkout.mock.calls.forEach(args => {
      expect(args).toEqual([
        {
          name: 'Moon Landing',
          type: 'Timed',
          standards: 'Jump ship',
          rx: ['RX 1', 'RX 2'],
          scaled: ['Scaled 1', 'Scaled 2'],
        },
      ])
    })
  })
})

describe('viewing workouts', () => {
  test('viewing all workouts', async () => {
    const {getByText} = renderWithRouter(<App />, {route: '/workouts'})
    await wait()
    const workouts = normalizeDataIntoArray(data.workouts)
    workouts.forEach(workout => {
      expect(getByText(workout.name)).toBeInTheDocument()
      expect(getByText(workout.type)).toBeInTheDocument()
    })
  })

  test('changing scores', async () => {
    const workouts = normalizeDataIntoArray(data.workouts)
    const scores = normalizeDataIntoArray(data.scores).filter(
      score => score.workoutId === workouts[0].id,
    )
    const competitors = {
      men: normalizeDataIntoArray(data.competitors.men),
      women: normalizeDataIntoArray(data.competitors.women),
    }
    const {getByText, getByTestId} = renderWithRouter(<App />, {
      route: `/workouts/${workouts[0].id}`,
    })
    await wait()

    competitors.men.forEach(man => {
      expect(getByText(`${man.firstName} ${man.lastName}`)).toBeInTheDocument()
    })
    competitors.women.forEach(woman => {
      expect(getByText(`${woman.firstName} ${woman.lastName}`)).toBeInTheDocument()
    })

    fireEvent.click(getByText('Edit Mode'))

    competitors.men.forEach(man => {
      expect(getByTestId(`${man.firstName}-${man.lastName}-input`)).toBeInTheDocument()
    })
    competitors.women.forEach(woman => {
      expect(getByTestId(`${woman.firstName}-${woman.lastName}-input`)).toBeInTheDocument()
    })
    const allCompetitors = competitors.men.concat(competitors.women)
    allCompetitors.forEach((competitor, i) => {
      fireEvent.change(getByTestId(`${competitor.firstName}-${competitor.lastName}-input`), {
        target: {value: i},
      })
    })

    fireEvent.click(getByText('Save'))

    let mockArgs = {}
    scores.forEach((scoreObj, i) => {
      const {competitorId, workoutId} = scoreObj
      mockArgs[`scores/${scoreObj.id}`] = {
        competitorId,
        workoutId,
        score: i,
      }
    })

    expect(dataHelpers.postScores).toHaveBeenCalledTimes(1)
    dataHelpers.postScores.mock.calls.forEach(args => {
      expect(args[0]).toEqual(mockArgs)
    })
  })
})
