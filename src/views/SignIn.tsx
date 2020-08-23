import React from 'react'

import SignInForm from "../components/Account/SignIn/SignInForm"
import SignInSignUp from "../components/Account/SignIn/SignInSignUp"

interface Props {
}

const SignIn: React.FC = () => {
    return (
        <div className="sign-in">
            <SignInForm />
            <SignInSignUp />
        </div>
    )
}

export default SignIn
