import React, {useContext, useEffect, useState} from "react"
import {useAlert} from "react-alert"
import ReactModal from "react-modal"
import Modal from 'react-modal';
import axios from "axios"
//@ts-ignore
import disableScroll from 'disable-scroll'
import {UserContext} from "../../UserContext";
import './ModalReportQuest.scss'

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
        })
    }

    return (
        <ReactModal
            className="forgot-report-quest"
            closeTimeoutMS={500}
            isOpen={showReportModal}
            onAfterOpen={onAfterOpenModal}>
            <div className="image">
                <img src={require("../../assets/images/report.svg")} alt="" />
            </div>

            <div className="report-quest-form">
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
                        }} key={reportReason} className={selectedReason === reportReason ? "form-item selected" : "form-item" } >
                            <span>{text.reportReasons[reportReason]}</span>
                        </div>
                    ))}


                    <button onClick={handleSubmit}>{text.reportQuest.button}</button>
                </div>
            </div>

            <div className="close-modal">
                <button onClick={handleCloseModal}>X</button>
            </div>
        </ReactModal>
    )
}
export default ModalReportQuest

