import React, {useEffect, useState} from "react"
import {NavLink} from "react-router-dom"

// Props
interface Props {
    quest: any
}

// Component
const AdminQuestItem: React.FC<Props> = (props) => {

    const {quest} = props

    const [date, setDate] = useState(new Date())

    useEffect(() => {
        if(quest.date){
            setDate(new Date(quest.date))
        }
    }, [])

    // Template
    return (
        <div className="adminQuestItem">
            <div className="id">
                <span>{quest.id}</span>
            </div>
            <div className="name">
                <NavLink to={"/admin/quest/"+quest.id}>{quest.name}</NavLink>
            </div>
            <div className="date">
                <span>{date.getDate()+". "+(date.getMonth()+1)+". "+date.getFullYear()+" "+ (date.getHours() < 10 ? '0' : '') +date.getHours()+":"+ (date.getMinutes() < 10 ? '0' : '') +date.getMinutes()}</span>
            </div>
        </div>
    )
}

export default AdminQuestItem
