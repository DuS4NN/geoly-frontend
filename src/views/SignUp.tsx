import React, {useContext} from "react"
import {useHistory} from "react-router-dom"
import {UserContext} from "../UserContext"
import SignUpForm from "../components/Account/SignUp/SignUpForm"
import SignUpBackground from "../components/Account/SignUp/SignUpBackground"
import "../components/Account/SignUp/SmallDeviceSignUp.scss"

// Props
interface Props {
}

// Component
const SignUp: React.FC = () => {
    // Context
    const {userContext} = useContext(UserContext)

    // Redirect
    const history = useHistory()

    // Do on start
    if(userContext['nickName']){
        history.push("/")
    }

    // Template
    return (
        <div className="sign-up">
            <SignUpBackground />
            <SignUpForm />
        </div>
    )
}

export default SignUp
