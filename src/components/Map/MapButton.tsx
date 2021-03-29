import React from "react"
// Style
import './MapView.scss'

// Props
interface Props {
    center: any
    map: any
    findNewBoundsAndStartSearch: () => void
}

// Component
const MapButton: React.FC<Props> = (props) => {

    const {center, map, findNewBoundsAndStartSearch} = props

    const centerMap = () => {
        map.setCenter(center)
        findNewBoundsAndStartSearch()
    }

    // Template
    return (
        <div className="map-button">
            <button className="map-button-button">
                <img className="map-button-button-image" alt="" src={require("../../assets/images/otherIcons/center.svg")} onClick={centerMap} />
            </button>
        </div>
    )
}

export default MapButton

