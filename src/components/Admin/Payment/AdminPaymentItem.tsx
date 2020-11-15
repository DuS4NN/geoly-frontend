import React, {useEffect, useState} from "react"
import {NavLink} from "react-router-dom"

// Props
interface Props {
    payment: any
}

// Component
const AdminPaymentItem: React.FC<Props> = (props) => {

    const {payment} = props

    const [end, setEnd] = useState(new Date())
    const [start, setStart] = useState(new Date())

    useEffect(() => {
        if(payment.end){
            setEnd(new Date(payment.end))
            setStart(new Date(payment.start))
        }
    }, [])


    // Template
    return (
        <div className="adminPaymentItem">
            <div className="image">
                <img alt="" src={process.env.REACT_APP_IMAGE_SERVER_URL+payment.image} />
            </div>
            <div className="name">
                <NavLink to={"/admin/user/"+payment.userId}>{payment.nick}</NavLink>
            </div>
            <div className="agreement">
                <span>{payment.agreement}</span>
            </div>
            <div className="state">
                <span>{payment.state}</span>
            </div>
            <div className="start">
                <span>{start.getDate()+". "+(start.getMonth()+1)+". "+start.getFullYear()+" "+start.getHours()+":"+start.getMinutes()}</span>
            </div>
            <div className="end">
                <span>{end.getDate()+". "+(end.getMonth()+1)+". "+end.getFullYear()+" "+end.getHours()+":"+end.getMinutes()}</span>
            </div>
        </div>
    )
}

export default AdminPaymentItem
