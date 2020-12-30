import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "../../UserContext";
import axios from "axios"
import {useHistory} from "react-router-dom"
import './SettingsItems.scss'
import ReactTooltip from "react-tooltip";
import {useAlert} from "react-alert";

// Props
interface Props {
}

// Component
const SettingsAppearance: React.FC = () => {
    const {userContext, setUserContext} = useContext(UserContext)
    const alert = useAlert()
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text
    const history = useHistory()
    const [themes, setThemes] = useState([]) as Array<any>
    const [selected, setSelected] = useState(userContext['mapTheme']) as Array<any>

    useEffect(() => {
        const countOfThemes = 5
        let loadThemes = []

        for(let i=1; i<=countOfThemes; i++){
            let file = require("../../assets/mapThemes/"+i+".ts")
            let theme = {
                id: i,
                name: file.mapTheme[0].mapThemeName,
            }
            loadThemes.push(theme)
        }
        setThemes(loadThemes)
    }, [])

    const handleChange = (id:number) => {
        setSelected(id)

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/settings/theme?theme='+id,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){
                alert.success(text.success[serverResponse])
                setUserContext({
                    ...userContext,
                    mapTheme: id
                })
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }

    // Template
    return (
        <div className="settings-appearance">
            {selected && themes.length > 0 && themes.map((theme:any) => (
                <div data-tip={text.settings.clickToSelect} onClick={() => handleChange(theme.id)} className={selected == theme.id ? "theme-item selected" : "theme-item"} key={theme.id}>
                    <div className="item-image">
                        <img alt="" src={require("../../assets/mapThemes/"+theme.id+".png")} />
                    </div>
                    <div className="item-name">
                        <span>{theme.name}</span>
                    </div>
                    <ReactTooltip />
                </div>
            ))}

        </div>
    )
}

export default SettingsAppearance
