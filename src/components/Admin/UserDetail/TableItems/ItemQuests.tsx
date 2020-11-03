import React, {useEffect, useState} from "react"
import {NavLink} from "react-router-dom"

// Props
interface Props {
    quest: any
}

// Component
const ItemQuests: React.FC<Props> = (props:any) => {

    const {quest} = props

    const [date, setDate] = useState(new Date())


    useEffect(() => {
        if(quest.date){
            setDate(new Date(quest.date))
        }
    }, [])


    // Template
    return (
        <div className="tableQuests">
            <div className="name">
                <NavLink to={"/admin/quest/"+quest.id}>{quest.name}</NavLink>
            </div>
            <div className="active">
                <span>{quest.active}</span>
            </div>
            <div className="date">
                <span>{date.getDate()+". "+(date.getMonth()+1)+". "+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()}</span>
            </div>
        </div>
    )
}

export default ItemQuests
