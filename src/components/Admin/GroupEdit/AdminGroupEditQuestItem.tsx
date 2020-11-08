import React, {useState} from "react"
import {NavLink, useHistory} from "react-router-dom"
import ReactTooltip from "react-tooltip";
import axios from "axios"
import {useAlert} from "react-alert";

// Props
interface Props {
    groupId: any
    quest: any
    quests: any
    setQuests: (users:any) => void
}

// Component
const AdminGroupEditQuestItem: React.FC<Props> = (props) => {

    const {groupId, quests, quest, setQuests} = props

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
            url: process.env.REACT_APP_API_SERVER_URL+'/adminGroupDeleteQuest?groupId='+groupId+"&questId="+quest.id,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){
                setQuests(quests.filter(function (q:any) {
                    return q.id !== quest.id
                }))

                alert.success(adminText.success[serverResponse])
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
        <div className="adminGroupEditQuestItem">
            {!remove && (
                <div className="item">
                    <div className="name">
                        <NavLink to={"/admin/quest/"+quest.id}>{quest.name}</NavLink>
                    </div>

                    <div className="private">
                        <span>{quest.private == 1 ? adminText.groupEdit.yes : adminText.groupEdit.no}</span>
                    </div>

                    <div className="action">
                        <img onClick={handleChangeKick} data-tip={adminText.groupEdit.delete} alt="" src={require("../../../assets/images/otherIcons/delete.svg")} />
                        <ReactTooltip />
                    </div>
                </div>
            )}

            {remove && (
                <div className="removeItem">
                    <div className="removeYes">
                        <button onClick={handleKick}>{adminText.groupEdit.delete}</button>
                    </div>
                    <div className="removeNo">
                        <button onClick={handleChangeKick}>{adminText.groupEdit.return}</button>
                    </div>
                </div>
            )}


        </div>
    )
}

export default AdminGroupEditQuestItem
