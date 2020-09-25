import React, {useContext} from 'react'
import {UserContext} from "../../UserContext"
import {NavLink} from "react-router-dom"
import ReactTooltip from "react-tooltip";

// Props
interface Props {
    quest: any
}

// Component
const ProfileQuestItem: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const {quest} = props


    // Template
    return (
        <div className="profile-quest-item">
            <div className="item-header">
                <div className="title-img">
                    <img alt="" data-tip={text.category[quest.categoryName.toLowerCase()]} src={require("../../"+quest.categoryImage)} />
                </div>
                <div className="title-name">
                    <NavLink to={"/quest/"+quest.questId}>{quest.questName}</NavLink>
                </div>
                <div className="title-arrow">

                </div>
            </div>

            <div className="item-footer">
                <div className="footer-user">
                    <div className="user-image">
                        <img alt="" src={process.env.REACT_APP_IMAGE_SERVER_URL+quest.userImage} />
                    </div>
                    <div className="user-name">
                        <NavLink to={"/profile/"+quest.userName} >{quest.userName}</NavLink>
                    </div>
                </div>
                <div className="footer-date">
                    <div className="date-text">{quest.questDate && quest.questDate.getDate()+" "+text.month[quest.questDate.getMonth()]+" "+quest.questDate.getFullYear()}</div>
                </div>
            </div>

            <ReactTooltip />
        </div>
    )
}

export default ProfileQuestItem


