import React, {useContext} from "react"
import {useHistory} from "react-router-dom"
import {UserContext} from "../../UserContext"
import './NavigationProfile.scss'
import NavigationProfileLoggedIn from "./NavigationProfileLoggedIn";


// Props
interface Props {
    showRoll: boolean
    setShowRoll: (showRoll: boolean) => void
}

// Component
const NavigationProfile: React.FC<Props> = (props) => {
    // Context
    const {userContext} = useContext(UserContext)

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    // State
    const {showRoll, setShowRoll} = props

    // Redirect
    const history = useHistory()

    // Methods
    const handleClick = () => {
        history.push("/login")
    }

    // Template
    return (
        <div className="navigation-button navigation-profile">
            {userContext['nickName'] == null ?
                (
                    <div className="navigation-button-content">
                        <button onClick={handleClick}>{text.navigation.logIn}</button>
                    </div>

                ) : (
                    <NavigationProfileLoggedIn showRoll={showRoll} setShowRoll={setShowRoll} />
                )
            }
        </div>
    )
}

export default NavigationProfile
