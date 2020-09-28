import React, {useContext} from "react"
import ReactModal from "react-modal"
import Modal from 'react-modal';
import axios from "axios"
// Context
import {UserContext} from "../../UserContext";
// Style
import './Modal.scss'
import {useAlert} from "react-alert";

// Props
interface Props {
    showModal: boolean
    setShowModal: (show: boolean) => void
    leaveGroupId: number
    groups: any
    page: number
    setPage: (page:number) => void
    count: number
    setCount: (count:number) => void
    getEnteredGroups: (page:number) => void
}

// Components
const ModalLeaveGroup: React.FC<Props> = (props) => {
    // Context
    const {userContext} = useContext(UserContext)
    const alert = useAlert()

    // Props state
    const {showModal, setShowModal, leaveGroupId, groups, page, setPage, count, setCount, getEnteredGroups} = props


    // Modal
    Modal.setAppElement("#root")
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
            url: process.env.REACT_APP_API_SERVER_URL+'/group/leave?id='+leaveGroupId,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){

                if(count > 1 && groups.length === 1){
                    getEnteredGroups(page-1)
                    setPage(page-1)
                }else{
                    getEnteredGroups(page)
                }
                setCount(count-1)
                alert.success(text.success[serverResponse])
                handleCloseModal()
            }else if(serverResponse === 'CAN_NOT_LEAVE_OWN_GROUP'){
                alert.error(text.error[serverResponse])
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
                <img src={require("../../assets/images/question.svg")} alt="" />
            </div>

            <div className="modal-form">
                <div className="title">
                    <h3>{text.groups.leaveGroupTitle}</h3>
                </div>
                <div className="subtitle">
                    <span>
                        {text.groups.leaveGroupDesc}
                    </span>
                </div>
                <div className="form">
                    <div className="form-yes">
                        <button onClick={handleSubmit}>{text.deleteReview.accept}</button>
                    </div>
                    <div className="form-no" >
                        <button onClick={handleCloseModal}>{text.deleteReview.decline}</button>
                    </div>
                </div>
            </div>

            <div className="close-modal">
                <button onClick={handleCloseModal}>X</button>
            </div>
        </ReactModal>
    )
}

export default ModalLeaveGroup
