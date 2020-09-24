import React, {useContext, useState} from "react"
import {NavLink} from "react-router-dom"
// Context
import {UserContext} from "../../UserContext"

import './UserQuestList.scss'
import ModalDeleteQuest from "../Modals/ModalDeleteQuest";
import ModalEditQuest from "../Modals/ModalEditQuest";
import ReactTooltip from "react-tooltip";

// Props
interface Props {
    createdQuest: any
    createdQuests: any
    setCreatedQuests: (createdQuests:any) => void
    count: number
    setCount: (count:any) => void
    page: number
    setPage: (page:number) => void
    getCreatedQuests: (page:number) => void
}

const UserQuestCreatedItem: React.FC<Props> = (props) => {

    const {createdQuest, createdQuests, setCreatedQuests, count, setCount, page, setPage, getCreatedQuests} = props

    // Context
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)


    const handleDeleteQuest = () => {
        setShowDeleteModal(true)
    }

    const handleEditQuest = () => {
        setShowEditModal(true)
    }

    return (
        <div className="user-quest-created">
            <ModalDeleteQuest showModal={showDeleteModal} setShowModal={setShowDeleteModal} deleteQuestId={createdQuest.questId} createdQuests={createdQuests} count={count} setCount={setCount} page={page} setPage={setPage} getCreatedQuests={getCreatedQuests}/>
            <ModalEditQuest showModal={showEditModal} setShowModal={setShowEditModal} createdQuest={createdQuest} createdQuests={createdQuests} setCreatedQuests={setCreatedQuests} />

            {createdQuest !== {} && (
                <div className="container-table-item">
                    <div className="item-category-image">
                        <img data-tip={text.category[(createdQuest.categoryName).toLowerCase()]} alt="" src={createdQuest.questId ? require("../../"+createdQuest.categoryImage) : "" } />
                    </div>
                    <div className="item-quest-name">
                        <NavLink to={"./quest/"+createdQuest.questId}>{createdQuest.questName}</NavLink>
                    </div>
                    <div className="item-quest-buttons">
                        <img data-tip={text.userQuest.editQuest} onClick={handleEditQuest}  alt="" src={require("../../assets/images/otherIcons/edit.svg")} />
                        <img data-tip={text.userQuest.deleteQuest} onClick={handleDeleteQuest} alt="" src={require("../../assets/images/otherIcons/delete.svg")} />
                    </div>
                </div>
            )}
            <ReactTooltip />
        </div>
    )
}
export default UserQuestCreatedItem
