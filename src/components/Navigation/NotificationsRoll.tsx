import React, {useContext, useEffect, useRef} from "react"
import {NavLink} from "react-router-dom"

// Context
import {UserContext} from "../../UserContext"

// Style
import './NotificationRoll.scss'

// Props
interface Props {
    notifications:any
    setShowRoll: (showRoll:boolean) => void
}

// Component
const NotificationsRoll: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)

    const {notifications, setShowRoll} = props
    const notificationRoll = useRef(null)



    // Text
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text


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

    useClickOutside(notificationRoll)

    // Template
    return (
        <div className="notifications-roll" ref={notificationRoll}>
            <div className="navigation-triangle">
            </div>

            <div className="roll-items">
                {notifications.map((notification:any) => (
                    <div key={notification.id} className="roll-item">
                        <div className="item-icon">
                            <img alt="" src={require("../../assets/images/notificationImages/"+notification.type+".svg")} />
                        </div>

                        <div className="item-text">
                            {notification.type === "WELCOME" && (
                                <span>{text.notifications.welcome}</span>
                            )}

                            {notification.type === "ADD_REVIEW" && (
                                <div>
                                    <span>{text.notifications.addReview1}</span>
                                    <NavLink to={"/profile/"+notification.data.userNick}> {notification.data.userNick} </NavLink>
                                    <span>{text.notifications.addReview2}</span>
                                    <NavLink to={"/quest/"+notification.data.questId}> {text.notifications.addReview3}</NavLink>
                                </div>
                            )}

                            {notification.type === "GET_POINTS" && (
                                <span>null</span>
                            )}

                            {notification.type === "GET_BADGE" && (
                                <span>null</span>
                            )}

                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default NotificationsRoll
