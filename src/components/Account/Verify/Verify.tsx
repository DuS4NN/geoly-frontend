import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from "react-router-dom"
import axios from "axios"
import {useAlert} from "react-alert"
// Context
import {UserContext} from "../../../UserContext"

// Props
interface Props {
}

// Component
const Verify: React.FC = () => {
    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)

    //State
    const [token] = useState(window.location.href.split('/').pop())

    // Redirect
    const history = useHistory()
    // Alerts
    const alert = useAlert()
    // Text
    const text = require('../../../assets/languageText/'+userContext['languageId']+'.ts').text

    useEffect(() => {
        console.log(token)
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/verify?token='+token
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            console.log(response)

            if(statusCode === 'ACCEPTED'){
                alert.success(text.success[serverResponse])
            }else{
                alert.error(text.error[serverResponse])
            }
            history.push("/login")
        })
    }, [])
    
    // Template
    return (
        <div>
        </div>
    )
}

export default Verify
