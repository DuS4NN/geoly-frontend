import React, {useContext, useState} from "react"
import {UserContext} from "../../UserContext"
//@ts-ignore
import ReactStars from "react-rating-stars-component"


// Props
interface Props {
    review: any
    deleteReview: (id:number) => void
}

// Component
const QuestReviewsItem: React.FC<Props> = (props) => {

    const {review, deleteReview} = props

    const [date, setDate] = useState(new Date())

    //@ts-ignore
    const {userContext} = useContext(UserContext)

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text


    const handleDelete = () => {
        deleteReview(review.reviewId)
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
                    <ReactStars
                        className="rating-stars"
                        count={5}
                        isHalf={false}
                        value={review.reviewRate}
                        edit={false}
                        size={30}
                        activeColor="#30dd8a"
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
                        <img title={text.iconTitle.edit} alt="" src={require("../../assets/images/otherIcons/edit.svg")} />
                        <img onClick={handleDelete} title={text.iconTitle.delete} className="footer-icon-delete" alt="" src={require("../../assets/images/otherIcons/delete.svg")} />
                    </div>
                )

                }

            </div>
        </div>
    )
}

export default QuestReviewsItem
