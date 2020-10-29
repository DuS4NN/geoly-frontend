import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from "../../UserContext"
import {NavLink} from "react-router-dom"
import ReactTooltip from "react-tooltip"
import axios from "axios"
import {useAlert} from "react-alert";
import {useGoogleMaps} from "react-hook-google-maps/dist";
import {useHistory} from "react-router-dom"

// Props
interface Props {
    quest: any
}

// Component
const ProfileQuestItem: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text
    const alert = useAlert()
    const history = useHistory()

    const [open, setOpen] = useState(false) as Array<any>
    const [stages, setStages] = useState([]) as Array<any>
    const [markers] = useState([]) as Array<any>

    const {quest} = props
    const {ref, map, google}  = useGoogleMaps(
        process.env.REACT_APP_GOOGLE_API_KEY+"",
        {
            center: { lat:68.7163857, lng: 21.2610746 },
            zoom: 12,
            maxZoom: 16,
            styles: require('../../assets/mapThemes/'+userContext['mapTheme']+'.ts').mapTheme
        }
    )

    useEffect(() => {
        if(map && stages.length > 0){
            const findCenter = () => {
                let lngs = []
                let lats = []

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

                        if(type === 'GO_TO_PLACE' && nextType !== 'GO_TO_PLACE'){
                            createMarker(require("../../assets/images/stageTypeImages/GO_AND_INTERACT.svg"), i)
                        }else if(type === 'GO_TO_PLACE'){
                            createMarker(require("../../assets/images/stageTypeImages/GO_TO_PLACE.svg"), i)
                        }
                    }else{
                        if(type ==='GO_TO_PLACE'){
                            createMarker(require("../../assets/images/stageTypeImages/GO_TO_PLACE.svg"), i)
                        }
                    }
                }
            }
            const createMarker = (icon:any, i:number) => {
                let marker:any[] = new google.maps.Marker({
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

            findCenter()
            createMarkers()
            createLines()
        }

    }, [map, stages, google, markers])

    const getStages = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/quest/stage?id='+quest.questId
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode
            if(statusCode === 'OK'){
                setStages(response.data.data.map((stage:any) => {
                    return {
                        stageId: stage[0],
                        answer: stage[1],
                        latitude: stage[2],
                        longitude: stage[3],
                        qr_code_url: stage[4],
                        question: stage[5],
                        type: stage[6],
                        questId: stage[7]
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

    const handleOpen = () => {
        if(stages.length === 0){
            getStages()
        }
        setOpen(!open)
    }

    // Template
    return (
        <div className="profile-quest-item">
            <div className="item-header">
                <div className="title-img">
                    <img alt="" data-tip={text.category[quest.categoryName.toLowerCase()]} src={require("../../"+quest.categoryImage)} />
                </div>
                <div className="title-name">
                    <NavLink to={"/quest/"+quest.questId}>{quest.questName}</NavLink>
                </div>
                <div className="title-arrow">
                    <img onClick={handleOpen} alt="" src={open ? userContext['darkMode'] ? require("../../assets/images/darkModeImages/arrow-up.svg") : require("../../assets/images/otherIcons/arrow-up.svg") : userContext['darkMode'] ? require("../../assets/images/darkModeImages/arrow-down.svg") : require("../../assets/images/otherIcons/arrow-down.svg")} />
                </div>
            </div>


                <div className={open ? "item-main open" : "item-main"}>
                    <div className="main-map" ref={ref}>

                    </div>
                    <div className="main-stages">
                        {stages.length>0 && stages.map((stage:any) => (
                            <div className="stage-item">
                                <div className="stage-item-image">
                                    <img alt="" src={require("../../assets/images/stageTypeImages/"+stage.type+".svg")} />
                                </div>
                                <div className="stage-item-name">
                                    <span>{text.stageType[stage.type]}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            <div className="item-footer">
                <div className="footer-user">
                    <div className="user-image">
                        <img alt="" src={process.env.REACT_APP_IMAGE_SERVER_URL+quest.userImage} />
                    </div>
                    <div className="user-name">
                        <NavLink to={"/profile/"+quest.userName} >{quest.userName}</NavLink>
                    </div>
                </div>
                <div className="footer-date">
                    <div className="date-text">{quest.questDate && quest.questDate.getDate()+" "+text.month[quest.questDate.getMonth()]+" "+quest.questDate.getFullYear()}</div>
                </div>
            </div>

            <ReactTooltip />
        </div>
    )
}

export default ProfileQuestItem


