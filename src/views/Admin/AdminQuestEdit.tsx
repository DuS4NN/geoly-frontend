import React, {useEffect, useState} from "react"
import AdminNavigation from "../../components/Admin/Navigation/AdminNavigation";
import "../../components/Admin/Quests/AdminQuest.scss"
import axios from "axios";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";
import AdminQuestDetails from "../../components/Admin/QuestEdit/AdminQuestDetails";

import '../../components/Admin/QuestEdit/AdminQuestEdit.scss'

// Props
interface Props {
}

// Component
const AdminQuestEdit: React.FC<Props> = (props:any) => {

    const text = require('../../assets/languageText/admin').adminText
    const oldText = require('../../assets/languageText/2.ts').text
    const alert = useAlert()
    const history = useHistory()

    const [details, setDetails] = useState({}) as Array<any>
    const [played, setPlayed] = useState([]) as Array<any>
    const [stages, setStages] = useState([]) as Array<any>

    const [category, setCategory] = useState([]) as Array<any>

    const [page, setPage] = useState(1) as Array<any>
    const [count, setCount] = useState(0) as Array<any>

    const getPlayed = (id:any) => {
        if(id === ""){
            id = 0
        }

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminQuestPlayed?id='+props.match.params.id+"&page="+page+"&userId="+id,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                setCount(response.data.data[0])

                setPlayed(response.data.data[1].map((played:any) => {
                    return {
                        userQuestId: played[0],
                        updatedAt: played[1],
                        status: played[2],
                        stageId: played[3],
                        type: played[4],
                        nickName: played[5],
                        userId: played[6],
                        userImage: played[7],
                    }
                }))

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
            url: process.env.REACT_APP_API_SERVER_URL+'/adminQuestDetails?id='+props.match.params.id,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                let newDetail = response.data.data[0][0]

                setDetails({
                    id: props.match.params.id,
                    createdAt: newDetail[0],
                    name: newDetail[1],
                    active: newDetail[2] === 1,
                    premium: newDetail[3] === 1,
                    privateQuest: newDetail[4] === 1,
                    difficulty: newDetail[5],
                    description: newDetail[6],
                    category: newDetail[7],
                    userId: newDetail[8],
                })

                setStages(response.data.data[1].map((stage:any) => {
                    return {
                        answerList: stage[0],
                        advise: stage[1],
                        answer: stage[2],
                        type: stage[3],
                        question: stage[4],
                        qrCodeUrl: stage[5],
                        longitude: stage[6],
                        latitude: stage[7],
                        id: stage[8],
                        note: stage[9],
                    }
                }))

            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/categories',
        }).then(function (response) {
            setCategory(response.data.map((category:any) => {
                return {
                    value: category.id,
                    label: oldText.category[category.name.toLowerCase()]
                }
            }))
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })

        getPlayed("")
    }, [])

    // Template
    return (
        <div className="adminQuestEdit">
            <AdminNavigation />

            <div className="adminQuestEditContainer">
                <AdminQuestDetails category={category} details={details} setDetails={setDetails} />
            </div>

        </div>
    )
}

export default AdminQuestEdit
