// @flow
import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.div`
  width: ${props => props.width};
  transition: all 0.15s ease;
  &:hover {
    transform: translateY(-0.5px);
    box-shadow: 0 7px 14px hsla(240, 30%, 28%, 0.1), 0 3px 6px hsla(0, 0%, 0%, 0.1);
  }
  &:active {
    transform: translateY(0.5px);
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  }
`

const Button = ({color, children, onClick, small}) => {
  const size = small ? 'is-small' : 'is-medium'
  const className = `button is-${color} ${size}`
  return (
    <StyledButton className={className} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export default Button
