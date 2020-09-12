import React, {useContext, useEffect, useState} from "react"
import {NavLink} from "react-router-dom"
// Context
import {UserContext} from "../../UserContext"

import './UserQuestList.scss'
import UserQuestCreatedItem from "./UserQuestCreatedItem";
import UserQuestPlayedItem from "./UserQuestPlayedItem";

// Props
interface Props {
    playedQuest: any
    setPlayedQuest: (activeQuest:any) => void
}

const UserQuestPlayed: React.FC<Props> = (props) => {

    const {playedQuest, setPlayedQuest} = props

    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    return (
        <div className="user-quest-played">
            {playedQuest.length > 0 && (
                <div className="user-quest-played-container">
                    <div className="container-title">
                        <h2>{text.userQuest.playedQuests}</h2>
                    </div>

                    <div className="container-table">
                        {playedQuest.reverse().map((quest:any) => (
                            <UserQuestPlayedItem key={quest[0].questId} playedQuest={quest} />
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}
export default UserQuestPlayed
