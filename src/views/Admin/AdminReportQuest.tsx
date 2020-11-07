import React, {useEffect, useState} from "react"
import AdminNavigation from "../../components/Admin/Navigation/AdminNavigation";
import axios from "axios";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";

import "../../components/Admin/ReportUser/AdminReportUser.scss"
import AdminReportQuestInput from "../../components/Admin/ReportQuest/AdminReportQuestInput";
import AdminReportQuestList from "../../components/Admin/ReportQuest/AdminReportQuestList";


// Component
const AdminReportQuest: React.FC = () => {

    const text = require('../../assets/languageText/admin').adminText
    const alert = useAlert()
    const history = useHistory()

    const [reports, setReports] = useState([]) as Array<any>
    const [page, setPage] = useState(1) as Array<any>
    const [count, setCount] = useState(0) as Array<any>
    const [quest, setQuest] = useState("") as Array<any>

    const findReports = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminReportQuest?page='+page+'&name='+quest,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                setCount(response.data.data[0])

                let newReports = response.data.data[1].map((report:any) => {
                    return {
                        count: report[0],
                        questId: report[1],
                        name: report[2]
                    }
                })
                setReports(newReports)
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }

    useEffect(() => {
        findReports()
    }, [quest, page])

    // Template
    return (
        <div className="adminReportQuest">
            <AdminNavigation />

            <div className="adminReportQuestContainer">
                <AdminReportQuestInput setQuest={setQuest} setPage={setPage} />
                <AdminReportQuestList reports={reports} page={page} count={count} setPage={setPage} setReports={setReports} />
            </div>

        </div>
    )
}

export default AdminReportQuest
