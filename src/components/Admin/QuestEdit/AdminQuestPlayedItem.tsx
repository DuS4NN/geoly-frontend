import React from "react"
import {NavLink} from "react-router-dom"

// Props
interface Props {
    played: any
}

// Component
const AdminQuestPlayedItem: React.FC<Props> = (props) => {

    const {played} = props

    // Template
    return (
        <div className="adminQuestPlayedItem">
            <div className="itemData">
                <div className="id">
                    <span>{played.userQuestId}</span>
                </div>

                <div className="stage">
                    <span>{played.stageId}</span>
                </div>

                <div className="user">
                    <NavLink to={"/admin/user/"+played.userId}>{played.nickName}</NavLink>
                </div>

                <div className="status">
                    <img alt="" src={require("../../../assets/images/stageStatus/"+played.status+".svg")} />
                </div>
            </div>

            <div className="itemDate">
                <div className="created">
                    <span>{new Date(played.createdAt).getDate()+". "+(new Date(played.createdAt).getMonth()+1)+". "+new Date(played.createdAt).getFullYear()+" "+new Date(played.createdAt).getHours()+":"+new Date(played.createdAt).getMinutes()}</span>
                </div>
                <div className="updated">
                    <span>{new Date(played.updatedAt).getDate()+". "+(new Date(played.updatedAt).getMonth()+1)+". "+new Date(played.updatedAt).getFullYear()+" "+new Date(played.updatedAt).getHours()+":"+new Date(played.updatedAt).getMinutes()}</span>
                </div>
            </div>

        </div>
    )
}

export default AdminQuestPlayedItem
