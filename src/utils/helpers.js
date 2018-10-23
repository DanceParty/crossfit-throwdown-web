export const sort = (a, b, key) => {
  if (a[key] > b[key]) {
    return 1
  } else if (a[key] < b[key]) {
    return -1
  }
  return 0
}

export const sortTimedWorkout = (competitors, scores) => {
  // filter out all non zero point scores
  const nonZeroScores = scores.filter(score => {
    return competitors.some(competitor => {
      return competitor.id === score.competitorId && score.score !== 0
    })
  })

  // filter out all zero point scores
  const zeroScores = scores.filter(score => {
    return competitors.some(competitor => {
      return competitor.id === score.competitorId && score.score === 0
    })
  })

  // figure out which competitors actually have greater than 0 points
  const nonZeroCompetitors = competitors.filter(competitor => {
    return nonZeroScores.some(score => {
      return competitor.id === score.competitorId
    })
  })

  // figure out which competitors have a 0 score
  const zeroCompetitors = competitors.filter(competitor => {
    return zeroScores.some(score => {
      return competitor.id === score.competitorId
    })
  })

  // sort the competitors that have a score
  const sortedCompetitors = nonZeroCompetitors.sort((a, b) => {
    let aScore = 0
    let bScore = 0
    nonZeroScores.forEach(score => {
      if (score.competitorId === a.id) {
        aScore = score.score
      }
      if (score.competitorId === b.id) {
        bScore = score.score
      }
    })
    return aScore - bScore
  })

  // spread out sorted competitors, then competitors with zero score
  return { sortedCompetitors, zeroCompetitors }
}

export const sortNormalWorkout = (competitors, scores) => {
  const nonZeroScores = scores.filter(score => {
    return competitors.some(competitor => {
      return competitor.id === score.competitorId && score.score !== 0
    })
  })

  // filter out all zero point scores
  const zeroScores = scores.filter(score => {
    return competitors.some(competitor => {
      return competitor.id === score.competitorId && score.score === 0
    })
  })

  // figure out which competitors actually have greater than 0 points
  const nonZeroCompetitors = competitors.filter(competitor => {
    return nonZeroScores.some(score => {
      return competitor.id === score.competitorId
    })
  })

  // figure out which competitors have a 0 score
  const zeroCompetitors = competitors.filter(competitor => {
    return zeroScores.some(score => {
      return competitor.id === score.competitorId
    })
  })

  const sortedCompetitors = nonZeroCompetitors.sort((a, b) => {
    let aScore = 0
    let bScore = 0
    nonZeroScores.forEach(score => {
      if (score.competitorId === a.id) {
        aScore = score.score
      }
      if (score.competitorId === b.id) {
        bScore = score.score
      }
    })
    return bScore - aScore
  })

  return { sortedCompetitors, zeroCompetitors }
}

export const normalizeDataIntoArray = objectOfObjects => {
  const arrayOfObjects = Object.keys(objectOfObjects).map(key => {
    return { id: key, ...objectOfObjects[key] }
  })
  return arrayOfObjects
}

export const splitByDivision = people => {
  const rx = people.filter(one => one.division === 'RX')
  const scaled = people.filter(one => one.division === 'Scaled')
  return { rx, scaled }
}
