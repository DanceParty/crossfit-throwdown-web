import React from 'react'

const Select = ({ label, value, options, onChange, name }) => (
  <div className="field">
    <label id={name} className="label">
      {label}
      <div className="select is-medium" style={{ width: '100%' }}>
        <select
          aria-labelledby={name}
          name={name}
          value={value}
          onChange={onChange}
          style={{ width: '100%' }}
          data-testid={`${name}-select`}
        >
          <option value="" />
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </label>
  </div>
)

export default Select
