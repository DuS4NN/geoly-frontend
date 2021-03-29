import React, {useContext, useEffect, useState} from 'react'

import './QuestTitle.scss'
import {UserContext} from "../../UserContext";
import {NavLink} from "react-router-dom";
import ReactTooltip from "react-tooltip";

// Props
interface Props {
    details: any
}

// Component
const QuestTitle: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)


    const {details} = props
    const [image, setImage] = useState("")
    const [date, setDate] = useState(new Date())
    const [category, setCategory] = useState("")

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    useEffect(() => {
        if (details !== null && details.categoryImage) {
            setImage( require( "../../" + details.categoryImage ) )
            setDate(new Date(details.questDate))
            setCategory(details.categoryName)
        }
    },[details])


    // Template
    return (
        <div className="quest-title">

            <div className="quest-title-category">
                <div className="category-image">
                    {details !== null && (
                        <img alt="" src={image} />
                    )}
                </div>
                <div className="category-name">
                    {details !== null && (
                        <span>{text.category[category.toLowerCase()]}</span>
                    )}

                </div>

                <div className="date">
                    {details !== null && (
                        <span>{date.getDate()+" "+text.month[date.getMonth()]+" "+date.getFullYear()}</span>
                    )}

                </div>
                {details !== null && details.questPremium === 1 && (
                    <div className="premium">
                        <img alt="" src={require("../../assets/images/otherIcons/premium.svg")} />
                        <span className="premium-text">{text.profile.premiumQuest}</span>
                    </div>
                )}
            </div>

            <div className="quest-title-name">
                {details !== null && (
                    <div className="title-name-text">{details.questName}</div>
                )}
            </div>

            <div className="quest-title-user">
                <div className="quest-title-user-box">

                    <div className="user-image">
                        {details !== null && (
                            <img alt="" src={process.env.REACT_APP_IMAGE_SERVER_URL+details.userImage} />
                        )}
                    </div>
                    <div className="user-name">
                        {details !== null && (
                            <NavLink to={"/profile/"+details.userName}>{details.userName}</NavLink>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestTitle
