import React from "react"
// Style
import './SignInBackground.scss'

//Props
interface Props {
}

// Component
const SignInBackground: React.FC<Props> = () => {
    // Template
    return (
        <div className="sign-in-background">
            <div className="sign-in-background-bg">
                <div className="sign-in-background-img">
                </div>
            </div>
        </div>
    )
}

export default SignInBackground
