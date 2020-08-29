import React, {useContext} from 'react'
// Context
import {UserContext} from "../../UserContext"

// Style
import './RankingItem.scss'

// Props
interface Props {
}

// Component
const RankingItem: React.FC = () => {
    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)

    // Template
    return (
        <div className="raking-item">

        </div>
    )
}

export default RankingItem
