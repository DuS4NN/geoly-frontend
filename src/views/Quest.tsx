import React, {useContext, useEffect, useState} from 'react'
import QuestMap from "../components/Quest/QuestMap";
import axios from "axios";
import QuestDetails from "../components/Quest/QuestDetails";
import QuestStages from "../components/Quest/QuestStages";
import QuestReviewsList from "../components/Quest/QuestReviewsList";
import QuestReviewsForm from "../components/Quest/QuestReviewsForm";
import QuestButton from "../components/Quest/QuestButton";
import QuestGallery from "../components/Quest/QuestGallery";
import QuestTitle from "../components/Quest/QuestTitle";
import {UserContext} from "../UserContext";
import ModalReportQuest from "../components/Modals/ModalReportQuest";
import ModalAddQuestToGroup from "../components/Modals/ModalAddQuestToGroup";

// Props
interface Props {
}

// Component
const Quest: React.FC = () => {
    const {userContext} = useContext(UserContext)

    const text = require('../assets/languageText/'+userContext['languageId']+'.ts').text

    const [id] = useState(window.location.href.split('/').pop())
    const [images, setImages] = useState([])
    const [stages, setStages] = useState([])
    const [reviews, setReviews] = useState([])
    const [details, setDetails] = useState({}) as any

    const [showReportModal, setShowReportModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)

    const [countReviews, setCountReviews] = useState(0)
    const [addReview, setAddReview] = useState(0)

    const [page, setPage] = useState(1)

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
            url: process.env.REACT_APP_API_SERVER_URL+'/quest/reviewinfo?id='+id,
            withCredentials: true
        }).then(function (response) {
            setCountReviews(response.data.data[0])
            setAddReview(response.data.data[1])
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

    const openReportModal = () => {
        setShowReportModal(true)
    }

    const openAddModal = () => {
        setShowAddModal(true)
    }

    useEffect(() => {
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
                    throw Object.assign(
                        new Error("404"), {code: 404}
                    )
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
                questDate: detail[12],
                questPrivate: detail[13],
                questOwner: detail[14]
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
                    throw Object.assign(
                        new Error("404"), {code: 404}
                    )
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
                original: process.env.REACT_APP_IMAGE_SERVER_URL+image,
                thumbnail: process.env.REACT_APP_IMAGE_SERVER_URL+image
            }

        }

        getStages()
        getDetails()
        getImages()
        getReviews(1)
    },[id])

    // Template
    return (
        <div className="quest">

            {details.questPrivate === 0 || (details.questPrivate === 1 && details.questOwner === 0) ? (
                <div>
                    <ModalReportQuest questId={id} showReportModal={showReportModal} setShowReportModal={setShowReportModal} />
                    <ModalAddQuestToGroup showModal={showAddModal} setShowModal={setShowAddModal} questId={id} />

                    <QuestTitle details={details} />

                    <QuestMap stages={stages} />

                    <div className="quest-report">
                        <img title={text.review.report} onClick={openReportModal} alt="" src={require("../assets/images/otherIcons/report.svg")} />
                        <img title={text.userQuest.addToGroup} className="add" onClick={openAddModal} alt="" src={require("../assets/images/otherIcons/add-black.svg")} />
                    </div>

                    <div className="quest-detail-content">
                    <QuestDetails details={details} />
                    <QuestStages stages={stages}/>
                    </div>

                    <QuestGallery images={images} />

                    <QuestButton questId={id} />

                    <QuestReviewsForm setPage={setPage} getReviews={getReviews} setAddReview={setAddReview} questId={id} reviews={reviews} setReviews={setReviews} addReview={addReview} />
                    <QuestReviewsList page={page} setPage={setPage} questId={id} countReviews={countReviews} setCountReviews={setCountReviews} getReviews={getReviews} reviews={reviews} setReviews={setReviews} setAddReview={setAddReview}/>
                </div>
            ) : (
               <div className="quest-private">
                   <div className="quest-private-title">
                       <h2>{text.private.quest}</h2>
                   </div>
                   <div className="quest-private-img">
                       <img src={require("../assets/images/private.svg")} alt=""/>
                   </div>
               </div>
            )}


        </div>
    )
}

export default Quest
