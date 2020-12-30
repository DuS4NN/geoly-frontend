import React, {useContext, useEffect, useState} from "react"
import AdminNavigation from "../../components/Admin/Navigation/AdminNavigation";
import "../../components/Admin/GroupEdit/AdminGroupEdit.scss"
import axios from "axios";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";
import AdminGroupEditDetails from "../../components/Admin/GroupEdit/AdminGroupEditDetails";
import AdminGroupEditUserList from "../../components/Admin/GroupEdit/AdminGroupEditUserList";
import AdminGroupEditQuestList from "../../components/Admin/GroupEdit/AdminGroupEditQuestList";
import {UserContext} from "../../UserContext";

interface Props {
}

// Component
const AdminGroupEdit: React.FC<Props> = (props:any) => {

    const {userContext} = useContext(UserContext)
    const userText = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const text = require('../../assets/languageText/admin').adminText
    const alert = useAlert()
    const history = useHistory()

    if(userContext['roles'] === null || (!userContext['roles'].includes("MOD") && !userContext['roles'].includes("ADMIN"))){
        history.push("/")
        alert.error(userText.error.PERMISSION_DENIED)
    }

    const [details, setDetails] = useState({}) as Array<any>
    const [users, setUsers] = useState([]) as Array<any>
    const [quests, setQuest] = useState([]) as Array<any>

    useEffect(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminGroupDetails?id='+props.match.params.id,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){

                let newDetails = response.data.data[0][0]
                setDetails({
                    name: newDetails[0],
                    createdAt: newDetails[1],
                    userId: newDetails[2],
                    nick: newDetails[3],
                    image: newDetails[4]
                })

                setUsers(response.data.data[1].map(function (user:any) {
                    return {
                        createdAt: user[0],
                        nickName: user[1],
                        profileImage: user[2],
                        userId: user[3]
                    }
                }))

                setQuest(response.data.data[2].map(function (quest:any) {
                    return {
                        id: quest[0],
                        name: quest[1],
                        private: quest[2]
                    }
                }))

            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }, [props])

    // Template
    return (
        <div className="adminGroup">
            <AdminNavigation />

            <div className="adminGroupContainer">
                <AdminGroupEditDetails details={details} />
                <AdminGroupEditUserList users={users} setUsers={setUsers} groupId={props.match.params.id} />
                <AdminGroupEditQuestList quests={quests} setQuests={setQuest} groupId={props.match.params.id} />
            </div>
        </div>
    )
}

export default AdminGroupEdit
