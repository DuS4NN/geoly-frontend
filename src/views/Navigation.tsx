import React, {useState} from "react"
// Children
import NavigationLinks from "../components/Navigation/NavigationLinks"
import NavigationProfile from "../components/Navigation/NavigationProfile"
import NavigationRoll from "../components/Navigation/NavigationRoll";

import "../components/Navigation/SmallDeviceNavigation.scss"

// Props
interface Props {
}

// Component
const Navigation: React.FC<Props> = () => {

    const [showRoll, setShowRoll] = useState(false)

    // Template
    return (
        <nav className="navigation">
            <NavigationLinks />
            <NavigationProfile setShowRoll={setShowRoll} showRoll={showRoll} />
            {showRoll && (
                <NavigationRoll setShowRoll={setShowRoll}/>
            )}
        </nav>
    )
}

export default Navigation
