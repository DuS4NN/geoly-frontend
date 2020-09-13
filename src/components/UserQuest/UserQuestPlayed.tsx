import React, {useContext} from "react"
import {UserContext} from "../../UserContext"
import UserQuestPlayedItem from "./UserQuestPlayedItem";
import './UserQuestList.scss'

// Props
interface Props {
    playedQuest: any
}

const UserQuestPlayed: React.FC<Props> = (props) => {

    const {playedQuest} = props
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
                        {playedQuest.map((quest:any) => (
                            <UserQuestPlayedItem key={quest[0].questId} playedQuest={quest} />
                        ))}
                    </div>

                    <div className="user-quest-played-container-bottom">
                        <div className="user-quest-played-container-bottom-border">
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default UserQuestPlayed
