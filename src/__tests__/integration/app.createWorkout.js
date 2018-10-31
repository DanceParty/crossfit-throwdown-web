import React from 'react'
import { fireEvent, waitForElement } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { database } from '../../utils/firebase'
import renderWithRouter from '../../utils/testRouter'
import App from '../../App'

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

test('creating the 1a workout', async () => {
  expect.assertions(1)

  const { getByLabelText, getByTestId, getByText } = renderWithRouter(<App />, {
    route: '/new-workout',
  })
  const nameInput = getByLabelText('Name*')
  const typeSelect = getByTestId('type-select')
  const standardsInput = getByLabelText('Standards*')
  const rxInput = getByTestId('rx-0')
  const scaledInput = getByTestId('scaled-0')

  fireEvent.change(nameInput, { target: { value: 'WOD #1A' } })
  fireEvent.change(typeSelect, { target: { value: 'Timed' } })
  fireEvent.change(standardsInput, {
    target: {
      value: `Athletes will have 3 minutes to complete each
      segment - row, bike, burpees. If the athlete does not
      complete the prescribed work within the 3 minute time cap,
      their score will be the amount of work completed at the time cap.
      Atheletes will not advance to the next segment until the alotted
      3 minutes has expired. Each segment - row, bike, burpees, is scored individually.
      Men in both divisions will do the 40 calories on the Assault
      Bike and women will do 30 calories.`,
    },
  })
  fireEvent.change(rxInput, { target: { value: '500m Row' } })
  fireEvent.change(scaledInput, { target: { value: '500m Row' } })

  const submitButton = getByText('Submit')
  fireEvent.click(submitButton)

  await waitForElement(() => getByText('Workout added!'))
  expect(getByText('Workout added!')).toBeInTheDocument()
})

test('creating the 1a workout without standards', async () => {
  expect.assertions(1)

  const { getByLabelText, getByTestId, getByText } = renderWithRouter(<App />, {
    route: '/new-workout',
  })
  const nameInput = getByLabelText('Name*')
  const typeSelect = getByTestId('type-select')
  const standardsInput = getByLabelText('Standards*')
  const rxInput = getByTestId('rx-0')
  const scaledInput = getByTestId('scaled-0')

  fireEvent.change(nameInput, { target: { value: 'WOD #1A' } })
  fireEvent.change(typeSelect, { target: { value: 'Timed' } })
  fireEvent.change(standardsInput, { target: { value: `` } })
  fireEvent.change(rxInput, { target: { value: '500m Row' } })
  fireEvent.change(scaledInput, { target: { value: '500m Row' } })

  const submitButton = getByText('Submit')
  fireEvent.click(submitButton)

  await waitForElement(() => getByText('Please check the fields and try again'))
  expect(getByText('Please check the fields and try again')).toBeInTheDocument()
})
