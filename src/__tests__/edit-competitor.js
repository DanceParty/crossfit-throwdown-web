import React from 'react'
import 'jest-dom/extend-expect'
import {waitForElement, cleanup, fireEvent, wait} from 'react-testing-library'
import renderWithRouter from '../utils/testRouter'
import App from '../App'
import * as dataHelpers from '../utils/dataHelpers'
import * as data from '../testData.json'

afterEach(cleanup)

jest.mock('../utils/dataHelpers')

describe('Edit Competitor', () => {
  const {competitors} = data
  const firstCompetitorId = Object.keys(competitors.men)[0]
  const competitor = competitors.men[firstCompetitorId]
  const ROUTE = `/competitors/men/${firstCompetitorId}`
  let render

  beforeEach(() => {
    render = renderWithRouter(<App />, {route: ROUTE})
  })

  test('editing an existing competitor', async () => {
    const editButtonText = 'Edit Competitor'
    const submitButtonText = 'Submit'

    const firstNameLabel = 'First name*'
    const lastNameLabel = 'Last name*'
    const divisionTestId = 'division-select'
    const affiliateLabel = 'Affiliate'

    const firstNameEvent = {target: {value: 'Green'}}
    const lastNameEvent = {target: {value: 'Grinch'}}
    const divisionEvent = {target: {value: 'RX'}}
    const affiliateEvent = {target: {value: 'Rooftop'}}

    const expectedArguments = [
      ROUTE,
      {
        firstName: firstNameEvent.target.value,
        lastName: lastNameEvent.target.value,
        division: divisionEvent.target.value,
        affiliate: affiliateEvent.target.value,
      },
    ]

    await waitForElement(() => [
      render.getByText(`${competitor.firstName} ${competitor.lastName}`, {exact: false}),
      render.getByText(competitor.division),
    ])

    fireEvent.click(render.getByText(editButtonText))

    // check default values
    expect(render.getByLabelText(firstNameLabel).value).toEqual(competitor.firstName)
    expect(render.getByLabelText(lastNameLabel).value).toEqual(competitor.lastName)
    expect(render.getByTestId(divisionTestId).value).toEqual(competitor.division)
    expect(render.getByLabelText(affiliateLabel).value).toEqual(competitor.affiliate)

    // change
    fireEvent.change(render.getByLabelText(firstNameLabel), firstNameEvent)
    fireEvent.change(render.getByLabelText(lastNameLabel), lastNameEvent)
    fireEvent.change(render.getByTestId(divisionTestId), divisionEvent)
    fireEvent.change(render.getByLabelText(affiliateLabel), affiliateEvent)

    const submitButton = render.getByText(submitButtonText)
    fireEvent.click(submitButton)

    await wait()

    expect(submitButton).not.toBeInTheDocument()

    expect(dataHelpers.updateCompetitor).toHaveBeenCalledTimes(1)

    dataHelpers.updateCompetitor.mock.calls.forEach(args => {
      expect(args).toEqual(expectedArguments)
    })
  })
})
