import React, {useEffect} from "react"
import { useGoogleMaps } from "react-hook-google-maps";

// Props
interface Props {
    stage: any
    marker: any
}

// Component
const StageItemGoToPlace: React.FC<Props> = (props) => {

    const {stage, marker} = props

     const {ref, map, google} = useGoogleMaps(
        process.env.REACT_APP_GOOGLE_API_KEY+"",
        {
            center: { lat:stage.latitude, lng: stage.longitude },
            zoom: 10,
            styles: require('../../../../assets/mapThemes/1.ts').mapTheme
        })

    useEffect(() => {
        if(!stage.longitude || !google || !map) return

        marker.push(new google.maps.Marker({
            position: { lat:stage.latitude, lng: stage.longitude },
            map: map
        }))

        map.addListener("click", (e:any) => {
            marker[0].setMap(null)

            marker.pop()

            marker.push(new google.maps.Marker({
                map: map,
                position: e.latLng
            }))
        })

    }, [stage, google, map])


    // Template
    return (
        <div className="stageItemGoToPlace">

            <div className="stageItemMap" ref={ref}>
            </div>

        </div>
    )
}

export default StageItemGoToPlace
