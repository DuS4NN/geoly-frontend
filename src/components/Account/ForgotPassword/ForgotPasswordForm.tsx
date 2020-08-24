import React, {ChangeEvent, FormEvent, useContext, useState} from 'react'
import {useAlert} from "react-alert"
import axios from "axios"
// Context
import {UserContext} from "../../../UserContext"
// Style
import './ForgotPasswordForm.scss'
import {useHistory} from "react-router-dom";

// Props
interface Props {
}

// Component
const ForgotPasswordForm: React.FC = () => {
    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)

    // State
    const [token, setToken] = useState(window.location.href.split('/').pop())
    console.log(token)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // Redirect
    const history = useHistory()
    // Alerts
    const alert = useAlert()
    // Text
    const text = require('../../../assets/languageText/'+userContext['languageId']+'.ts').text

    // Image
    const resetImage = require('../../../assets/images/resetPassword.svg')

    //Methods
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(password !== confirmPassword){
            alert.error(text.error.PASSWORDS_MATCH)
            setPassword("")
            setConfirmPassword("")
            return
        }

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/resetpassword?token='+token+'&password='+password
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            setPassword("")
            setConfirmPassword("")

            if(statusCode === 'ACCEPTED'){
                alert.success(text.success[serverResponse])
                setToken("")
                history.push("/login")
            }else{
                alert.error(text.error[serverResponse])
            }
        })
    }

    // Template
    return (
        <div className="forgot-password">
            <div className="forgot-password-box">
                <div className="forgot-password-image">
                    <img src={resetImage} alt="" />
                </div>
                <div className="forgot-password-form">
                    <div className="title">
                        <h2>{text.reset.title}</h2>
                    </div>
                    <div className="subtitle">
                    <span>
                        {text.reset.subTitle}
                    </span>
                    </div>

                    <form className="form" onSubmit={handleSubmit}>
                        <input min="4" max="20" onChange={handlePasswordChange} value={password} className="input-field-password" placeholder={text.reset.inputPasswordPlaceholder} required type="password" name="password" autoFocus />
                        <br /> <br /><br />
                        <input min="4" max="20" onChange={handleConfirmPasswordChange} value={confirmPassword} className="input-field-password" placeholder={text.reset.inputConfirmPasswordPlaceholder} required type="password" name="password-confirm"/>
                        <br /> <br /> <br/>
                        <button>{text.reset.submitButton}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordForm