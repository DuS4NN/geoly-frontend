import React, {useEffect, useState} from "react"
import axios from "axios"

// Children
import MapView from "../components/Map/MapView"

// Props
interface Props {
}

// Component
const Map: React.FC<Props> = (props) => {

    const [center, setCenter] = useState({lat:48.864716, lng: 2.349014}) as Array<any>

    useEffect(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/getCenter',
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode
            if (statusCode === 'OK') {
                let coordinates = response.data.data[0].split(", ")
                setCenter({
                    lat: parseFloat(coordinates[0]),
                    lng: parseFloat(coordinates[1])
                })
            }
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
