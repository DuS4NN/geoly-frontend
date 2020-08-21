import React from 'react'
import {Switch, Route} from "react-router-dom"

import './App.scss'

import TheNavigation from "./components/Navigation/TheNavigation"
import TheAlertList from "./components/Alert/TheAlertList"
import Account from "./views/Account"


function App() {

    return (
        <div className="app">
            <header>
                <TheNavigation />
            </header>
            <main className="content">
                <Switch>
                    <Route path="/login" component={Account} exact />
                </Switch>
            </main>
            <TheAlertList />
        </div>

    );
}

export default App;
