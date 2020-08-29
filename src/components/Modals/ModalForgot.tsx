import React, {ChangeEvent, FormEvent, useContext, useState} from "react"
import {useAlert} from "react-alert"
import ReactModal from "react-modal"
import Modal from 'react-modal';
import axios from "axios"
//@ts-ignore
import disableScroll from 'disable-scroll'
// Context
import {UserContext} from "../../UserContext";
// Style
import './ModalForgot.scss'

// Props
interface Props {
    showModal: boolean
    setShowModal: (show: boolean) => void
}

// Components
const ModalForgot: React.FC<Props> = props => {
    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)

    // Props state
    const {showModal, setShowModal} = props
    // State
    const [email, setEmail] = useState("")

    // Alerts
    const alert = useAlert()
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
        disableScroll.off()

        document.removeEventListener("keydown", handleKeyPress);
    }

    const onAfterOpenModal = () => {
        disableScroll.on()

        document.addEventListener("keydown", handleKeyPress);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

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
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    // Template
    return (
            <ReactModal
                className="forgot-modal"
                closeTimeoutMS={500}
                isOpen={showModal}
                onAfterOpen={onAfterOpenModal}>
                <div className="image">
                    <img src={forgotPassword} alt="" />
                </div>

                <div className="forgot-form">
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
                            <input type="email" name="email" value={email} onChange={handleChange} autoFocus required className="input-field-email" placeholder={text.forgot.inputEmailPlaceholder}/>
                            <br /> <br />
                            <button>{text.forgot.submitButton}</button>
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
