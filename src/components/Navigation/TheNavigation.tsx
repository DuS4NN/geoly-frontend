import React from "react"
import {NavLink, Link} from "react-router-dom"

import './TheNavigation.scss'

interface Props {

}

const TheNavigation: React.FC<Props> = () => {

    const logo = require('../../assets/images/logo-with-text.svg')

    return (
        <nav className="navigation">
            <div className="navigation-logo">
                <span className="navigation-logo-helper"></span>
                <Link to="/">
                    <img src={logo} alt=""/>
                </Link>

            </div>

            <div className="navigation-links">
                <NavLink to="/map"  exact>Map</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/quests" >Quests</NavLink>
                <NavLink to="/groups" >Groups</NavLink>
                <NavLink to="/premium" >Premium</NavLink>
            </div>

            <div className="navigation-button navigation-profile">
                <form>
                    <button>Log In</button>
                </form>
            </div>

        </nav>
    )
}

export default TheNavigation
