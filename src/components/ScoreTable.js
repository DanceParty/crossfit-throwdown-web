import React from 'react'
import styled from 'styled-components'
import {sortCompetitorsListByScore} from '../utils/helpers'
import Input from './Input'
import Table from './Table'

const TableData = styled.td`
  width: 55%;
`

const ScoreTable = ({competitors, scores, workoutType, isEditing, onChangeScore}) => (
  <Table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      {sortCompetitorsListByScore(competitors, scores, workoutType).map((competitor, i) => (
        <tr key={competitor.id}>
          <TableData>{` ${competitor.firstName} ${competitor.lastName}`}</TableData>
          {scores.map(score => {
            if (score.competitorId === competitor.id) {
              return isEditing ? (
                <td key={competitor.id} className="has-text-centered">
                  <Input
                    name={score.id}
                    value={score.score}
                    onChange={onChangeScore}
                    small
                    testId={`${competitor.firstName}-${competitor.lastName}-input`}
                  />
                </td>
              ) : (
                <td key={competitor.id} className="has-text-centered">
                  {score.score}
                </td>
              )
            } else return null
          })}
        </tr>
      ))}
    </tbody>
  </Table>
)

export default ScoreTable
