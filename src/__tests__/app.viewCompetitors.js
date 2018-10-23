import React from 'react'
import { waitForElement, within, wait } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { database } from '../utils/firebase'
import renderWithRouter from '../utils/testRouter'
import App from '../App'

const boxer = {
  firstName: 'Yo-hwan',
  lastName: 'Lim',
  division: 'RX',
  affiliate: 'SlayerS',
}

const savior = {
  firstName: 'Jae-yoon',
  lastName: 'Ma',
  division: 'Scaled',
  affiliate: 'CJ Entus',
}

const scarlett = {
  firstName: 'Sasha',
  lastName: 'Hostyn',
  division: 'RX',
  affiliate: 'Acer',
}

const aphrodite = {
  firstName: 'Ga-young',
  lastName: 'Kim',
  division: 'Scaled',
  affiliate: 'Startale',
}

beforeEach(async () => {
  try {
    await database.ref('/competitors/Male').push(savior)
    await database.ref('/competitors/Male').push(boxer)
    await database.ref('/competitors/Female').push(scarlett)
    await database.ref('/competitors/Female').push(aphrodite)
    console.log('competitors successfully added')
  } catch (e) {
    console.error('app.viewCompetitor.js - ERROR IN BEFORE ALL, ', e)
  }
})

afterEach(async () => {
  try {
    await database.ref('/').remove()
    console.log('database successfully removed')
  } catch (e) {
    console.error('app.viewCompetitor.js - ERROR IN AFTER ALL, ', e)
  }
})

test('viewing male competitors', async () => {
  const { getByTestId, getByText } = renderWithRouter(<App />, {
    route: '/competitors',
  })

  await wait()

  await waitForElement(() =>
    getByTestId(`row-${savior.firstName}-${savior.lastName}`)
  )

  const saviorTableRow = getByTestId(
    `row-${savior.firstName}-${savior.lastName}`
  )
  const boxerTableRow = getByTestId(`row-${boxer.firstName}-${boxer.lastName}`)

  const saviorName = `${savior.firstName} ${savior.lastName}`
  const saviorFullName = within(saviorTableRow).getByText(saviorName)
  const saviorAffiliate = within(saviorTableRow).getByText(savior.affiliate)
  const saviorDivision = within(saviorTableRow).getByText(savior.division)

  const boxerName = `${boxer.firstName} ${boxer.lastName}`
  const boxerFullName = within(boxerTableRow).getByText(boxerName)
  const boxerAffiliate = within(boxerTableRow).getByText(boxer.affiliate)
  const boxerDivision = within(boxerTableRow).getByText(boxer.division)

  expect(saviorFullName).toBeInTheDocument()
  expect(saviorAffiliate).toBeInTheDocument()
  expect(saviorDivision).toBeInTheDocument()

  expect(boxerFullName).toBeInTheDocument()
  expect(boxerAffiliate).toBeInTheDocument()
  expect(boxerDivision).toBeInTheDocument()
})

test('viewing female competitors', async () => {
  const { getByTestId, getByText } = renderWithRouter(<App />, {
    route: '/competitors',
  })

  await wait()

  await waitForElement(() =>
    getByTestId(`row-${scarlett.firstName}-${scarlett.lastName}`)
  )

  const scarlettTableRow = getByTestId(
    `row-${scarlett.firstName}-${scarlett.lastName}`
  )
  const aphroditeTableRow = getByTestId(
    `row-${aphrodite.firstName}-${aphrodite.lastName}`
  )

  const scarlettName = `${scarlett.firstName} ${scarlett.lastName}`
  const scarlettFullName = within(scarlettTableRow).getByText(scarlettName)
  const scarlettAffiliate = within(scarlettTableRow).getByText(
    scarlett.affiliate
  )
  const scarlettDivision = within(scarlettTableRow).getByText(scarlett.division)

  const aphroditeName = `${aphrodite.firstName} ${aphrodite.lastName}`
  const aphroditeFullName = within(aphroditeTableRow).getByText(aphroditeName)
  const aphroditeAffiliate = within(aphroditeTableRow).getByText(
    aphrodite.affiliate
  )
  const aphroditeDivision = within(aphroditeTableRow).getByText(
    aphrodite.division
  )

  expect(scarlettFullName).toBeInTheDocument()
  expect(scarlettAffiliate).toBeInTheDocument()
  expect(scarlettDivision).toBeInTheDocument()

  expect(aphroditeFullName).toBeInTheDocument()
  expect(aphroditeAffiliate).toBeInTheDocument()
  expect(aphroditeDivision).toBeInTheDocument()
})
