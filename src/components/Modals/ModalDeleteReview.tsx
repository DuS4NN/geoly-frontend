import React, {useContext} from "react"
import ReactModal from "react-modal"
import Modal from 'react-modal';
import axios from "axios"
//@ts-ignore
import disableScroll from 'disable-scroll'
// Context
import {UserContext} from "../../UserContext";
// Style
import './ModalDelete.scss'
import {useAlert} from "react-alert";

// Props
interface Props {
    showModal: boolean
    setShowModal: (show: boolean) => void
    deleteReviewId: number
    setReviews: (review:any) => void
    setAddReview: (addReview:number) => void
    reviews: any
    page: number
    setPage: (page:number) => void
    count: number
    setCount: (count:number) => void
    getReviews: (page:number) => void
}

// Components
const ModalDeleteReview: React.FC<Props> = (props) => {
    // Context
    const {userContext} = useContext(UserContext)
    const alert = useAlert()

    // Props state
    const {showModal, setShowModal, deleteReviewId, reviews, setReviews, setAddReview, page, setPage, count, setCount, getReviews} = props


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
        disableScroll.on(null,{
            disableKeys: false
        })

        document.addEventListener("keydown", handleKeyPress);
    }

    const handleSubmit = () => {
        axios({
            method: 'DELETE',
            url: process.env.REACT_APP_API_SERVER_URL+'/quest/review?reviewId='+deleteReviewId,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){

                if(count > 1 && reviews.length === 1){
                    getReviews(page-1)
                    setPage(page-1)
                }else{
                    getReviews(1)
                }

                alert.success(text.success[serverResponse])
                setAddReview(1)
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
                    <h3>{text.deleteReview.title}</h3>
                </div>
                <div className="subtitle">
                    <span>
                        {text.deleteReview.subTitle}
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

export default ModalDeleteReview
