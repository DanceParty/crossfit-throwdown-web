import React from 'react'

const ButtonLink = ({children, ...props}) => (
  <button
    {...props}
    style={{
      background: 'none important!',
      color: 'hsl(217, 71%, 53%)',
      border: 'none',
      padding: '0 important!',
      font: 'inherit',
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
)

export default ButtonLink
