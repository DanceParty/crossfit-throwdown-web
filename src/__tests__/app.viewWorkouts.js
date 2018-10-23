import React from 'react'
import { waitForElement, wait } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { database } from '../utils/firebase'
import renderWithRouter from '../utils/testRouter'
import App from '../App'
import { test } from '../utils/keys'

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

beforeAll(async () => {
  try {
    await database.ref('/workouts').push(gsl)
    await database.ref('/workouts').push(wcs)
    await database.ref('/workouts').push(ksl)
    console.log('competitors successfully added')
  } catch (e) {
    console.error('app.viewWorkouts.js - ERROR IN BEFORE ALL, ', e)
  }
})

afterAll(async () => {
  try {
    await database.ref('/').remove()
    console.log('database successfully removed')
  } catch (e) {
    console.error('app.viewWorkouts.js - ERROR IN AFTER ALL, ', e)
  }
})

test('viewing male competitors', async () => {
  const { getByText } = renderWithRouter(<App />, {
    route: '/workouts',
  })

  await wait()

  const gslName = getByText(gsl.name)
  const gslType = getByText(gsl.type)

  const wcsName = getByText(wcs.name)
  const wcsType = getByText(wcs.type)

  const kslName = getByText(ksl.name)
  const kslType = getByText(ksl.type)

  expect(gslName).toBeInTheDocument()
  expect(gslType).toBeInTheDocument()
  expect(wcsName).toBeInTheDocument()
  expect(wcsType).toBeInTheDocument()
  expect(kslName).toBeInTheDocument()
  expect(kslType).toBeInTheDocument()
})
