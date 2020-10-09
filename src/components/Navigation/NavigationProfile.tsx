import React, {useContext, useEffect, useState} from "react"
import {useHistory} from "react-router-dom"

// Context
import {UserContext} from "../../UserContext"
// Style
import './NavigationProfile.scss'
import NavigationNotifications from "./NavigationNotifications";
import NavigationInvitations from "./NavigationInvitations";
import axios from "axios";


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
                        <NavigationNotifications setUnseenCount={setUnseenCountNotifications} unseenCount={unseenCountNotifications} />
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
