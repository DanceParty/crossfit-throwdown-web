// @flow
import React from 'react'

const Button = ({width, color, children, onClick}) => {
  const className = `button is-${color} is-medium`
  return (
    <div className={className} style={{width: width}} onClick={onClick}>
      {children}
    </div>
  )
}

export default Button
