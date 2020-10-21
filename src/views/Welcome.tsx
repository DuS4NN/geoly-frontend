import React, {useContext} from "react"
import {useHistory} from "react-router-dom"
import {UserContext} from "../UserContext"

import '../components/Welcome/Welcome.scss'
import '../components/Welcome/SmallDeviceWelcome.scss'

// Props
interface Props {
}

// Component
const Welcome: React.FC = () => {
    // Context
    const {userContext} = useContext(UserContext)
    const text = require('../assets/languageText/'+userContext['languageId']+'.ts').text
    const history = useHistory()


    const handleSubmit = () => {
        if(userContext['nickName']){
            history.push("/map")
        }else{
            history.push("/login")
        }
    }

    // Template
    return (
        <div className="welcome">
            <div className="welcome-main">
                <div className="main-title">
                    <span className="first-line">{text.welcome.title}</span> <br/>
                    <span className="second-line">{text.welcome.title2}</span>
                </div>
                <div className="main-button">
                  <button onClick={handleSubmit}>{text.welcome.startNow}</button>
                </div>
            </div>
            <div className="welcome-content">

                <div className="welcome-container-white">
                    <div className="container-image welcome1">
                    </div>
                    <div className="container-info">
                        <div className="info-title">
                            <h2>{text.welcome.welcomeTitle1}</h2>
                        </div>
                        <div className="info-text">
                            <span>{text.welcome.welcomeText1}</span>
                        </div>
                    </div>
                </div>

                <img alt="" className="oblique-image" src={require("../assets/images/obliqueTop.svg")} />
                <div className="welcome-container-green">

                    <div className="container-info">
                        <div className="info-title">
                            <h2>{text.welcome.welcomeTitle2}</h2>
                        </div>
                        <div className="info-text">
                            <span>{text.welcome.welcomeText2}</span>
                        </div>
                    </div>
                    <div className="container-image welcome2">
                    </div>

                </div>
                <img alt="" className="oblique-image" src={require("../assets/images/obliqueBottom.svg")} />


                <div className="welcome-container-white">
                    <div className="container-image welcome3">
                    </div>
                    <div className="container-info">
                        <div className="info-title">
                            <h2>{text.welcome.welcomeTitle3}</h2>
                        </div>
                        <div className="info-text">
                            <span>{text.welcome.welcomeText3}</span>
                        </div>
                    </div>
                </div>

                <img alt="" className="oblique-image" src={require("../assets/images/obliqueTop.svg")} />
                <div className="welcome-container-green">

                    <div className="container-info">
                        <div className="info-title">
                            <h2>{text.welcome.welcomeTitle4}</h2>
                        </div>
                        <div className="info-text">
                            <span>{text.welcome.welcomeText4}</span>
                        </div>
                    </div>
                    <div className="container-image welcome4">
                    </div>

                </div>
                <img alt="" className="oblique-image" src={require("../assets/images/obliqueBottom.svg")} />

                <div className="welcome-container-white">
                    <div className="container-image welcome5">
                    </div>
                    <div className="container-info">
                        <div className="info-title">
                            <h2>{text.welcome.welcomeTitle5}</h2>
                        </div>
                        <div className="info-text">
                            <span>{text.welcome.welcomeText5}</span>
                        </div>
                    </div>
                </div>

            </div>

            <div className="welcome-footer">
                <h1>{text.welcome.footerTitle}</h1>
                <button onClick={handleSubmit}>{text.welcome.startNow}</button>
            </div>
        </div>
    )
}

export default Welcome
