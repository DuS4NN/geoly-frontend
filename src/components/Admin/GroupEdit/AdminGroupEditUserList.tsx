import React from "react"
import AdminGroupEditUserItem from "./AdminGroupEditUserItem";

// Props
interface Props {
    users: any
    setUsers: (users:any) => void
    groupId: any
}

// Component
const AdminGroupEditUserList: React.FC<Props> = (props) => {

    const {users, setUsers, groupId} = props

    const text = require('../../../assets/languageText/admin').adminText

    // Template
    return (
        <div className="adminGroupEditUserList">

            <div className="title">
                <span>{text.groupEdit.users}</span>
            </div>

            <div className="form">
                {users.map((user:any) => (
                    <AdminGroupEditUserItem groupId={groupId} user={user} users={users} setUsers={setUsers} key={user.userId} />
                ))}
            </div>

        </div>
    )
}

export default AdminGroupEditUserList
