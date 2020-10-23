import React, {useContext} from "react"
import {UserContext} from "../../UserContext"

import './SettingsList.scss'
import SettingsProfile from "./SettingsProfile";
import SettingsPassword from "./SettingsPassword";
import SettingsAppearance from "./SettingsAppearance";

// Props
interface Props {
    selected: number
    settings: any
    languages: any
    setSettings: (settings:any) => void
    setSelected: (selected:number) => void
}

// Component
const SettingsList: React.FC<Props> = (props) => {
    // Context
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const {setSelected, selected, languages, settings, setSettings} = props

    const handleSelect = (id:number) => {
        if(selected === id) return

        if(id >= 0 && id<=2){
            setSelected(id)
        }
    }

    // Template
    return (
        <div className="settings-list">
            <div className="list-header">
                <div onClick={ () => handleSelect(0)} className={selected === 0 ? "list-header-item selected" : "list-header-item"} >
                    <div className="item-image">
                        <img alt="" src={require("../../assets/images/settingsImages/profile.svg")} />
                    </div>
                    <div className="item-name">
                        <span>{text.settings.profile}</span>
                    </div>
                </div>
                <div onClick={ () => handleSelect(1)}  className={selected === 1 ? "list-header-item selected password" : "list-header-item password"}>
                    <div className="item-image">
                        <img alt="" src={require("../../assets/images/settingsImages/password.svg")} />
                    </div>
                    <div className="item-name">
                        <span>{text.settings.password}</span>
                    </div>
                </div>
                <div onClick={ () => handleSelect(2)}  className={selected === 2 ? "list-header-item selected" : "list-header-item"}>
                    <div className="item-image">
                        <img alt="" src={require("../../assets/images/settingsImages/design.svg")} />
                    </div>
                    <div className="item-name">
                        <span>{text.settings.appearance}</span>
                    </div>
                </div>
            </div>

            {selected === 0 && (
                <SettingsProfile settings={settings} setSettings={setSettings} languages={languages} />
            )}
            {selected === 1 && (
                <SettingsPassword />
            )}
            {selected === 2 && (
                <SettingsAppearance />
            )}


        </div>
    )
}

export default SettingsList
