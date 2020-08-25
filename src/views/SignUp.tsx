import React from "react"

// Children
import SignUpForm from "../components/Account/SignUp/SignUpForm"
import SignUpBackground from "../components/Account/SignUp/SignUpBackground"

// Props
interface Props {
}

// Component
const SignUp: React.FC = () => {

    // Template
    return (
        <div className="sign-up">
            <SignUpBackground />
            <SignUpForm />
        </div>
    )
}

export default SignUp
