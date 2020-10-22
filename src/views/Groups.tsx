import React, {useContext, useEffect} from "react"
import GroupsImage from "../components/Groups/GroupsImage";
import GroupsList from "../components/Groups/GroupsList";
import {UserContext} from "../UserContext";
import {useHistory} from "react-router-dom"
import {useAlert} from "react-alert";
import "../components/Groups/SmallDeviceGroups.scss"

// Props
interface Props {
}

// Component
const Groups: React.FC<Props> = (props) => {

    const {userContext} = useContext(UserContext)
    const text = require('../assets/languageText/'+userContext['languageId']+'.ts').text
    const history = useHistory()
    const alert = useAlert()

    useEffect(() => {
        if(!userContext['nickName']){
            alert.error(text.error.UNAUTHORIZED)
            history.push("/login")
            return
        }
    }, [])

    // Template
    return (
        <div className="groups">
            {userContext['nickName'] && (
                <div>
                    <GroupsImage />
                    <GroupsList />
                </div>
            )}
        </div>
    )
}

export default Groups
