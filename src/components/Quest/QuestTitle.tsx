import React, {useContext, useEffect, useState} from 'react'

import './QuestTitle.scss'
import {UserContext} from "../../UserContext";
import {NavLink} from "react-router-dom";

// Props
interface Props {
    details: any
}

// Component
const QuestTitle: React.FC<Props> = (props) => {

    //@ts-ignore
    const {userContext} = useContext(UserContext)


    const {details} = props
    const [image, setImage] = useState("")
    const [date, setDate] = useState(new Date())

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    useEffect(() => {
        if (details.categoryImage) {
            setImage( require( "../../" + details.categoryImage ) )
            setDate(new Date(details.questDate))
        }
    },[details])


    // Template
    return (
        <div className="quest-title">

            <div className="quest-title-category">
                <div className="category-image">
                    <img alt="" src={image} />
                </div>
                <div className="category-name">
                    <span>{details.categoryName}</span>
                </div>

                <div className="date">
                    <span>{date.getDate()+" "+text.month[date.getMonth()]+" "+date.getFullYear()}</span>
                </div>
            </div>

            <div className="quest-title-name">
                <span>{details.questName}</span>
            </div>

            <div className="quest-title-user">
                <div className="quest-title-user-box">

                    <div className="user-image">
                        <img alt="" src={process.env.REACT_APP_IMAGE_SERVER_URL+details.userImage} />
                    </div>
                    <div className="user-name">
                        <NavLink to={"/profile/"+details.userName}>{details.userName}</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestTitle
