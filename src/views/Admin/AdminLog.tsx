import React, {useContext, useEffect, useState} from "react"
import AdminNavigation from "../../components/Admin/Navigation/AdminNavigation";
import "../../components/Admin/Log/AdminLog.scss"
import axios from "axios";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";
import {UserContext} from "../../UserContext";
import AdminLogSelect from "../../components/Admin/Log/AdminLogSelect";
import AdminLogList from "../../components/Admin/Log/AdminLogList";
import AdminUserList from "../../components/Admin/Users/AdminUserList";


// Component
const AdminLog: React.FC = () => {

    const {userContext} = useContext(UserContext)
    const userText = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const text = require('../../assets/languageText/admin').adminText
    const alert = useAlert()
    const history = useHistory()

    if(userContext['roles'] === undefined || !userContext['roles'].includes("ADMIN")){
        history.push("/")
        alert.error(userText.error.PERMISSION_DENIED)
    }

    const [logList, setLogList] = useState([]) as Array<any>
    const [page, setPage] = useState(1) as Array<any>
    const [count, setCount] = useState(0) as Array<any>
    const [logTypes, setLogTypes] = useState([]) as Array<any>
    const [selectedType, setSelectedType] = useState("ALL") as Array<any>


    useEffect(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminLogTypes',
            withCredentials: true
        }).then(function (response) {
            setLogTypes(response.data.map((type:any) => {
                return {
                    value: type,
                    label: type
                }
            }))
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }, [])

    const findLogs = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminLog?page='+page+'&type='+selectedType,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                setCount(response.data.data[0])

                let newLogs = response.data.data[1].map((log:any) => {
                    return {
                        id: log[0],
                        date: log[1],
                        data: log[2],
                        type: log[3]
                    }
                })
                setLogList(newLogs)

            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }

    useEffect(() => {
        findLogs()
    }, [selectedType, page])



    // Template
    return (
        <div className="adminLog">
            <AdminNavigation />

        <div className="adminLogContainer">
            <AdminLogSelect logTypes={logTypes} setSelectedType={setSelectedType} setPage={setPage} />
            <AdminLogList logList={logList} page={page} setPage={setPage} count={count} />
        </div>

    </div>
)
}

export default AdminLog
