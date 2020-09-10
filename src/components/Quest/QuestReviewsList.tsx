import React, {useContext, useState} from "react"

import "./QuestReviewsList.scss"
import {UserContext} from "../../UserContext";
import QuestReviewsItem from "./QuestReviewsItem";
import Pagination from '@material-ui/lab/Pagination'
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles'
import ModalDeleteReview from "../Modals/ModalDeleteReview";
import ModalEditReview from "../Modals/ModalEditReview";

// Props
interface Props {
    reviews: any
    getReviews: (page:number) =>void
    countReviews: number
    setReviews: (review:any) => void
    questId: any
}

// Component
const QuestReviewsList: React.FC<Props> = (props) => {

    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)

    // Text
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const {reviews, getReviews, countReviews, setReviews, questId} = props

    const [page, setPage] = useState(1)
    const [deleteReviewId, setDeleteReviewId] = useState(0)

    const [showModalDeleteReview, setShowModalDeleteReview] = useState(false)
    const [showModalEditReview, setShowModalEditReview] = useState(false)

    const [editReviewId, setEditReviewId] = useState(0)
    const [editReviewRate, setEditReviewRate] = useState(1)
    const [editReviewText, setEditReviewText] = useState("")

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
    }

    const editReview = (id:number, reviewText:string, reviewRate:number) => {
        setEditReviewId(id)
        setEditReviewText(reviewText)
        setEditReviewRate(reviewRate)
        setShowModalEditReview(true)
    }

    const classes = useStyles();

    // Template
    return (
        <div className="quest-reviews-list">

            <ModalDeleteReview setReviews={setReviews} reviews={reviews} deleteReviewId={deleteReviewId} showModal={showModalDeleteReview} setShowModal={setShowModalDeleteReview} />

            <ModalEditReview questId={questId} setReviewRate={setEditReviewRate} reviewText={editReviewText} reviewRate={editReviewRate} showModal={showModalEditReview} setShowModal={setShowModalEditReview} editReviewId={editReviewId} setReviews={setReviews} reviews={reviews} />

            {reviews.map((review:any) => (

                review.show===true && (
                    <QuestReviewsItem key={review.reviewId} deleteReview={deleteReview} editReview={editReview} review={review} />
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
