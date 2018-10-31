import React from 'react'
import {Link} from '@reach/router'
import {fetchCompetitors} from '../utils/dataHelpers'
import Page from '../components/Page'
import ErrorBoundary from '../components/ErrorBoundary'

class Competitors extends React.Component {
  state = {
    men: [],
    women: [],
    isLoading: false,
    error: null,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({isLoading: true})
    const {data, error} = fetchCompetitors()
    this.setState({
      men: data.men,
      women: data.women,
      isLoading: false,
      error: error,
    })
  }

  render() {
    const {men, women, isLoading, error} = this.state
    return isLoading ? (
      <h1>Loading...</h1>
    ) : error ? (
      <h1>Error fetching data</h1>
    ) : (
      <Page header="Competitors" link="/">
        <div className="columns">
          <div className="column has-text-centered">
            <h1 className="subtitle">Men</h1>
            <ErrorBoundary>
              <table className="table" style={{width: '100%'}}>
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
              <table className="table" style={{width: '100%'}}>
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
    )
  }
}

export default Competitors
