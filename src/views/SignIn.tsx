import React from 'react'

// Children
import SignInForm from "../components/Account/SignIn/SignInForm"
import SignInSignUp from "../components/Account/SignIn/SignInSignUp"

// Props
interface Props {
}

// Component
const SignIn: React.FC = () => {

    // Template
    return (
        <div className="sign-in">
            <SignInForm />
            <SignInSignUp />
        </div>
    )
}

export default SignIn
