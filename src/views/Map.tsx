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
    const [google, setGoogle] = useState(null)

    const [boundaryNw, setBoundaryNw] = useState([])
    const [boundarySe, setBoundarySe] = useState([])

    // Template
    return (
        <div className="map">
            <MapFilter map={map} google={google} boundaryNw={boundaryNw} boundarySe={boundarySe} />
            <MapView setMap={setMap} setGoogle={setGoogle} setBoundaryNw={setBoundaryNw} setBoundarySe={setBoundarySe}/>
        </div>
    )
}

export default Map
