import React, {useContext, useEffect, useState} from "react"
import './ProfileList.scss'
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
}

// Component
const ProfileList: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const {badges, user} = props

    const [date, setDate] = useState(new Date())


    // Template
    return (
        <div className="profile-list">

            <div className="about">
                <div className="about-title">
                    <span>{text.profile.about}</span>
                </div>
                <div className="about-text">
                    <span>{user.about}</span>
                </div>
                <div className="heat-map">
                    <CalendarHeatmap
                        startDate={new Date(date.getFullYear()-1,date.getMonth(),date.getDate()-1)}
                        endDate={new Date()}
                        gutterSize={4}
                        //@ts-ignore
                        tooltipDataAttrs={(value) => {
                            return {
                                "data-tip": value.date == null ? `` : ``+value.date
                            };
                        }}
                        classForValue={(value:any) => {
                            if (!value) {
                                return 'color-github-0';
                            }
                            return `color-github-${value.count}`;
                        }}
                        values={[
                            { date: '2020-01-01', count: 1 },
                            { date: '2020-01-22', count: 2 },
                            { date: '2020-01-30', count: 3 },
                            // ...and so on
                        ]}
                    />
                    <ReactTooltip />
                </div>
            </div>



            {badges.length > 0 && (
                <ProfileBadges badges={badges} />
            )}

        </div>

    )
}

export default ProfileList
