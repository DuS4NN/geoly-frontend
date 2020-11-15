import React, {useEffect, useState} from "react"
import {useAlert} from "react-alert"
import ReactTooltip from "react-tooltip";
import axios from "axios"
import {useHistory} from "react-router-dom";
import {NavLink} from "react-router-dom"

// Props
interface Props {
    review: any
    setReviews: (badges:any) => void
    reviews: any
}

// Component
const ItemReview: React.FC<Props> = (props:any) => {

    const {review, reviews, setReviews} = props

    const [date, setDate] = useState(new Date())
    const [remove, setRemove] = useState(false) as Array<any>

    const adminText = require('../../../../assets/languageText/admin').adminText
    const text = require('../../../../assets/languageText/2').text
    const alert = useAlert()
    const history = useHistory()

    useEffect(() => {
        if(review.date){
            setDate(new Date(review.date))
        }
    }, [])

    const handleChangeRemove = () => {
        setRemove(!remove)
    }

    const handleDelete = () => {
       axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminRemoveReview?id='+review.id,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){
                setReviews(reviews.filter(function (r:any) {
                    return r.id !== review.id
                }))

                alert.success(adminText.success[serverResponse])
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }

    // Template
    return (
        <div className="tableItemReview">
            {!remove && (
                <div className="item">

                    <div className="quest">
                        <NavLink to={"/admin/quest/"+review.questId}>{review.questId}</NavLink>
                    </div>

                    <div className="text">
                        <span>{review.text}</span>
                    </div>

                    <div className="review">
                        <span>{review.review}</span>
                    </div>

                    <div className="date">
                        <span>{date.getDate()+". "+(date.getMonth()+1)+". "+date.getFullYear()+" "+ (date.getHours() < 10 ? '0' : '') +date.getHours()+":"+ (date.getMinutes() < 10 ? '0' : '') +date.getMinutes()}</span>
                    </div>

                    <div className="action">
                        <img data-tip={adminText.userDetails.delete} alt="" src={require("../../../../assets/images/otherIcons/delete.svg")} onClick={handleChangeRemove} />
                        <ReactTooltip />
                    </div>
                </div>
            )}

            {remove && (
                <div className="removeItem">
                    <div className="removeYes">
                        <button onClick={handleDelete}>{adminText.userDetails.delete}</button>
                    </div>
                    <div className="removeNo">
                        <button onClick={handleChangeRemove}>{adminText.userDetails.return}</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ItemReview
