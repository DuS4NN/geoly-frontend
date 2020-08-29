import React from 'react'

// Children
import RankingImage from "../components/Ranking/RankingImage"
import RankingList from "../components/Ranking/RankingList"
// Props
interface Props {
}

// Component
const Ranking: React.FC = () => {

    // Template
    return (
        <div className="ranking">
            <RankingImage />
            <RankingList />
        </div>
    )
}

export default Ranking
