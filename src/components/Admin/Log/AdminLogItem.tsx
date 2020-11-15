import React, {useEffect, useState} from "react"

interface Props {
    log: any
}

// Component
const AdminLogItem: React.FC<Props> = (props) => {

    const {log} = props

    const [date, setDate] = useState(new Date())

    useEffect(() => {
        if(log.date){
            setDate(new Date(log.date))
        }
    }, [])

    // Template
    return (
        <div className="adminLogItem">
            <div className="id">
                <span>{log.id}</span>
            </div>
            <div className="type">
                <span>{log.type}</span>
            </div>
            <div className="data">
                <span>{log.data}</span>
            </div>
            <div className="date">
                <span>{date.getDate()+". "+(date.getMonth()+1)+". "+date.getFullYear()+" "+ (date.getHours() < 10 ? '0' : '') +date.getHours()+":"+ (date.getMinutes() < 10 ? '0' : '') +date.getMinutes()}</span>
            </div>
        </div>
    )
}

export default AdminLogItem
