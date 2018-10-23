import React from 'react'

const Textarea = ({ name, label, value, onChange }) => (
  <div className="field">
    <label className="label">
      {label}
      <div className="control">
        <textarea
          name={name}
          value={value}
          className="textarea"
          onChange={onChange}
        />
      </div>
    </label>
  </div>
)

export default Textarea
