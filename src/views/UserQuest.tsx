import React, {useContext} from "react"
import {useHistory} from "react-router-dom"
// Context
import {UserContext} from "../UserContext"
import UserQuestImage from "../components/UserQuest/UserQuestImage";
import UserQuestList from "../components/UserQuest/UserQuestList";


// Props
interface Props {
}

// Component
const UserQuest: React.FC = () => {
    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)

    // Redirect
    const history = useHistory()

    // Do on start
    if(!userContext['nickName']){
        history.push("/login")
    }

    // Template
    return (
        <div className="user-quest">
            <UserQuestImage />
            <UserQuestList />
        </div>
    )
}

export default UserQuest
