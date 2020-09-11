import React, {useContext} from "react"
import ImageGallery from 'react-image-gallery';
import {UserContext} from "../../UserContext";

import './QuestGallery.scss'

// Props
interface Props {
    images: any
}

// Component
const QuestGallery: React.FC<Props> = (props) => {

    const {images} = props

    //@ts-ignore
    const {userContext} = useContext(UserContext)


    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    // Template
    return (
        <div className="quest-gallery">
            {images.length > 0 && (
                <div>
                    <div className="quest-gallery-title">
                        <span>Gallery</span>
                    </div>

                    <ImageGallery
                        items={images}
                        showPlayButton={false}
                    />
                </div>
            )}

        </div>
    )
}

export default QuestGallery
