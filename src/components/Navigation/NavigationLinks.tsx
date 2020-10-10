import React, {useContext} from "react"
import {NavLink, Link} from "react-router-dom"

// Context
import {UserContext} from "../../UserContext"

// Style
import './NavigationLinks.scss'

// Props
interface Props {
}

// Component
const NavigationLinks: React.FC<Props> = () => {
    const {userContext} = useContext(UserContext)

    // Text
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text
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
                <NavLink to="/map" >{text.navigation.map}</NavLink>
                <NavLink to="/ranking">{text.navigation.ranking}</NavLink>
                {userContext['nickName'] && (
                    <NavLink to="/groups" >{text.navigation.groups}</NavLink>
                )}
                {userContext['nickName'] && (
                    <NavLink to="/quests" >{text.navigation.quests}</NavLink>
                )}
                <NavLink to="/premium" >{text.navigation.premium}</NavLink>
                <a href="https://play.google.com/store" >{text.navigation.app}</a>
            </div>
        </div>

    )
}

export default NavigationLinks
