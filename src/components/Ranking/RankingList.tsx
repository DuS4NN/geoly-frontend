import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import {isEmpty} from "lodash-es";
import moment from "moment"
// Context
import {UserContext} from "../../UserContext"

// Style
import './RankingList.scss'

import RankingItem from "./RankingItem"


import {RankingPlayer} from '../../types'

// Props
interface Props {
    ranking: RankingPlayer[],
    user: any
}

// Component
const RankingList: React.FC<Props> = props => {

    const {ranking, user} = props

    const date = new Date()

    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const noDataImage = require("../../assets/images/noData.svg")

    // Template
    return (
        <div className="raking-list">

            <div className="ranking-list-title">
                <h2>{text.ranking.season+text.month[date.getUTCMonth()]+", "+date.getUTCFullYear()}</h2>
            </div>

            <div className="ranking-list-table">
                {!isEmpty(ranking) ? ranking.map(player => (
                    <RankingItem key={player.position} player={player} />
                    )) :
                    <div className="ranking-list-empty">
                        <span className="ranking-list-empty-title">{text.ranking.noData}</span>
                        <br />
                        <img src={noDataImage} alt="" />
                    </div>
                }
                {!isEmpty(user) &&
                <div className="ranking-list-user">
                    <div className="ranking-list-user-gap">
                    </div>
                    <RankingItem key={user.position} player={user} />
                </div>
                }

            </div>
        </div>
    )
}

export default RankingList
