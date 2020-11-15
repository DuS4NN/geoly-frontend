import React, {useEffect, useState} from "react"
import {NavLink} from "react-router-dom"

// Props
interface Props {
    group: any
}

// Component
const ItemCreatedGroup: React.FC<Props> = (props:any) => {

    const {group} = props

    const [date, setDate] = useState(new Date())


    useEffect(() => {
        if(group.date){
            setDate(new Date(group.date))
        }
    }, [])


    // Template
    return (
        <div className="tableCreatedGroups">
            <div className="name">
                <NavLink to={"/admin/group/"+group.id}>{group.name}</NavLink>
            </div>
            <div className="date">
                <span>{date.getDate()+". "+(date.getMonth()+1)+". "+date.getFullYear()+" "+ (date.getHours() < 10 ? '0' : '') +date.getHours()+":"+ (date.getMinutes() < 10 ? '0' : '') +date.getMinutes()}</span>
            </div>
        </div>
    )
}

export default ItemCreatedGroup
