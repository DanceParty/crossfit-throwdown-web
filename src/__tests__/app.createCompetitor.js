import React from 'react'
import { fireEvent, waitForElement } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { database } from '../utils/firebase'
import renderWithRouter from '../utils/testRouter'
import App from '../App'

beforeEach(async () => {
  if (database.app.options_.projectId === 'crossfitthrowdown-test') {
    try {
      await database.ref('/').remove()
      console.log('database successfully removed')
    } catch (e) {
      throw new Error('ERROR DELETING ALL DATABASE ENTRIES:', e)
    }
  }
})

test('creating a competitor', async () => {
  expect.assertions(1)

  const { getByLabelText, getByTestId, getByText } = renderWithRouter(<App />, {
    route: '/new-competitor',
  })
  const firstNameInput = getByLabelText('First name*')
  const lastNameInput = getByLabelText('Last name*')
  const genderSelect = getByTestId('gender-select')
  const divisionSelect = getByTestId('division-select')
  const affiliateInput = getByLabelText('Affiliate')

  fireEvent.change(firstNameInput, { target: { value: 'Keevan' } })
  fireEvent.change(lastNameInput, { target: { value: 'Dance' } })
  fireEvent.change(genderSelect, { target: { value: 'Male' } })
  fireEvent.change(divisionSelect, { target: { value: 'RX' } })
  fireEvent.change(affiliateInput, { target: { value: 'Crossfit Yuma' } })

  const submitButton = getByText('Submit')
  fireEvent.click(submitButton)

  await waitForElement(() => getByText('Competitor added!'))
  expect(getByText('Competitor added!')).toBeInTheDocument()
})

test('leaving fields empty when creating a competitor shows an error', async () => {
  expect.assertions(1)

  const { getByText } = renderWithRouter(<App />, { route: '/new-competitor' })

  const submitButton = getByText('Submit')
  fireEvent.click(submitButton)
  const expectedMessage = 'Please check the fields and try again'
  await waitForElement(() => getByText(expectedMessage))
  expect(getByText(expectedMessage)).toBeInTheDocument()
})

test('creating a competitor without an affiliate', async () => {
  expect.assertions(1)

  const { getByLabelText, getByTestId, getByText } = renderWithRouter(<App />, {
    route: '/new-competitor',
  })
  const firstNameInput = getByLabelText('First name*')
  const lastNameInput = getByLabelText('Last name*')
  const genderSelect = getByTestId('gender-select')
  const divisionSelect = getByTestId('division-select')

  fireEvent.change(firstNameInput, { target: { value: 'Keevan' } })
  fireEvent.change(lastNameInput, { target: { value: 'Dance' } })
  fireEvent.change(genderSelect, { target: { value: 'Male' } })
  fireEvent.change(divisionSelect, { target: { value: 'RX' } })

  const submitButton = getByText('Submit')
  fireEvent.click(submitButton)

  await waitForElement(() => getByText('Competitor added!'))
  expect(getByText('Competitor added!')).toBeInTheDocument()
})
