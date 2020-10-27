import React, {useContext, useEffect, useState} from "react"
import axios from "axios"
import NotificationsRoll from "./NotificationsRoll";
import {useHistory} from "react-router-dom"
import {UserContext} from "../../UserContext";
import {useAlert} from "react-alert";
// Props
interface Props {
    unseenCount: number
    setUnseenCount: (count:number) => void
    notifications: any
    setNotifications: (notification:any) => void
}

// Component
const NavigationNotifications: React.FC<Props> = (props) => {

    const {userContext} = useContext(UserContext)
    const {setUnseenCount, unseenCount, notifications, setNotifications} = props

    const [showNotificationsRoll, setShowNotificationsRoll] = useState(false) as Array<any>
    const [isEmpty, setIsEmpty] = useState(false)

    const history = useHistory()
    const alert = useAlert()

    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text


    const getNotifications = () => {
        if(isEmpty) return

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/notification?count='+notifications.length,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode
            if(statusCode === 'OK'){
                let newNotifications = response.data.data.map((notification:any) => {
                    return {
                        id: notification[0],
                        date: new Date(notification[1]),
                        data: JSON.parse(notification[2]),
                        type: notification[3],
                    }
                })

                if(newNotifications.length === 0){
                    setIsEmpty(true)
                }

                notifications.push(...newNotifications)
                setNotifications(Array().concat(notifications))
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }

    useEffect(() => {
        getNotifications()
    }, [])

    const handleShowRoll = () => {
        if(unseenCount>0 && !isEmpty && notifications.length<=10){
            axios({
                method: 'GET',
                url: process.env.REACT_APP_API_SERVER_URL+'/notification/setunseen',
                withCredentials: true
            }).catch(function () {
                history.push("/welcome")
                alert.error(text.error.SOMETHING_WENT_WRONG)
            })
        }
        setUnseenCount(0)
        setShowNotificationsRoll(true)
    }

    // Template
    return (
        <div className="navigation-notifications">
            <img onClick={handleShowRoll} src={userContext['darkMode'] ? require("../../assets/images/darkModeImages/notification.svg") : require("../../assets/images/inputImages/notification.svg")} alt="" />

            {unseenCount !== null && unseenCount > 0 && (
                <div className="notification-count">
                    <span>{unseenCount}</span>
                </div>
            )}

            {showNotificationsRoll && (
                <NotificationsRoll getNotifications={getNotifications} setShowRoll={setShowNotificationsRoll} notifications={notifications} />
            )}

        </div>
    )
}

export default NavigationNotifications
