import React from 'react'

const Input = ({
  label,
  value,
  onChange,
  name,
  small = false,
  testId = '',
}) => {
  const className = `input ${!small && 'is-medium'}`
  return (
    <div className="field">
      <label id={name} className="label">
        {label}
        <div className="control">
          <input
            aria-labelledby={name}
            onChange={onChange}
            value={value}
            type="text"
            className={className}
            name={name}
            data-testid={testId}
          />
        </div>
      </label>
    </div>
  )
}

export default Input
