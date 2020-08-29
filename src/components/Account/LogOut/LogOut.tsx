import React, {useContext, useEffect} from 'react'
import {useHistory} from "react-router-dom"
import axios from "axios"

// Context
import {UserContext} from "../../../UserContext"

// Props
interface Props {
}

// Component
const LogOut: React.FC = () => {
    // Context
    //@ts-ignore
    const {userContext, setUserContext} = useContext(UserContext)

    // Redirect
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
        })
    }, [history, setUserContext, userContext])

    // Template
    return (
        <div>
        </div>
    )
}

export default LogOut
