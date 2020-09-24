import React, {useContext, useEffect, useRef, useState} from "react"
import useSmoothScroll from 'react-smooth-scroll-hook';
import './ProfileList.scss'
import {UserContext} from "../../UserContext";

// Props
interface Props {
    badges: any
}

// Component
const ProfileBadges: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const [margin, setMargin] = useState(0)
    const {badges} = props
    const ref = useRef(null);
    const { scrollTo } = useSmoothScroll({
        ref,
        speed: 30,
        direction: 'x',
    });

    const handleRightScroll = () => {
        scrollTo(margin)
    }

    const handleLeftScroll = () => {
        scrollTo(-margin)
    }

    useEffect(() => {
        const calcAndSetMargin = () => {
            let container = document.getElementById("badge-item-container")
            if(container){
                let badgeWidth = 110 + 30 //30 - min padding

                let containerWidth = container?.clientWidth as number
                let numberOfBadges = Math.trunc(containerWidth/badgeWidth)
                let spareSpace = Math.abs(numberOfBadges*badgeWidth-containerWidth)
                let addMargin = Math.trunc(spareSpace/numberOfBadges/2)

                let elements = document.getElementsByClassName("badge-item") as any

                for(let i=0; i< elements.length; i++){
                    elements[i].style.marginRight = 15+addMargin+"px"
                    elements[i].style.marginLeft = 15+addMargin+"px"
                }

                setMargin(badgeWidth+addMargin*2)
            }
        }

        calcAndSetMargin()
        window.addEventListener("resize", calcAndSetMargin);

    }, [document.getElementById("badge-item-container")])

    // Template
    return (
        <div className="badges-container">

            <img alt="" className="oblique-top" src={require("../../assets/images/obliqueTopSmall.svg")} />

            <div className="badges-title">
                <span>{text.profile.achievements}</span>
            </div>

            <div className="badges">
                <div className="badge-arrow-left">
                    <img onClick={handleLeftScroll} alt="" src={require("../../assets/images/otherIcons/arrow-left.svg")} />
                </div>
                <div ref={ref} className="badge-item-container" id="badge-item-container">
                    {badges.map((badge:any) => (
                        <div key={badge.name} className="badge-item">
                            <img title={text.badge[badge.name]}  alt="" src={require("../../"+badge.image)} />
                        </div>
                    ))}
                </div>
                <div className="badge-arrow-right">
                    <img onClick={handleRightScroll} alt="" src={require("../../assets/images/otherIcons/arrow-right.svg")} />
                </div>
            </div>

            <img alt="" className="oblique-bottom" src={require("../../assets/images/obliqueBottomSmall.svg")} />
        </div>
    )
}

export default ProfileBadges
