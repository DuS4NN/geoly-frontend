import React, {useContext} from "react"

import {UserContext} from "../../UserContext"

import './UserQuestImage.scss'

// Props
interface Props {
}

// Component
const UserQuestImage: React.FC = () => {
    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text


    // Template
    return (
        <div className="user-quest-image">
            <div className="user-quest-image-content">
                <div className="content-text">
                    <div className="content-text-title">
                        <h2>{text.userQuest.title}</h2>
                    </div>
                    <br />
                    <div className="content-text-subtitle">
                        <span>{text.userQuest.subtitle}</span>
                    </div>
                </div>

                <div className="content-image">
                </div>
            </div>

            <div className="user-quest-image-background">
                <img src={require("../../assets/images/obliqueBottom.svg")} alt="" />
            </div>
        </div>
    )
}

export default UserQuestImage
