import React, {useEffect, useState} from 'react'
import {useGoogleMaps} from "react-hook-google-maps/dist"

import "./QuestMap.scss"

// Props
interface Props {
    stages: any
}

// Component
const QuestMap: React.FC<Props> = (props) => {

    const {stages} = props

    const [markers, setMarkers] = useState(Array())

    const {ref, map, google} = useGoogleMaps(
        process.env.REACT_APP_GOOGLE_API_KEY+"",
        {
            center: { lat:68.7163857, lng: 21.2610746 },
            zoom: 12
        }
    )

    useEffect(() => {
        if(map && stages.length > 0){
            findCenter()
            createMarkers()
            createLines()
        }

    }, [map, stages])

    const findCenter = () => {
        let lngs = Array()
        let lats = Array()

        for(let i=0; i<stages.length; i++){
            if(stages[i].type === 'GO_TO_PLACE'){
                lats.push(stages[i].latitude)
                lngs.push(stages[i].longitude)
            }
        }

        map.fitBounds({
            west: Math.min.apply(null, lngs),
            east: Math.max.apply(null, lngs),
            north: Math.min.apply(null, lats),
            south: Math.max.apply(null, lats),
        })

    }

    const createMarkers = () => {
        for (let i=0; i<stages.length; i++){

            let type = stages[i].type

            if(i<stages.length-1){
                let nextType = stages[i+1].type

                if(type == 'GO_TO_PLACE' && nextType != 'GO_TO_PLACE'){
                    createMarker(require("../../assets/images/stageTypeImages/GO_AND_INTERACT.svg"), i)
                }else if(type == 'GO_TO_PLACE'){
                    createMarker(require("../../assets/images/stageTypeImages/GO_TO_PLACE.svg"), i)
                }
            }else{
                if(type == 'GO_TO_PLACE'){
                    createMarker(require("../../assets/images/stageTypeImages/GO_TO_PLACE.svg"), i)
                }
            }
        }
    }
    const createMarker = (icon:any, i:number) => {
        let marker = new google.maps.Marker({
            position: {lat: stages[i].latitude, lng: stages[i].longitude},
            icon: {
                url: icon,
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20,20)
            },
            map: map
        })
        markers.push(marker)
    }

    const createLines = () => {
        let path = []

        for(let i=0; i<markers.length; i++){
            let coordinates = {lat: markers[i].getPosition().lat(), lng: markers[i].getPosition().lng()}
            path.push(coordinates)
        }

        let polyLine = new google.maps.Polyline({
            path: path,
            strokeOpacity: 0,
            icons: [{
                icon: {
                    path: 'M 0,-1 0,1',
                    strokeOpacity: 1,
                    scale: 4
                },
                offset: '0',
                repeat: '20px'
            }],
        })

        polyLine.setMap(map)
    }

    // Template
    return (
        <div className="quest-map">
            <div className="map-ref" ref={ref}>
            </div>
        </div>
    )
}

export default QuestMap
