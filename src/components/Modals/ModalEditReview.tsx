import React, {useContext, useEffect, useRef, useState} from "react"
import ReactModal from "react-modal"
import Modal from 'react-modal';
//@ts-ignore
import ReactStars from "react-rating-stars-component"
import axios from "axios"
import {UserContext} from "../../UserContext";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom"
import './Modal.scss'
import {Picker} from "emoji-mart";

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
    const history = useHistory()

    // Props state
    const {showModal, setShowModal, editReviewId, reviews, setReviews, questId, reviewText, reviewRate, setReviewRate} = props

    const textareaRef = useRef(null)
    const emojiPicker = useRef(null)

    const [reviewValue, setReviewValue] = useState("") as Array<any>
    const [showEmojiPicker, setShowEmojiPicker] = useState(false) as Array<any>

    // Modal
    Modal.setAppElement("#root")
    // Text
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    useEffect(() => {
        setReviewValue(reviewText)
    }, [reviewText])

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
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
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

    const handleShowEmojiPicker = () => {
        setShowEmojiPicker(true)
    }

    const handleEmojiSelect = (e:any) => {
        if(reviewValue.length>=500) return
        setReviewValue(reviewValue + e.native)
    }

    const handleValueChange = (e:any) => {
        setReviewValue(e.target.value)
    }

    function useClickOutside(ref: any) {
        useEffect(() => {
            function handleClickOutside(e: MouseEvent) {

                if (showEmojiPicker && ref.current && !ref.current.contains(e.target)) {
                    setShowEmojiPicker(false)
                }
            }

            document.addEventListener("click", handleClickOutside);
            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }, [emojiPicker, showEmojiPicker]);
    }
    useClickOutside(emojiPicker)

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
                        <textarea onChange={handleValueChange} maxLength={500} value={reviewValue} ref={textareaRef} />
                            <span onClick={handleShowEmojiPicker} className="emoji-picker-button"><img alt="" src={require("../../assets/images/otherIcons/emojiPicker.svg")} /></span>
                            {showEmojiPicker && (
                                <span ref={emojiPicker} className="emoji-picker">
                                    <div className="emoji-triangle">
                                    </div>
                                    <Picker
                                        onSelect={handleEmojiSelect}
                                        set={"facebook"}
                                    />
                            </span>
                        )}
                    </div>

                    <div className="form-submit-button">
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
