import React, {useContext, useState} from "react"

import "./QuestStages.scss"
import {UserContext} from "../../UserContext";

// Props
interface Props {
    stages: any
}

// Component
const QuestStages: React.FC<Props> = (props) => {

    //@ts-ignore
    const {userContext} = useContext(UserContext)

    const {stages} = props

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text



    // Template
    return (
        <div className="quest-stages">
            {stages.map((stage:any) => (
                <div key={stage.stageId} className="quest-stages-item">
                    <div className="item-image">
                        <img alt="" src={require("../../assets/images/stageTypeImages/"+stage.type+".svg")} />
                    </div>

                    <div className="item-name">
                        <span>{text.stageType[stage.type]}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default QuestStages
