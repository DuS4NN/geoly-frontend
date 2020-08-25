import React from 'react'

// Children
import SignInForm from "../components/Account/SignIn/SignInForm"
import SignInBackground from "../components/Account/SignIn/SignInBackground"

// Props
interface Props {
}

// Component
const SignIn: React.FC = () => {

    // Template
    return (
        <div className="sign-in">
            <SignInForm />
            <SignInBackground />
        </div>
    )
}
//<SignInBackground />
export default SignIn
