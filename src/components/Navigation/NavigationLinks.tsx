import React from "react"
import {NavLink, Link} from "react-router-dom"

// Style
import './NavigationLinks.scss'

// Props
interface Props {
}

// Component
const NavigationLinks: React.FC<Props> = () => {

    // Image
    const logo = require('../../assets/images/logo-with-text.svg')

    // Template
    return (
        <div className="navigation-links">
            <div className="navigation-links-logo">
                <Link to="/">
                    <img src={logo} alt=""/>
                </Link>
            </div>

            <div className="navigation-links-link">
                <NavLink to="/map" >Map</NavLink>
                <NavLink to="/top">Top</NavLink>
                <NavLink to="/quests" >Quests</NavLink>
                <NavLink to="/groups" >Groups</NavLink>
                <NavLink to="/premium" >Premium</NavLink>
            </div>
        </div>

    )
}

export default NavigationLinks
