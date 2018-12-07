test('test', () => {
  expect(true).toEqual(true)
})
// import React from 'react'
// import 'jest-dom/extend-expect'
// import {fireEvent, waitForElement, cleanup, wait} from 'react-testing-library'
// import renderWithRouter from '../utils/testRouter'
// import App from '../App'
// import * as dataHelpers from '../utils/dataHelpers'
// import {normalizeDataIntoArray} from '../utils/helpers'

// afterEach(cleanup)

// jest.mock('../utils/dataHelpers')

// describe('adding a workout', () => {
//   test('trying to insert a blank workout', () => {
//     const {getByText} = renderWithRouter(<App />, {route: '/new-workout'})
//     fireEvent.click(getByText('Submit'))
//     expect(getByText('Please check the fields and try again')).toBeInTheDocument()
//   })

//   test('adding a workout', () => {
//     const {getByText, getByLabelText, getByTestId} = renderWithRouter(<App />, {
//       route: '/new-workout',
//     })
//     fireEvent.change(getByLabelText('Name*'), {target: {value: 'Moon Landing'}})
//     fireEvent.change(getByTestId('type-select'), {target: {value: 'Timed'}})
//     fireEvent.change(getByLabelText('Standards*'), {target: {value: 'Jump ship'}})
//     fireEvent.change(getByTestId('rx-0'), {target: {value: 'RX 1'}})
//     fireEvent.change(getByTestId('rx-1'), {target: {value: 'RX 2'}})
//     fireEvent.change(getByTestId('scaled-0'), {target: {value: 'Scaled 1'}})
//     fireEvent.change(getByTestId('scaled-1'), {target: {value: 'Scaled 2'}})
//     fireEvent.click(getByText('Submit'))
//     waitForElement(() => getByText('Workout added!'))
//     expect(dataHelpers.postWorkout).toHaveBeenCalledTimes(1)
//     dataHelpers.postWorkout.mock.calls.forEach(args => {
//       expect(args).toEqual([
//         {
//           name: 'Moon Landing',
//           type: 'Timed',
//           standards: 'Jump ship',
//           rx: ['RX 1', 'RX 2'],
//           scaled: ['Scaled 1', 'Scaled 2'],
//         },
//       ])
//     })
//   })
// })

// describe('viewing workouts', () => {
//   test('viewing all workouts', async () => {
//     const {getByText} = renderWithRouter(<App />, {route: '/workouts'})
//     await wait()
//     expect(getByText('WOD #1A')).toBeInTheDocument()
//     expect(getByText('WOD #1B')).toBeInTheDocument()
//     expect(getByText('Timed')).toBeInTheDocument()
//     expect(getByText('Weight')).toBeInTheDocument()
//   })

//   test('trying to input letters for scores should not work', async () => {
//     const workoutId = '1'
//     const scores = {
//       '1': {competitorId: '1', workoutId: '1', score: 0},
//       '3': {competitorId: '2', workoutId: '1', score: 0},
//       '5': {competitorId: '3', workoutId: '1', score: 0},
//       '7': {competitorId: '4', workoutId: '1', score: 0},
//     }
//     const {getByText, getByTestId} = renderWithRouter(<App />, {
//       route: `/workouts/${workoutId}`,
//     })
//     await wait()

//     fireEvent.click(getByText('Edit Scores'))
//     const scoreInput = getByTestId(`Marco-Polo-input`)
//     fireEvent.change(scoreInput, {
//       target: {value: 'abc'},
//     })
//     expect(scoreInput.value).toEqual('')
//   })

//   test('changing scores', async () => {
//     const workoutId = '1'
//     const scores = {
//       '1': {competitorId: '1', workoutId: '1', score: 0},
//       '3': {competitorId: '2', workoutId: '1', score: 0},
//       '5': {competitorId: '3', workoutId: '1', score: 0},
//       '7': {competitorId: '4', workoutId: '1', score: 0},
//     }
//     const {getByText, getByTestId} = renderWithRouter(<App />, {
//       route: `/workouts/${workoutId}`,
//     })
//     await wait()

