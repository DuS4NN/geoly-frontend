import React, {FormEvent, useContext} from "react"
import ReactModal from "react-modal"
import Modal from 'react-modal';
import axios from "axios"
//@ts-ignore
import disableScroll from 'disable-scroll'
// Context
import {UserContext} from "../../UserContext";
// Style
import './ModalDeleteReview.scss'

// Props
interface Props {
    showModal: boolean
    setShowModal: (show: boolean) => void
    deleteReviewId: number
}

// Components
const ModalDeleteReview: React.FC<Props> = (props) => {
    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)

    // Props state
    const {showModal, setShowModal, deleteReviewId} = props


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
        disableScroll.off()

        document.removeEventListener("keydown", handleKeyPress);
    }

    const onAfterOpenModal = () => {
        disableScroll.on()

        document.addEventListener("keydown", handleKeyPress);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()


    }

    // Template
    return (
        <ReactModal
            className="delete-review-modal"
            closeTimeoutMS={500}
            isOpen={showModal}
            onAfterOpen={onAfterOpenModal}>

            <div className="image">
                <img src={require("../../assets/images/question.svg")} alt="" />
            </div>

            <div className="delete-review-form">
                <div className="title">
                    <h3>{text.deleteReview.title}</h3>
                </div>
                <div className="subtitle">
                    <span>
                        {text.deleteReview.subTitle}
                    </span>
                </div>
                <div className="form">
                    <div className="form-yes">
                        <button>{text.deleteReview.accept}</button>
                    </div>
                    <div className="form-no">
                        <button>{text.deleteReview.decline}</button>
                    </div>
                </div>
            </div>

            <div className="close-modal">
                <button onClick={handleCloseModal}>X</button>
            </div>
        </ReactModal>
    )
}

export default ModalDeleteReview
