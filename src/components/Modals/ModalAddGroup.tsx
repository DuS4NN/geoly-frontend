import React, {useContext, useEffect, useRef, useState} from "react"
import ReactModal from "react-modal"
import Modal from 'react-modal';
import axios from "axios"
import {UserContext} from "../../UserContext";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom"


import './Modal.scss'

// Props
interface Props {
    showModal: boolean
    setShowModal: (show: boolean) => void
    count: number
    setCount: (count:number) => void
    setPage: (page:number) => void
    getCreatedGroups: (page:number) => void
}

// Components
const ModalAddGroup: React.FC<Props> = (props) => {
    // Context
    const {userContext} = useContext(UserContext)
    const alert = useAlert()
    const history = useHistory()

    // Props state
    const {showModal, setShowModal, count, setCount, setPage, getCreatedGroups} = props

    const refName = useRef(null) as any

    const [loadingSubmit, setLoadingSubmit] = useState(false)


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
        document.removeEventListener("keydown", handleKeyPress);
    }

    const onAfterOpenModal = () => {
        document.addEventListener("keydown", handleKeyPress);
    }

    const handleSubmit = () => {
        if(refName.current?.value.length < 3){
            alert.error(text.error.INVALID_PARTY_NAME_LENGTH)
            return
        }
        if(refName.current?.value.match(/[A-Z,a-z,\-,_,.,0-9]*/)[0] !== refName.current?.value){
            alert.error(text.error.INVALID_PARTY_NAME_FORMAT)
            return
        }
        setLoadingSubmit(true)
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/group/create?name='+refName.current?.value,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode
            if(statusCode === 'ACCEPTED'){
                getCreatedGroups(1)
                setPage(1)
                alert.success(text.success[serverResponse])
                setCount(count+1)

                handleCloseModal()
            }else if(serverResponse === 'INVALID_PARTY_NAME_FORMAT' || serverResponse === 'INVALID_PARTY_NAME_LENGTH'){
                alert.error(text.error[serverResponse])
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
            setLoadingSubmit(false)
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }

    // Template
    return (
        <ReactModal
            className={userContext['darkMode'] ? "modal darkmode" : "modal"}
            closeTimeoutMS={500}
            isOpen={showModal}
            onAfterOpen={onAfterOpenModal}>

            <div className="image">
                <img src={require("../../assets/images/create.svg")} alt="" />
            </div>

            <div className="modal-form">
                <div className="title">
                    <h3>{text.groups.create}</h3>
                </div>
                <div className="subtitle">
                    <span>
                        {text.groups.createModalDesc}
                    </span>
                </div>

                <div className="form">

                    <div className="form-input">
                        <input ref={refName} type="text" maxLength={15} placeholder="Group name" />
                    </div>

                    <div className="form-submit-button">
                        <button onClick={handleSubmit}>{loadingSubmit && (<img alt="" src={require("../../assets/images/otherIcons/loading-button.svg")} />)}{text.groups.createButton}</button>
                    </div>
                </div>
            </div>

            <div className="close-modal">
                <button onClick={handleCloseModal}>X</button>
            </div>
        </ReactModal>
    )
}

export default ModalAddGroup
