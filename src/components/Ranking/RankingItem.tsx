import React from 'react'
import {NavLink} from "react-router-dom"
import {RankingPlayer} from '../../types'
import './RankingItem.scss'


// Props
interface Props {
    player: RankingPlayer
}

// Component
const RankingItem: React.FC<Props> = (props) => {

    const {player} = props

    // Template
    return (
        <article className="raking-item">
            <div className="ranking-item-rank">
                {player.position}
            </div>
            <div className="raking-item-profile-image">
                <img src={process.env.REACT_APP_IMAGE_SERVER_URL+player.profileImage } alt="" />
            </div>
            <div className="raking-item-nickname">
                <NavLink to={"profile/"+player.nickname} className="ranking-item-nickname-text">{player.nickname}</NavLink>
            </div>
            <div className="raking-item-point">
                {player.points}
            </div>
        </article>
    )
}

export default RankingItem
