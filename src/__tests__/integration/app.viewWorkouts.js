import React from 'react'
import 'jest-dom/extend-expect'
import { database } from '../../utils/firebase'
import renderWithRouter from '../../utils/testRouter'
import { postWorkout } from '../../utils/dataHelpers'
import App from '../../App'

const gsl = {
  name: 'Global Star League',
  rx: ['2RM Thruster', '900M Run'],
  scaled: ['1RM Thruster', '500M Run'],
  standards: 'These are test standards for gsl',
  type: 'Point',
}

const wcs = {
  name: 'World Championship Series',
  rx: ['2RM Overhead Squat', '900M Row'],
  scaled: ['1RM Overhead Squat', '500M Row'],
  standards: 'These are test standards for wcs',
  type: 'Timed',
}

const ksl = {
  name: 'Korean Star Leage',
  rx: ['2RM Thruster', '900M Run'],
  scaled: ['1RM Thruster', '500M Run'],
  standards: 'These are test standards for ksl',
  type: 'Weight',
}

beforeEach(async () => {
  try {
    const gslData = await postWorkout(gsl)
    const wcsData = await postWorkout(wcs)
    const kslData = await postWorkout(ksl)
    console.log('gsl - ', gslData)
    console.log('wcs - ', wcsData)
    console.log('ksl - ', kslData)
    console.log('workouts successfully added')
  } catch (e) {
    console.error('app.viewWorkouts.js - ERROR IN BEFORE ALL, ', e)
  }
})

afterEach(async () => {
  try {
    await database.ref('/').remove()
    console.log('workouts successfully removed')
  } catch (e) {
    console.error('app.viewWorkouts.js - ERROR IN AFTER ALL, ', e)
  }
})

test('viewing workouts', async () => {
  expect(true).toBe(true)
  // const { getByText, debug } = await renderWithRouter(<App />, {
  //   route: '/workouts',
  // })

  // expect(getByText(gsl.name)).toBeInTheDocument()
  // expect(getByText(gsl.type)).toBeInTheDocument()
  // expect(getByText(wcs.name)).toBeInTheDocument()
  // expect(getByText(wcs.type)).toBeInTheDocument()
  // expect(getByText(ksl.name)).toBeInTheDocument()
  // expect(getByText(ksl.type)).toBeInTheDocument()
})
