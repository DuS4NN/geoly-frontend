import React, {useEffect, useState} from "react"
import {NavLink} from "react-router-dom"

// Props
interface Props {
    user: any
}

// Component
const AdminUserItem: React.FC<Props> = (props) => {

    const {user} = props

    const [date, setDate] = useState(new Date())

    useEffect(() => {
        if(user.date){
            setDate(new Date(user.date))
        }
    }, [])

    // Template
    return (
        <div className="adminUserItem">
            <div className="adminUserItemId">
                <span>{user.id}</span>
            </div>
            <div className="adminUserItemImage">
                <img alt="" src={process.env.REACT_APP_IMAGE_SERVER_URL+user.image} />
            </div>
            <div className="adminUserItemName">
                <NavLink to={"/admin/user/"+user.id}>{user.nick}</NavLink>
            </div>
            <div className="adminUserItemDate">
                <span>{date.getDate()+". "+(date.getMonth()+1)+". "+date.getFullYear()+" "+ (date.getHours() < 10 ? '0' : '') +date.getHours()+":"+ (date.getMinutes() < 10 ? '0' : '') +date.getMinutes()}</span>
            </div>
        </div>
    )
}

export default AdminUserItem
