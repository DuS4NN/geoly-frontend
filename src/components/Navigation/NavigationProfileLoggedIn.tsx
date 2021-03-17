import React, {useContext, useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {UserContext} from "../../UserContext"
import NavigationNotifications from "./NavigationNotifications"
import NavigationInvitations from "./NavigationInvitations"
import axios from "axios"
import Pusher from "pusher-js"
import './NavigationProfile.scss'
import {useAlert} from "react-alert";


// Props
interface Props {
    showRoll: boolean
    setShowRoll: (showRoll: boolean) => void
}

// Component
const NavigationProfileLoggedIn: React.FC<Props> = (props) => {
    // Context
    const {userContext} = useContext(UserContext)

    const [unseenCountNotifications, setUnseenCountNotifications] = useState(0) as Array<any>
    const [unseenCountInvitations, setUnseenCountInvitations] = useState(0) as Array<any>
    const [userToken, setUserToken] = useState(null) as Array<any>

    const [notifications, setNotifications] = useState([]) as Array<any>
    const [invitations, setInvitations] = useState([]) as Array<any>

    const [loading, setLoading] = useState(false)

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    // State
    const {showRoll, setShowRoll} = props

    // Redirect
    const history = useHistory()
    const alert = useAlert()

    const handleRoll = () => {
        setShowRoll(!showRoll)
    }

    useEffect(() => {
        if(userToken === null) return

        const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY+"", {
            cluster: process.env.REACT_APP_PUSHER_CLUSTER+""
        })

        const channelNotifications = pusher.subscribe("notifications-"+userToken)
        channelNotifications.bind("ADD_REVIEW", function (data:any) {
            setUnseenCountNotifications(unseenCountNotifications+1)
            let notification = {
                date: new Date(),
                id: data.notificationId,
                type: "ADD_REVIEW",
                data: {
                    questId: data.questId,
                    reviewId: data.reviewId,
                    userNick: data.userNick
                }
            }
            setNotifications([notification, ...notifications])
        })
        channelNotifications.bind("GET_POINTS", function (data:any) {
            setUnseenCountNotifications(unseenCountNotifications+1)
            let notification = {
                date: new Date(),
                id: data.notificationId,
                type: "GET_POINTS",
                data: {
                    questId: data.questId,
                    pointAmount: data.pointAmount
                }
            }
            setNotifications([notification, ...notifications])
        })
        channelNotifications.bind("GET_BADGE", function (data:any) {
            setUnseenCountNotifications(unseenCountNotifications+1)
            let notification = {
                date: new Date(),
                id: data.notificationId,
                type: "GET_BADGE",
                data: {
                    questId: data.questId,
                    badgeName: data.badgeName
                }
            }
            setNotifications([notification, ...notifications])
        })

        const channelInvitations = pusher.subscribe("invitations-"+userToken)
        channelInvitations.bind("PARTY_INVITE", function (data:any) {
            setUnseenCountInvitations(unseenCountInvitations+1)
            let invitation = {
                invitationId: data.invitationId,
                partyId: data.partyId,
                partyName: data.partyName,
                userNick: data.userNick
            }

            setInvitations([invitation, ...invitations])
        })

    }, [userToken])

    useEffect(() => {
        findAlerts()
    }, [])

    const findAlerts = () => {
        if(userContext['nickName']){
            setLoading(true)
            axios({
                method: 'GET',
                url: process.env.REACT_APP_API_SERVER_URL+'/headercountinfo',
                withCredentials: true
            }).then(function (response) {
                let statusCode = response.data.responseEntity.statusCode
                if(statusCode === 'OK'){
                    setUnseenCountInvitations(response.data.data[0][0] > 99 ? 99 : response.data.data[0][0])
                    setUnseenCountNotifications(response.data.data[0][1] > 99 ? 99 : response.data.data[0][1])
                    setUserToken(response.data.data[1])
                }
            }).catch(function () {
                history.push("/welcome")
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }).finally(function () {
                setLoading(false)
            })
        }
    }

    // Template
    return (
        <div className="navigation-button navigation-profile">
            <div className="navigation-profile-user">
                <div className="notification-icons">
                    <NavigationInvitations loading={loading} invitations={invitations} setInvitations={setInvitations} setUnseenCount={setUnseenCountInvitations} unseenCount={unseenCountInvitations} />
                    <NavigationNotifications loading={loading} notifications={notifications} setNotifications={setNotifications} setUnseenCount={setUnseenCountNotifications} unseenCount={unseenCountNotifications} />
                </div>
                <div className="profile-image">
                    <img onClick={handleRoll} src={process.env.REACT_APP_IMAGE_SERVER_URL+userContext['profileImage']} alt="" />
                </div>

            </div>
        </div>
    )
}

export default NavigationProfileLoggedIn
