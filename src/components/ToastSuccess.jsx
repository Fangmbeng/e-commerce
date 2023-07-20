import React from 'react'


function Toast({message, category, flashMessage}) {
  return (
    <div>
        <div className={`alert alert-${category} alert-dismissible fade show`} role="alert" >
            <strong>{message}</strong>
            <button className='btn-close' onClick={() => flashMessage(null, null)}></button>
        </div>
    </div>
  )
}

export default Toast