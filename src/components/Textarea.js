import React from 'react'

const Textarea = ({label, ...props}) => (
  <div className="field">
    <label className="label">
      {label}
      <div className="control">
        <textarea {...props} className="textarea" />
      </div>
    </label>
  </div>
)

export default Textarea
