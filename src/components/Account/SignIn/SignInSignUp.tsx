import React, {useContext} from "react"
// Context
import {UserContext} from "../../../UserContext"
// Style
import './SignInSignUp.scss'
import {useHistory} from "react-router-dom";

//Props
interface Props {
}

// Component
const SignInSignUp: React.FC<Props> = () => {
    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)

    // Redirect
    const history = useHistory()

    // Text
    const text = require('../../../assets/languageText/'+userContext['languageId']+'.ts').text

    // Methods
    const handleClick = () => {
        history.push("/register")
    }

    // Template
    return (
        <div className="create-account">
            <div className="create-account-box">
                <div className="create-account-title">
                    <h2>{text.logIn.createAccountTitleFirstLine}<br />{text.logIn.createAccountTitleSecondLine}</h2>
                </div>
                <div className="create-account-description">
                <span>
                    {text.logIn.createAccountSubTitleFirstLine}<br/>
                    {text.logIn.createAccountSubTitleSecondLine}
                </span>
                </div>

                <div className="create-account-button">
                    <button onClick={handleClick}>{text.logIn.signUpButton}</button>
                </div>
            </div>

        </div>
    )
}

export default SignInSignUp
