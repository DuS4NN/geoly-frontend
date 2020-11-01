import React from "react"

import "./AdminNavigation.scss"

// Props
interface Props {
}

// Component
const AdminNavigation: React.FC = () => {

    const text = require('../../../assets/languageText/admin').adminText

    // Template
    return (
        <div className="adminNavigation">
            <div className="container">
                <div className="item">
                    <div className="image">
                        <img alt="" src={require("../../../assets/images/adminImages/user.svg")} />
                    </div>
                    <div className="text">
                        <span>{text.navigation.users}</span>
                    </div>
                </div>
                <div className="item">
                    <div className="image">
                        <img alt="" src={require("../../../assets/images/adminImages/quest.svg")} />
                    </div>
                    <div className="text">
                        <span>{text.navigation.quests}</span>
                    </div>
                </div>
                <div className="item">
                    <div className="image">
                        <img alt="" src={require("../../../assets/images/adminImages/questReport.svg")} />
                    </div>
                    <div className="text">
                        <span>{text.navigation.questReports}</span>
                    </div>
                </div>
                <div className="item">
                    <div className="image">
                        <img alt="" src={require("../../../assets/images/adminImages/userReport.svg")} />
                    </div>
                    <div className="text">
                        <span>{text.navigation.userReports}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminNavigation
