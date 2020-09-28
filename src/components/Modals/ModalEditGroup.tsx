import React, {useContext, useEffect, useRef, useState} from "react"
import ReactModal from "react-modal"
import Modal from 'react-modal';
import axios from "axios"
import {UserContext} from "../../UserContext";
import {useAlert} from "react-alert";
import {NavLink} from "react-router-dom"


import './Modal.scss'
import ReactTooltip from "react-tooltip";

// Props
interface Props {
    showModal: boolean
    setShowModal: (show: boolean) => void
    editGroup: any
    createdGroups: any
    setCreatedGroups: (createdQuests:any) =>void
}

// Components
const ModalEditGroup: React.FC<Props> = (props) => {
    // Context
    const {userContext} = useContext(UserContext)
    const alert = useAlert()

    // Props state
    const {showModal, setShowModal, editGroup, setCreatedGroups, createdGroups} = props

    const [questsInGroup, setQuestsInGroup] = useState([]) as Array<any>

    const nameRef = useRef(null) as any

    useEffect(() => {
        Modal.setAppElement("body")
        if(editGroup.groupId){
            axios({
                method: 'GET',
                url: process.env.REACT_APP_API_SERVER_URL+'/group/quests?id='+editGroup.groupId,
                withCredentials: true
            }).then(function (response) {
                let statusCode = response.data.responseEntity.statusCode

                if(statusCode === 'OK'){
                    let newQuestsInGroup = response.data.data.map((quest:any) => {
                        return {
                            partyQuestId: quest[0],
                            questId: quest[1],
                            questName: quest[2],
                            categoryImage: quest[3]
                        }
                    })
                    setQuestsInGroup(newQuestsInGroup)
                }else{
                    alert.error(text.error.SOMETHING_WENT_WRONG)
                }
            })
        }
    },[editGroup])
    // Text
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    // Methods
    const handleKeyPress = (e: KeyboardEvent) => {
        if(e.code === 'Escape'){
            handleCloseModal()
        }
    }

    const handleCloseModal = () => {
        setShowModal(false)
        document.removeEventListener("keydown", handleKeyPress);
    }

    const onAfterOpenModal = () => {
        document.addEventListener("keydown", handleKeyPress);
    }

    const handleSubmit = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/group/edit?partyId='+editGroup.groupId+'&name='+nameRef.current?.value,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){

                setCreatedGroups(createdGroups.map((group:any) => {
                    if(group.groupId == editGroup.groupId){
                        return {
                            ...group,
                            groupName: nameRef.current?.value
                        }
                    }else{
                        return group
                    }
                }))

                alert.success(text.success[serverResponse])

                handleCloseModal()
            }else if(serverResponse === 'INVALID_PARTY_NAME_FORMAT' || serverResponse === 'INVALID_PARTY_NAME_LENGTH'){
                alert.error(text.error[serverResponse])
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        })
    }

    const handleQuestDelete = (questId:number) => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/group/deletequest?partyId='+editGroup.groupId+'&questId='+questId,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){

                setQuestsInGroup(questsInGroup.filter(function (quest:any) {
                    return quest.questId !== questId
                }))


                alert.success(text.success[serverResponse])
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        })
    }

    // Template
    return (
        <ReactModal
            className="modal"
            closeTimeoutMS={500}
            isOpen={showModal}
            onAfterOpen={onAfterOpenModal}>

            <div className="image">
                <img src={require("../../assets/images/edit.svg")} alt="" />
            </div>

            <div className="modal-form">
                <div className="title">
                    <h3>{text.groups.editGroupTitle}</h3>
                </div>
                <div className="subtitle">
                    <span>
                        {text.groups.editGroupDesc}
                    </span>
                </div>
                <div className="form">
                    <div className="form-input">
                        <input maxLength={15} ref={nameRef} type="text" defaultValue={editGroup.groupName} />
                    </div>

                    <div className="form-list">
                        {questsInGroup.map((quest:any) => (
                            <div key={quest.partyQuestId} className="list-quest-item">
                                <div className="item-image">
                                    <img src={require("../../"+quest.categoryImage)} alt="" />
                                </div>
                                <div className="item-name">
                                    <NavLink to={"/quest/"+quest.questId}>{quest.questName}</NavLink>
                                </div>
                                <div className="item-delete">
                                    <img onClick={() => handleQuestDelete(quest.questId)} src={require("../../assets/images/otherIcons/delete.svg")} alt="" data-tip={text.groups.deleteGroup} />
                                    <ReactTooltip />
                                </div>
                            </div>
                        ))}

                        <div className="form-submit-button">
                            <button onClick={handleSubmit}>{text.groups.editGroup}</button>
                        </div>

                    </div>

                </div>
            </div>

            <div className="close-modal">
                <button onClick={handleCloseModal}>X</button>
            </div>
        </ReactModal>
    )
}

export default ModalEditGroup
