import React, {useEffect, useState} from "react"
import AdminNavigation from "../../components/Admin/Navigation/AdminNavigation";
import "../../components/Admin/Quests/AdminQuest.scss"
import axios from "axios";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";
import AdminQuestInput from "../../components/Admin/Quests/AdminQuestInput";
import AdminQuestList from "../../components/Admin/Quests/AdminQuestList";


// Component
const AdminQuest: React.FC = () => {

    const text = require('../../assets/languageText/admin').adminText
    const alert = useAlert()
    const history = useHistory()

    const [questList, setQuestList] = useState([]) as Array<any>
    const [page, setPage] = useState(1) as Array<any>
    const [count, setCount] = useState(0) as Array<any>

    const findQuests = (name:any) => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminQuest?page='+page+'&name='+name,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                let newQuests = response.data.data.map((user:any) => {
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
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminQuestCount',
            withCredentials: true
        }).then(function (response) {
            setCount(response.data)
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })

        findQuests("")
    }, [])

    // Template
    return (
        <div className="adminQuest">
            <AdminNavigation />

            <div className="adminQuestContainer">
                <AdminQuestInput findQuests={findQuests} />
                <AdminQuestList questList={questList} page={page} count={count} setPage={setPage} />
            </div>

        </div>
    )
}

export default AdminQuest
