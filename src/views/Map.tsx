import React, {useState} from "react"

// Children
import MapView from "../components/Map/MapView"
import MapFilter from "../components/Map/MapFilter"
import axios from "axios";

// Props
interface Props {
}

// Component
const Map: React.FC<Props> = () => {

    const [map, setMap] = useState(null)

    const [categoryFind, setCategoryFind] = useState([])
    const [difficultyFind, setDifficultyFind] = useState([1,5])
    const [reviewFind, setReviewFind] = useState([1,5])
    const [unreviewed, setUnreviewed] = useState(true)

    const [boundNw, setBoundNw] = useState([])
    const [boundSe, setBoundSe] = useState([])

    const handleSearch = (boundsNw:any, boundsSe:any) => {
        axios({
            method: 'POST',
            url: process.env.REACT_APP_API_SERVER_URL+'/questByParam',
            data: {
                categoryId: categoryFind,
                difficulty: difficultyFind,
                review: reviewFind,
                unreviewed: unreviewed,
                coordinatesNw: boundsNw,
                coordinatesSe: boundsSe
            }
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                console.log(response.data.data)
            }
        })
    }

    // Template
    return (
        <div className="map">
            <MapFilter
                setCategoryFind={setCategoryFind}
                setDifficultyFind={setDifficultyFind}
                setReviewFind={setReviewFind}
                setUnreviewed={setUnreviewed}
                unreviewed={unreviewed}
                difficultyFind={difficultyFind}
                boundNw={boundNw}
                boundSe={boundSe}
                reviewFind={reviewFind}
                map={map}
                handleSearch={handleSearch}/>

            <MapView
                setMap={setMap}
                setBoundNw={setBoundNw}
                setBoundSe={setBoundSe}
                handleSearch={handleSearch}/>
        </div>
    )
}

export default Map
