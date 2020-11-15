import React, {useEffect, useState} from "react"
import {NavLink} from "react-router-dom"

// Props
interface Props {
    group: any
}

// Component
const ItemJoinedGroup: React.FC<Props> = (props:any) => {

    const {group} = props

    const [date, setDate] = useState(new Date())


    useEffect(() => {
        if(group.date){
            setDate(new Date(group.date))
        }
    }, [])


    // Template
    return (
        <div className="tableJoinedGroups">
            <div className="name">
                <NavLink to={"/admin/group/"+group.id}>{group.name}</NavLink>
            </div>
            <div className="user">
                <NavLink to={"/admin/user/"+group.ownerId}>{group.ownerNick}</NavLink>
            </div>
            <div className="date">
                <span>{date.getDate()+". "+(date.getMonth()+1)+". "+date.getFullYear()+" "+ (date.getHours() < 10 ? '0' : '') + date.getHours()+":"+ (date.getMinutes() < 10 ? '0' : '') +date.getMinutes()}</span>
            </div>
        </div>
    )
}

export default ItemJoinedGroup
