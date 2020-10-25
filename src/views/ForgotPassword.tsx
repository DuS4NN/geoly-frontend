import React from 'react'
import "../components/Account/ForgotPassword/SmallDeviceForgotPassword.scss"
// Children
import ForgotPasswordForm from "../components/Account/ForgotPassword/ForgotPasswordForm"

// Props
interface Props {
}

// Component
const ForgotPassword: React.FC = () => {

    // Template
    return (
        <div className="reset-password">
            <ForgotPasswordForm />
        </div>
    )
}

export default ForgotPassword
