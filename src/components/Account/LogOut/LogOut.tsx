import React, {useContext, useEffect} from 'react'
import {useHistory} from "react-router-dom"
import axios from "axios"
import {UserContext} from "../../../UserContext"
import {useAlert} from "react-alert";

// Props
interface Props {
}

// Component
const LogOut: React.FC = () => {
    const {userContext, setUserContext} = useContext(UserContext)
    const text = require('../../../assets/languageText/'+userContext['languageId']+'.ts').text

    const alert = useAlert()
    const history = useHistory()

    useEffect(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/logout',
            withCredentials: true
        }).then(function () {
            localStorage.removeItem("nickName")
            localStorage.removeItem("profileImage")

            let newUser = {
                nickName: null,
                profileImage: null,
                languageId: userContext['languageId'],
                mapTheme: userContext['mapTheme'],
                darkMode: userContext['darkMode']
            }
            setUserContext(newUser)

            history.push("/login")
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }, [history, setUserContext, userContext])

    // Template
    return (
        <div>
        </div>
    )
}

export default LogOut
