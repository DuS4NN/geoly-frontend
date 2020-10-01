import React, {useContext} from "react"
import {UserContext} from "../../UserContext"

import '../Elements/PageHeader.scss'

// Props
interface Props {
}

// Component
const SettingsImage: React.FC = () => {
    // Context
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    // Template
    return (
        <div className="image">

            <div className="image-content">
                <div className="content-text">
                    <div className="content-text-title">
                        <h2>{text.settings.title}</h2>
                    </div>
                    <br />
                    <div className="content-text-subtitle">
                        <span>{text.settings.subtitle}</span>
                    </div>
                </div>

                <div className="content-image content-image-settings">
                </div>
            </div>

            <div className="image-background">
                <img src={require('../../assets/images/obliqueBottom.svg')} alt="" />
            </div>

        </div>
    )
}

export default SettingsImage
