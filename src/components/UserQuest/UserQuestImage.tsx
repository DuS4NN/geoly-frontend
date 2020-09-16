import React, {useContext} from "react"
import {UserContext} from "../../UserContext"

import '../Elements/PageHeader.scss'

// Props
interface Props {
}

// Component
const UserQuestImage: React.FC = () => {
    // Context
    const {userContext} = useContext(UserContext)

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text


    // Template
    return (
        <div className="image">
            <div className="image-content">
                <div className="content-text">
                    <div className="content-text-title">
                        <h2>{text.userQuest.title}</h2>
                    </div>
                    <br />
                    <div className="content-text-subtitle">
                        <span>{text.userQuest.subtitle}</span>
                    </div>
                </div>

                <div className="content-image content-image-user-quest">
                </div>
            </div>

            <div className="image-background">
                <img src={require("../../assets/images/obliqueBottom.svg")} alt="" />
            </div>
        </div>
    )
}

export default UserQuestImage
