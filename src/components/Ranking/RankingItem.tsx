import React, {useContext, useState} from 'react'
import {NavLink} from "react-router-dom"
// Context
import {UserContext} from "../../UserContext"

// Style
import './RankingItem.scss'

import {RankingPlayer} from '../../types'

// Props
interface Props {
    player: RankingPlayer
}

// Component
const RankingItem: React.FC<Props> = (props) => {

    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)
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
