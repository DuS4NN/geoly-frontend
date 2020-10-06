import React, {useContext, useEffect, useRef} from "react"
//@ts-ignore
import {FadeIn} from "react-anim-kit"
import Toggle from 'react-toggle'
import axios from "axios"
import {UserContext} from "../../UserContext"
import {LogInUser} from "../../types"
import {useAlert} from "react-alert"
import {Link} from "react-router-dom"
import './NavigationRoll.scss'
import '../Elements/Toggle.scss'


// Props
interface Props {
    setShowRoll: (showRoll: boolean) => void
}

// Component
const NavigationRoll: React.FC<Props> = (props) => {
    // Context
    const {userContext, setUserContext} = useContext(UserContext)

    //Ref
    const navigationRoll = useRef(null)
    // Props
    const {setShowRoll} = props
    // Alerts
    const alert = useAlert()
    // Text
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    // Methods
    const handleClick = () => {
        setShowRoll(false)
    }

    const handleChange = () => {

        let toggle:boolean = !userContext['darkMode']

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/settings/darkmode?toggle='+toggle,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){
                let newUserContext:LogInUser = userContext
                newUserContext['darkMode'] = toggle
                setUserContext(newUserContext)
                localStorage.setItem('darkMode', String(toggle))
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        })
    }

    // Click outside of component
    function useClickOutside(ref: any) {
        useEffect(() => {
            function handleClickOutside(e: MouseEvent) {
                if (ref.current && !ref.current.contains(e.target)) {
                    setShowRoll(false)
                }
            }

            document.addEventListener("click", handleClickOutside);
            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }, [ref]);
    }

    useClickOutside(navigationRoll)
    // Template
    return (
        <div className="navigation-roll" ref={navigationRoll} id="navigation-roll">
            <div className="navigation-triangle">
            </div>
                <FadeIn left by={70} delayBy={0.05}>

                    <article className="navigation-roll-item">

                        <div className="navigation-roll-item-icon">
                            <img src={require("../../assets/images/navigationIcons/darkmode.svg")} alt="" />
                        </div>
                        <div className="navigation-roll-item-name">
                            <span>{text.navigation.darkMode}</span>
                        </div>
                        <div className="navigation-roll-item-slider">
                                <Toggle
                                    defaultChecked={Boolean(userContext['darkMode'])}
                                    onChange={handleChange}
                                    className= "darkmode-toggle"
                                    icons={{
                                        checked: null,
                                        unchecked: null,
                                    }}
                                />
                        </div>
                    </article>

                    <Link onClick={handleClick} to={'/daily'} className="navigation-roll-item daily">
                        <div className="navigation-roll-item-icon">
                            <img src={require("../../assets/images/navigationIcons/daily.svg")} alt="" />
                        </div>
                        <div className="navigation-roll-item-title">
                            <span>{text.navigation.dailyQuest}</span>
                        </div>
                    </Link>

                    <Link onClick={handleClick} to={'/profile/'+userContext['nickName']} className="navigation-roll-item profile">
                        <div className="navigation-roll-item-icon">
                            <img src={require("../../assets/images/navigationIcons/profile.svg")} alt="" />
                        </div>
                        <div className="navigation-roll-item-title">
                            <span>{text.navigation.profile}</span>
                        </div>
                    </Link>

                    <Link onClick={handleClick} to={"/settings"} className="navigation-roll-item settings">
                        <div className="navigation-roll-item-icon">
                            <img src={require("../../assets/images/navigationIcons/settings.svg")} alt="" />
                        </div>
                        <div className="navigation-roll-item-title">
                            <span>{text.navigation.settings}</span>
                        </div>
                    </Link>

                    <Link onClick={handleClick} to={"/logout"} className="navigation-roll-item logout">
                        <div className="navigation-roll-item-icon">
                            <img src={require("../../assets/images/navigationIcons/logout.svg")} alt="" />
                        </div>
                        <div className="navigation-roll-item-title">
                            <span>{text.navigation.logOut}</span>
                        </div>
                    </Link>
                </FadeIn>
        </div>









   )
}

export default NavigationRoll
