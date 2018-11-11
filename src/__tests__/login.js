import React from 'react'
import 'jest-dom/extend-expect'
import {fireEvent, cleanup} from 'react-testing-library'
import renderWithRouter from '../utils/testRouter'
import App from '../App'
import * as dataHelpers from '../utils/dataHelpers'

afterEach(cleanup)

jest.mock('../utils/dataHelpers')

describe('logging in a user', () => {
  test('user should login with the correct credentials', async () => {
    jest.clearAllMocks()
    dataHelpers.checkCurrentUser.mockImplementation(() => false)
    const {getByLabelText, getByText, debug} = renderWithRouter(<App />, {
      route: '/',
    })
    fireEvent.change(getByLabelText('Email'), {target: {value: 'test@test.com'}})
    fireEvent.change(getByLabelText('Password'), {target: {value: 'test'}})
    fireEvent.click(getByText('Log me in!'))
    expect(dataHelpers.login).toHaveBeenCalledTimes(1)
    dataHelpers.login.mock.calls.forEach(args => {
      expect(args).toEqual(['test@test.com', 'test'])
    })
    const results = {
      isThrow: false,
      value: {data: {email: 'test@test.com'}, error: null},
    }
    expect(dataHelpers.login.mock.results[0]).toEqual(results)
  })

  test('user should not login with incorrect credentials', () => {
    jest.clearAllMocks()
    dataHelpers.checkCurrentUser.mockImplementation(() => false)
    const {getByLabelText, getByText} = renderWithRouter(<App />, {
      route: '/',
    })
    fireEvent.change(getByLabelText('Email'), {target: {value: 'invalid@test.com'}})
    fireEvent.change(getByLabelText('Password'), {target: {value: 'invalid'}})
    fireEvent.click(getByText('Log me in!'))
    expect(dataHelpers.login).toHaveBeenCalledTimes(1)
    dataHelpers.login.mock.calls.forEach(args => {
      expect(args).toEqual(['invalid@test.com', 'invalid'])
    })
    const results = {
      isThrow: false,
      value: {data: null, error: 'invalid email and password'},
    }
    expect(dataHelpers.login.mock.results[0]).toEqual(results)
  })
})
