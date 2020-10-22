import React, {useContext, useEffect} from "react"
import {useHistory} from "react-router-dom"
import {UserContext} from "../UserContext"
import UserQuestImage from "../components/UserQuest/UserQuestImage";
import UserQuestList from "../components/UserQuest/UserQuestList";
import {useAlert} from "react-alert";
import "../components/UserQuest/SmallDeviceUserQuest.scss"
// Props
interface Props {
}

// Component
const UserQuest: React.FC = () => {
    const {userContext} = useContext(UserContext)
    const text = require('../assets/languageText/'+userContext['languageId']+'.ts').text
    const alert = useAlert()
    const history = useHistory()

    useEffect(() => {
        if(!userContext['nickName']){
            alert.error(text.error.UNAUTHORIZED)
            history.push("/login")
            return
        }
    }, [])

    // Template
    return (
        <div className="user-quest">
            {userContext['nickName'] && (
                <div>
                    <UserQuestImage />
                    <UserQuestList />
                </div>
            )}
        </div>
    )
}

export default UserQuest
