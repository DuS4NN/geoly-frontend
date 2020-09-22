import React from "react"

import './ProfileList.scss'
// Props
interface Props {
    badges: any
}

// Component
const ProfileList: React.FC<Props> = (props) => {

    const {badges} = props

    // Template
    return (
        <div className="profile-list">

            {badges.length > 0 && (
                <div className="badges">
                    {badges.map((badge:any) => (
                        <div>
                        </div>
                    ))}
                </div>
            )}

        </div>

    )
}

export default ProfileList
