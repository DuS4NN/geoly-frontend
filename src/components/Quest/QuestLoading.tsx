import React from 'react'

import './QuestTitle.scss'
import './QuestDetails.scss'


// Component
const QuestLoading: React.FC = () => {


    // Template
    return (
        <div>
            <div className="quest-title">

                <div className="quest-title-category">
                    <div className="category-image">
                    </div>

                    <div className="category-name">
                    </div>

                    <div className="date">
                    </div>
                </div>

                <div className="quest-title-name">
                </div>

                <div className="quest-title-user">
                    <div className="quest-title-user-box">

                        <div className="user-image">
                        </div>
                        <div className="user-name">
                        </div>
                    </div>
                </div>
            </div>

            <div className="quest-detail-content">
                <div className="loading">
                    <img alt="" src={require("../../assets/images/otherIcons/loading.svg")} />
                </div>
            </div>
        </div>

    )
}

export default QuestLoading
