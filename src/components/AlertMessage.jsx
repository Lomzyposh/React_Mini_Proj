import clsx from 'clsx'
import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'



const AlertMessage = ({ type, msg }) => {
    if (!msg) { return null }

    const typeIcon = {
        success: 'success-fill',
        error: 'error-fill',
        warning: 'warning-fill'
    }

    return (
        <div className={clsx('alertMessage', typeIcon[type])}>
            <p>
                <i className={
                    `bi bi-${type === 'error' ? "exclamation-circle-fill" : type === 'success' ? "check-circle-fill" : "info-circle-fill"
                    }`}></i> {msg}
            </p>
        </div>
    )
}

export default AlertMessage
