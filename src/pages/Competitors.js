import React from 'react'
import styled from 'styled-components'
import {navigate} from '@reach/router'
import {fetchCompetitors} from '../utils/dataHelpers'
import Page from '../components/Page'
import Table from '../components/Table'
import ErrorBoundary from '../components/ErrorBoundary'

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: hsl(0, 0%, 96%);
  }
  &:active {
    background-color: hsl(0, 0%, 91%);
    box-shadow: inset 0 8px 6px -6px hsl(0, 0%, 60%);
  }
`

class Competitors extends React.Component {
  state = {
    competitors: null,
    isLoading: true,
    error: null,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const {data: competitors, error} = await fetchCompetitors()
    this.setState({
      competitors,
      isLoading: false,
      error: error,
    })
  }

  onNavigate = (gender, competitorId) => {
    navigate(`/competitors/${gender}/${competitorId}`)
  }

  render() {
    const {competitors, isLoading, error} = this.state
    return isLoading ? (
      <h1>Loading...</h1>
    ) : error ? (
      <h1>Error fetching data</h1>
    ) : (
      <Page header="Competitors" link="/">
        <div className="columns">
          <div className="column has-text-centered">
            <h1 className="subtitle">Men - RX</h1>
            <ErrorBoundary>
              <Table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Affiliate</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.men.rx.map(man => (
                    <TableRow
                      key={man.id}
                      onClick={() => this.onNavigate('men', man.id)}
                      data-testid={`row-${man.firstName}-${man.lastName}`}
                    >
                      <td>{`${man.firstName} ${man.lastName}`}</td>
                      <td>{man.affiliate}</td>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </ErrorBoundary>
          </div>
          <div className="column has-text-centered">
            <h1 className="subtitle">Men - Scaled</h1>
            <ErrorBoundary>
              <Table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Affiliate</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.men.scaled.map(man => (
                    <TableRow
                      key={man.id}
                      onClick={() => this.onNavigate('men', man.id)}
                      data-testid={`row-${man.firstName}-${man.lastName}`}
                    >
                      <td>{`${man.firstName} ${man.lastName}`}</td>
                      <td>{man.affiliate}</td>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </ErrorBoundary>
          </div>
          <div className="column has-text-centered">
            <h1 className="subtitle">Women - RX</h1>
            <ErrorBoundary>
              <Table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Affiliate</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.women.rx.map(woman => (
                    <TableRow
                      key={woman.id}
                      onClick={() => this.onNavigate('women', woman.id)}
                      data-testid={`row-${woman.firstName}-${woman.lastName}`}
                    >
                      <td>{`${woman.firstName} ${woman.lastName}`}</td>
                      <td>{woman.affiliate}</td>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </ErrorBoundary>
          </div>
          <div className="column has-text-centered">
            <h1 className="subtitle">Women - Scaled</h1>
            <ErrorBoundary>
              <Table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Affiliate</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.women.scaled.map(woman => (
                    <TableRow
                      key={woman.id}
                      onClick={() => this.onNavigate('women', woman.id)}
                      data-testid={`row-${woman.firstName}-${woman.lastName}`}
                    >
                      <td>{`${woman.firstName} ${woman.lastName}`}</td>
                      <td>{woman.affiliate}</td>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </ErrorBoundary>
          </div>
        </div>
      </Page>
    )
  }
}

export default Competitors
