import React, {useContext, useEffect, useState} from "react"
import {useAlert} from "react-alert"
import ReactModal from "react-modal"
import Modal from 'react-modal';
import axios from "axios"
import {UserContext} from "../../UserContext";
import {useHistory} from "react-router-dom"
import './Modal.scss'
import StageItem from "./StageItem";

// Props
interface Props {
    showModal: boolean
    setShowModal: (show: boolean) => void
    questId: any
}

// Components
const ModalEditStages: React.FC<Props> = props => {
    // Context
    const {userContext} = useContext(UserContext)

    // Props state
    const {showModal, setShowModal, questId} = props
    const [stages, setStages] = useState([])


    const alert = useAlert()
    const history = useHistory()
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    useEffect(() => {
        Modal.setAppElement("#root")

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/quest/stage?id='+questId
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body;

            if(serverResponse === 'OK'){
                let newStages = response.data.data.map((stage:any) => {
                    return {
                        stageId: stage[0],
                        answer: stage[1],
                        latitude: stage[2],
                        longitude: stage[3],
                        qrCodeUrl: stage[4],
                        question: stage[5],
                        type: stage[6],
                        questId: stage[7],
                        advise: stage[8],
                        answerList: stage[9],
                        note: stage[10]
                    }
                })
                setStages(newStages)

            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }, [])

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
                    <h3>{text.userQuest.editStagesTitle}</h3>
                </div>
                <div className="subtitle">
                        <span>
                            {text.userQuest.editStagesSubTitle}
                        </span>
                </div>
                <div className="form">
                    {stages.map((stage:any) => (
                        <StageItem stage={stage} key={stage.stageId} />
                    ))}
                </div>
            </div>

            <div className="close-modal">
                <button onClick={handleCloseModal}>X</button>
            </div>
        </ReactModal>
    )
}

export default ModalEditStages
