import React from 'react'

const Notification = ({onClick, children, color}) => (
  <div className={`notification ${color}`}>
    <button className="delete" onClick={onClick} />
    {children}
  </div>
)

export default Notification
