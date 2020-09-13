import React, {useContext} from "react"
import {UserContext} from "../../UserContext";

import "./QuestStages.scss"

// Props
interface Props {
    stages: any
}

// Component
const QuestStages: React.FC<Props> = (props) => {
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
