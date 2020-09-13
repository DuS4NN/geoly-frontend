import React, {useContext} from "react"
import axios from "axios"
import {UserContext} from "../../UserContext";
import {useAlert} from "react-alert";

// Props
interface Props {
    questId: any
}

// Component
const QuestButton: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const alert = useAlert()

    const {questId} = props

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text


    const handleSubmit = () => {
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
        })
    }

    // Template
    return (
        <div className="quest-button">
            <button onClick={handleSubmit}>{text.review.signUp}</button>
        </div>
    )
}

export default QuestButton
