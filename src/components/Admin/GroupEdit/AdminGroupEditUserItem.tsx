import React, {useState} from "react"
import {NavLink, useHistory} from "react-router-dom"
import ReactTooltip from "react-tooltip";
import axios from "axios"
import {useAlert} from "react-alert";

// Props
interface Props {
    groupId: any
    user: any
    users: any
    setUsers: (users:any) => void
}

// Component
const AdminGroupEditUserItem: React.FC<Props> = (props) => {

    const {groupId, user, users, setUsers} = props

    const [remove, setRemove] = useState(false) as Array<any>

    const adminText = require('../../../assets/languageText/admin').adminText
    const alert = useAlert()
    const history = useHistory()

    const handleChangeKick = () => {
        setRemove(!remove)
    }

    const handleKick = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminGroupKickUser?groupId='+groupId+"&userId="+user.userId,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){
                setUsers(users.filter(function (u:any) {
                    return u.userId !== user.userId
                }))

                alert.success(adminText.success[serverResponse])
            }else if(statusCode === 'METHOD_NOT_ALLOWED'){
                alert.error(adminText.error[serverResponse])
            }else{
                alert.error(adminText.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(adminText.error.SOMETHING_WENT_WRONG)
        })
    }

    // Template
    return (
        <div className="adminGroupEditUserItem">
            {!remove && (
                <div className="item">
                    <div className="adminGroupEditItemImage">
                        <img alt="" src={process.env.REACT_APP_IMAGE_SERVER_URL+user.profileImage} />
                    </div>

                    <div className="adminGroupEditItemName">
                        <NavLink to={"/admin/user/"+user.userId}>{user.nickName}</NavLink>
                    </div>

                    <div className="adminGroupEditItemAction">
                        <img onClick={handleChangeKick} data-tip={adminText.groupEdit.kick} alt="" src={require("../../../assets/images/otherIcons/kick.svg")} />
                        <ReactTooltip />
                    </div>
                </div>
            )}

            {remove && (
                <div className="removeItem">
                    <div className="removeYes">
                        <button onClick={handleKick}>{adminText.groupEdit.kick}</button>
                    </div>
                    <div className="removeNo">
                        <button onClick={handleChangeKick}>{adminText.groupEdit.return}</button>
                    </div>
                </div>
            )}


        </div>
    )
}

export default AdminGroupEditUserItem
