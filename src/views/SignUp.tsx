import React from "react"

// Children
import SignUpForm from "../components/Account/SignUp/SignUpForm"
import SignUpSignIn from "../components/Account/SignUp/SignUpSignIn"

// Props
interface Props {
}

// Component
const SignUp: React.FC = () => {

    // Template
    return (
        <div className="sign-up">
            <SignUpSignIn />
            <SignUpForm />
        </div>
    )
}

export default SignUp
