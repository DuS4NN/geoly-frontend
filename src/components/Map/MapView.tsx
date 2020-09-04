import React, {useContext, useEffect, useState} from "react"
import { useGoogleMaps } from "react-hook-google-maps";
import chroma from 'chroma-js';


import {useAlert} from "react-alert";
// Children

import './MapView.scss'
import './MapFilter.scss'
import {debounce} from "lodash-es";
import axios from "axios";
import MapFilter from "./MapFilter";


// Props
interface Props {

}

// Component
const MapView: React.FC<Props> = (props) => {

    const [mapRef, setMapRef] = useState(null)

    const [category, setCategory] = useState([])
    const [difficulty, setDifficulty] = useState([1,5])
    const [review, setReview] = useState([1,5])
    const [noReviewed, setNoReviewed] = useState(true)

    const [markers, setMarkers] = useState([])
    const [bounds, setBounds] = useState({})


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

        let boundsNew = map.getBounds()
        handleSearch([boundsNew.Va.i, boundsNew.Va.j],[boundsNew.Za.i, boundsNew.Za.j])
        setBounds(map.getBounds())
    }, 500)

    const deleteAllMarkers = ( () => {
        markers.map((marker:any) => marker.setMap(null));
        setMarkers([])
    })

    const handleSearch = (boundsNw:any, boundsSe:any) => {
        console.log("Search")
        axios({
            method: 'POST',
            url: process.env.REACT_APP_API_SERVER_URL + '/questByParam',
            data: {
                categoryId: category,
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
            map: map
        })
        //@ts-ignore
        setMarkers(newMarkers => [...markers, marker])
    }

    const handleSearchClick = () => {
        let boundsNew = map.getBounds()
        handleSearch([boundsNew.Va.i, boundsNew.Va.j],[boundsNew.Za.i, boundsNew.Za.j])
        setBounds(map.getBounds())
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

                handleSearchClick={handleSearchClick}

                noReviewed={noReviewed}
                review={review}
                difficulty={difficulty}
            />

            <div className="map" onClick={handleMapClick} ref={ref}>
            </div>
        </div>
    )
}

export default MapView

