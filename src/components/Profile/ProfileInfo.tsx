import React, {useContext, useEffect, useState} from "react"
import './ProfileInfo.scss'
import {UserContext} from "../../UserContext";
import ProfileBadges from "./ProfileBadges";
//@ts-ignore
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from "react-tooltip";

import '../Elements/CalendarHeatMap.scss'
// Props
interface Props {
    badges: any
    user:any
    activity: any
}

// Component
const ProfileInfo: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const {badges, user, activity} = props

    const [date, setDate] = useState(new Date())

    // Template
    return (
        <div className="profile-list">
            <div className="about">
                    {user.about && user.about.length>0 && (
                        <div>
                            <div className="about-title">
                                <span>{text.profile.about}</span>
                            </div>
                            <div className="about-text">
                                <span>{user.about}</span>
                            </div>
                        </div>
                    )}


                    <div className="heat-map">

                        <div className="heat-map-title">
                            <span>{text.profile.activity}</span>
                        </div>

                        <CalendarHeatmap
                            startDate={new Date(date.getFullYear()-1,date.getMonth(),date.getDate()-1)}
                            endDate={new Date()}
                            gutterSize={4}
                            //@ts-ignore
                            tooltipDataAttrs={(value) => {

                                let date = value.date?.split('-')

                                return {
                                    "data-tip": date == null ? `` : ``+date[2]+' '+text.month[date[1]]+' '+date[0]
                                };
                            }}
                            classForValue={(value:any) => {
                                if (!value) {
                                    return 'color-github-0';
                                }
                                return `color-github-${value.count}`;
                            }}
                            values={activity}
                        />
                        <ReactTooltip />
                    </div>
                </div>

            {badges.length > 1 && (
                <ProfileBadges badges={badges} />
            )}
        </div>

    )
}

export default ProfileInfo
