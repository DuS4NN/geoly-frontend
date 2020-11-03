import React, {useEffect, useState} from "react"
import ItemBadge from "./TableItems/ItemBadges";
import axios from "axios"

// Props
interface Props {
    data: any
    setData: (data:any) => void
    name: string
}

// Component
const AdminUserDetailsTable: React.FC<Props> = (props:any) => {

    const {data, setData, name} = props

    const [show, setShow] = useState(true) as Array<any>

    const text = require('../../../assets/languageText/admin').adminText

    const handleShow = () => {
        setShow(!show)
    }

    const returnBadges = () => {
        return (
            <div>
                <div className="header">
                    <div className="title">
                        <span>{name}</span>
                    </div>
                    <div className="arrow">
                        <img onClick={handleShow} alt="" src={show ? require("../../../assets/images/otherIcons/arrow-up.svg") : require("../../../assets/images/otherIcons/arrow-down.svg")} />
                    </div>
                </div>

                {show && (
                    <div>
                        <div className="itemHeader">
                            <div className="badgeName">
                                <span>{text.userDetails.badgeName}</span>
                            </div>
                            <div className="badgeDate">
                                <span>{text.userDetails.badgeDate}</span>
                            </div>
                            <div className="action">
                                <span>{text.userDetails.action}</span>
                            </div>
                        </div>

                        {data.map((badge:any) => (
                            <ItemBadge badge={badge} badges={data} setBadges={setData} key={badge.id} />
                        ))}
                    </div>
                )}
            </div>
        )
    }

    // Template
    return (
        <div className="adminUserDetailsTable">
            {name === text.userDetails.badges && (
                returnBadges()
            )}

        </div>
    )
}

export default AdminUserDetailsTable
