import React, {useEffect, useState} from "react"
import axios from "axios"
import NotificationsRoll from "./NotificationsRoll";

// Props
interface Props {

}

// Component
const NavigationNotifications: React.FC<Props> = () => {

    const [unseenCount, setUnseenCount] = useState(0) as Array<any>
    const [showNotificationsRoll, setShowNotificationsRoll] = useState(false) as Array<any>
    const [notifications, setNotifications] = useState([]) as Array<any>
    const [isEmpty, setIsEmpty] = useState(false)


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
                        date: notification[1],
                        data: JSON.parse(notification[2]),
                        type: notification[3],
                        seen: notification[4],
                        userId: notification[5],
                    }
                })

                if(newNotifications.length === 0){
                    setIsEmpty(true)
                }

                notifications.push(...newNotifications)
                setNotifications(Array().concat(notifications))
            }
        })
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/notification/count',
            withCredentials: true
        }).then(function (response) {
            setUnseenCount(response.data > 99 ? 99 : response.data)
        })

        getNotifications()
    }, [])

    const handleShowRoll = () => {
        setUnseenCount(0)
        setShowNotificationsRoll(true)
    }

    // Template
    return (
        <div className="navigation-notifications">
            <img onClick={handleShowRoll} src={require("../../assets/images/inputImages/notification.svg")} alt="" />

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
