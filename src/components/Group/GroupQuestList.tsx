import React, {useContext} from 'react'
import {UserContext} from "../../UserContext"

// Props
interface Props {
    quests: any
    setSelectedQuest: (id:number) => void
}

// Component
const GroupQuestList: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const {quests, setSelectedQuest} = props

    const handleClickOnQuest = (quest:number) => {
        setSelectedQuest(quest)
    }

    // Template
    return (
        <div className="group-quest-list">
            {quests.map((quest:any) => (
                <div key={quest.questId} className="quest-list-item" onClick={() => handleClickOnQuest(quest)}>
                    <div className="quest-category">
                        <img alt="" src={require("../../"+quest.categoryImage)} />
                    </div>
                    <div className="quest-name">
                        <span>{quest.questName}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GroupQuestList
