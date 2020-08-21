import React, {FormEvent, useRef} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

import './SignIn.scss'

interface Props {

}

const SignIn: React.FC<Props> = () => {

    const facebookIcon = require('../../../assets/images/socialMedia/facebook.svg')
    const googleIcon = require('../../../assets/images/socialMedia/google.svg')
    const discordIcon = require('../../../assets/images/socialMedia/discord.svg')

    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let email = emailInput.current?.value
        let password = passwordInput.current?.value

        if(!email || !password) return
        handleLogin(email, password)
    }

    const handleLogin = (email: String, password: String) =>{
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_SERVER_URL+'/login?username='+email+'&password='+password,
        }).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        })
    }

    return (
        <div className="sign-in-form">
            <div className="sign-in-form-title">
                <h2>Sign in to Geoly</h2>
            </div>

            <div className="social-media">
                <div className="social-media-icon">
                    <Link to="/">
                        <img alt="" src={facebookIcon}/>
                    </Link>
                </div>
                <div className="social-media-icon">
                    <Link to="/">
                        <img alt="" src={googleIcon}/>
                    </Link>
                </div>
                <div className="social-media-icon">
                    <Link to="/">
                        <img alt="s" src={discordIcon}/>
                    </Link>
                </div>
            </div>

            <div className="form-title">
                <span>
                    or user your email account:
                </span>
            </div>

            <form className="form" onSubmit={handleSubmit}>

                <div className="form-input">
                    <input ref={emailInput} autoFocus className="input-field-email" type="text" placeholder="Email" name="username" />
                </div>

                <br /> <br />

                <div className="form-input">
                    <input ref={passwordInput} className="input-field-password" type="text" placeholder="Password" name="password" />
                </div>

                <div className="form-forgot">
                    <Link to="/forgot" className="forgot">Forgot your password?</Link>
                </div>

                <button className="form-button">Sign In</button>

            </form>
        </div>
    )
}

export default SignIn
