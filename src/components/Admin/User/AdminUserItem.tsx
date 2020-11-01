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
            <div className="id">
                <span>{user.id}</span>
            </div>
            <div className="image">
                <img alt="" src={process.env.REACT_APP_IMAGE_SERVER_URL+user.image} />
            </div>
            <div className="name">
                <NavLink to={"/admin/user/"+user.id}>{user.nick}</NavLink>
            </div>
            <div className="date">
                <span>{date.getDate()+". "+(date.getMonth()+1)+". "+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()}</span>
            </div>
        </div>
    )
}

export default AdminUserItem
