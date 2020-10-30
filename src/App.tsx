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

// Style
import './App.scss'
import './DarkMode.scss'

// Component
function App() {
    // User Context
    let nickName = localStorage.getItem("nickName") ? localStorage.getItem("nickName") : null
    let profileImage = localStorage.getItem("profileImage") ? localStorage.getItem("profileImage") : null
    let languageId = localStorage.getItem("languageId") ? localStorage.getItem("languageId") : '1'
    let mapTheme = localStorage.getItem("mapTheme") ? localStorage.getItem("mapTheme") : '1'
    let darkMode = localStorage.getItem("darkMode") ? localStorage.getItem("darkMode") : 'false'

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
                    let data = response.data.data[0]

                    let newUser = {
                        nickName: data[0],
                        profileImage: data[1],
                        mapTheme: data[2],
                        darkMode: data[3],
                        languageId: data[4]
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
                        profileImage: null
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
                        </Switch>
                    </main>

                </UserContext.Provider>
            )}
        </div>
    );
}

export default App;
