import React, {useEffect} from "react"
import { useGoogleMaps } from "react-hook-google-maps";

// Children

import './MapView.scss'
import {debounce} from "lodash-es";

// Props
interface Props {
    setMap: (map: any) => void
    setGoogle: (google: any) => void
    setBoundaryNw: (boundaryNw:any) => void
    setBoundarySe: (boundarySe:any) => void
}

// Component
const MapView: React.FC<Props> = (props) => {

    const {setMap, setGoogle, setBoundaryNw, setBoundarySe} = props

    const {ref, map, google} = useGoogleMaps(
        process.env.REACT_APP_GOOGLE_API_KEY+"",
        {
            center: { lat:48.7163857, lng: 21.2610746 },
            zoom: 12,
            minZoom: 12
        }
    )

    useEffect( () => {
        if(map && google){
            setMap(map)
            setGoogle(google)
            handleDrag()

            google.maps.event.addListener(map, 'bounds_changed', function () {
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
        }
    }, [map, google])


    // Methods
    const handleDrag = debounce(() => {
        let bounds = map.getBounds()
        setBoundaryNw([bounds.Va.i, bounds.Va.j])
        setBoundarySe([bounds.Za.i, bounds.Za.j])
    }, 1000)

    // Template
    return (
        <div className="map-view">
            <div className="map" ref={ref}>
            </div>
        </div>
    )


}

export default MapView

