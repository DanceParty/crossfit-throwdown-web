import React from 'react'

const Select = ({label, options, ...props}) => (
  <div className="field">
    <label id={props.name} className="label">
      {label}
      <div className="select is-medium" style={{width: '100%'}}>
        <select
          aria-labelledby={props.name}
          {...props}
          style={{width: '100%'}}
          data-testid={`${props.name}-select`}
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
