import React from 'react'
import 'jest-dom/extend-expect'
import {fireEvent, waitForElement, cleanup, wait} from 'react-testing-library'
import renderWithRouter from '../utils/testRouter'
import App from '../App'
import * as dataHelpers from '../utils/dataHelpers'

afterEach(cleanup)

jest.mock('../utils/dataHelpers')

describe('New Workout', () => {
  const ROUTE = '/new-workout'
  let render

  beforeEach(() => {
    render = renderWithRouter(<App />, {route: ROUTE})
  })

  test('getting an error text when submitting an empty workout', () => {
    const errorText = 'Please check the fields and try again'
    const submitButtonText = 'Submit'

    fireEvent.click(render.getByText(submitButtonText))
    expect(render.getByText(errorText)).toBeInTheDocument()
  })

  test('successfully adding a workout', async () => {
    const nameLabelText = 'Name*'
    const standardsTestId = 'standards-input'
    const typeTestId = 'type-select'
    const firstRXTestId = 'rx-0'
    const secondRXTestId = 'rx-1'
    const firstScaledTestId = 'scaled-0'
    const secondScaledTestId = 'scaled-1'

    const nameEvent = {target: {value: 'WORKOUT'}}
    const standardsEvent = {target: {value: 'STANDARDS'}}
    const typeEvent = {target: {value: 'Timed'}}
    const firstRXEvent = {target: {value: 'RX NUMBER 1'}}
    const secondRXEvent = {target: {value: 'RX NUMBER 2'}}
    const firstScaledEvent = {target: {value: 'SCALED NUMBER 1'}}
    const secondScaledEvent = {target: {value: 'SCALED NUMBER 2'}}

    const successText = 'Workout added!'

    const submitButtonText = 'Submit'

    const expectedArgs = [
      {
        name: nameEvent.target.value,
        standards: standardsEvent.target.value,
        type: typeEvent.target.value,
        rx: [firstRXEvent.target.value, secondRXEvent.target.value],
        scaled: [firstScaledEvent.target.value, secondScaledEvent.target.value],
      },
    ]

    fireEvent.change(render.getByLabelText(nameLabelText), nameEvent)
    fireEvent.change(render.getByTestId(standardsTestId), standardsEvent)
    fireEvent.change(render.getByTestId(typeTestId), typeEvent)
    fireEvent.change(render.getByTestId(firstRXTestId), firstRXEvent)
    await wait()
    fireEvent.change(render.getByTestId(secondRXTestId), secondRXEvent)
    fireEvent.change(render.getByTestId(firstScaledTestId), firstScaledEvent)
    await wait()
    fireEvent.change(render.getByTestId(secondScaledTestId), secondScaledEvent)

    fireEvent.click(render.getByText(submitButtonText))

    await waitForElement(() => render.getByText(successText))

    expect(dataHelpers.postWorkout).toHaveBeenCalledTimes(1)

    dataHelpers.postWorkout.mock.calls.forEach(args => {
      expect(args).toEqual(expectedArgs)
    })
  })
})
