import React, {useContext} from "react"
import {UserContext} from "../UserContext"
import UserQuestImage from "../components/UserQuest/UserQuestImage";
import UserQuestList from "../components/UserQuest/UserQuestList";
import "../components/UserQuest/SmallDeviceUserQuest.scss"
import useUserLogin from "../utils/useUserLogin"

// Props
interface Props {
}

// Component
const UserQuest: React.FC = () => {
    const {userContext} = useContext(UserContext)
    useUserLogin()

    // Template
    return (
        <div className="user-quest">
            {userContext['nickName'] && localStorage.getItem("nickName") && (
                <div>
                    <UserQuestImage />
                    <UserQuestList />
                </div>
            )}
        </div>
    )
}

export default UserQuest