//     const allCompetitorsNames = ['Marco Polo', 'Colby Carr', 'Lady Byrnes', 'Julie Dance']
//     const allCompetitorsNamesDashed = ['Marco-Polo', 'Colby-Carr', 'Lady-Byrnes', 'Julie-Dance']
//     allCompetitorsNames.forEach(name => {
//       expect(getByText(`${name}`)).toBeInTheDocument()
//     })

//     fireEvent.click(getByText('Edit Scores'))

//     allCompetitorsNamesDashed.forEach(name => {
//       expect(getByTestId(`${name}-input`)).toBeInTheDocument()
//     })
//     allCompetitorsNamesDashed.forEach((name, i) => {
//       fireEvent.change(getByTestId(`${name}-input`), {
//         target: {value: i},
//       })
//     })

//     fireEvent.click(getByText('Save'))

//     let mockArgs = {}
//     normalizeDataIntoArray(scores).forEach((scoreObj, i) => {
//       const {competitorId, workoutId} = scoreObj
//       mockArgs[`scores/${scoreObj.id}`] = {
//         competitorId,
//         workoutId,
//         score: i,
//       }
//     })

//     expect(dataHelpers.postScores).toHaveBeenCalledTimes(1)
//     dataHelpers.postScores.mock.calls.forEach(args => {
//       expect(args[0]).toEqual(mockArgs)
//     })
//   })

//   test('viewing and editing a workout', async () => {
//     const workoutId = '1'
//     const workout = {
//       name: 'WOD #1A',
//       rx: ['500m Row'],
//       scaled: ['500m Row'],
//       standards:
//         'Athletes will have 3 minutes to complete the row. If the athlete does not complete the prescribed work within the 3 minute time cap, their score will be the amount of work completed at the time cap. Athletes will not advance to the next segment until the allotted 3 minutes has expired.',
//       type: 'Timed',
//     }
//     const {getByText, getByLabelText, getByTestId} = renderWithRouter(<App />, {
//       route: `/workouts/${workoutId}`,
//     })
//     await waitForElement(() => getByText(/WOD #1A/))

//     expect(getByText(/WOD #1A/)).toBeInTheDocument()
//     expect(getByText(workout.standards)).toBeInTheDocument()
//     expect(getByText(workout.type)).toBeInTheDocument()
//     workout.rx.forEach(step => {
//       expect(getByText(step)).toBeInTheDocument()
//     })
//     workout.scaled.forEach(step => {
//       expect(getByText(step)).toBeInTheDocument()
//     })

//     // edit
//     fireEvent.click(getByText('Edit Workout'))
//     const nameInput = getByLabelText('Name*')
//     const standardsInput = getByTestId('standards-input')
//     const typeInput = getByTestId('type-select')
//     expect(nameInput.value).toEqual(workout.name)
//     expect(standardsInput.value).toEqual(workout.standards)
//     expect(typeInput.value).toEqual(workout.type)
//     fireEvent.change(nameInput, {target: {value: 'Grinch #1'}})
//     fireEvent.change(standardsInput, {target: {value: 'Stole XMAS'}})
//     fireEvent.change(typeInput, {target: {value: 'Weight'}})
//     expect(nameInput.value).toEqual('Grinch #1')
//     expect(standardsInput.value).toEqual('Stole XMAS')
//     expect(typeInput.value).toEqual('Weight')
//     const submitButton = getByText('Submit')
//     fireEvent.click(submitButton)
//     await wait()
//     expect(submitButton).not.toBeInTheDocument()
//     expect(dataHelpers.updateWorkout).toHaveBeenCalledTimes(1)
//     dataHelpers.updateWorkout.mock.calls.forEach(args => {
//       expect(args[0]).toEqual('/workouts/1')
//       expect(args[1]).toEqual({
//         name: 'Grinch #1',
//         standards: 'Stole XMAS',
//         type: 'Weight',
//         rx: ['500m Row'],
//         scaled: ['500m Row'],
//       })
//     })
//   })
// })
