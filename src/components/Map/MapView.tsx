import React, {useEffect} from "react"
import { useGoogleMaps } from "react-hook-google-maps";

// Children

import './MapView.scss'
import {debounce} from "lodash-es";

// Props
interface Props {
    setMap: (map:any) => void
    setBoundSe: (bound:any) => void
    setBoundNw: (bound:any) => void
    handleSearch: (boundsNw:any, boundsSe:any) => void
}

// Component
const MapView: React.FC<Props> = (props) => {

    const {setMap, handleSearch, setBoundNw, setBoundSe} = props

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
        handleSearch([bounds.Va.i, bounds.Va.j],[bounds.Za.i, bounds.Za.j])
        setBoundNw([bounds.Va.i, bounds.Va.j])
        setBoundSe([bounds.Za.i, bounds.Za.j])
    }, 500)

    // Template
    return (
        <div className="map-view">
            <div className="map" ref={ref}>
            </div>
        </div>
    )


}

export default MapView

