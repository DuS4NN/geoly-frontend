import React, {useContext, useState} from "react"
import axios from "axios"
import {UserContext} from "../../UserContext";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom"

// Props
interface Props {
    questId: any
}

// Component
const QuestButton: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const history = useHistory()
    const alert = useAlert()
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const {questId} = props

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text


    const handleSubmit = () => {
        setLoadingSubmit(true)
        axios({
            method: 'POST',
            url: process.env.REACT_APP_API_SERVER_URL+'/quest/signin?id='+questId,
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
            setLoadingSubmit(false)
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }

    // Template
    return (
        <div className="quest-button">
            {userContext['nickName'] && (
                <button onClick={handleSubmit}>{loadingSubmit && (<img alt="" src={require("../../assets/images/otherIcons/loading-button.svg")} />)}{text.review.signUp}</button>
            )}
        </div>
    )
}

export default QuestButton
