import React from 'react'
import {
  Router,
  Link,
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router'
import { render } from 'react-testing-library'

const renderWithRouter = (
  ui,
  { route = '/', history = createHistory(createMemorySource(route)) } = {}
) => ({
  ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
  history,
})

export default renderWithRouter
