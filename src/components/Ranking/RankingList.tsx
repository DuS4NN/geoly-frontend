import React, {useContext} from 'react'
// Context
import {UserContext} from "../../UserContext"

// Style
import './RankingList.scss'

// Props
interface Props {
}

// Component
const RankingList: React.FC = () => {
    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)

    // Template
    return (
        <div className="raking-list">

        </div>
    )
}

export default RankingList
