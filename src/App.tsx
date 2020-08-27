import React, {useState} from 'react'
import {Switch, Route} from "react-router-dom"

//Children
import Navigation from "./views/Navigation"
import ForgotPassword from "./views/ForgotPassword"
import Verify from "./components/Account/Verify/Verify"
import SignIn from "./views/SignIn"
import SignUp from "./views/SignUp"
// Context
import { UserContext } from "./UserContext"
// Style
import './App.scss'

// Component
function App() {
    // User Context
    let userFromStorage
    if(localStorage.getItem("nickName")){
        userFromStorage = {
            nickName: localStorage.getItem("nickName"),
            profileImage: localStorage.getItem("profileImage"),
            languageId: localStorage.getItem("languageId"),
            mapTheme: localStorage.getItem("mapTheme"),
            darkMode: localStorage.getItem("darkMode")
        }
    }else{
        userFromStorage = {
            nickName: localStorage.getItem("nickName"),
            profileImage: localStorage.getItem("profileImage"),
            languageId: "1",
            mapTheme: "1",
            darkMode: "false"
        }
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
                    </Switch>
                </main>

            </UserContext.Provider>
        </div>
    );
}

export default App;
