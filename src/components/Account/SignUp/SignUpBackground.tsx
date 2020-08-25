import React from 'react'
// Style
import './SignUpBackground.scss'
import {useHistory} from "react-router-dom";

// Props
interface Props {
}

// Component
const SignUpBackground: React.FC = () => {
    // Template
    return (
        <div className="sign-up-background">
            <div className="sign-up-background-bg">
                <div className="sign-up-background-img">
                </div>
            </div>
        </div>
    )
}

export default SignUpBackground
