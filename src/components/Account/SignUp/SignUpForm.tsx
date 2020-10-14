import React, {ChangeEvent, FormEvent, useContext, useRef, useState} from 'react'
import {Link, useHistory} from "react-router-dom"
import {useAlert} from "react-alert"
import axios from "axios"
// Context
import {UserContext} from "../../../UserContext"
// Style
import './SignUpForm.scss'

// Props
interface Props {
}

// Component
const SignUpForm: React.FC = () => {
    // Context
    const {userContext} = useContext(UserContext)

    // Redirect
    const history = useHistory()

    // State
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")
    const [nickName, setNickName] = useState("")

    // Alerts
    const alert = useAlert()
    // Text
    const text = require('../../../assets/languageText/'+userContext['languageId']+'.ts').text

    // Images
    const facebookIcon = require('../../../assets/images/socialMedia/facebook.svg')
    const googleIcon = require('../../../assets/images/socialMedia/google.svg')
    const discordIcon = require('../../../assets/images/socialMedia/discord.svg')

    // Inputs
    const emailInput = useRef<HTMLInputElement>(null);
    const nickNameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const confirmPasswordInput = useRef<HTMLInputElement>(null);

    //Methods
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let email = emailInput.current?.value
        let nickName = nickNameInput.current?.value
        let password = passwordInput.current?.value
        let confirmPassword = confirmPasswordInput.current?.value

        if(password !== confirmPassword){
            setPassword("")
            setConfirmPassword("")
            alert.error(text.error.PASSWORDS_MATCH)
            return
        }

        axios({
            method: 'post',
            url: process.env.REACT_APP_API_SERVER_URL+'/register?languageId='+userContext['languageId'],
            data: {
                email: email,
                nickName: nickName,
                password: password
            }
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){
                alert.success(text.success[serverResponse])
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                setNickName("")
                history.push("/login")
            }else{
                returnAlert(serverResponse)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }

    const returnAlert = (serverResponse:string) => {
        switch (serverResponse) {
            case "NICKNAME_ALREADY_EXISTS":
                alert.error(text.error[serverResponse])
                setNickName("")
                break
            case "EMAIL_ALREADY_EXISTS":
                alert.error(text.error[serverResponse])
                setEmail("")
                break
            case "INVALID_NICKNAME_FORMAT":
                alert.error(text.error[serverResponse])
                setNickName("")
                break
            case "INVALID_NICKNAME_LENGTH":
                alert.error(text.error[serverResponse])
                setNickName("")
                break
            case "INVALID_EMAIL":
                alert.error(text.error[serverResponse])
                setEmail("")
                break
            case "INVALID_PASSWORD":
                alert.error(text.error[serverResponse])
                setPassword("")
                setConfirmPassword("")
                break
            default:
                alert.error(text.error.SOMETHING_WENT_WRONG)
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                setNickName("")
        }
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handleNickNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNickName(e.target.value)
    }
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    }

    const handleRedirect = () => {
        history.push("/login")
    }

    // Template
    return (
        <div className="sign-up-form">
            <div className="sign-up-form-title">
                <h2>{text.signUp.title}</h2>
            </div>

            <div className="social-media">
                <div className="social-media-icon">
                    <Link to="/">
                        <img title={text.signUp.signUpFacebook} alt="" src={facebookIcon}/>
                    </Link>
                </div>
                <div className="social-media-icon">
                    <Link to="/">
                        <img title={text.signUp.signUpGoogle} alt="" src={googleIcon}/>
                    </Link>
                </div>
                <div className="social-media-icon">
                    <Link to="/">
                        <img title={text.signUp.signUpDiscord} alt="" src={discordIcon}/>
                    </Link>
                </div>
            </div>

            <div className="form-title">
                <span>
                    {text.signUp.subTitle}
                </span>
            </div>

            <form className="form" onSubmit={handleSubmit}>

                <div className="form-input">
                    <input value={email} onChange={handleEmailChange} required max="254" ref={emailInput} autoFocus className="input-field-email" type="email" placeholder={text.signUp.formEmailPlaceholder} name="email" />
                </div>

                <br /> <br />

                <div className="form-input">
                    <input value={nickName} onChange={handleNickNameChange} required min="3" max="15" ref={nickNameInput} className="input-field-nickname" type="text" placeholder={text.signUp.formNicNamePlaceholder} name="nickname" />
                </div>

                <br /> <br />

                <div className="form-input">
                    <input value={password} onChange={handlePasswordChange} required  min="4" max="20" ref={passwordInput} className="input-field-password" type="password" placeholder={text.signUp.formPasswordPlaceholder} name="password" />
                </div>

                <br /> <br />

                <div className="form-input">
                    <input value={confirmPassword} onChange={handleConfirmPasswordChange} required  min="4" max="20" ref={confirmPasswordInput} className="input-field-password" type="password" placeholder={text.signUp.formPasswordAgainPlaceholder} name="confirm-password" />
                </div>

                <div className="form-sign-in">
                    <span onClick={handleRedirect} className="sign-in-link-text">{text.signUp.signIn}</span>
                </div>

                <button className="form-button">{text.signUp.signUpButton}</button>

            </form>

        </div>
    )
}

export default SignUpForm
