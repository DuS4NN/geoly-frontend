import React, {useContext, useEffect, useState} from "react"
import {NavLink} from "react-router-dom"
// Context
import {UserContext} from "../../UserContext"

import './UserQuestList.scss'
import UserQuestCreatedItem from "./UserQuestCreatedItem";

// Props
interface Props {
    createdQuest: any
    setCreatedQuest: (activeQuest:any) => void
}

const UserQuestCreated: React.FC<Props> = (props) => {

    const {createdQuest, setCreatedQuest} = props

    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    return (
        <div className="user-quest-created">
            {createdQuest.length > 0 && (
                <div className="user-quest-created-container">
                    <div className="container-title">
                        <h2>{text.userQuest.createdQuests}</h2>
                    </div>

                    <div className="container-table">
                        {createdQuest.map((quest:any) => (
                            <UserQuestCreatedItem key={quest.questId} createdQuest={quest} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
export default UserQuestCreated
