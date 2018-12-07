import React from 'react'
import 'jest-dom/extend-expect'
import {fireEvent, waitForElement, cleanup, wait} from 'react-testing-library'
import renderWithRouter from '../utils/testRouter'
import App from '../App'
import * as dataHelpers from '../utils/dataHelpers'

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
    const competitorId = '1'
    const competitor = {
      affiliate: 'Crossfit Yuma',
      division: 'Scaled',
      firstName: 'Colby',
      lastName: 'Carr',
    }
    const {getByText, getByLabelText, getByTestId} = renderWithRouter(<App />, {
      route: `/competitors/men/${competitorId}`,
    })
    await waitForElement(() => getByText(/Colby Carr/))
    expect(getByText(/Scaled/)).toBeInTheDocument()

    // edit
    fireEvent.click(getByText('Edit Competitor'))
    const firstNameInput = getByLabelText('First name*')
    const lastNameInput = getByLabelText('Last name*')
    const divisionInput = getByTestId('division-select')
    const affiliateInput = getByLabelText('Affiliate')
    expect(firstNameInput.value).toEqual(competitor.firstName)
    expect(lastNameInput.value).toEqual(competitor.lastName)
    expect(divisionInput.value).toEqual(competitor.division)
    expect(affiliateInput.value).toEqual(competitor.affiliate)
    fireEvent.change(firstNameInput, {target: {value: 'Green'}})
    fireEvent.change(lastNameInput, {target: {value: 'Grinch'}})
    fireEvent.change(divisionInput, {target: {value: 'RX'}})
    fireEvent.change(affiliateInput, {target: {value: 'Chimney'}})
    const submitButton = getByText('Submit')
    fireEvent.click(submitButton)
    await wait()
    expect(submitButton).not.toBeInTheDocument()
  })
})
