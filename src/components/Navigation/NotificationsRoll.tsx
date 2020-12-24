import React, {useContext, useEffect, useRef} from "react"
import {NavLink} from "react-router-dom"

// Context
import {UserContext} from "../../UserContext"

// Style
import './NotificationRoll.scss'
import {debounce} from "lodash-es";

// Props
interface Props {
    loading: boolean
    notifications:any
    setShowRoll: (showRoll:boolean) => void
    getNotifications: () => void
}

// Component
const NotificationsRoll: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)

    const {loading, notifications, setShowRoll, getNotifications} = props

    const notificationRoll = useRef(null)
    const ref = useRef(null) as any

    // Text
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    useEffect(() => {
        document.getElementById("roll-items")?.addEventListener('scroll', handleScroll);
        return () => document.getElementById("roll-items")?.removeEventListener('scroll', handleScroll);
    })

    const handleScroll = debounce((e:any) => {
        if(ref){
            if((100/ref.current?.scrollTopMax) * e.target.scrollTop >= 70){
                getNotifications()
            }
        }
    },100)

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

            <div  id="roll-items" className="roll-items" ref={ref}>
                {loading ? (
                    <div className="loading-invitations">
                        <img alt="" src={require("../../assets/images/otherIcons/loading.svg")} />
                    </div>
                ) : (
                    <div>
                        {notifications[0] && notifications[0].id && notifications.length>0 && notifications.map((notification:any) => (
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
                                        <div>
                                            <span>{text.notifications.getPoints1}</span>
                                            <span className="highlighted"> {notification.data.pointAmount} </span>
                                            <span>{text.notifications.getPoints2}</span>
                                            <NavLink to={"/quest/"+notification.data.questId}> {text.notifications.getPoints3}</NavLink>
                                        </div>
                                    )}

                                    {notification.type === "GET_BADGE" && (
                                        <div>
                                            <span>{text.notifications.getBadge1}</span>
                                            <NavLink to={"/profile/"+userContext['nickName']}> {text.notifications.getBadge2} </NavLink>
                                            <span>{text.notifications.getBadge3} </span>
                                            <NavLink to={"/quest/"+notification.data.questId}> {text.notifications.getBadge4}</NavLink>
                                        </div>
                                    )}

                                    <div className="date">
                                        <span>{notification.date.getDate()+" "+text.month[notification.date.getMonth()]+" "+notification.date.getFullYear()+" "+notification.date.getHours()+":"+notification.date.getMinutes()}</span>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default NotificationsRoll
