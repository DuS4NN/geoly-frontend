import React from "react"
import ImageGallery from 'react-image-gallery';

import './QuestGallery.scss'

// Props
interface Props {
    images: any
}

// Component
const QuestGallery: React.FC<Props> = (props) => {

    const {images} = props

    // Template
    return (
        <div className="quest-gallery">
            {images.length > 0 && (
                <div>
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
