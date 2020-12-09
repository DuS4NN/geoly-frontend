import React, {ChangeEvent, FormEvent, useContext, useRef, useState} from "react"
import {useHistory} from "react-router-dom"
import {useAlert} from "react-alert"
import axios from "axios"
//Context
import {UserContext} from "../../../UserContext"
// Type
import {LogInUser} from "../../../types"
// Style
import './SignInForm.scss'

// Children
import ModalForgot from "../../Modals/ModalForgot";

// Props
interface Props {
}

// Component
const SignInForm: React.FC<Props> = () => {
    // Context
    const {userContext, setUserContext} = useContext(UserContext)

    // Redirect
    const history = useHistory()

    //State
    const [password, setPassword] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    // Alerts
    const alert = useAlert()
    // Text
    const text = require('../../../assets/languageText/'+userContext['languageId']+'.ts').text

    // Inputs
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

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

    const handleRedirect = () => {
        history.push("/register")
    }

    const handleLogin = (email: String, password: String) => {
        setLoadingSubmit(true)
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_SERVER_URL+'/login?username='+email+'&password='+password,
            withCredentials: true
        }).then(function (response) {
            let languageId = response.data.options[0][0]
            let mapTheme = response.data.options[0][1]
            let darkMode = response.data.options[0][2]
            let nickName = response.data.options[0][3]
            let profileImage = response.data.options[0][4]

            let roles = response.data.roles

            localStorage.setItem('languageId', languageId)
            localStorage.setItem('mapTheme', mapTheme)
            localStorage.setItem('darkMode', darkMode)
            localStorage.setItem('nickName', nickName)
            localStorage.setItem("profileImage", profileImage)

            let newUser:LogInUser = {
                languageId: languageId,
                mapTheme: mapTheme,
                darkMode: darkMode,
                nickName: nickName,
                profileImage: profileImage,
                roles: roles
            }

            setUserContext(newUser)
            history.push("/map")

            if(newUser.darkMode){
                let bodyElement = document.getElementsByTagName("BODY")[0]
                bodyElement.className = bodyElement.className + "modaldarkmode"
            }else{
                let bodyElement = document.getElementsByTagName("BODY")[0]
                bodyElement.classList.remove("modaldarkmode")
            }
            setLoadingSubmit(false)
        }).catch(function (error) {

            switch (error.response.data.exception) {
                case "Bad credentials":
                    setPassword("")
                    alert.error(text.error.BAD_CREDENTIALS)
                    break
                case "User is disabled":
                    alert.error(text.error.INACTIVE_ACCOUNT)
                    break
                case "User account is locked":
                    alert.error(text.error.UNVERIFIED_ACCOUNT)
                    break
                default:
                    alert.error(text.error.SOMETHING_WENT_WRONG)
            }
            setLoadingSubmit(false)
            setPassword("")
        })
    }

    const handleOpenModal = () => {
        setShowModal(true)
    }

    // Template
    return (
        <div className="sign-in-form">

            <ModalForgot showModal={showModal} setShowModal={setShowModal} />

            <div className="sign-in-form-title">
                <h2>{text.logIn.title}</h2>
            </div>

            <div className="form-title">
                <span>
                    {text.logIn.subTitle}
                </span>
            </div>

            <form className="form" onSubmit={handleSubmit}>

                <div className="form-input">
                    <input required max="254" ref={emailInput} autoFocus className="input-field-email" type="email" placeholder={text.logIn.formEmailPlaceholder} name="username" />
                </div>

                <br /> <br />

                <div className="form-input">
                    <input required onChange={handleChange} value={password} min="4" max="20" ref={passwordInput} className="input-field-password" type="password" placeholder={text.logIn.formPasswordPlaceholder} name="password" />
                </div>

                <div className="form-forgot">
                    <span onClick={handleOpenModal} className="forgot">{text.logIn.forgotPassword}</span>
                    <span onClick={handleRedirect} className="sign-up-link-text">{text.logIn.createAccount}</span>
                </div>

                <button className="form-button-signin">{loadingSubmit && (<img alt="" src={require("../../../assets/images/otherIcons/loading-button.svg")} />)}{text.logIn.signInButton}</button>
            </form>
        </div>
    )
}

export default SignInForm
