import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from "../../UserContext"
import axios from 'axios'
import {NavLink} from "react-router-dom"
import {useGoogleMaps} from "react-hook-google-maps/dist";
import {useHistory} from "react-router-dom"
import GroupQuestDetailStageItem from "./GroupQuestDetailStageItem";
import {useAlert} from "react-alert";
import ImageGallery from "react-image-gallery";
import './GroupQuestDetail.scss'

// Props
interface Props {
    selectedQuest: any
    id: any
}

// Component
const GroupQuestDetail: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text
    const alert = useAlert()
    const history = useHistory()

    const [stages, setStages] = useState([]) as Array<any>
    const [userInfo, setUserInfo] = useState([]) as Array<any>
    const [active, setActive] = useState(false) as Array<any>
    const [images, setImages] = useState([]) as Array<any>
    const [markers] = useState([]) as Array<any>


    const {selectedQuest, id} = props
    const {ref, map, google} = useGoogleMaps(
        process.env.REACT_APP_GOOGLE_API_KEY+"",
        {
            center: { lat:68.7163857, lng: 21.2610746 },
            zoom: 12,
            styles: require('../../assets/mapThemes/'+userContext['mapTheme']+'.ts').mapTheme
        }
    )



    useEffect(() => {
        if(selectedQuest.questId){
            axios({
                method: 'GET',
                url: process.env.REACT_APP_API_SERVER_URL+'/group/questdetails?partyId='+id+'&questId='+selectedQuest.questId,
                withCredentials: true
            }).then(function (response) {
                let statusCode = response.data.responseEntity.statusCode
                if(statusCode === 'OK'){
                    setStages(response.data.data[0].map((stage:any) => {
                        return {
                            stageId: stage[0],
                            stageType: stage[1],
                            stageLat: stage[2],
                            stageLon: stage[3]
                        }
                    }))

                    setUserInfo(response.data.data[1].map((userInfo:any) => {
                        return {
                            userQuestId: userInfo[0],
                            userQuestStatus: userInfo[1],
                            userQuestStageId: userInfo[2],
                            userName: userInfo[3],
                            userImage: userInfo[4],
                            userDate: new Date(userInfo[5])
                        }
                    }))

                    setActive(response.data.data[2][0]>0)

                    setImages(response.data.data[3].map((image:any) => {
                        return {
                            original: process.env.REACT_APP_IMAGE_SERVER_URL+image,
                            thumbnail: process.env.REACT_APP_IMAGE_SERVER_URL+image
                        }
                    }))

                }else{
                    alert.error(text.error.SOMETHING_WENT_WRONG)
                }
            }).catch(function () {
                history.push("/welcome")
                alert.error(text.error.SOMETHING_WENT_WRONG)
            })

        }
    }, [selectedQuest])

    useEffect(() => {
        if(map && stages.length > 0) {
            markers.map((marker:any) => {
                marker.setMap(null)
            })
            markers.length = 0

            const findCenter = () => {
                let lngs = [] as Array<any>
                let lats = [] as Array<any>

                stages.map((stage:any) => {
                    if (stage.stageType === 'GO_TO_PLACE') {
                        lats.push( stage.stageLat )
                        lngs.push( stage.stageLon )
                    }
                })

                map.fitBounds( {
                    west: Math.min.apply( null, lngs ),
                    east: Math.max.apply( null, lngs ),
                    north: Math.min.apply( null, lats ),
                    south: Math.max.apply( null, lats ),
                } )

            }

            const createMarkers = () => {
                for (let i = 0; i < stages.length; i++) {

                    let type = stages[i].stageType

                    if (i < stages.length - 1) {
                        let nextType = stages[i + 1].stageType

                        if (type === 'GO_TO_PLACE' && nextType !== 'GO_TO_PLACE') {
                            createMarker( require( "../../assets/images/stageTypeImages/GO_AND_INTERACT.svg" ), i )
                        } else if (type === 'GO_TO_PLACE') {
                            createMarker( require( "../../assets/images/stageTypeImages/GO_TO_PLACE.svg" ), i )
                        }
                    } else {
                        if (type === 'GO_TO_PLACE') {
                            createMarker( require( "../../assets/images/stageTypeImages/GO_TO_PLACE.svg" ), i )
                        }
                    }
                }
            }
            const createMarker = (icon: any, i: number) => {
                let marker: any[] = new google.maps.Marker( {
                    position: {lat: stages[i].stageLat, lng: stages[i].stageLon},
                    icon: {
                        url: icon,
                        scaledSize: new google.maps.Size( 40, 40 ),
                        anchor: new google.maps.Point( 20, 20 )
                    },
                    map: map
                } )
                markers.push( marker )
            }

            const createLines = () => {
                let path = []

                for (let i = 0; i < markers.length; i++) {
                    let coordinates = {lat: markers[i].getPosition().lat(), lng: markers[i].getPosition().lng()}
                    path.push( coordinates )
                }

                let polyLine = new google.maps.Polyline( {
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
                } )

                polyLine.setMap( map )
            }

            findCenter()
            createMarkers()
            createLines()

        }

    }, [map, stages])


    const handleSubmit = () => {
        if(!active){
            axios({
                method: 'GET',
                url: process.env.REACT_APP_API_SERVER_URL+'/group/signin?partyId='+id+'&questId='+selectedQuest.questId,
                withCredentials: true
            }).then(function (response) {
                let serverResponse = response.data.responseEntity.body
                let statusCode = response.data.responseEntity.statusCode
                if(statusCode === 'ACCEPTED'){
                    setActive(true)
                    alert.success(text.success[serverResponse])
                }else if(serverResponse === 'USER_HAS_ACTIVE_QUEST' || serverResponse === 'USER_ALREADY_FINISHED_QUEST'){
                    alert.error(text.group[serverResponse])
                }else{
                    alert.error(text.error.SOMETHING_WENT_WRONG)
                }
            }).catch(function () {
                history.push("/welcome")
                alert.error(text.error.SOMETHING_WENT_WRONG)
            })
        }else{
            axios({
                method: 'GET',
                url: process.env.REACT_APP_API_SERVER_URL+'/group/signout?partyId='+id+'&questId='+selectedQuest.questId,
                withCredentials: true
            }).then(function (response) {
                let serverResponse = response.data.responseEntity.body
                let statusCode = response.data.responseEntity.statusCode

                if(statusCode === 'ACCEPTED'){
                    alert.success(text.success[serverResponse])
                    setActive(false)
                }else{
                    alert.error(text.error.SOMETHING_WENT_WRONG)
                }
            }).catch(function () {
                history.push("/welcome")
                alert.error(text.error.SOMETHING_WENT_WRONG)
            })
        }
    }

    // Template
    return (
        <div className="group-quest-detail">
            <div className="quest-detail-title">
                <NavLink to={"/quest/"+selectedQuest.questId}>{selectedQuest.questName}</NavLink>
            </div>

            <div ref={ref} className="quest-detail-map">
            </div>

            <div className="quest-detail-desc">
                <div className="quest-detail-desc-title">
                    {text.group.details}
                </div>
                {selectedQuest.questDescription}
            </div>

            {images.length>0 && (
                <div className="quest-detail-gallery">
                    <ImageGallery
                        items={images}
                        showPlayButton={false}
                    />
                </div>
            )}

            <div className="quest-detail-stages">
                <div className="quest-detail-stages-title">
                    {text.group.stages}
                </div>
                {([].concat(stages).reverse()).map((stage:any) => (
                    <GroupQuestDetailStageItem key={stage.stageId} stage={stage} userInfo={userInfo} />
                ))}
            </div>

            <div className="quest-detail-button">
                <button onClick={handleSubmit} className={active ? "" : "active"}>{active ? text.group.signOut : text.group.signUp}</button>
            </div>
        </div>
    )
}

export default GroupQuestDetail
