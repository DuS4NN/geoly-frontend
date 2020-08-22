import React, {useContext} from "react"
import {UserContext} from "../../../UserContext";
// Style
import './CreateAccount.scss'

//Props
interface Props {
}

// Component
const CreateAccount: React.FC<Props> = () => {
    // Context
    //@ts-ignore
    const {userContext, setUserContext} = useContext(UserContext)

    // Text
    const text = require('../../../assets/languageText/'+userContext['languageId']+'.ts').text

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
                    <button>{text.logIn.signUpButton}</button>
                </div>
            </div>

        </div>
    )
}

export default CreateAccount
