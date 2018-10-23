import React from 'react'
import { fireEvent, waitForElement } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { database } from '../utils/firebase'
import renderWithRouter from '../utils/testRouter'
import App from '../App'

beforeAll(async () => {
  // TODO: add data into db
})

test('viewing competitors - UNFINISHED', () => {
  expect(1).toBe(1)
  // TODO
})
