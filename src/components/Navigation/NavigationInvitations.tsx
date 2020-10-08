import React, {useEffect} from "react"
import axios from "axios"

// Props
interface Props {

}

// Component
const NavigationInvitations: React.FC<Props> = (props) => {



    // Template
    return (
        <div className="navigation-invitations">
            <img src={require("../../assets/images/inputImages/message.svg")} alt="" />
        </div>
    )
}

export default NavigationInvitations
