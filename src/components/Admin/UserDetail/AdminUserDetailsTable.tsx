import React, {useState} from "react"
import ItemBadge from "./TableItems/ItemBadges";
import ItemCreatedGroup from "./TableItems/ItemCreatedGroup";
import ItemJoinedGroup from "./TableItems/ItemJoinedGroup";
import ItemQuests from "./TableItems/ItemQuests";
import ItemReview from "./TableItems/ItemReview";
import ItemPoint from "./TableItems/ItemPoint";


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

    const returnQuests = () => {
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
                            <div className="questName">
                                <span>{text.userDetails.badgeName}</span>
                            </div>
                            <div className="questActive">
                                <span>{text.userDetails.active}</span>
                            </div>
                            <div className="questDate">
                                <span>{text.userDetails.badgeDate}</span>
                            </div>
                        </div>

                        {data.map((createdQuest:any) => (
                            <ItemQuests quest={createdQuest} key={createdQuest.id} />
                        ))}
                    </div>
                )}
            </div>
        )
    }

    const returnReviews = () => {
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
                            <div className="reviewsId">
                                <span>{text.userDetails.badgeName}</span>
                            </div>
                            <div className="reviewsText">
                                <span>{text.userDetails.text}</span>
                            </div>
                            <div className="reviewsReview">
                                <span>{text.userDetails.review}</span>
                            </div>
                            <div className="reviewsDate">
                                <span>{text.userDetails.badgeDate}</span>
                            </div>
                            <div className="reviewsAction">
                                <span>{text.userDetails.action}</span>
                            </div>
                        </div>

                        {data.map((review:any) => (
                            <ItemReview review={review} setReviews={setData} reviews={data} key={review.id} />
                        ))}
                    </div>
                )}
            </div>
        )
    }

    const returnPoints = () => {
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
                            <div className="pointSeason">
                                <span>{text.userDetails.season}</span>
                            </div>
                            <div className="pointAmount">
                                <span>{text.userDetails.amount}</span>
                            </div>
                        </div>

                        {data.map((point:any) => (
                            <ItemPoint point={point} key={point.season} />
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
            {name === text.userDetails.createdQuests && (
                returnQuests()
            )}
            {name === text.userDetails.playedQuests && (
                returnQuests()
            )}
            {name === text.userDetails.reviews && (
                returnReviews()
            )}
            {name === text.userDetails.points && (
                returnPoints()
            )}
        </div>
    )
}

export default AdminUserDetailsTable
