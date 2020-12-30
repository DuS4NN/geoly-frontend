import React, {useContext, useEffect, useState} from "react"
import AdminNavigation from "../../components/Admin/Navigation/AdminNavigation";
import axios from "axios";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";

import "../../components/Admin/ReportUser/AdminReportUser.scss"
import AdminUserReportInput from "../../components/Admin/ReportUser/AdminReportUserInput";
import AdminReportUserList from "../../components/Admin/ReportUser/AdminReportUserList";
import {UserContext} from "../../UserContext";

// Component
const AdminReportUser: React.FC = () => {

    const {userContext} = useContext(UserContext)
    const userText = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const text = require('../../assets/languageText/admin').adminText
    const alert = useAlert()
    const history = useHistory()

    if(userContext['roles'] === null || (!userContext['roles'].includes("MOD") && !userContext['roles'].includes("ADMIN"))){
        history.push("/")
        alert.error(userText.error.PERMISSION_DENIED)
    }

    const [reports, setReports] = useState([]) as Array<any>
    const [page, setPage] = useState(1) as Array<any>
    const [count, setCount] = useState(0) as Array<any>
    const [user, setUser] = useState("") as Array<any>

    const findReports = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminReportUser?page='+page+'&nick='+user,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                setCount(response.data.data[0])

                let newReports = response.data.data[1].map((report:any) => {
                    return {
                        count: report[0],
                        userId: report[1],
                        nick: report[2],
                        image: report[3]
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
    }, [user, page])

    // Template
    return (
        <div className="adminReportUser">
            <AdminNavigation />

            <div className="adminReportUserContainer">
                <AdminUserReportInput setUser={setUser} setPage={setPage} />
                <AdminReportUserList setPage={setPage} count={count} page={page} reports={reports} setReports={setReports} />
            </div>

        </div>
    )
}

export default AdminReportUser
