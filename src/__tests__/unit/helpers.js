import React from 'react'
import 'jest-dom/extend-expect'
import {
  sortObjectsByKey,
  sortTimedWorkout,
  sortNormalWorkout,
  normalizeDataIntoArray,
  splitByDivision,
} from '../../utils/helpers'

test('sortObjectsByKey - sorting two objects', () => {
  const person1 = {
    firstName: 'Alpha',
    lastName: 'Beta',
  }
  const person2 = {
    firstName: 'Theta',
    lastName: 'AAAA',
  }
  const person3 = {
    firstName: 'Alpha',
  }
  let sortedInt = sortObjectsByKey(person1, person2, 'firstName')
  expect(sortedInt).toBe(-1)
  sortedInt = sortObjectsByKey(person2, person1, 'firstName')
  expect(sortedInt).toBe(1)
  sortedInt = sortObjectsByKey(person2, person1, 'lastName')
  expect(sortedInt).toBe(-1)
  sortedInt = sortObjectsByKey(person3, person1, 'firstName')
  expect(sortedInt).toBe(0)
})

test('sortTimedWorkouts - sorting competitors by timed scores', () => {
  const competitors = [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
  const scores = [
    {competitorId: 1, score: 500},
    {competitorId: 2, score: 100},
    {competitorId: 4, score: 0},
    {competitorId: 3, score: 400},
  ]
  const expected = {
    sortedCompetitors: [{id: 2}, {id: 3}, {id: 1}],
    zeroCompetitors: [{id: 4}],
  }

  const sortedCompetitors = sortTimedWorkout(competitors, scores)
  expect(sortedCompetitors).toEqual(expected)
})

test('sortNormalWorkouts - sorting based on points or weight', () => {
  const competitors = [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
  const scores = [
    {competitorId: 1, score: 500},
    {competitorId: 2, score: 100},
    {competitorId: 4, score: 0},
    {competitorId: 3, score: 400},
  ]
  const expected = {
    sortedCompetitors: [{id: 1}, {id: 3}, {id: 2}],
    zeroCompetitors: [{id: 4}],
  }

  const sortedCompetitors = sortNormalWorkout(competitors, scores)
  expect(sortedCompetitors).toEqual(expected)
})

test('normalizeDataIntoArray - takes firebase data and normalizes into object with id', () => {
  const dataObj = {
    aass223: {
      firstName: 'Keevan',
      lastName: 'Dance',
    },
    bbss223: {
      firstName: 'Jeehyae',
      lastName: 'Lee',
    },
  }
  const expected = [
    {
      id: 'aass223',
      firstName: 'Keevan',
      lastName: 'Dance',
    },
    {
      id: 'bbss223',
      firstName: 'Jeehyae',
      lastName: 'Lee',
    },
  ]

  const arrayOfObjects = normalizeDataIntoArray(dataObj)
  expect(arrayOfObjects).toEqual(expected)
})

test('splitByDivision - split an array of people into rx and scaled', () => {
  const people = [
    {
      firstName: 'Keevan',
      division: 'RX',
    },
    {
      firstName: 'Jeehyae',
      division: 'Scaled',
    },
    {
      firstName: 'Taylor',
      division: 'Scaled',
    },
    {
      firstName: 'Samba',
      division: 'RX',
    },
  ]

  const expected = {
    rx: [
      {
        firstName: 'Keevan',
        division: 'RX',
      },
      {
        firstName: 'Samba',
        division: 'RX',
      },
    ],
    scaled: [
      {
        firstName: 'Jeehyae',
        division: 'Scaled',
      },
      {
        firstName: 'Taylor',
        division: 'Scaled',
      },
    ],
  }

  const splitObject = splitByDivision(people)

  expect(splitObject).toEqual(expected)
})
