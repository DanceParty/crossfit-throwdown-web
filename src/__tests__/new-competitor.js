import React from 'react'
import 'jest-dom/extend-expect'
import {fireEvent, waitForElement, cleanup, wait} from 'react-testing-library'
import renderWithRouter from '../utils/testRouter'
import App from '../App'
import * as dataHelpers from '../utils/dataHelpers'

afterEach(cleanup)

jest.mock('../utils/dataHelpers')

describe('New Competitor', () => {
  const ROUTE = '/new-competitor'
  let render
  let buttonText = 'Submit'

  beforeEach(() => {
    render = renderWithRouter(<App />, {route: ROUTE})
  })

  test('trying to insert a blank competitor', () => {
    const errorText = 'Please check the fields and try again'

    fireEvent.click(render.getByText(buttonText))
    expect(render.getByText(errorText)).toBeInTheDocument()
  })

  test('adding a competitor', async () => {
    const firstNameLabelText = 'First name*'
    const lastNameLabelText = 'Last name*'
    const genderTestId = 'gender-select'
    const divisionTestId = 'division-select'
    const affiliateLabelText = 'Affiliate'

    const firstNameEvent = {target: {value: 'Tyler'}}
    const lastNameEvent = {target: {value: 'The Creator'}}
    const genderEvent = {target: {value: 'Male'}}
    const divisionEvent = {target: {value: 'RX'}}
    const affiliateEvent = {target: {value: 'Crossfit Los Angelas'}}

    const successText = 'Competitor added!'

    const expectedArgs = [
      {
        firstName: firstNameEvent.target.value,
        lastName: lastNameEvent.target.value,
        division: divisionEvent.target.value,
        affiliate: affiliateEvent.target.value,
      },
      'men',
    ]

    fireEvent.change(render.getByLabelText(firstNameLabelText), firstNameEvent)
    fireEvent.change(render.getByLabelText(lastNameLabelText), lastNameEvent)
    fireEvent.change(render.getByTestId(genderTestId), genderEvent)
    fireEvent.change(render.getByTestId(divisionTestId), divisionEvent)
    fireEvent.change(render.getByLabelText(affiliateLabelText), affiliateEvent)
    fireEvent.click(render.getByText(buttonText))

    await waitForElement(() => render.getByText(successText))

    expect(dataHelpers.postCompetitor).toHaveBeenCalledTimes(1)

    dataHelpers.postCompetitor.mock.calls.forEach(args => {
      expect(args).toEqual(expectedArgs)
    })
  })
})
