import React, {useContext, useEffect, useRef, useState} from "react"
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

    const ref = useRef(null)
    const button = useRef(null) as any

    const [menuOpen, setMenuOpen] = useState(false) as Array<any>

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen)
    }

    function useClickOutside(ref: any) {
        useEffect(() => {
            function handleClickOutside(e: MouseEvent) {

                if(button.current && button.current.contains(e.target)){
                    return
                }

                if (ref.current && !ref.current.contains(e.target)) {
                    setMenuOpen(false)
                }
            }

            document.addEventListener("click", handleClickOutside);
            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }, [ref]);
    }
    useClickOutside(ref)

    // Template
    return (
        <div className="navigation-links">

            <div className="navigation-menu">
                <img alt="" ref={button} onClick={handleMenuClick} src={require("../../assets/images/otherIcons/menu.svg")} />
            </div>

            <div className="navigation-links-logo">
                <Link to="/">
                    <img src={logo} alt=""/>
                </Link>
            </div>

            <div ref={ref} onClick={handleMenuClick} className={menuOpen ? "navigation-links-link" : "navigation-links-link open"}>
                <NavLink to="/map" >{text.navigation.map}</NavLink>
                <NavLink to="/ranking">{text.navigation.ranking}</NavLink>
                {userContext['nickName'] && (
                    <NavLink to="/groups" >{text.navigation.groups}</NavLink>
                )}
                {userContext['nickName'] && (
                    <NavLink to="/quests" >{text.navigation.quests}</NavLink>
                )}
                <NavLink to="/premium" >{text.navigation.premium}</NavLink>

                <a href={process.env.REACT_APP_MOBILE_APP_DOWNLOAD}>{text.navigation.app}</a>
            </div>

        </div>

    )
}

export default NavigationLinks
