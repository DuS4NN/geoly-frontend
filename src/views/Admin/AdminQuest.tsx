import React, {useContext, useEffect, useState} from "react"
import AdminNavigation from "../../components/Admin/Navigation/AdminNavigation";
import "../../components/Admin/Quests/AdminQuest.scss"
import axios from "axios";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";
import AdminQuestInput from "../../components/Admin/Quests/AdminQuestInput";
import AdminQuestList from "../../components/Admin/Quests/AdminQuestList";
import {UserContext} from "../../UserContext";


// Component
const AdminQuest: React.FC = () => {

    const {userContext} = useContext(UserContext)
    const userText = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const text = require('../../assets/languageText/admin').adminText
    const alert = useAlert()
    const history = useHistory()

    if(userContext['roles'] === null || (!userContext['roles'].includes("MOD") && !userContext['roles'].includes("ADMIN"))){
        history.push("/")
        alert.error(userText.error.PERMISSION_DENIED)
    }

    const [questList, setQuestList] = useState([]) as Array<any>
    const [page, setPage] = useState(1) as Array<any>
    const [count, setCount] = useState(0) as Array<any>
    const [quest, setQuest] = useState("") as Array<any>

    const findQuests = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminQuest?page='+page+'&name='+quest,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                setCount(response.data.data[0])

                let newQuests = response.data.data[1].map((user:any) => {
                    return {
                        name: user[0],
                        id: user[1],
                        date: user[2]
                    }
                })
                setQuestList(newQuests)
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }

    useEffect(() => {
        findQuests()
    }, [page, quest])

    // Template
    return (
        <div className="adminQuest">
            <AdminNavigation />

            <div className="adminQuestContainer">
                <AdminQuestInput setQuest={setQuest} setPage={setPage}/>
                <AdminQuestList questList={questList} page={page} count={count} setPage={setPage} />
            </div>

        </div>
    )
}

export default AdminQuest
