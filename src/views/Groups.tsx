import React, {useContext} from "react"
import GroupsImage from "../components/Groups/GroupsImage";
import GroupsList from "../components/Groups/GroupsList";
import {UserContext} from "../UserContext";
import "../components/Groups/SmallDeviceGroups.scss"
import useUserLogin from "../utils/useUserLogin";

// Props
interface Props {
}

// Component
const Groups: React.FC<Props> = () => {

    const {userContext} = useContext(UserContext)
    useUserLogin()


    // Template
    return (
        <div className="groups">
            {userContext['nickName'] && localStorage.getItem("nickName") && (
                <div>
                    <GroupsImage />
                    <GroupsList />
                </div>
            )}
        </div>
    )
}

export default Groups
