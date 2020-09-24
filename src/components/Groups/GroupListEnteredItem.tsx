import React, {useContext, useEffect, useState} from 'react'
// Context
import {UserContext} from "../../UserContext"

// Style
import '../Elements/PageHeader.scss'
import {NavLink} from "react-router-dom";
import ReactTooltip from "react-tooltip";

// Props
interface Props {
    group: any
    handleShowLeaveModal: (id:number) => void
}

// Component
const GroupListEnteredItem: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text
    const [date, setDate] = useState(new Date())

    const {group, handleShowLeaveModal} = props


    useEffect(() => {
        if(group.groupDate){
            setDate(new Date(group.groupDate))
        }
    }, [])


    // Template
    return (
        <div className="content-item">

            <div className="item-name">
                <NavLink to={"./group/"+group.groupId}>{group.groupName}</NavLink>
            </div>
            <div className="item-date">
                <span>{date.getDate()+" "+text.month[date.getMonth()]+" "+date.getFullYear()}</span>
            </div>
            <div className="item-buttons-entered">
                <img data-tip={text.groups.leave} alt="" onClick={() => handleShowLeaveModal(group.groupId)} src={require("../../assets/images/otherIcons/leave.svg")} />
            </div>

            <ReactTooltip />
        </div>
    )
}

export default GroupListEnteredItem
