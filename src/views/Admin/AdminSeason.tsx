import React, {useContext, useEffect, useState} from "react"
import AdminNavigation from "../../components/Admin/Navigation/AdminNavigation";
import "../../components/Admin/Season/AdminSeason.scss"
import axios from "axios";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";
import {UserContext} from "../../UserContext";
import AdminSeasonList from "../../components/Admin/Season/AdminSeasonList";


// Component
const AdminSeason: React.FC = () => {

    const {userContext} = useContext(UserContext)
    const userText = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const text = require('../../assets/languageText/admin').adminText
    const alert = useAlert()
    const history = useHistory()

    if(userContext['roles'] === undefined || (!userContext['roles'].includes("MOD") && !userContext['roles'].includes("ADMIN"))){
        history.push("/")
        alert.error(userText.error.PERMISSION_DENIED)
    }

    const [seasonList, setSeasonList] = useState([]) as Array<any>
    const [page, setPage] = useState(1) as Array<any>
    const [count, setCount] = useState(0) as Array<any>

    const findSeason = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminSeason?page='+page,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                let newSeasons = response.data.data.map((season:any) => {
                    return {
                        year: season[0],
                        month: season[1]
                    }
                })
                setSeasonList(newSeasons)

            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }

    useEffect(() => {
        findSeason()
    }, [page])

    useEffect(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminSeasonCount',
            withCredentials: true
        }).then(function (response) {
            setCount(response.data)
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }, [])

    // Template
    return (
        <div className="adminSeason">
            <AdminNavigation />

            <div className="adminSeasonContainer">

                <div className="title">
                    <span>{text.season.title}</span>
                </div>

                <AdminSeasonList seasonList={seasonList} page={page} count={count} setPage={setPage} />
            </div>

        </div>
    )
}

export default AdminSeason
