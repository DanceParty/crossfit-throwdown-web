import React from 'react'
import 'jest-dom/extend-expect'
import {waitForElement, cleanup} from 'react-testing-library'
import renderWithRouter from '../utils/testRouter'
import App from '../App'
import * as api from '../utils/api'
import * as data from '../testData.json'

afterEach(cleanup)

jest.mock('../utils/api')

describe('Competitors', () => {
  const ROUTE = '/competitors'
  const {competitors} = data
  let render

  beforeEach(() => {
    render = renderWithRouter(<App />, {route: ROUTE})
  })

  test('displaying all competitors', async () => {
    const menRxText = 'Men - RX'
    const menScaledText = 'Men - Scaled'
    const womenRxText = 'Women - RX'
    const womenScaledText = 'Women - Scaled'
    const men = Object.keys(competitors.men).map(key => competitors.men[key])
    const women = Object.keys(competitors.women).map(key => competitors.women[key])
    const competitorsArr = men.concat(women)

    await waitForElement(() => [
      render.getByText(menRxText),
      render.getByText(menScaledText),
      render.getByText(womenRxText),
      render.getByText(womenScaledText),
    ])

    competitorsArr.forEach(competitor => {
      expect(render.getByText(`${competitor.firstName} ${competitor.lastName}`)).toBeInTheDocument()
    })

    expect(api.fetchCompetitors).toHaveBeenCalledTimes(1)
  })
})
