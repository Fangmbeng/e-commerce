import React from 'react'

export default function AlertMessage({ message, category, flashMessage }) {
    return (
        <div className={`alert alert-${category} alert-dismissible fade show`} role="alert">
            <strong>{message}</strong>
            <button className='btn-close' onClick={() => flashMessage(null, null)}></button>
        </div>
    )
}