import React, {useState} from "react"
import ItemBadge from "./TableItems/ItemBadges";
import ItemCreatedGroup from "./TableItems/ItemCreatedGroup";
import ItemJoinedGroup from "./TableItems/ItemJoinedGroup";

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

    const returnCreatedGroups = () => {
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
                            <div className="groupName">
                                <span>{text.userDetails.badgeName}</span>
                            </div>
                            <div className="groupDate">
                                <span>{text.userDetails.badgeDate}</span>
                            </div>
                        </div>

                        {data.map((createdGroup:any) => (
                            <ItemCreatedGroup group={createdGroup} key={createdGroup.id} />
                        ))}
                    </div>
                )}
            </div>
        )
    }

    const returnJoinedGroups = () => {
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
                            <div className="joinedGroupName">
                                <span>{text.userDetails.badgeName}</span>
                            </div>
                            <div className="joinedGroupUser">
                                <span>{text.userDetails.owner}</span>
                            </div>
                            <div className="joinedGroupDate">
                                <span>{text.userDetails.badgeDate}</span>
                            </div>
                        </div>

                        {data.map((createdGroup:any) => (
                            <ItemJoinedGroup group={createdGroup} key={createdGroup.id} />
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
            {name === text.userDetails.createdGroups && (
                returnCreatedGroups()
            )}
            {name === text.userDetails.joinedGroups && (
                returnJoinedGroups()
            )}

        </div>
    )
}

export default AdminUserDetailsTable
