import React, {useContext, useEffect} from "react"
import ReactModal from "react-modal"
import Modal from 'react-modal';
import axios from "axios"
//@ts-ignore
import disableScroll from 'disable-scroll'
import {UserContext} from "../../UserContext";
import {useAlert} from "react-alert";


import './ModalDelete.scss'

// Props
interface Props {
    showModal: boolean
    setShowModal: (show: boolean) => void
    deleteQuestId: number
    createdQuests: any
    setCreatedQuests: (createdQuests:any) =>void
    count: number
    setCount: (count:number) => void
    page: number
    setPage: (page:number) => void
    getCreatedQuests: (page:number) => void
}

// Components
const ModalDeleteQuest: React.FC<Props> = (props) => {
    // Context
    const {userContext} = useContext(UserContext)
    const alert = useAlert()

    // Props state
    const {showModal, setShowModal, deleteQuestId, setCreatedQuests, createdQuests, count, setCount, page, setPage, getCreatedQuests} = props


    // Modal
    useEffect(() => {
        Modal.setAppElement("#root")
    },[])
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
        disableScroll.off()

        document.removeEventListener("keydown", handleKeyPress);
    }

    const onAfterOpenModal = () => {
        disableScroll.on(null,{
            disableKeys: false
        })

        document.addEventListener("keydown", handleKeyPress);
    }

    const handleSubmit = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/quest/disable?id='+deleteQuestId,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){

                if(count > 1 && createdQuests.length === 1){
                    getCreatedQuests(page-1)
                    setPage(page-1)
                }else{
                    getCreatedQuests(page)
                }


                /*setCreatedQuests(createdQuests.filter(function (quest:any) {
                    return quest.questId !== deleteQuestId
                }))*/
                alert.success(text.success[serverResponse])

                setCount(count-1)

                handleCloseModal()
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        })
    }

    // Template
    return (
        <ReactModal
            className="delete-modal"
            closeTimeoutMS={500}
            isOpen={showModal}
            onAfterOpen={onAfterOpenModal}>

            <div className="image">
                <img src={require("../../assets/images/question.svg")} alt="" />
            </div>

            <div className="delete-form">
                <div className="title">
                    <h3>{text.userQuest.deleteQuestTitle}</h3>
                </div>
                <div className="subtitle">
                    <span>
                        {text.userQuest.deleteQuestDesc}
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

export default ModalDeleteQuest
