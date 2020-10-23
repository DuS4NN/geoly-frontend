import React, {useContext, useEffect, useState} from "react"
import axios from 'axios'

import SettingsImage from "../components/Settings/SettingsImage";
import SettingsList from "../components/Settings/SettingsList";
import {UserContext} from "../UserContext";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";
import "../components/Settings/SmallDeviceSettings.scss"

// Props
interface Props {
}

// Component
const Settings: React.FC = () => {
    const {userContext} = useContext(UserContext)
    const text = require('../assets/languageText/'+userContext['languageId']+'.ts').text
    const alert = useAlert()
    const history = useHistory()

    const [selected, setSelected] = useState(0) as Array<any>
    const [settings, setSettings] = useState(null) as Array<any>
    const [languages, setLanguages] = useState([]) as Array<any>

    useEffect(() => {
        if(!userContext['nickName']){
            alert.error(text.error.UNAUTHORIZED)
            history.push("/login")
            return
        }

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/getsettings',
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                setSettings({
                    mapTheme: response.data.data[0][0],
                    languageId: response.data.data[0][1],
                    privateProfile: !!+response.data.data[0][2],
                    profileImage: response.data.data[0][3],
                    about: response.data.data[0][4],
                    userId: response.data.data[0][5],
                    premium: response.data.data[0][6]
                })
            }else{
                setSettings({})
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/getlanguages'
        }).then(function (response) {

            let newLanguages =response.data.map((language:any) => {
                return {
                    value: language.id,
                    label: text.language[language.name],
                    image: require('../assets/images/languageImages/'+(language.name).toLowerCase()+'.svg')
                }
            })
            setLanguages(newLanguages)
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }, [])


    // Template
    return (
        <div className="settings">
            {userContext['nickName'] && (
                <div>
                    <SettingsImage />
                    <SettingsList selected={selected} setSelected={setSelected} settings={settings} setSettings={setSettings} languages={languages} />
                </div>
            )}
        </div>
    )
}

export default Settings
