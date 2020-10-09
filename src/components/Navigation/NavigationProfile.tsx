import React, {useContext, useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {UserContext} from "../../UserContext"
import NavigationNotifications from "./NavigationNotifications"
import NavigationInvitations from "./NavigationInvitations"
import axios from "axios"
import Pusher from "pusher-js"

import './NavigationProfile.scss'


// Props
interface Props {
    showRoll: boolean
    setShowRoll: (showRoll: boolean) => void
}

// Component
const NavigationProfile: React.FC<Props> = (props) => {
    // Context
    const {userContext} = useContext(UserContext)

    const [unseenCountNotifications, setUnseenCountNotifications] = useState(0) as Array<any>
    const [unseenCountInvitations, setUnseenCountInvitations] = useState(0) as Array<any>
    const [userToken, setUserToken] = useState(null) as Array<any>

    const [notifications, setNotifications] = useState([]) as Array<any>

    // State
    const {showRoll, setShowRoll} = props

    // Redirect
    const history = useHistory()

    // Methods
    const handleClick = () => {
        history.push("/login")
    }

    const handleRoll = () => {
        setShowRoll(!showRoll)
    }

    useEffect(() => {
        if(userToken === null) return

        const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY+"", {
            cluster: process.env.REACT_APP_PUSHER_CLUSTER+""
        })

        const channel = pusher.subscribe("notifications-"+userToken)
        channel.bind("ADD_REVIEW", function (data:any) {
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

    }, [userToken])


    useEffect(() => {
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
        })

    }, [])

    // Template
    return (
        <div className="navigation-button navigation-profile">
            {userContext['nickName'] == null ?
                (
                <button onClick={handleClick}>Log In</button>
                ) : (
                <div className="navigation-profile-user">
                    <div className="notification-icons">
                        <NavigationInvitations />
                        <NavigationNotifications notifications={notifications} setNotifications={setNotifications} userToken={userToken} setUnseenCount={setUnseenCountNotifications} unseenCount={unseenCountNotifications} />
                    </div>
                    <div className="profile-image">
                        <img onClick={handleRoll} src={process.env.REACT_APP_IMAGE_SERVER_URL+userContext['profileImage']} alt="" />
                    </div>

                </div>
                )
            }
        </div>
    )
}

export default NavigationProfile
