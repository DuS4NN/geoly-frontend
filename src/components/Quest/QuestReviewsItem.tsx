import React, {useContext, useState} from "react"
import {UserContext} from "../../UserContext"
//@ts-ignore
import StarRatingComponent from 'react-star-rating-component'


// Props
interface Props {
    review: any
    deleteReview: (id:number) => void
    editReview: (id:number, reviewText:string, reviewRate:number) => void
}

// Component
const QuestReviewsItem: React.FC<Props> = (props) => {

    const {review, deleteReview, editReview} = props

    const [date] = useState(new Date(review.reviewDate))
    const {userContext} = useContext(UserContext)

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text


    const handleDelete = () => {
        deleteReview(review.reviewId)
    }

    const handleEdit = () => {
        editReview(review.reviewId, review.reviewText, review.reviewRate)
    }

    // Template
    return (
        <div className="quest-review-item">
            <div className="quest-review-header">
                <div className="header-user-image">
                    <img alt="" src={process.env.REACT_APP_IMAGE_SERVER_URL+review.userImage} />
                </div>
                <div className="header-user-name">
                    <span>{review.userName}</span>
                </div>

                <div className="header-rating">
                    <StarRatingComponent
                        starCount={5}
                        name={"rating"}
                        value={review.reviewRate}
                        editing={false}
                    />
                </div>
            </div>

            <div className="quest-review-text">
                <span>{review.reviewText}</span>
            </div>

            <div className="quest-review-footer">
                <div className="footer-date">
                    <span>{date.getDate()+" "+text.month[date.getMonth()]+" "+date.getFullYear()}</span>
                </div>
                {review.owner===1 && (
                    <div className="footer-icons">
                        <img onClick={handleEdit} title={text.iconTitle.edit} alt="" src={require("../../assets/images/otherIcons/edit.svg")} />
                        <img onClick={handleDelete} title={text.iconTitle.delete} className="footer-icon-delete" alt="" src={require("../../assets/images/otherIcons/delete.svg")} />
                    </div>
                )

                }

            </div>
        </div>
    )
}

export default QuestReviewsItem
