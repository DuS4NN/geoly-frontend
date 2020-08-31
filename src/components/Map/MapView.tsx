import React, {Component, useEffect, useRef} from "react"
import { useGoogleMaps } from "react-hook-google-maps";
// Children


import './MapView.scss'

// Props
interface Props {
}

// Component
const MapView: React.FC<Props> = () => {

    const {ref, map, google} = useGoogleMaps(
        "AIzaSyC4OeJ9LmgWvXBeGXwy1rUjj4zPxcEAqe8",
        {
        center: { lat: 14, lng: 0 },
        zoom: 14,
        }
    )

    // Template
    return (
        <div className="map-view">
            <div ref={ref} className="map">
            </div>
        </div>
    )


}

export default MapView

