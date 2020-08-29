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
    //@ts-ignore
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
                <NavLink to="/top">{text.navigation.ranking}</NavLink>
                <NavLink to="/quests" >{text.navigation.quests}</NavLink>
                <NavLink to="/groups" >{text.navigation.groups}</NavLink>
                <NavLink to="/premium" >{text.navigation.premium}</NavLink>
            </div>
        </div>

    )
}

export default NavigationLinks
