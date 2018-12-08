import React from 'react'
import 'jest-dom/extend-expect'
import {waitForElement, cleanup, fireEvent, wait} from 'react-testing-library'
import renderWithRouter from '../utils/testRouter'
import App from '../App'
import * as dataHelpers from '../utils/dataHelpers'
import * as data from '../testData.json'

afterEach(cleanup)

jest.mock('../utils/dataHelpers')

describe('Edit Workout', () => {
  const {workouts} = data
  const firstWorkoutId = Object.keys(workouts)[0]
  const workout = workouts[firstWorkoutId]
  const ROUTE = `/workouts/${firstWorkoutId}`
  let render

  beforeEach(() => {
    render = renderWithRouter(<App />, {route: ROUTE})
  })

  test('editing an existing workout', async () => {
    const editButtonText = 'Edit Workout'
    const submitButtonText = 'Submit'

    const nameLabel = 'Name*'
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

    const expectedArgs = [
      ROUTE,
      {
        name: nameEvent.target.value,
        standards: standardsEvent.target.value,
        type: typeEvent.target.value,
        rx: [firstRXEvent.target.value, secondRXEvent.target.value],
        scaled: [firstScaledEvent.target.value, secondScaledEvent.target.value],
      },
    ]

    await waitForElement(() => [
      render.getByText(workout.name, {exact: false}),
      render.getByText(workout.standards),
      render.getByText(workout.type),
      render.getByText(workout.rx[0]),
      render.getByText(workout.scaled[0]),
    ])
    // open edit form
    fireEvent.click(render.getByText(editButtonText))

    // check default values in form
    expect(render.getByLabelText(nameLabel).value).toEqual(workout.name)
    expect(render.getByTestId(standardsTestId).value).toEqual(workout.standards)
    expect(render.getByTestId(typeTestId).value).toEqual(workout.type)
    workout.rx.forEach((step, index) => {
      expect(render.getByTestId(`rx-${index}`).value).toEqual(step)
    })
    workout.scaled.forEach((step, index) => {
      expect(render.getByTestId(`scaled-${index}`).value).toEqual(step)
    })

    // change form
    fireEvent.change(render.getByLabelText(nameLabel), nameEvent)
    fireEvent.change(render.getByTestId(standardsTestId), standardsEvent)
    fireEvent.change(render.getByTestId(typeTestId), typeEvent)
    fireEvent.change(render.getByTestId(firstRXTestId), firstRXEvent)
    await wait()
    fireEvent.change(render.getByTestId(secondRXTestId), secondRXEvent)
    fireEvent.change(render.getByTestId(firstScaledTestId), firstScaledEvent)
    await wait()
    fireEvent.change(render.getByTestId(secondScaledTestId), secondScaledEvent)

    const submitButton = render.getByText(submitButtonText)
    fireEvent.click(submitButton)

    await wait()

    expect(submitButton).not.toBeInTheDocument()

    expect(dataHelpers.updateWorkout).toHaveBeenCalledTimes(1)

    dataHelpers.postWorkout.mock.calls.forEach(args => {
      expect(args).toEqual(expectedArgs)
    })
  })
})
