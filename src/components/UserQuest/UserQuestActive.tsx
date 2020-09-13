import React, {useContext, useEffect, useState} from "react"
import {NavLink} from "react-router-dom"
import axios from "axios"
import {useHistory} from "react-router-dom"
// Context
import {UserContext} from "../../UserContext"

import './UserQuestList.scss'
import {useAlert} from "react-alert";

// Props
interface Props {
    activeQuest: any
    setActiveQuest: (activeQuest:any) => void
}

const UserQuestActive: React.FC<Props> = (props) => {

    const {setActiveQuest, activeQuest} = props

    const [image, setImage] = useState("")
    const [category, setCategory] = useState("")

    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const alert = useAlert()

    useEffect(() => {
        if(activeQuest.categoryImage){
            setImage(activeQuest.categoryImage)
            setCategory(activeQuest.categoryName)
        }
    },[activeQuest])

    return (
        <div className="user-quest-active">
            {activeQuest.questId && (
                <div className="user-quest-active-container">
                    <div className="container-title">
                        <h2>{text.userQuest.activeQuest}</h2>
                    </div>
                    <div className="container-table">
                        <div className="container-table-item">
                            <div className="item-category-image">
                                <img alt="" src={require("../../"+image)} />
                            </div>
                            <div className="item-category-name">
                                <span>{text.category[category.toLowerCase()]}</span>
                            </div>
                            <div className="item-quest-name">
                                <NavLink to={"./quest/"+activeQuest.questId}>{activeQuest.questName}</NavLink>
                            </div>
                        </div>
                    </div>

                    <div className="container-button">
                        <button>{text.userQuest.signOut}</button>
                    </div>

                </div>
            )}
        </div>
    )
}
export default UserQuestActive
