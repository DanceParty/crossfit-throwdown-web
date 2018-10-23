import React from 'react'
import { Link } from '@reach/router'
import { fetchCompetitors } from '../utils/dataHelpers'
import Page from '../components/Page'
import ErrorBoundary from '../components/ErrorBoundary'

class Competitors extends React.Component {
  state = {
    men: [],
    women: [],
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const men = await fetchCompetitors('Male')
    const women = await fetchCompetitors('Female')
    this.setState({ men, women })
  }

  render() {
    const { men, women } = this.state
    return men && women ? (
      <Page header="Competitors" link="/">
        <div className="columns">
          <div className="column has-text-centered">
            <h1 className="subtitle">Men</h1>
            <ErrorBoundary>
              <table className="table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Division</th>
                    <th>Affiliate</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {men.map(man => (
                    <tr
                      key={man.id}
                      data-testid={`row-${man.firstName}-${man.lastName}`}
                    >
                      <td>{`${man.firstName} ${man.lastName}`}</td>
                      <td>{man.division}</td>
                      <td>{man.affiliate}</td>
                      <td>
                        <Link to={`/competitors/Male/${man.id}`}>{`>`}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ErrorBoundary>
          </div>
          <div className="column has-text-centered">
            <h1 className="subtitle">Women</h1>
            <ErrorBoundary>
              <table className="table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Division</th>
                    <th>Affiliate</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {women.map(woman => (
                    <tr
                      key={woman.id}
                      data-testid={`row-${woman.firstName}-${woman.lastName}`}
                    >
                      <td>{`${woman.firstName} ${woman.lastName}`}</td>
                      <td>{woman.division}</td>
                      <td>{woman.affiliate}</td>
                      <td>
                        <Link
                          to={`/competitors/Female/${woman.id}`}
                        >{`>`}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ErrorBoundary>
          </div>
        </div>
      </Page>
    ) : (
      <h1 className="title">Loading...</h1>
    )
  }
}

export default Competitors
