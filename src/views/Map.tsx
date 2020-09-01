import React, {useState} from "react"

// Children
import MapView from "../components/Map/MapView"
import MapFilter from "../components/Map/MapFilter"

// Props
interface Props {
}

// Component
const Map: React.FC<Props> = () => {

    const [map, setMap] = useState(null)

    // Template
    return (
        <div className="map">
            <MapFilter map={map}/>
            <MapView setMap={setMap}/>
        </div>
    )
}

export default Map
