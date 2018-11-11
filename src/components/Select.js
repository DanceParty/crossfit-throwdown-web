import React from 'react'
import styled from 'styled-components'

const StyledSelect = styled.select`
  width: 100%;
`

const Container = styled.div`
  width: 100%;
`

const Select = ({label, options, ...props}) => (
  <div className="field">
    <label id={props.name} className="label">
      {label}
      <Container className="select is-medium">
        <StyledSelect aria-labelledby={props.name} {...props} data-testid={`${props.name}-select`}>
          <option value="" />
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </StyledSelect>
      </Container>
    </label>
  </div>
)

export default Select
