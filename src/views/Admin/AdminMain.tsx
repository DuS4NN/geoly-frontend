import React, {useContext, useEffect, useState} from "react"
import AdminNavigation from "../../components/Admin/Navigation/AdminNavigation";
import "../../components/Admin/Main/AdminMain.scss"
import axios from "axios";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";
import {UserContext} from "../../UserContext";
import AdminMainCounts from "../../components/Admin/Main/AdminMainCounts";
import AdminMainQuestsGraph from "../../components/Admin/Main/AdminMainQuestsGraph";
import AdminMainCategoryGraph from "../../components/Admin/Main/AdminMainCategoryGraph";


// Component
const AdminMain: React.FC = () => {

    const {userContext} = useContext(UserContext)
    const userText = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const text = require('../../assets/languageText/admin').adminText
    const alert = useAlert()
    const history = useHistory()

    if(userContext['roles'] === null || (!userContext['roles'].includes("MOD") && !userContext['roles'].includes("ADMIN"))){
        history.push("/")
        alert.error(userText.error.PERMISSION_DENIED)
    }

    const [counts, setCounts] = useState({}) as Array<any>
    const [categoryRation, setCategoryRatio] = useState([]) as Array<any>
    const [quests, setQuests] = useState([]) as Array<any>


    useEffect(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminStats',
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                let allQuestsCount = 0

                let newCategoryRation = response.data.data[1].map((category:any) => {
                    allQuestsCount+=category[2]
                    return {
                        id: category[0],
                        name: category[1],
                        count: category[2]
                    }
                })
                setCategoryRatio(newCategoryRation)

                let newCounts = response.data.data[0][0]
                setCounts({
                    newUsers: newCounts[0],
                    finishedQuests: newCounts[1],
                    finishedDaily: newCounts[2],
                    allQuestsCount: allQuestsCount
                })

                let newQuests = response.data.data[2].map((quest:any) => {
                    return {
                        count: quest[0],
                        day: quest[1],
                        month: quest[2]
                    }
                })
                setQuests(newQuests)



            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    },[])

    // Template
    return (
        <div className="adminMain">
            <AdminNavigation />

            <div className="adminMainContainer">
                <AdminMainCounts counts={counts} />

                <div className="adminMainGraphContainer">
                    <AdminMainQuestsGraph quests={quests} />
                    <AdminMainCategoryGraph categoryRation={categoryRation} counts={counts} />
                </div>
            </div>

        </div>
    )
}

export default AdminMain
