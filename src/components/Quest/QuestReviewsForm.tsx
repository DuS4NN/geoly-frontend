import React, {useContext, useRef, useState} from "react"
import axios from "axios"
import {UserContext} from "../../UserContext"
//@ts-ignore
import ReactStars from "react-rating-stars-component"

import './QuestReviewsForm.scss'
import {useAlert} from "react-alert";

// Props
interface Props {
    questId: any
    reviews: any
    setReviews: (review:any) => void
    addReview: number
    setAddReview: (addReview: any) => void
}

// Component
const QuestReviewsForm: React.FC<Props> = (props) => {

    const {questId, reviews, setReviews, addReview, setAddReview} = props
    const alert = useAlert()

    const textareaRef = useRef(null)
    const [date] = useState(new Date())
    const [reviewRate, setReviewRate] = useState(1)

    //@ts-ignore
    const {userContext} = useContext(UserContext)

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
                let newReview = {
                    owner: response.data.data[0],
                    reviewId: response.data.data[1],
                    //@ts-ignore
                    reviewText: textareaRef.current?.value,
                    reviewRate: reviewRate,
                    reviewDate: date.getDate()+" "+text.month[date.getMonth()]+" "+date.getFullYear(),
                    userName: response.data.data[2],
                    userImage: response.data.data[3],
                    show: true
                }
                setReviews([newReview, ...reviews])
                setAddReview(0)

                alert.success(text.success.REVIEW_ADDED)

            }else if(statusCode === 'METHOD_NOT_ALLOWED'){
                alert.error(text.error[serverResponse])
            }else if(serverResponse === 'INVALID_REVIEW_TEXT_FORMAT' || serverResponse === 'INVALID_REVIEW_LENGTH_SIZE'){
                alert.error(text.error[serverResponse])
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        })
    }

    // Template
    return (
        <div className="quest-review-form">
            {addReview == 1 && (
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
                            <textarea ref={textareaRef} placeholder={text.review.reviewPlaceholder} maxLength={500} />
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
