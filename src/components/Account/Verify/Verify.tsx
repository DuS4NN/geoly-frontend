import React, {useEffect, useState, useContext} from 'react'
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
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/verify?token='+token
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){
                alert.success(text.success[serverResponse])
            }else{
                alert.error(text.error[serverResponse])
            }
            history.push("/login")
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }, [alert, history, text, token])

    // Template
    return (
        <div>
        </div>
    )
}

export default Verify
