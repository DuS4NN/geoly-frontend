import React from "react"
import {NavLink} from "react-router-dom"

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
                        <img alt="" src={require("../../../assets/images/adminImages/stats.svg")} />
                    </div>
                    <div className="text">
                        <NavLink to={"/admin"}>{text.navigation.main}</NavLink>
                    </div>
                </div>

                <div className="item">
                    <div className="image">
                        <img alt="" src={require("../../../assets/images/adminImages/user.svg")} />
                    </div>
                    <div className="text">
                        <NavLink to={"/admin/user"}>{text.navigation.users}</NavLink>
                    </div>
                </div>
                <div className="item">
                    <div className="image">
                        <img alt="" src={require("../../../assets/images/adminImages/quest.svg")} />
                    </div>
                    <div className="text">
                        <NavLink to={"/admin/quest"}>{text.navigation.quests}</NavLink>
                    </div>
                </div>
                <div className="item">
                    <div className="image">
                        <img alt="" src={require("../../../assets/images/adminImages/season.svg")} />
                    </div>
                    <div className="text">
                        <NavLink to={"/admin/season"}>{text.navigation.seasons}</NavLink>
                    </div>
                </div>
                <div className="item">
                    <div className="image">
                        <img alt="" src={require("../../../assets/images/adminImages/questReport.svg")} />
                    </div>
                    <div className="text">
                        <NavLink to={"/admin/reportQuest"}>{text.navigation.questReports}</NavLink>
                    </div>
                </div>
                <div className="item">
                    <div className="image">
                        <img alt="" src={require("../../../assets/images/adminImages/userReport.svg")} />
                    </div>
                    <div className="text">
                        <NavLink to={"/admin/reportUser"}>{text.navigation.userReports}</NavLink>
                    </div>
                </div>
                <div className="item">
                    <div className="image">
                        <img alt="" src={require("../../../assets/images/adminImages/create.svg")} />
                    </div>
                    <div className="text">
                        <NavLink to={"/admin/creator"}>{text.navigation.questCreator}</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminNavigation
