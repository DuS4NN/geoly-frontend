import React, {ChangeEvent, FormEvent, useContext, useEffect, useRef, useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {useAlert} from "react-alert"
import axios from "axios"
//Context
import {UserContext} from "../../../UserContext";
// Type
import {LogInUser} from "../../../types";
// Style
import './SignIn.scss'

// Props
interface Props {
}

// Component
const SignIn: React.FC<Props> = () => {
    // Context
    //@ts-ignore
    const {userContext, setUserContext} = useContext(UserContext)

    // Redirect
    const history = useHistory()

    // Do on start
    if(userContext['nickName']){
        history.push("/")
    }

    //State
    const [password, setPassword] = useState("")
    // Alerts
    const alert = useAlert()
    // Text
    const text = require('../../../assets/languageText/'+userContext['languageId']+'.ts').text

    // Inputs
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    // Images
    const facebookIcon = require('../../../assets/images/socialMedia/facebook.svg')
    const googleIcon = require('../../../assets/images/socialMedia/google.svg')
    const discordIcon = require('../../../assets/images/socialMedia/discord.svg')

    // Methods
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let email = emailInput.current?.value
        let password = passwordInput.current?.value

        if(!email || !password) return
        handleLogin(email, password)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleLogin = (email: String, password: String) => {
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_SERVER_URL+'/login?username='+email+'&password='+password,
        }).then(function (response) {
            localStorage.setItem('nickName', response.data.nickName)
            localStorage.setItem('languageId', response.data.languageId)
            localStorage.setItem('mapTheme', response.data.mapTheme)
            localStorage.setItem('darkMode', response.data.darkMode)

            let newUser:LogInUser = {
                nickName: response.data.nickName,
                languageId: response.data.languageId,
                mapTheme: response.data.mapTheme,
                darkMode: response.data.darkMode
            }
            setUserContext(newUser)
            history.push("/")
        }).catch(function (e) {
            alert.error(text.error.BAD_CREDENTIALS)
            setPassword("")
        })
    }

    // Template
    return (
        <div className="sign-in-form">
            <div className="sign-in-form-title">
                <h2>{text.logIn.title}</h2>
            </div>

            <div className="social-media">
                <div className="social-media-icon">
                    <Link to="/">
                        <img title={text.logIn.signInFacebook} alt="" src={facebookIcon}/>
                    </Link>
                </div>
                <div className="social-media-icon">
                    <Link to="/">
                        <img title={text.logIn.signInGoogle} alt="" src={googleIcon}/>
                    </Link>
                </div>
                <div className="social-media-icon">
                    <Link to="/">
                        <img title={text.logIn.signInDiscord} alt="" src={discordIcon}/>
                    </Link>
                </div>
            </div>

            <div className="form-title">
                <span>
                    {text.logIn.subTitle}
                </span>
            </div>

            <form className="form" onSubmit={handleSubmit}>

                <div className="form-input">
                    <input max="254" ref={emailInput} autoFocus className="input-field-email" type="email" placeholder={text.logIn.formEmailPlaceholder} name="username" />
                </div>

                <br /> <br />

                <div className="form-input">
                    <input onChange={handleChange} value={password} min="4" max="20" ref={passwordInput} className="input-field-password" type="password" placeholder={text.logIn.formPasswordPlaceholder} name="password" />
                </div>

                <div className="form-forgot">
                    <Link to="/forgot" className="forgot">{text.logIn.forgotPassword}</Link>
                </div>

                <button className="form-button">{text.logIn.signInButton}</button>

            </form>
        </div>
    )
}

export default SignIn
