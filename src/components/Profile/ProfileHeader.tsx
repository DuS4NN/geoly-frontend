import React, {useContext} from 'react'
import {UserContext} from "../../UserContext"

// Style
import './ProfileHeader.scss'

// Props
interface Props {
    user: any
    playedLength: number
    createdLength: number
}

// Component
const ProfileHeader: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const {user, createdLength, playedLength} = props

    // Template
    return (
        <div className="header">
            <div className="header-main">
                <div className="header-title">
                    <div className="header-user">
                        <div className="user-info">
                            <div className="user-image">
                                <img src={process.env.REACT_APP_IMAGE_SERVER_URL+user.image} alt=""/>
                            </div>
                            <div className="user-nick">
                                <span>{user.nick}</span>
                            </div>
                        </div>

                    </div>

                    <div className="header-create-date">
                        <div className="date-text">{text.profile.since}  {user.date && user.date.getDate()+" "+text.month[user.date.getMonth()]+" "+user.date.getFullYear()}</div>
                    </div>
                </div>

                <div className="header-list">

                   <div className="list-item">
                       <div className="item-image">
                           <img src={require("../../assets/images/profileImages/created.svg")} alt="" />
                       </div>
                       <div className="item-text">
                           <span>{text.profile.createdCount + createdLength}</span>
                       </div>
                   </div>

                    <div className="list-item">
                        <div className="item-image">
                            <img src={require("../../assets/images/profileImages/finished.svg")} alt="" />
                        </div>
                        <div className="item-text">
                            <span>{text.profile.finishedCount + playedLength}</span>
                        </div>
                    </div>

                    <div className="list-item">
                        <div className="item-image">
                            <img src={require("../../assets/images/profileImages/best.svg")} alt="" />
                        </div>
                        <div className="item-text">
                            <span>{text.profile.bestSeason + user.best}</span>
                        </div>
                    </div>

                    <div className="list-item">
                        <div className="item-image">
                            <img src={require("../../assets/images/profileImages/season.svg")} alt="" />
                        </div>
                        <div className="item-text">
                            <span>{text.profile.thisSeason + user.this}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProfileHeader
