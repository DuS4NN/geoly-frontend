import React from "react"
import {NavLink} from "react-router-dom"

// Props
interface Props {
    detail: any
}

// Component
const AdminSeasonDetailsItem: React.FC<Props> = (props) => {

    const {detail} = props


    // Template
    return (
        <div className="adminSeasonDetailsItem">
            <div className="adminSeasonDetailsItemImage">
                <img alt="" src={process.env.REACT_APP_IMAGE_SERVER_URL+detail.image} />
            </div>
            <div className="adminSeasonDetailsItemName">
                <NavLink to={"/admin/user/"+detail.id}>{detail.name}</NavLink>
            </div>
            <div className="adminSeasonDetailsItemAmount">
                <span>{detail.amount}</span>
            </div>
        </div>
    )
}

export default AdminSeasonDetailsItem
