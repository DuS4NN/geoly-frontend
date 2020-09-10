import React, {useContext, useState} from "react"

import "./QuestReviewsList.scss"
import {UserContext} from "../../UserContext";
import QuestReviewsItem from "./QuestReviewsItem";
import Pagination from '@material-ui/lab/Pagination'
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles'
import ModalForgot from "../Modals/ModalForgot";
import ModalDeleteReview from "../Modals/ModalDeleteReview";

// Props
interface Props {
    reviews: any
    getReviews: (page:number) =>void
    countReviews: number
    setReviews: (review:any) => void
}

// Component
const QuestReviewsList: React.FC<Props> = (props) => {

    const {reviews, getReviews, countReviews, setReviews} = props

    const [page, setPage] = useState(1)
    const [deleteReviewId, setDeleteReviewId] = useState(0)
    const [showModalDeleteReview, setShowModalDeleteReview] = useState(false)
    const [showModalEditReview, setShowModalEditReview] = useState(false)

    const handleChangePage = (event:any, value:number) => {
        setPage(value)
        getReviews(value)
    };

    const useStyles = makeStyles(theme => ({
        alignItemsAndJustifyContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: '35px',
            paddingTop: '10px',
        },
    }))

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: "#30dd8a",
            },
        },
    });

    const deleteReview = (id:number) => {
        setDeleteReviewId(id)
        setShowModalDeleteReview(true)

        /*setReviews(reviews.filter(function (review:any) {
            return review.reviewId !== id
        }))*/
    }

    const classes = useStyles();

    // Template
    return (
        <div className="quest-reviews-list">

            <ModalDeleteReview deleteReviewId={deleteReviewId} showModal={showModalDeleteReview} setShowModal={setShowModalDeleteReview} />

            {reviews.map((review:any) => (
                review.show===true && (
                    <QuestReviewsItem  key={review.reviewId} deleteReview={deleteReview} review={review} />
                )
            ))
            }
            {countReviews > 6 && (
                <MuiThemeProvider theme={theme}>
                    <Pagination
                        className={classes.alignItemsAndJustifyContent}
                        count={Math.ceil(countReviews/5)}
                        page={page}
                        color="primary"
                        onChange={handleChangePage}
                    />
                </MuiThemeProvider>
                ) }

        </div>
    )
}

export default QuestReviewsList
