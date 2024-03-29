import React, {useContext} from 'react'
// Context
import {UserContext} from "../../UserContext"

// Style
import '../Elements/PageHeader.scss'

// Props
interface Props {
}

// Component
const RankingImage: React.FC = () => {
    // Context
    const {userContext} = useContext(UserContext)

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const bottomImage = require('../../assets/images/obliqueBottom.svg')

    // Template
    return (
        <div className="image">

            <div className="image-content">
                <div className="content-text">
                    <div className="content-text-title">
                        <h2>{text.ranking.title}</h2>
                    </div>
                    <br />
                    <div className="content-text-subtitle">
                        <span>{text.ranking.subtitle}</span>
                    </div>
                </div>

                <div className="content-image content-image-ranking">
                </div>
            </div>

            <div className="image-background">
                <img src={bottomImage} alt="" />
            </div>

        </div>
    )
}

export default RankingImage
