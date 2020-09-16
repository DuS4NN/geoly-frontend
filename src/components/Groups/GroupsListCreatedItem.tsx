import React, {useContext, useEffect, useState} from 'react'
// Context
import {UserContext} from "../../UserContext"

// Style
import '../Elements/PageHeader.scss'
import {NavLink} from "react-router-dom";

// Props
interface Props {
    group: any
    handleShowDeleteModal: (id:number) => void
    handleShowEditModal: (id:number) => void
}

// Component
const GroupsListCreatedItem: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text
    const [date, setDate] = useState(new Date())

    const {group, handleShowDeleteModal, handleShowEditModal} = props


    useEffect(() => {
        if(group.groupDate){
            setDate(new Date(group.groupDate))
        }
    }, [])

    const handleEditGroup = () => {
        handleShowEditModal(group)
    }
    const handleManageUsers = () => {

    }
    const handleDeleteGroup = () => {
        handleShowDeleteModal(group.groupId)
    }

    // Template
    return (
        <div className="content-item">

            <div className="item-name">
                <NavLink to={"./group/"+group.groupId}>{group.groupName}</NavLink>
            </div>
            <div className="item-date">
                <span>{date.getDate()+" "+text.month[date.getMonth()]+" "+date.getFullYear()}</span>
            </div>
            <div className="item-buttons">
                <img title={text.groups.editGroup} onClick={handleEditGroup}  alt="" src={require("../../assets/images/otherIcons/edit.svg")} />
                <img title={text.groups.manageUsers} onClick={handleManageUsers} alt="" src={require("../../assets/images/otherIcons/manage-users.svg")} />
                <img title={text.groups.deleteGroup} onClick={handleDeleteGroup} alt="" src={require("../../assets/images/otherIcons/delete.svg")} />
            </div>
        </div>
    )
}

export default GroupsListCreatedItem
