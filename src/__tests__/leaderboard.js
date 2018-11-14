import React from 'react'
import 'jest-dom/extend-expect'
import {fireEvent, waitForElement, cleanup} from 'react-testing-library'
import renderWithRouter from '../utils/testRouter'
import App from '../App'
import * as dataHelpers from '../utils/dataHelpers'

afterEach(cleanup)

jest.mock('../utils/dataHelpers')

describe('Viewing the leaderboard', () => {
  test('shows correct results', () => {
    const {getByText} = renderWithRouter(<App />, {route: '/leaderboard'})

  })
})