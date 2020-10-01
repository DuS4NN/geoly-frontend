import React, {useContext} from "react"
import {UserContext} from "../../UserContext"

import './SettingsList.scss'

// Props
interface Props {
}

// Component
const SettingsList: React.FC = () => {
    // Context
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    // Template
    return (
        <div className="settings-list">
            <div className="list-header">
                <div className="list-header-item">
                    <div className="item-image">
                        <img alt="" src={require("../../assets/images/settingsImages/profile.svg")} />
                    </div>
                    <div className="item-name">
                        <span>Name</span>
                    </div>
                </div>
                <div className="list-header-item">

                </div>
                <div className="list-header-item">

                </div>
            </div>
        </div>
    )
}

export default SettingsList
