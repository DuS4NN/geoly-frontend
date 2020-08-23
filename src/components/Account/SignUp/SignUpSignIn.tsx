import React, {useContext} from 'react'
// Context
import {UserContext} from "../../../UserContext"
// Style
import './SignUpSignIn.scss'
import {useHistory} from "react-router-dom";

// Props
interface Props {
}

// Component
const SignUpSignIn: React.FC = () => {
    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)

    // Redirect
    const history = useHistory()

    // Text
    const text = require('../../../assets/languageText/'+userContext['languageId']+'.ts').text

    //Methods
    const handleClick = () => {
        history.push("/login")
    }

    // Template
    return (
        <div className="log-in">
            <div className="log-in-box">
                <div className="log-in-title">
                    <h2>{text.signUp.signInTitleFirstLine}<br />
                        {text.signUp.signInTitleSecondLine}
                    </h2>
                </div>
                <div className="log-in-description">
                    <span>
                        {text.signUp.signInSubtitleFirstLine}<br />
                        {text.signUp.signInSubtitleSecondLine}
                    </span>
                </div>

                <div className="log-in-button">
                    <button onClick={handleClick}>{text.signUp.signInButton}</button>
                </div>
            </div>
        </div>
    )
}

export default SignUpSignIn
