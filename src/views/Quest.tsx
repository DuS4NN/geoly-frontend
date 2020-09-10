import React, {useEffect, useState} from 'react'

// Children
import QuestMap from "../components/Quest/QuestMap";
import axios from "axios";
import QuestDetails from "../components/Quest/QuestDetails";
import QuestStages from "../components/Quest/QuestStages";
import QuestReviewsList from "../components/Quest/QuestReviewsList";


// Props
interface Props {
}

// Component
const Quest: React.FC = () => {

    const [id, setId] = useState(window.location.href.split('/').pop())
    const [images, setImages] = useState([])
    const [stages, setStages] = useState([])
    const [reviews, setReviews] = useState([])
    const [details, setDetails] = useState({})

    const [countReviews, setCountReviews] = useState(0)

    useEffect(() => {
        getStages()
        getDetails()
        getImages()
        getReviews(1)
    },[])

    const getDetails = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/quest/detail?id='+id
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                let newDetails = response.data.data.map((detail:any) => extractDetails(detail))
                setDetails(newDetails[0])
            }else{
                setDetails([])
                throw 404
            }
        })
    }
    const extractDetails = (detail:any) => {
        return {
            questId: detail[0],
            questName: detail[1],
            questDifficulty: detail[2],
            questDescription: detail[3],
            categoryImage: detail[4],
            categoryName: detail[5],
            userName: detail[6],
            userImage: detail[7],
            questReview: detail[8],
            countFinish: detail[9],
            countOnStage: detail[10],
            countCancel: detail[11],
            questDate: detail[12]
        } as unknown
    }

    const getStages = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/quest/stage?id='+id
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                let newStages = response.data.data.map((stage:any) => extractStage(stage))
                setStages(newStages)
            }else{
                throw 404
            }
        })
    }
    const extractStage = (stage:any) => {
        return {
            stageId: stage[0],
            answer: stage[1],
            latitude: stage[2],
            longitude: stage[3],
            qr_code_url: stage[4],
            question: stage[5],
            type: stage[6],
            questId: stage[7]
        } as unknown
    }

    const getImages = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/quest/images?id='+id
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                let newImages = response.data.data.map((image:any) => extractImage(image))
                setImages(newImages)
            }else if(statusCode === 'NO_CONTENT'){
                setImages([])
            }
        })
    }
    const extractImage = (image:any) => {
        return {
            src: process.env.REACT_APP_IMAGE_SERVER_URL+image,
            thumbnail: process.env.REACT_APP_IMAGE_SERVER_URL+image,
            thumbnailWidth: 320,
            thumbnailHeight: 212
        }

    }

    const getReviews = (page:number) => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/quest/review?id='+id+"&page="+page,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                let newReviews = response.data.data.map((review:any) => extractReview(review))
                setReviews(newReviews)
            }else if(statusCode === 'NO_CONTENT'){
                setReviews([])
            }
        })

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/quest/reviewcount?id='+id
        }).then(function (response) {
            setCountReviews(response.data)
        })

    }
    const extractReview = (review:any) => {
        return {
            owner: review[0],
            reviewId: review[1],
            reviewText: review[2],
            reviewRate: review[3],
            reviewDate: review[4],
            userName: review[5],
            userImage: review[6],
            show: true
        } as unknown
    }

    // Template
    return (
        <div className="quest">
            <QuestMap stages={stages} />

            <div className="quest-detail-content">
                <QuestDetails details={details} />
                <QuestStages stages={stages}/>
            </div>

            <QuestReviewsList countReviews={countReviews} getReviews={getReviews} reviews={reviews} setReviews={setReviews} />
        </div>
    )
}

export default Quest
