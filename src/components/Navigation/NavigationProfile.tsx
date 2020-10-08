import React, {useContext} from "react"
import {useHistory} from "react-router-dom"

// Context
import {UserContext} from "../../UserContext"
// Style
import './NavigationProfile.scss'
import NavigationNotifications from "./NavigationNotifications";
import NavigationInvitations from "./NavigationInvitations";


// Props
interface Props {
    showRoll: boolean
    setShowRoll: (showRoll: boolean) => void
}

// Component
const NavigationProfile: React.FC<Props> = (props) => {
    // Context
    const {userContext} = useContext(UserContext)

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
                        <NavigationNotifications />
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
