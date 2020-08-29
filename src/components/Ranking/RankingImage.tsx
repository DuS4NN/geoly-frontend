import React, {useContext} from 'react'
// Context
import {UserContext} from "../../UserContext"

// Style
import './RankingImage.scss'

// Props
interface Props {
}

// Component
const RankingImage: React.FC = () => {
    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)

    const test = require('../../assets/images/obliqueBottom.svg')

    // Template
    return (
        <div className="ranking-image">

            <div className="ranking-image-content">
                <div className="content-text">
                    <div className="content-text-title">
                        <h2>Ranking</h2>
                    </div>
                    <br />
                    <div className="content-text-subtitle">
                        <span>Plnte úlohy, získavajte body a umiestnite sa v rebíčku najlepšíc hráčov v tejto sezóne!</span>
                    </div>
                </div>

                <div className="content-image">

                </div>
            </div>

            <div className="ranking-image-background">
                <img src={test} alt="" />
            </div>

        </div>

    )
}

export default RankingImage
