import React, {ChangeEvent, FormEvent, useContext, useState} from "react"
import {useAlert} from "react-alert"
import ReactModal from "react-modal"
import Modal from 'react-modal';
import axios from "axios"
import {UserContext} from "../../UserContext";
import {useHistory} from "react-router-dom"
import './Modal.scss'

// Props
interface Props {
    showModal: boolean
    setShowModal: (show: boolean) => void
}

// Components
const ModalForgot: React.FC<Props> = props => {
    // Context
    const {userContext} = useContext(UserContext)

    // Props state
    const {showModal, setShowModal} = props
    // State
    const [email, setEmail] = useState("")
    const [loadingSubmit, setLoadingSubmit] = useState(false)

    // Alerts
    const alert = useAlert()
    const history = useHistory()
    // Modal
    Modal.setAppElement("#root")
    // Text
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    // Image
    const forgotPassword = require('../../assets/images/forgotPassword.svg')

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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoadingSubmit(true)

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/reset?email='+email
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){
                handleCloseModal()
                setEmail("")
                alert.success(text.success[serverResponse])
            }else{
                alert.error(text.error[serverResponse])
                setEmail("")
            }
            setLoadingSubmit(false)
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    // Template
    return (
            <ReactModal
                className="modal"
                closeTimeoutMS={500}
                isOpen={showModal}
                onAfterOpen={onAfterOpenModal}>
                <div className="image">
                    <img src={forgotPassword} alt="" />
                </div>

                <div className="modal-form">
                    <div className="title">
                        <h3>{text.forgot.title}</h3>
                    </div>
                    <div className="subtitle">
                        <span>
                            {text.forgot.subTitle}
                        </span>
                    </div>
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <div className="from-input-with-padding">
                                <input type="email" name="email" value={email} onChange={handleChange} autoFocus required className="input-field-email" placeholder={text.forgot.inputEmailPlaceholder}/>
                            </div>
                            <div className="form-submit-button">
                                <button>{loadingSubmit && (<img alt="" src={require("../../assets/images/otherIcons/loading-button.svg")} />)}{text.forgot.submitButton}</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="close-modal">
                    <button onClick={handleCloseModal}>X</button>
                </div>
            </ReactModal>
    )
}

export default ModalForgot
