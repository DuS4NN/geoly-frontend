import React from "react"
// Children
import MapView from "../components/Map/MapView"

// Props
interface Props {
}

// Component
const Map: React.FC<Props> = () => {

    // Template
    return (
        <div className="map">
            <MapView />
        </div>
    )
}

export default Map
