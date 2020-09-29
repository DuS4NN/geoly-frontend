import React, {useContext, useRef} from 'react'
import {UserContext} from "../../UserContext";
import useSmoothScroll from 'react-smooth-scroll-hook';
import './PremiumContainer.scss'

// Props
interface Props {
}

// Component
const PremiumContainer: React.FC = () => {

    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const ref = useRef<HTMLElement>(document.documentElement);

    const { scrollTo } = useSmoothScroll({
        ref,
        speed: 30
    });

    const handleSubmit = () => {

    }

    // Template
    return (
        <div className="premium-header">
            <div className="header-container">
                <div className="header-text">
                    <h1>{text.premium.mainTitle}</h1>
                    <button onClick={() => scrollTo('#scroll-to')}>{text.premium.show}</button>
                </div>
            </div>

            <div className="premium-container-white" id="scroll-to">
                <div className="container-image premium1">
                </div>
                <div className="container-info">
                    <div className="info-title">
                        <h2>{text.premium.title1}</h2>
                    </div>
                    <div className="info-text">
                        <span>{text.premium.text1}</span>
                    </div>
                </div>
            </div>


            <img alt="" className="oblique-image" src={require("../../assets/images/obliqueTop.svg")} />
            <div className="premium-container-green">

                <div className="container-info">
                    <div className="info-title">
                        <h2>{text.premium.title2}</h2>
                    </div>
                    <div className="info-text">
                        <span>{text.premium.text2}</span>
                    </div>
                </div>
                <div className="container-image premium2">
                </div>

            </div>
            <img alt="" className="oblique-image" src={require("../../assets/images/obliqueBottom.svg")} />


            <div className="premium-container-white">
                <div className="container-image premium3">
                </div>
                <div className="container-info">
                    <div className="info-title">
                        <h2>{text.premium.title3}</h2>
                    </div>
                    <div className="info-text">
                        <span>{text.premium.text3}</span>
                    </div>
                </div>
            </div>

            <div className="premium-footer">
                <h1>{text.premium.footerTitle}</h1>
                <button onClick={handleSubmit}>{text.premium.getPremium}</button>
            </div>

        </div>
    )
}

export default PremiumContainer
