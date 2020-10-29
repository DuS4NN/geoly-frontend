import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from "../../UserContext"
import {NavLink} from "react-router-dom";

// Props
interface Props {
    stage: any
    userInfo: any
}

// Component
const GroupQuestDetailStageItem: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const {stage, userInfo} = props

    const [expanded, setExpanded] = useState(false) as Array<any>
    const [filteredUserInfo, setFilteredUserInfo] = useState([]) as Array<any>

    const handleExpand = () => {
        setExpanded(!expanded)
    }

    useEffect(() => {
        setFilteredUserInfo(userInfo.filter(function (info:any) {return info.userQuestStageId === stage.stageId}))
    }, [userInfo])

    // Template
    return (
        <div>
            <div className="stage-item">
                <div className="item-image">
                    <img src={require("../../assets/images/stageTypeImages/"+stage.stageType+'.svg')} alt="" />
                </div>
                <div className="item-name">
                    <span>{text.stageType[stage.stageType]}</span>
                </div>
                <div className={filteredUserInfo.length > 0 ? "item-arrow" : "item-arrow hide"}>
                    <img onClick={handleExpand} alt="" src={expanded ? userContext['darkMode'] ? require("../../assets/images/darkModeImages/arrow-up.svg") : require("../../assets/images/otherIcons/arrow-up.svg") : userContext['darkMode'] ? require("../../assets/images/darkModeImages/arrow-down.svg") : require("../../assets/images/otherIcons/arrow-down.svg")} />
                </div>
            </div>

            <div className={expanded ? "user-info expanded" : "user-info"}>
                {filteredUserInfo.map((info:any) => (
                    <div key={info.userQuestId} className="stage-user-item">

                        <div className="stage-user">

                            <div className="stage-user-info">
                                <div className="user-image">
                                    <img src={process.env.REACT_APP_IMAGE_SERVER_URL+info.userImage} alt="" />
                                </div>

                                <div className="user-name">
                                    <NavLink to={"/profile/"+info.userName}>{info.userName}</NavLink>
                                </div>
                            </div>

                            <div className="user-time">
                                <span>{info.userDate && info.userDate.getDate()+" "+text.month[info.userDate.getMonth()]+" "+info.userDate.getFullYear()+ " "+ info.userDate.getHours()+ ":"+ info.userDate.getMinutes()}</span>
                            </div>

                        </div>

                        <div className="user-status">
                            <img src={require("../../assets/images/stageStatus/"+info.userQuestStatus+".svg")} alt="" title={text.stageStatus[info.userQuestStatus]} />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default GroupQuestDetailStageItem
