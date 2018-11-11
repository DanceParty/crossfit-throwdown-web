import React from 'react'
import 'jest-dom/extend-expect'
import {fireEvent, waitForElement, cleanup} from 'react-testing-library'
import renderWithRouter from '../utils/testRouter'
import App from '../App'
import * as dataHelpers from '../utils/dataHelpers'

afterEach(cleanup)

jest.mock('../utils/dataHelpers')

describe('Adding a new Competitor', () => {
  test('trying to insert a blank competitor', () => {
    const {getByText} = renderWithRouter(<App />, {route: '/new-competitor'})
    fireEvent.click(getByText('Submit'))
    expect(getByText('Please check the fields and try again')).toBeInTheDocument()
  })

  test('adding a competitor', async () => {
    const {getByText, getByLabelText, getByTestId} = renderWithRouter(<App />, {
      route: '/new-competitor',
    })
    fireEvent.change(getByLabelText('First name*'), {target: {value: 'BAD'}})
    fireEvent.change(getByLabelText('Last name*'), {target: {value: 'MAMMAJAMMA'}})
    fireEvent.change(getByTestId('gender-select'), {target: {value: 'Male'}})
    fireEvent.change(getByTestId('division-select'), {target: {value: 'RX'}})
    fireEvent.change(getByLabelText('Affiliate'), {target: {value: 'Crossfit Yuma'}})
    fireEvent.click(getByText('Submit'))
    waitForElement(() => getByText('Competitor added!'))
    expect(dataHelpers.postCompetitor).toHaveBeenCalledTimes(1)
    dataHelpers.postCompetitor.mock.calls.forEach(args => {
      expect(args).toEqual([
        {
          firstName: 'BAD',
          lastName: 'MAMMAJAMMA',
          division: 'RX',
          affiliate: 'Crossfit Yuma',
        },
        'men',
      ])
    })
  })
})
