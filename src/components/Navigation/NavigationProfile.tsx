import React, {useContext} from "react"
// Context
import {UserContext} from "../../UserContext"
// Style
import './NavigationProfile.scss'
import {useHistory} from "react-router-dom";

// Props
interface Props {
}

// Component
const NavigationProfile: React.FC<Props> = () => {
    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)

    // Redirect
    const history = useHistory()

    // Image
    const logo = require('../../assets/images/socialMedia/facebook.svg')
    const messageIcon = require('../../assets/images/inputImages/message.svg')
    const notificationIcon = require('../../assets/images/inputImages/notification.svg')

    // Methods
    const handleClick = () => {
        history.push("/login")
    }

    // Template
    return (
        <div className="navigation-button navigation-profile">
            {userContext['nickName'] == null ?
                (
                <button onClick={handleClick}>Log In</button>
                ) : (
                <div className="navigation-profile-user">
                    <div className="notification-icons">
                        <img src={messageIcon} alt="" />
                        <img src={notificationIcon} alt="" />
                    </div>
                    <div className="profile-image">
                        <img src={"http://localhost:8080/image?url="+userContext['profileImage']} alt="" />
                    </div>

                </div>
                )
            }
        </div>
    )
}

export default NavigationProfile
