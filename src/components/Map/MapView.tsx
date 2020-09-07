import React, {useContext, useEffect, useState} from "react"
import { useGoogleMaps } from "react-hook-google-maps";
import {debounce} from "lodash-es";
import axios from "axios";
// Children
import MapFilter from "./MapFilter";
// Style
import './MapView.scss'
import './MapFilter.scss'
import {useAlert} from "react-alert";
import {UserContext} from "../../UserContext";
import MapQuestDetail from "./MapQuestDetail";

interface questDetail{
    questId: number
    questName: string
    description: string
    createdAt: string
    difficulty: number
    categoryName: string
    categoryImg: any
    userName: string
    userImage: string
    avgReview: number
    countFinish: number
    countOnStage: number
    countCancel: number
}

// Props
interface Props {

}

// Component
const MapView: React.FC<Props> = () => {

    //@ts-ignore
    const {userContext} = useContext(UserContext)

    const [mapRef, setMapRef] = useState(null)

    const [category, setCategory] = useState([])
    const [difficulty, setDifficulty] = useState([1,5])
    const [review, setReview] = useState([1,5])
    const [noReviewed, setNoReviewed] = useState(true)
    const [stageType, setStageType] = useState([])

    const [markers, setMarkers] = useState(Array())
    const [bounds, setBounds] = useState({})

    const [questDetail, setQuestDetail] = useState(null)

    const alert = useAlert()
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const {ref, map, google} = useGoogleMaps(
        process.env.REACT_APP_GOOGLE_API_KEY+"",
        {
            center: { lat:48.7163857, lng: 21.2610746 },
            zoom: 12,
            minZoom: 12
        }
    )
    // On start
    useEffect(() => {
        if(map){
            setMapRef(map)
            handleMapClick()
            setBounds(map.getBounds())
        }
    }, [map])

    // Methods
    const handleMapClick = debounce(() => {
        //@ts-ignore
        if(bounds && bounds.Va && bounds.Va.i === map.getBounds().Va.i && bounds && bounds.Va && bounds.Va.j === map.getBounds().Va.j){
            return
        }
        findNewBoundsAndStartSearch()
    }, 500)

    const deleteAllMarkers = ( () => {
        markers.map((marker:any) => deleteMarker(marker))
        markers.length = 0
    })

    const deleteMarker = (marker:any) => {
        marker.setMap(null)
    }

    const handleSearch = (boundsNw:any, boundsSe:any) => {
        axios({
            method: 'POST',
            url: process.env.REACT_APP_API_SERVER_URL + '/questByParam',
            data: {
                categoryId: category,
                stageType: stageType,
                difficulty: difficulty,
                review: review,
                unreviewed: noReviewed,
                coordinatesNw: boundsNw,
                coordinatesSe: boundsSe
            }
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode
            if (statusCode === 'OK') {
                deleteAllMarkers()
                response.data.data.map((quest: any) => createMarker(quest))
            }else if(statusCode === 'NO_CONTENT'){
                deleteAllMarkers()
            }
        })
    }
    const createMarker = (quest:any) => {
        let marker = new google.maps.Marker({
            position: {lat: quest[2], lng: quest[3]},
            icon: {
                url: require("../../"+quest[1]),
                scaledSize: new google.maps.Size(35, 35),
            },
            map: map,
            questId: quest[0]
        })
        markers.push(marker)

        google.maps.event.addListener(marker, 'click', function () {
            handleClickOnMarker(marker)
        })
    }

    const handleClickOnMarker = (marker:any) => {
        setQuestDetail(null)
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/questDetail?id='+marker['questId']
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode
            if (statusCode === 'OK') {
                let newQuestDetail = response.data.data.map((questDetail:any) => extractQuestDetailFromResponse(questDetail))
                setQuestDetail(newQuestDetail[0])
            }else{
                alert.error(text.error.QUEST_NOT_FOUND)
            }
        })
    }
    const extractQuestDetailFromResponse = (questDetail:any) => {
        return{
            questId: questDetail[0],
            questName: questDetail[1],
            description: questDetail[2],
            createdAt: questDetail[3],
            difficulty: questDetail[4],
            categoryName: questDetail[5],
            categoryImg: questDetail[6],
            userName: questDetail[7],
            userImage: questDetail[8],
            avgReview: questDetail[9],
            countFinish: questDetail[10],
            countOnStage: questDetail[11],
            countCancel: questDetail[12],
        } as questDetail
    }

    const findNewBoundsAndStartSearch = () => {
        let boundsNew = map.getBounds()
        handleSearch([boundsNew.Va.i, boundsNew.Va.j],[boundsNew.Za.i, boundsNew.Za.j])
        setBounds(map.getBounds())
    }

    const handleAddressChange = () => {
        setTimeout(function () {
            findNewBoundsAndStartSearch()
        }, 1000)
    }

    // Template
    return (
        <div className="map-view">

            <MapFilter
                mapRef={mapRef}
                setDifficulty={setDifficulty}
                setReview={setReview}
                setNoReviewed={setNoReviewed}
                setCategory={setCategory}
                setStageType={setStageType}

                handleSearchClick={findNewBoundsAndStartSearch}
                handleAddressChangeClick={handleAddressChange}

                noReviewed={noReviewed}
                review={review}
                difficulty={difficulty}
            />

            <MapQuestDetail
                questDetail={questDetail}
                setQuestDetail={setQuestDetail}
            />

            <div className="map" onClick={handleMapClick} ref={ref}>
            </div>
        </div>
    )
}

export default MapView

