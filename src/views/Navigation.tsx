import React from "react"
// Children
import NavigationLinks from "../components/Navigation/NavigationLinks"
import NavigationProfile from "../components/Navigation/NavigationProfile"

// Props
interface Props {
}

// Component
const Navigation: React.FC<Props> = () => {

    // Template
    return (
        <nav className="navigation">
            <NavigationLinks />
            <NavigationProfile />
        </nav>
    )
}

export default Navigation
