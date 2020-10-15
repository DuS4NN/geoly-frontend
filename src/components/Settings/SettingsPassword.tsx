import React, {ChangeEvent, useContext, useState} from "react"
import {UserContext} from "../../UserContext";
import {useAlert} from "react-alert";
import axios from 'axios'
import {useHistory} from "react-router-dom"
import './SettingsItems.scss'

// Props
interface Props {
}

// Component
const SettingsPassword: React.FC = () => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text
    const alert = useAlert()
    const history = useHistory()

    const [newPassword, setNewPassword] = useState("") as Array<any>
    const [repeatPassword, setRepeatPassword] = useState("") as Array<any>
    const [oldPassword, setOldPassword] = useState("") as Array<any>

    const [loadingSubmit, setLoadingSubmit] = useState(false)

    const handleChangeNP = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value)
    }
    const handleChangeOP = (e: ChangeEvent<HTMLInputElement>) => {
        setOldPassword(e.target.value)
    }
    const handleChangeRP = (e: ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value)
    }

    const handleSubmit = () => {
        if(newPassword<4 || newPassword > 20){
            alert.error(text.error.INVALID_PASSWORD)
            return
        }
        if(newPassword !== repeatPassword){
            alert.error(text.error.PASSWORDS_MATCH)
            return
        }

        setLoadingSubmit(true)
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/settings/changepassword?newPassword='+newPassword+'&oldPassword='+oldPassword,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode
            if(statusCode === 'ACCEPTED'){
                alert.success(text.success[serverResponse])
                setOldPassword("")
                setNewPassword("")
                setRepeatPassword("")
            }else if(statusCode === 'METHOD_NOT_ALLOWED'){
                if(serverResponse==='INCORRECT_OLD_PASSWORD'){
                    setOldPassword("")
                }else{
                    setNewPassword("")
                    setRepeatPassword("")
                }
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
        <div className="settings-password">

            <div className="password-input">
                <div className="settings-label">
                    <span>{text.settings.newPassword}</span>
                </div>
                <input onChange={handleChangeNP} type="password" value={newPassword} className="input-field-password" minLength={4} maxLength={20} placeholder={text.settings.newPassword} />
            </div>

            <div className="password-input">
                <div className="settings-label">
                    <span>{text.settings.repeatPassword}</span>
                </div>
                <input onChange={handleChangeRP}  type="password" value={repeatPassword} className="input-field-password" minLength={3} maxLength={20} placeholder={text.settings.repeatPassword} />
            </div>

            <div className="password-input">
                <div className="settings-label">
                    <span>{text.settings.oldPassword}</span>
                </div>
                <input onChange={handleChangeOP} type="password" value={oldPassword} className="input-field-password" minLength={3} maxLength={20} placeholder={text.settings.oldPassword} />
            </div>

            <div className="submit-button">
                <button onClick={handleSubmit}>{loadingSubmit && (<img alt="" src={require("../../assets/images/otherIcons/loading-button.svg")} />)}{text.settings.save}</button>
            </div>

        </div>
    )
}

export default SettingsPassword
