import React, {useContext} from "react"
import {NavLink} from "react-router-dom"

import "./AdminNavigation.scss"
import {UserContext} from "../../../UserContext";

// Component
const AdminNavigation: React.FC = () => {

    const {userContext} = useContext(UserContext)

    const text = require('../../../assets/languageText/admin').adminText

    // Template
    return (
        <div className="adminNavigation">
            <div className="container">

                <div className="adminNavigationItem">
                    <div className="adminNavigationItemImage">
                        <img alt="" src={require("../../../assets/images/adminImages/stats.svg")} />
                    </div>
                    <div className="adminNavigationItemText">
                        <NavLink to={"/admin"}>{text.navigation.main}</NavLink>
                    </div>
                </div>

                <div className="adminNavigationItem">
                    <div className="adminNavigationItemImage">
                        <img alt="" src={require("../../../assets/images/adminImages/user.svg")} />
                    </div>
                    <div className="adminNavigationItemText">
                        <NavLink to={"/admin/user"}>{text.navigation.users}</NavLink>
                    </div>
                </div>
                <div className="adminNavigationItem">
                    <div className="adminNavigationItemImage">
                        <img alt="" src={require("../../../assets/images/adminImages/quest.svg")} />
                    </div>
                    <div className="adminNavigationItemText">
                        <NavLink to={"/admin/quest"}>{text.navigation.quests}</NavLink>
                    </div>
                </div>
                <div className="adminNavigationItem">
                    <div className="adminNavigationItemImage">
                        <img alt="" src={require("../../../assets/images/adminImages/season.svg")} />
                    </div>
                    <div className="adminNavigationItemText">
                        <NavLink to={"/admin/season"}>{text.navigation.seasons}</NavLink>
                    </div>
                </div>
                <div className="adminNavigationItem">
                    <div className="adminNavigationItemImage">
                        <img alt="" src={require("../../../assets/images/adminImages/questReport.svg")} />
                    </div>
                    <div className="adminNavigationItemText">
                        <NavLink to={"/admin/reportQuest"}>{text.navigation.questReports}</NavLink>
                    </div>
                </div>
                <div className="adminNavigationItem">
                    <div className="adminNavigationItemImage">
                        <img alt="" src={require("../../../assets/images/adminImages/userReport.svg")} />
                    </div>
                    <div className="adminNavigationItemText">
                        <NavLink to={"/admin/reportUser"}>{text.navigation.userReports}</NavLink>
                    </div>
                </div>
                <div className="adminNavigationItem">
                    <div className="adminNavigationItemImage">
                        <img alt="" src={require("../../../assets/images/adminImages/create.svg")} />
                    </div>
                    <div className="adminNavigationItemText">
                        <NavLink to={"/admin/creator"}>{text.navigation.questCreator}</NavLink>
                    </div>
                </div>

                {userContext['roles'].includes("ADMIN") && (
                    <div className="adminNavigationItem">
                        <div className="adminNavigationItemImage">
                            <img alt="" src={require("../../../assets/images/adminImages/log.svg")} />
                        </div>
                        <div className="adminNavigationItemText">
                            <NavLink to={"/admin/log"}>{text.navigation.logs}</NavLink>
                        </div>
                    </div>
                )}
                {userContext['roles'].includes("ADMIN") && (
                    <div className="adminNavigationItem">
                        <div className="adminNavigationItemImage">
                            <img alt="" src={require("../../../assets/images/adminImages/payment.svg")} />
                        </div>
                        <div className="adminNavigationItemText">
                            <NavLink to={"/admin/payment"}>{text.navigation.payments}</NavLink>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminNavigation
