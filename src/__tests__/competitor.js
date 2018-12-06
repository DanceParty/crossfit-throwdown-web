import React from 'react'
import 'jest-dom/extend-expect'
import {fireEvent, waitForElement, cleanup} from 'react-testing-library'
import renderWithRouter from '../utils/testRouter'
import App from '../App'
import * as dataHelpers from '../utils/dataHelpers'
import * as data from '../../seedData.json'

afterEach(cleanup)

jest.mock('../utils/dataHelpers')

describe('Competitor', () => {
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
    await waitForElement(() => getByText('Competitor added!'))
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

  test('viewing all competitors', async () => {
    const {getByText, queryAllByTestId} = renderWithRouter(<App />, {route: '/competitors'})
    // make sure all competitors are loading on the page
    await waitForElement(() => getByText('Men - RX'))
    expect(getByText('Men - RX')).toBeInTheDocument()
    expect(getByText('Men - Scaled')).toBeInTheDocument()
    expect(getByText('Women - RX')).toBeInTheDocument()
    expect(getByText('Women - Scaled')).toBeInTheDocument()
    const competitors = queryAllByTestId(/row/)
    expect(competitors.length).toBeGreaterThan(0)
  })

  test('editing a competitor', async () => {
    const competitorId = Object.keys(data.competitors.men)[0]
    const competitor = data.competitors.men[competitorId]
    const {getByText, getByLabelText, getByTestId, debug} = renderWithRouter(<App />, {
      route: `/competitors/men/${competitorId}`,
    })
    // Change data here if data.json changes. Couldn't figure out how
    // to use variables in text matching so just hard coded
    await waitForElement(() => getByText(/Keevan Dance/))
    expect(getByText(/Crossfit Chicago/)).toBeInTheDocument()
    expect(getByText(/RX/)).toBeInTheDocument()
    // Scores
    expect(getByText(/100/)).toBeInTheDocument()
    expect(getByText(/200/)).toBeInTheDocument()
    expect(getByText(/300/)).toBeInTheDocument()
    expect(getByText(/140/)).toBeInTheDocument()
    fireEvent.click(getByText('Edit'))
    debug()
    fireEvent.change(getByLabelText('First name*'), {target: {value: 'BAD'}})
    fireEvent.change(getByLabelText('Last name*'), {target: {value: 'MAMMAJAMMA'}})
    fireEvent.change(getByTestId('gender-select'), {target: {value: 'Male'}})
    fireEvent.change(getByTestId('division-select'), {target: {value: 'RX'}})
    fireEvent.change(getByLabelText('Affiliate'), {target: {value: 'Crossfit Yuma'}})
  })
})

// describe('editing a competitor', () => {
//   test('edit a competitor', async () => {
//     const {getByText, getByLabelText, getByTestId, debug} = renderWithRouter(<App />, {
//       route: '/competitors',
//     })
//     await waitForElement(() => getByText('&lt; Competitors'))
//     // expect(getByText('Men - RX')).toBeInTheDocument()
//     // expect(getByText('Men - Scaled')).toBeInTheDocument()
//     // expect(getByText('Women - RX')).toBeInTheDocument()
//     // expect(getByText('Women - Scaled')).toBeInTheDocument()
//     // debug()
//   })
// })
