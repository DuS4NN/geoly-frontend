import React from 'react'
import PremiumContainer from "../components/Premium/PremiumContainer";
import "../components/Premium/SmallDevicePremium.scss"

// Props
interface Props {
}

// Component
const Premium: React.FC = () => {



    // Template
    return (
        <div className="premium">
            <PremiumContainer />
        </div>
    )
}

export default Premium
