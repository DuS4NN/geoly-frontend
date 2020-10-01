import React, {useState} from 'react'
import {Switch, Route} from "react-router-dom"
import { UserContext } from "./UserContext"

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

// Style
import './App.scss'
import Profile from "./views/Profile";
import Premium from "./views/Premium";
import PremiumResponse from "./components/Premium/PremiumResponse";
import Welcome from "./views/Welcome";



// Component
function App() {
    // User Context
    let nickName = localStorage.getItem("nickName") ? localStorage.getItem("nickName") : null
    let profileImage = localStorage.getItem("profileImage") ? localStorage.getItem("profileImage") : null
    let languageId = localStorage.getItem("languageId") ? localStorage.getItem("languageId") : '1'
    let mapTheme = localStorage.getItem("mapTheme") ? localStorage.getItem("MapTheme") : '1'
    let darkMode = localStorage.getItem("darkMode") ? localStorage.getItem("darkMode") : 'false'

    let userFromStorage = {
        nickName: nickName,
        profileImage: profileImage,
        languageId: languageId,
        mapTheme: mapTheme,
        darkMode: darkMode
    }

    const [userContext, setUserContext] = useState(userFromStorage)

    // Template
    return (
        <div className="app">
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
                        <Route path={"/profile/"} component={Profile} />
                        <Route exact path={"/premium"} component={Premium} />
                        <Route path={"/premiumresponse/"} component={PremiumResponse} />
                        <Route exact path={"/"} component={Welcome} />
                    </Switch>
                </main>

            </UserContext.Provider>
        </div>
    );
}

export default App;
