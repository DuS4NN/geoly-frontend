import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from "../../UserContext";
import './PremiumContainer.scss'
import axios from 'axios'
import {useHistory} from "react-router-dom";
import {useAlert} from "react-alert";

// Props
interface Props {
}

// Component
const PremiumResponse: React.FC = () => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text
    const history = useHistory()
    const alert = useAlert()

    const [response] = useState(window.location.href.split('/').pop())



    useEffect(() => {
        const executeAgreement = () => {
            let token = response?.replace("success", "")

            axios({
                method: 'GET',
                url: process.env.REACT_APP_API_SERVER_URL+'/premium/success'+token,
                withCredentials: true
            }).then(function (response) {
                let serverResponse = response.data.responseEntity.body
                let statusCode = response.data.responseEntity.statusCode

                if(statusCode === 'ACCEPTED'){
                    alert.success(text.success[serverResponse])
                }else if(statusCode === 'METHOD_NOT_ALLOWED'){
                    alert.error(text.error[serverResponse])
                }else{
                    alert.error(text.error.SOMETHING_WENT_WRONG)
                }
                history.push("/premium")
            }).catch(function () {
                history.push("/welcome")
                alert.error(text.error.SOMETHING_WENT_WRONG)
            })
        }

        if(!response) return

        if(response.startsWith('success')){
            executeAgreement()
        }else if(response.startsWith('cancel')){
            alert.error(text.error.PREMIUM_PURCHASE_FAILED)
            history.push("/premium")
        }else{
            alert.error(text.error.SOMETHING_WENT_WRONG)
            history.push("/premium")
        }
    },[response])

    // Template
    return (
        <div>
        </div>
    )
}

export default PremiumResponse
