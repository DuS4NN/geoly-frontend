import React, {useEffect, useState} from 'react'
import {Switch, Route} from "react-router-dom"
import { UserContext } from "./UserContext"
import axios from "axios"

//Children
import Verify from "./components/Account/Verify/Verify"
import Logout from "./components/Account/LogOut/LogOut"
import Navigation from "./views/Navigation"
import ForgotPassword from "./views/ForgotPassword"
import SignIn from "./views/SignIn"
import SignUp from "./views/SignUp"
import Map from "./views/Map"
import Quest from "./views/Quest"
import Ranking from "./views/Ranking";
import UserQuest from "./views/UserQuest";
import Groups from "./views/Groups";
import Group from "./views/Group";
import Profile from "./views/Profile";
import Premium from "./views/Premium";
import PremiumResponse from "./components/Premium/PremiumResponse";
import Welcome from "./views/Welcome";
import Settings from "./views/Settings";
import DailyQuest from "./views/DailyQuest";
import AdminUser from "./views/Admin/AdminUser"
import AdminUserEdit from "./views/Admin/AdminUserEdit"
import AdminQuest from "./views/Admin/AdminQuest";
import AdminQuestEdit from "./views/Admin/AdminQuestEdit";
import AdminReportUser from "./views/Admin/AdminReportUser";
import AdminReportQuest from "./views/Admin/AdminReportQuest";
import AdminGroupEdit from "./views/Admin/AdminGroupEdit";
import AdminSeason from "./views/Admin/AdminSeason";
import AdminMain from "./views/Admin/AdminMain";
import AdminQuestCreator from "./views/Admin/AdminQuestCreator";
import AdminLog from "./views/Admin/AdminLog";
import AdminPayment from "./views/Admin/AdminPayment";

import './App.scss'
import './DarkMode.scss'


// Component
function App() {
    // Users Context
    let nickName = localStorage.getItem("nickName") ? localStorage.getItem("nickName") : null
    let profileImage = localStorage.getItem("profileImage") ? localStorage.getItem("profileImage") : null
    let languageId = localStorage.getItem("languageId") ? localStorage.getItem("languageId") : '1'
    let mapTheme = localStorage.getItem("mapTheme") ? localStorage.getItem("mapTheme") : '1'
    let darkMode = localStorage.getItem("darkMode") ? localStorage.getItem("darkMode") == 'true' : false

    let userFromStorage = {
        nickName: nickName,
        profileImage: profileImage,
        languageId: languageId,
        mapTheme: mapTheme,
        darkMode: darkMode
    } as any

    const [userContext, setUserContext] = useState(userFromStorage)
    const [loaded, setLoaded] = useState(nickName===null)

    useEffect(() => {
        if(localStorage.getItem("nickName") !== null){
            axios({
                method: "GET",
                url: process.env.REACT_APP_API_SERVER_URL+"/checkUser",
                withCredentials: true
            }).then(function (response) {
                let statusCode = response.data.responseEntity.statusCode
                if(statusCode === 'OK'){

                    let options = response.data.data[1][0]
                    let roles = response.data.data[0]


                    let newUser = {
                        languageId: options[0],
                        mapTheme: options[1],
                        darkMode: options[2],
                        nickName: options[3],
                        profileImage: options[4],
                        roles: roles
                    } as any

                    setUserContext(newUser)

                    if(newUser.darkMode){
                        let bodyElement = document.getElementsByTagName("BODY")[0]
                        bodyElement.className = bodyElement.className + "modaldarkmode"
                    }
                }else{
                    setUserContext({
                        ...userContext,
                        nickName: null,
                        profileImage: null,
                        roles: null
                    })
                    localStorage.removeItem("nickName")
                    localStorage.removeItem("profileImage")

                    if(darkMode){
                        let bodyElement = document.getElementsByTagName("BODY")[0]
                        bodyElement.className = bodyElement.className + "modaldarkmode"
                    }
                }

                setLoaded(true)
            })
        }else{
            if(darkMode){
                let bodyElement = document.getElementsByTagName("BODY")[0]
                bodyElement.className = bodyElement.className + "modaldarkmode"
            }else{
                let bodyElement = document.getElementsByTagName("BODY")[0]
                bodyElement.classList.remove("modaldarkmode")
            }
        }
    }, [])

    // Template
    return (
        <div className={userContext['darkMode'] ? "app darkmode" : "app"}>
            {loaded && (
                <UserContext.Provider value={{userContext, setUserContext}}>

                    <header>
                        <Navigation />
                    </header>

                    <main className="content">
                        <Switch>
                            <Route exact path="/login" component={SignIn} />
                            <Route exact path="/register" component={SignUp} />
                            <Route path="/forgot" component={ForgotPassword} />
                            <Route path="/verify" component={Verify} />
                            <Route path="/logout" component={Logout} />
                            <Route path="/ranking" component={Ranking} />
                            <Route path="/map" component={Map} />
                            <Route path="/quest/" component={Quest} />
                            <Route exact path="/quests" component={UserQuest} />
                            <Route exact path="/groups" component={Groups} />
                            <Route path={"/group/"} component={Group} />
                            <Route path={"/profile/:nick"} render={(props) => <Profile {...props} />} />
                            <Route exact path={"/premium"} component={Premium} />
                            <Route path={"/premiumresponse/"} component={PremiumResponse} />
                            <Route exact path={"/"} component={Welcome} />
                            <Route exact path={"/welcome"} component={Welcome} />
                            <Route exact path={"/settings"} component={Settings} />
                            <Route exact path={"/daily"} component={DailyQuest} />

                            <Route exact path={"/admin/user"} component={AdminUser} />
                            <Route path={"/admin/user/:id"} render={(props) => <AdminUserEdit {...props} />} />

                            <Route exact path={"/admin/quest"} component={AdminQuest} />
                            <Route path={"/admin/quest/:id"} render={(props) => <AdminQuestEdit {...props} />} />

                            <Route exact path={"/admin/reportUser"} component={AdminReportUser} />
                            <Route exact path={"/admin/reportQuest"} component={AdminReportQuest} />

                            <Route path={"/admin/group/:id"} render={(props) => <AdminGroupEdit {...props} />} />
                            <Route exact path={"/admin/season"} component={AdminSeason} />
                            <Route exact path={"/admin"} component={AdminMain} />
                            <Route exact path={"/admin/creator"} component={AdminQuestCreator} />
                            <Route exact path={"/admin/log"} component={AdminLog} />
                            <Route exact path={"/admin/payment"} component={AdminPayment} />
                        </Switch>
                    </main>

                </UserContext.Provider>
            )}
        </div>
    );
}

export default App;
