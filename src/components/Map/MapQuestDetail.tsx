import React, {useContext, useEffect} from "react";
import {NavLink} from "react-router-dom"
import {UserContext} from "../../UserContext";

import './MapQuestDetail.scss'

interface questDetail{
    questId: number
    //questName: string
    //description: string
    createdAt: string
    difficulty: number
    //categoryName: string
    //categoryImg: any
    //userImage: string
    //userName: string
    avgReview: number
    countFinish: number
    countOnStage: number
    countCancel: number
}

interface Props {
    questDetail: any
    setQuestDetail: (questDetail:any) => void
}

const MapQuestDetail: React.FC<Props> = (props) => {

    //@ts-ignore
    const {userContext} = useContext(UserContext)

    const {questDetail, setQuestDetail} = props

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    // Image
    const headerBottom = require("../../assets/images/obliqueBottom.svg")

    // Methods
    const handleCloseDetail = () => {
        setQuestDetail(null)
    }

    return (
        <div className={questDetail ? "map-quest-detail" : "map-quest-detail hidden"}>
            {questDetail && (

                <div className="quest-detail-content">

                    <div className="quest-detail-header">

                        <div className="quest-detail-category">
                            <div className="quest-detail-category-image">
                                <img src={require("../../"+questDetail.categoryImg)} alt=""/>
                            </div>
                            <div className="quest-detail-category-name">
                                <span>{text.category[questDetail.categoryName.toLowerCase()]}</span>
                            </div>
                        </div>

                        <div className="quest-detail-exit">
                            <button onClick={handleCloseDetail}>X</button>
                        </div>


                        <div className="quest-detail-title">
                            <span>{questDetail.questName}</span>
                        </div>
                    </div>

                    <div className="quest-detail-header-bottom">
                        <img src={headerBottom} alt="" />
                    </div>

                    <div className="quest-detail-user">
                        <div className="quest-detail-user-image">
                            <img src={process.env.REACT_APP_IMAGE_SERVER_URL+questDetail.userImage} alt=""/>
                        </div>

                        <div className="quest-detail-user-name">
                            <NavLink to={"/profile/"+questDetail.userName} >{questDetail.userName}</NavLink>
                        </div>
                    </div>

                    <div className="quest-detail-description">
                        <span>{questDetail.description}</span>
                    </div>

                    <div className="quest-detail-button">
                        <button>{}</button>
                    </div>

                </div>

            )}


        </div>
    )
}

export default MapQuestDetail
