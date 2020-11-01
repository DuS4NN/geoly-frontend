import React, {useEffect, useState} from "react"
import AdminUserInput from "../../components/Admin/User/AdminUserInput";
import AdminUserList from "../../components/Admin/User/AdminUserList";
import AdminNavigation from "../../components/Admin/Navigation/AdminNavigation";
import "../../components/Admin/User/AdminUser.scss"
import axios from "axios";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";


// Component
const AdminUser: React.FC = () => {

    const text = require('../../assets/languageText/admin').adminText
    const alert = useAlert()
    const history = useHistory()

    const [userList, setUserList] = useState([]) as Array<any>
    const [page, setPage] = useState(1) as Array<any>
    const [count, setCount] = useState(0) as Array<any>

    const findUsers = (nick:any) => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminUser?page='+page+'&nick='+nick,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                let newUsers = response.data.data.map((user:any) => {
                    return {
                        id: user[0],
                        nick: user[1],
                        date: user[2],
                        image: user[3]
                    }
                })
                setUserList(newUsers)
            }else{
                alert.error(text.error)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminUserCount',
            withCredentials: true
        }).then(function (response) {
            setCount(response.data)
        })

        findUsers("")
    }, [])

    // Template
    return (
        <div className="adminUser">
            <AdminNavigation />

            <div className="adminUserContainer">
                <AdminUserInput findUsers={findUsers} />
                <AdminUserList userList={userList} page={page} setPage={setPage} count={count} />
            </div>

        </div>
    )
}

export default AdminUser
