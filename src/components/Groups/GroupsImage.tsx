import React, {useContext} from 'react'
// Context
import {UserContext} from "../../UserContext"

// Style
import '../Elements/PageHeader.scss'

// Props
interface Props {
}

// Component
const GroupsImage: React.FC = () => {
    // Context
    const {userContext} = useContext(UserContext)

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    // Template
    return (
        <div className="image">

            <div className="image-content">
                <div className="content-text">
                    <div className="content-text-title">
                        <h2>{text.groups.title}</h2>
                    </div>
                    <br />
                    <div className="content-text-subtitle">
                        <span>{text.groups.subtitle}</span>
                    </div>
                </div>

                <div className="content-image content-image-groups">
                </div>
            </div>

            <div className="image-background">
                <img src={require('../../assets/images/obliqueBottom.svg')} alt="" />
            </div>

        </div>
    )
}

export default GroupsImage
