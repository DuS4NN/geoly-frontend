import React, {useEffect, useRef, useState} from "react"
import { useGoogleMaps } from "react-hook-google-maps";

// Props
interface Props {
    stage: any
    stages: any
    setStages: (stages:any) => void
}

// Component
const StageItemGoToPlace: React.FC<Props> = (props) => {

    const {stage, stages, setStages} = props

    const [marker] = useState([]) as Array<any>

    const userText = require('../../../../assets/languageText/2').text

    const noteRef = useRef(null) as any

     const {ref, map, google} = useGoogleMaps(
        process.env.REACT_APP_GOOGLE_API_KEY+"",
        {
            center: { lat:stage.latitude, lng: stage.longitude },
            zoom: 10,
            styles: require('../../../../assets/mapThemes/1.ts').mapTheme
        })

    useEffect(() => {
        if( !google || !map) return

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
            changePosition(e.latLng)
        })

    }, [google, map])

    const changePosition = (latLng:any) => {
        let newStages = [] as any

        stages.map((s:any) => {
            if(s.id !== stage.id){
                newStages.push(s)
            }else{
                newStages.push({
                    ...stage,
                    latitude: latLng.lat(),
                    longitude: latLng.lng()
                })
            }
        })
        setStages(newStages)
    }

    useEffect(() => {
        if(noteRef !== null){
            let newStages = [] as any

            stages.map((s:any) => {
                if(s.id !== stage.id){
                    newStages.push(s)
                }else{
                    newStages.push({
                        ...stage,
                        note: noteRef
                    })
                }
            })
            setStages(newStages)
        }
    }, [noteRef])

    // Template
    return (
        <div className="stageItemGoToPlace">

            <div className="formInput">
                <span className="label">
                    {userText.userQuest.note}
                </span>
                <div className="formContent">
                    <input maxLength={200} ref={noteRef} placeholder={userText.userQuest.note} />
                </div>
            </div>

            <div className="stageItemMap" ref={ref}>
            </div>

        </div>
    )
}

export default StageItemGoToPlace
