import React, {useEffect, useState} from 'react'
import {Switch, Route} from "react-router-dom"

import './App.scss'

import TheNavigation from "./components/Navigation/TheNavigation"
import SignIn from "./views/SignIn"
import { UserContext } from "./UserContext";

import Tunes from "./views/Tunes";

function App() {

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

    return (
        <div className="app">
            <header>
                <TheNavigation />
            </header>
            <main className="content">
                <Switch>
                    <UserContext.Provider value={{userContext, setUserContext}}>
                        <Route exact path="/login" component={SignIn} />
                        <Route exact path="/tunes" component={Tunes} />
                    </UserContext.Provider>
                </Switch>

            </main>
        </div>
    );
}

export default App;
