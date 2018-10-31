import React from 'react'

const Input = ({label, small = false, testId = '', ...props}) => {
  const className = `input ${!small && 'is-medium'}`
  return (
    <div className="field">
      <label id={props.name} className="label">
        {label}
        <div className="control">
          <input
            {...props}
            aria-labelledby={props.name}
            type="text"
            className={className}
            data-testid={testId}
          />
        </div>
      </label>
    </div>
  )
}

export default Input
