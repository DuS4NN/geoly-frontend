import React, {useContext, useEffect, useRef, useState} from "react"
import axios from "axios"
import {useHistory} from "react-router-dom"
import {UserContext} from "../../UserContext"
//@ts-ignore
import ReactStars from "react-rating-stars-component"
import './QuestReviewsForm.scss'
import {useAlert} from "react-alert";
import {Picker} from "emoji-mart";

// Props
interface Props {
    questId: any
    reviews: any
    setReviews: (review:any) => void
    addReview: number
    setAddReview: (addReview: any) => void
    getReviews: (page:number) => void
    setPage: (page:number) => void
}

// Component
const QuestReviewsForm: React.FC<Props> = (props) => {

    const {questId, reviews, setReviews, getReviews, setPage, addReview, setAddReview} = props
    const alert = useAlert()
    const history = useHistory()

    const textareaRef = useRef(null)
    const [reviewRate, setReviewRate] = useState(1)
    const {userContext} = useContext(UserContext)
    const [value, setValue] = useState("") as Array<any>
    const [showEmojiPicker, setShowEmojiPicker] = useState(false) as Array<any>

    const emojiPicker = useRef(null) as any

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const handleStarChange = (e:number) => {
        setReviewRate(e)
    }

    const handleSubmit = () => {
        axios({
          method: 'POST',
          url: process.env.REACT_APP_API_SERVER_URL+'/quest/review?id='+questId,
            withCredentials: true,
            data: {
                // @ts-ignore
                reviewText: textareaRef.current?.value,
                review: reviewRate
            }
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                setPage(1)
                getReviews(1)

                setAddReview(0)

                alert.success(text.success.REVIEW_ADDED)

            }else if(statusCode === 'METHOD_NOT_ALLOWED'){
                alert.error(text.error[serverResponse])
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

    const handleValueChange = (e:any) => {
        setValue(e.target.value)
    }

    const handleEmojiSelect = (e:any) => {
        if(value.length>=500) return
        setValue(value + e.native)
    }

    const handleShowEmojiPicker = () => {
        setShowEmojiPicker(true)
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
        <div className="quest-review-form">
            {addReview === 1 && (
                <div className="quest-review-form-container">

                    <div className="container-header-image">
                        <img alt="" src={require("../../assets/images/obliqueTop.svg")} />
                    </div>

                    <div className="quest-review-form-container-content">

                        <div className="form-title">
                            <span>{text.review.addReview}</span>
                        </div>

                        <div className="form-rating">
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
                            <textarea ref={textareaRef} value={value} onChange={handleValueChange} placeholder={text.review.reviewPlaceholder} maxLength={500} />
                            <span onClick={handleShowEmojiPicker} className="emoji-picker-button"><img alt="" src={require("../../assets/images/otherIcons/emojiPicker.svg")} /></span>
                            {showEmojiPicker && (
                                <span ref={emojiPicker} className="emoji-picker">
                    <div className="emoji-triangle">
                    </div>
                    <Picker
                        onSelect={handleEmojiSelect}
                        set={"facebook"}
                        theme={userContext['darkMode'] ? "dark" : "light"}
                    />
                </span>
                            )}
                        </div>

                        <div className="form-button">
                            <button onClick={handleSubmit}>{text.review.addButton}</button>
                        </div>
                    </div>

                    <div className="container-footer-image">
                        <img alt="" src={require("../../assets/images/obliqueBottom.svg")} />
                    </div>

                </div>
            )}
        </div>
    )
}

export default QuestReviewsForm
