import React, {useContext, useEffect} from "react"
import {NavLink} from "react-router-dom"
// Context
import {UserContext} from "../../UserContext"

import './UserQuestList.scss'

// Props
interface Props {
    playedQuest: any
}

const UserQuestPlayedItem: React.FC<Props> = (props) => {

    const {playedQuest} = props
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    useEffect(() => {
        console.log(playedQuest)
    }, [playedQuest])

    return (
        <div>
            <div className="container-table-item">

                <div className="item-category-image">
                    <img alt="" data-tip={text.category[(playedQuest[0].categoryName).toLowerCase()]}  src={playedQuest[0].questId ? require("../../"+playedQuest[0].categoryImage) : ""} />
                </div>
                <div className="item-quest-name">
                    <NavLink to={"./quest/"+playedQuest[0].questId}>{playedQuest[0].questName}</NavLink>
                </div>
            </div>

            {playedQuest.map((quest:any) => (
                <div key={quest.stageId + quest.stageStatus + quest.stageDate} className="item-stage-container">
                    <div className="item-stage-image">
                        <img alt="" src={quest.questId ? require("../../assets/images/stageTypeImages/"+quest.stageType+".svg") : ""} />
                    </div>
                    <div className="item-stage-name">
                        <span>{quest.questId ? text.stageType[quest.stageType] : ""}</span>
                    </div>
                    <div className="item-stage-date">
                        <span>{quest.stageDate ? new Date(quest.stageDate).getDate()+" "+text.month[new Date(quest.stageDate).getMonth()]+" "+new Date(quest.stageDate).getFullYear() : ""}</span>
                    </div>
                    <div className="item-stage-status">
                        <img alt="" data-tip={text.stageStatus[quest.stageStatus]} src={quest.stageStatus ? require("../../assets/images/stageStatus/"+quest.stageStatus+".svg") : ""} />
                    </div>
                </div>
            ))}
        </div>

    )
}
export default UserQuestPlayedItem
