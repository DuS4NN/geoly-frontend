import React, {useContext, useEffect, useState} from "react"
import axios from "axios"
import {useHistory} from "react-router-dom"
import MapView from "../components/Map/MapView"
import {UserContext} from "../UserContext";
import {useAlert} from "react-alert";

import '../components/Map/SmallDeviceMap.scss'

// Props
interface Props {
}

// Component
const Map: React.FC<Props> = (props) => {

    const {userContext} = useContext(UserContext)
    const [center, setCenter] = useState(null) as Array<any>
    const history = useHistory()
    const alert = useAlert()

    const text = require('../assets/languageText/'+userContext['languageId']+'.ts').text

    useEffect(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/getCenter',
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode
            if (statusCode === 'OK') {
                if(response.data.data[0] === null){
                    return;
                }

                let coordinates = response.data.data[0].split(",")
                setCenter({
                    lat: parseFloat(coordinates[0]),
                    lng: parseFloat(coordinates[1])
                })
            }
        }).catch(function () {
            alert.error(text.error.SOMETHING_WENT_WRONG)
            history.push("/welcome")
        })
    }, [])

    // Template
    return (
        <div className="map">
            <MapView center={center} />
        </div>
    )
}

export default Map
