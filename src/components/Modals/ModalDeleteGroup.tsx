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
    deleteGroupId: number
    createdGroups: any
    setCreatedGroups: (createdQuests:any) =>void
    count: number
    setCount: (count:number) => void
    page: number
    setPage: (page:number) => void
    getCreatedGroups: (page:number) => void
}

// Components
const ModalDeleteGroup: React.FC<Props> = (props) => {
    // Context
    const {userContext} = useContext(UserContext)
    const alert = useAlert()

    // Props state
    const {showModal, setShowModal, deleteGroupId, setCreatedGroups, createdGroups, count, setCount, page, setPage, getCreatedGroups} = props


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
            method: 'DELETE',
            url: process.env.REACT_APP_API_SERVER_URL+'/group/delete?id='+deleteGroupId,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode
            if(statusCode === 'ACCEPTED'){

                if(count > 1 && createdGroups.length === 1){
                    getCreatedGroups(page-1)
                    setPage(page-1)
                }

                setCreatedGroups(createdGroups.filter(function (group:any) {
                    return group.groupId !== deleteGroupId
                }))
                alert.success(text.success[serverResponse])

                setCount(count-1)

                handleCloseModal()
            }else if(statusCode === 'METHOD_NOT_ALLOWED'){
                alert.error(text.error[serverResponse])
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
                    <h3>{text.groups.deleteGroupTitle}</h3>
                </div>
                <div className="subtitle">
                    <span>
                        {text.groups.deleteGroupDesc}
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

export default ModalDeleteGroup