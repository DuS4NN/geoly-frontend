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
    handleShowDeleteModal: (id:number) => void
    handleShowEditModal: (id:number) => void
    handleShowManageModal: (id:number) => void
}

// Component
const GroupListCreatedItem: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text
    const [date, setDate] = useState(new Date())

    const {group, handleShowDeleteModal, handleShowEditModal, handleShowManageModal} = props


    useEffect(() => {
        if(group.groupDate){
            setDate(new Date(group.groupDate))
        }
    }, [])

    const handleEditGroup = () => {
        handleShowEditModal(group)
    }
    const handleManageUsers = () => {
        handleShowManageModal(group.groupId)
    }
    const handleDeleteGroup = () => {
        handleShowDeleteModal(group.groupId)
    }

    // Template
    return (
        <div className="content-item">

            <div className="item-info">
                <div className="item-name">
                    <NavLink to={"./group/"+group.groupId}>{group.groupName}</NavLink>
                </div>
                <div className="item-date">
                    <span>{date.getDate()+" "+text.month[date.getMonth()]+" "+date.getFullYear()}</span>
                </div>
            </div>

            <div className="item-buttons">
                <img data-tip={text.groups.editGroup} onClick={handleEditGroup}  alt="" src={userContext['darkMode'] ? require("../../assets/images/darkModeImages/edit.svg") : require("../../assets/images/otherIcons/edit.svg")} />
                <img data-tip={text.groups.manageUsers} onClick={handleManageUsers} alt="" src={userContext['darkMode'] ? require("../../assets/images/darkModeImages/manage-users.svg") : require("../../assets/images/otherIcons/manage-users.svg")} />
                <img data-tip={text.groups.deleteGroup} onClick={handleDeleteGroup} alt="" src={userContext['darkMode'] ? require("../../assets/images/darkModeImages/delete.svg") : require("../../assets/images/otherIcons/delete.svg")} />
            </div>

            <ReactTooltip />
        </div>
    )
}

export default GroupListCreatedItem
