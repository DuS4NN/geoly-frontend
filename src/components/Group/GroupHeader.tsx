import React, {useContext} from 'react'
import {UserContext} from "../../UserContext"
import {NavLink} from "react-router-dom"

// Style
import './GroupHeader.scss'

// Props
interface Props {
    details: any
    users: any
}

// Component
const GroupHeader: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const {details, users} = props

    // Template
    return (
        <div className="header">
            <div className="header-main">
                <div className="header-title">
                    <div className="header-name">
                        <h2>{details.groupName}</h2>
                    </div>

                    <div className="header-create-date">
                        <span>{text.group.created}  {details.groupDate && details.groupDate.getDate()+" "+text.month[details.groupDate.getMonth()]+" "+details.groupDate.getFullYear()}</span>
                    </div>
                </div>

                <div className="header-user-list">

                    <div className="list-right">
                        {users.map((user:any, index:any) => index%2===0 && (
                            <div key={user.userName} className="user-list-item">
                                <div className="item-image">
                                    <img alt="" src={process.env.REACT_APP_IMAGE_SERVER_URL+user.userImage} />
                                </div>
                                <div className="item-name">
                                    <NavLink to={"/profile/"+user.userName}>{user.userName}</NavLink>
                                    {details.groupOwner === user.userName && (
                                        <img src={require("../../assets/images/otherIcons/crown.svg")} alt="" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="list-left">
                        {users.map((user:any, index:any) => index%2 !== 0 && (
                            <div key={user.userName} className="user-list-item">
                                <div className="item-image">
                                    <img alt="" src={process.env.REACT_APP_IMAGE_SERVER_URL+user.userImage} />
                                </div>
                                <div className="item-name">
                                    <NavLink to={"/profile/"+user.userName}>{user.userName}</NavLink>
                                    {details.groupOwner === user.userName && (
                                        <img src={require("../../assets/images/otherIcons/crown.svg")} alt="" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>




                </div>
            </div>
        </div>
    )
}

export default GroupHeader
