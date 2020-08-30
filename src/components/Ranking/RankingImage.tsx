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

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const bottomImage = require('../../assets/images/obliqueBottom.svg')

    // Template
    return (
        <div className="ranking-image">

            <div className="ranking-image-content">
                <div className="content-text">
                    <div className="content-text-title">
                        <h2>{text.ranking.title}</h2>
                    </div>
                    <br />
                    <div className="content-text-subtitle">
                        <span>{text.ranking.subtitle}</span>
                    </div>
                </div>

                <div className="content-image">
                </div>
            </div>

            <div className="ranking-image-background">
                <img src={bottomImage} alt="" />
            </div>

        </div>
    )
}

export default RankingImage
