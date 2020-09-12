import React, {useContext, useEffect, useState} from "react"
import {NavLink} from "react-router-dom"
// Context
import {UserContext} from "../../UserContext"

import './UserQuestList.scss'

// Props
interface Props {
    createdQuest: any
}

const UserQuestCreatedItem: React.FC<Props> = (props) => {

    const {createdQuest} = props

    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const [image, setImage] = useState("")

    useEffect(() => {
        if(createdQuest.questId){
            setImage(createdQuest.categoryImage)
        }

    }, [createdQuest])

    return (
        <div className="user-quest-created">
            {createdQuest != {} && (
                <div className="container-table-item">
                    <div className="item-category-image">
                        <img alt="" src={require("../../"+image)} />
                    </div>
                    <div className="item-quest-name">
                        <NavLink to={"./quest/"+createdQuest.questId}>{createdQuest.questName}</NavLink>
                    </div>
                    <div className="item-quest-buttons">
                        <img title={text.userQuest.editQuest}  alt="" src={require("../../assets/images/otherIcons/edit.svg")} />
                        <img title={text.userQuest.deleteQuest}  alt="" src={require("../../assets/images/otherIcons/delete.svg")} />
                    </div>
                </div>
            )}
        </div>
    )
}
export default UserQuestCreatedItem
