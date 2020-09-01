import React, {useEffect} from "react"
import { useGoogleMaps } from "react-hook-google-maps";

// Children

import './MapView.scss'

// Props
interface Props {
    setMap: (map: any) => void
}

// Component
const MapView: React.FC<Props> = (props) => {

    const {setMap} = props

    const {ref, map, google} = useGoogleMaps(
        process.env.REACT_APP_GOOGLE_API_KEY+"",
        {
            center: { lat:50, lng: 19 },
            zoom: 12,
            minZoom: 12
        }
    )

    useEffect( () => {
        if(!map || !google){
            return
        }

        setMap(map)

        google.maps.event.addListener(map, 'dragend', function () {
            handleDrag()
        })

        /*google.maps.event.addListener(map, 'click', function (event: any) {
            let coor = {lat: event.latLng.lat(), lng: event.latLng.lng()}
            console.log("On click:")
            console.log(coor)
            new google.maps.Marker({
                position:coor,
                map: map
            })
        })*/
    }, [map, google])


    // Methods

    const handleDrag = () => {

    }

    const getBoundariesCoordinates = () => {
        let bounds = google.getBounds()
        let ne = bounds.getNorthEast();
        let sw = bounds.getSouthWest();

        let nw = new google.maps.LatLng(ne.lat(), sw.lng());
        let se = new google.maps.LatLng(sw.lat(), ne.lng());

        return {nw, se}
    }

    // Template
    return (
        <div className="map-view">
            <div className="map" ref={ref}>
            </div>
        </div>
    )


}

export default MapView

