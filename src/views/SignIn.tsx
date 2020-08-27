import React, {useContext} from 'react'
import {useHistory} from "react-router-dom"
// Context
import {UserContext} from "../UserContext"
// Children
import SignInForm from "../components/Account/SignIn/SignInForm"
import SignInBackground from "../components/Account/SignIn/SignInBackground"

// Props
interface Props {
}

// Component
const SignIn: React.FC = () => {
    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)

    // Redirect
    const history = useHistory()

    // Do on start
    if(userContext['nickName']){
        history.push("/")
    }

    // Template
    return (
        <div className="sign-in">
            <SignInForm />
            <SignInBackground />
        </div>
    )
}

export default SignIn
