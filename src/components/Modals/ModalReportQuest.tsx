import React, {useContext, useEffect, useState} from "react"
import {useAlert} from "react-alert"
import ReactModal from "react-modal"
import Modal from 'react-modal';
import axios from "axios"
import {UserContext} from "../../UserContext";
import './Modal.scss'
import {useHistory} from "react-router-dom"

interface Props {
    questId: any
    showReportModal: boolean
    setShowReportModal: (showReportModal:boolean) => void

}

const ModalReportQuest: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)

    const {showReportModal, setShowReportModal, questId} = props

    const [reportReasons, setReportReason] = useState([])
    const [selectedReason, setSelectedReason] = useState("")

    // Alerts
    const alert = useAlert()
    const history = useHistory()
    // Modal
    Modal.setAppElement("#root")
    // Text
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text


    useEffect(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/quest/reportreason'
        }).then(function (response) {
            setReportReason(response.data)
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
        setShowReportModal(false)

        document.removeEventListener("keydown", handleKeyPress);
    }

    const onAfterOpenModal = () => {
        document.addEventListener("keydown", handleKeyPress);
    }

    const handleSubmit = () => {

        if(selectedReason === ""){
            alert.error(text.error.SELECT_REASON)
            return
        }

        axios({
            method: 'POST',
            url: process.env.REACT_APP_API_SERVER_URL+'/quest/report?id='+questId+'&reason='+selectedReason,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){
                alert.success(text.success[serverResponse])
                handleCloseModal()
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }

    return (
        <ReactModal
            className="modal"
            closeTimeoutMS={500}
            isOpen={showReportModal}
            onAfterOpen={onAfterOpenModal}>
            <div className="image">
                <img src={require("../../assets/images/report.svg")} alt="" />
            </div>

            <div className="modal-form">
                <div className="title">
                    <h3>{text.reportQuest.title}</h3>
                </div>
                <div className="subtitle">
                        <span>
                            {text.reportQuest.subTitle}
                        </span>
                </div>
                <div className="form">
                    {reportReasons.map(reportReason => (
                        <div onClick={function () {
                            setSelectedReason(reportReason)
                        }} key={reportReason} className={selectedReason === reportReason ? "form-bubble-item selected" : "form-bubble-item" } >
                            <span>{text.reportReasons[reportReason]}</span>
                        </div>
                    ))}

                    <div className="form-submit-button">
                        <button onClick={handleSubmit}>{text.reportQuest.button}</button>
                    </div>

                </div>
            </div>

            <div className="close-modal">
                <button onClick={handleCloseModal}>X</button>
            </div>
        </ReactModal>
    )
}
export default ModalReportQuest

