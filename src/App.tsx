import React, {useState} from 'react'
import {Switch, Route} from "react-router-dom"

//Children
import TheNavigation from "./components/Navigation/TheNavigation"
import ForgotPassword from "./views/ForgotPassword"
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
            languageId: localStorage.getItem("languageId"),
            mapTheme: localStorage.getItem("mapTheme"),
            darkMode: localStorage.getItem("darkMode")
        }
    }else{
        userFromStorage = {
            nickName: localStorage.getItem("nickName"),
            languageId: "1",
            mapTheme: "1",
            darkMode: "false"
        }
    }
    const [userContext, setUserContext] = useState(userFromStorage)

    // Template
    return (
        <div className="app">
            <header>
                <TheNavigation />
            </header>
            <main className="content">
                <Switch>
                    <UserContext.Provider value={{userContext, setUserContext}}>
                        <Route exact path="/login" component={SignIn} />
                        <Route exact path="/register" component={SignUp} />
                        <Route path="/forgot" component={ForgotPassword} />
                    </UserContext.Provider>
                </Switch>

            </main>
        </div>
    );
}

export default App;
