import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from "../UserContext";
import axios from "axios"
import Countdown from 'react-countdown';
import {useGoogleMaps} from "react-hook-google-maps/dist";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom"

import '../components/DailyQuest/DailyQuest.scss'

// Component
const DailyQuest: React.FC = () => {

    const {userContext} = useContext(UserContext)
    const text = require('../assets/languageText/'+userContext['languageId']+'.ts').text
    const [timeLeft, setTimeLeft] = useState(0) as Array<any>
    const alert = useAlert()
    const history = useHistory()

    useEffect(() => {
        if(!userContext['nickName']){
            alert.error(text.error.UNAUTHORIZED)
            history.push("/login")
            return
        }
    }, [])

    const {ref, map, google} = useGoogleMaps(
        process.env.REACT_APP_GOOGLE_API_KEY+"",
        {
            center: { lat:48.864716, lng: 2.349014 },
            zoom: 12,
            maxZoom: 16,
            styles: require('../assets/mapThemes/'+userContext['mapTheme']+'.ts').mapTheme
        }
    )

    useEffect(() => {
        if(map){
            axios({
                method: 'GET',
                url: process.env.REACT_APP_API_SERVER_URL+'/dailyquest',
                withCredentials: true
            }).then(function (response) {
                let statusCode = response.data.responseEntity.statusCode

                if(statusCode === 'OK'){
                    let coordinates = {lat: response.data.data[2].latitude, lng: response.data.data[2].longitude}
                    map.setCenter(coordinates)

                    new google.maps.Marker({
                        position: {lat: response.data.data[2].latitude, lng: response.data.data[2].longitude},
                        icon: {
                            url: require("../assets/images/stageTypeImages/GO_TO_PLACE.svg"),
                            scaledSize: new google.maps.Size(35, 35),
                        },
                        map: map
                    })
                    setTimeLeft(response.data.data[1])
                }else{
                    alert.error(text.error.SOMETHING_WENT_WRONG)
                }
            })
        }

    }, [map])


    const handleSubmit = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/signindaily',
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){
                alert.success(text.success[serverResponse])
            }else if(statusCode === "METHOD_NOT_ALLOWED"){
                alert.error(text.error[serverResponse])
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        })
    }

    //@ts-ignore
    const renderer = ({hours, minutes, seconds, completed}) => {
        if (completed){
            return <span className="countdown">00:00:00</span>
        }else{
            return <span className="countdown">{hours}:{minutes}:{seconds}</span>
        }
    }

    // Template
    return (
        <div className="daily-quest">
            {userContext['nickName'] && (
                <div>
                    <div className="header-container">
                        <div className="header-text">
                            <h1>{text.daily.title}</h1>
                            <button onClick={handleSubmit}>{text.daily.signIn}</button>
                        </div>
                    </div>

                    <div className="daily-quest-info">
                        <h2>{text.daily.whatIs}</h2>
                        <div className="info-description">
                            <span>{text.daily.description}</span>
                        </div>

                        <h3>{text.daily.end}</h3>

                        {timeLeft != 0 && (
                            <Countdown
                                date={Date.now() + timeLeft}
                                renderer={renderer}
                            />
                        )}
                    </div>

                    <div className="daily-quest-map" ref={ref}>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DailyQuest
