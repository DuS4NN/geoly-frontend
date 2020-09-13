import React, {useContext, useRef} from "react"
import ReactModal from "react-modal"
import Modal from 'react-modal';
//@ts-ignore
import ReactStars from "react-rating-stars-component"
import axios from "axios"
//@ts-ignore
import disableScroll from 'disable-scroll'
import {UserContext} from "../../UserContext";
import {useAlert} from "react-alert";

import './ModalEditReview.scss'

// Props
interface Props {
    showModal: boolean
    setShowModal: (show: boolean) => void
    editReviewId: number
    setReviews: (review:any) => void
    reviews: any

    questId: any
    reviewText: string
    reviewRate: number

    setReviewRate: (rate:number) => void
}

// Components
const ModalEditReview: React.FC<Props> = (props) => {
    // Context
    const {userContext} = useContext(UserContext)
    const alert = useAlert()

    // Props state
    const {showModal, setShowModal, editReviewId, reviews, setReviews, questId, reviewText, reviewRate, setReviewRate} = props

    const textareaRef = useRef(null)

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
            method: 'PUT',
            url: process.env.REACT_APP_API_SERVER_URL+'/quest/review?reviewId='+editReviewId+'&questId='+questId,
            withCredentials: true,
            data: {
                id: editReviewId,
                //@ts-ignore
                reviewText:  textareaRef.current?.value,
                review: reviewRate
            }
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){
                alert.success(text.success[serverResponse])

                let newReviews = reviews.map((review:any) => extractReview(review))
                setReviews(newReviews)
                handleCloseModal()
            }else if(serverResponse === 'INVALID_REVIEW_TEXT_FORMAT' || serverResponse === 'INVALID_REVIEW_LENGTH_SIZE'){
                alert.error(text.error[serverResponse])
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        })
    }
    const extractReview = (review:any) => {
        if(review.reviewId !== editReviewId){
            return review
        }else{
            return {
                ...review,
                //@ts-ignore
                reviewText:  textareaRef.current?.value,
                reviewRate: reviewRate
            }
        }
    }

    const handleStarChange = (e:number) => {
        setReviewRate(e)
    }

    // Template
    return (
        <ReactModal
            className="edit-review-modal"
            closeTimeoutMS={500}
            isOpen={showModal}
            onAfterOpen={onAfterOpenModal}>

            <div className="image">
                <img src={require("../../assets/images/edit.svg")} alt="" />
            </div>

            <div className="edit-review-form">
                <div className="title">
                    <h3>{text.editReview.title}</h3>
                </div>
                <div className="subtitle">
                    <span>
                        {text.editReview.subTitle}
                    </span>
                </div>


                <div className="form">

                    <div className="form-review">
                        <ReactStars
                            className="rating-stars"
                            count={5}
                            isHalf={false}
                            value={reviewRate}
                            onChange={handleStarChange}
                            size={30}
                            activeColor="#30dd8a"
                        />
                    </div>

                    <div className="form-textarea">
                        <textarea maxLength={500} ref={textareaRef} defaultValue={reviewText} />
                    </div>

                    <div className="form-button">
                        <button onClick={handleSubmit}>{text.editReview.editButton}</button>
                    </div>
                </div>
            </div>

            <div className="close-modal">
                <button onClick={handleCloseModal}>X</button>
            </div>
        </ReactModal>
    )
}

export default ModalEditReview
