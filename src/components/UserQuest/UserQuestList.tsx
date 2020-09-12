import React, {useContext, useEffect, useState} from "react"
import axios from "axios"
import {useHistory} from "react-router-dom"
// Context
import {UserContext} from "../../UserContext"

import './UserQuestList.scss'
import {useAlert} from "react-alert";
import UserQuestActive from "./UserQuestActive";
import UserQuestCreated from "./UserQuestCreated";
import UserQuestPlayed from "./UserQuestPlayed";


// Props
interface Props {
}

// Component
const UserQuestList: React.FC = () => {
    // Context
    //@ts-ignore
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const alert = useAlert()

    const [activeQuest, setActiveQuest] = useState({})
    const [createdQuest, setCreatedQuest] = useState({})
    const [playedQuest, setPlayedQuest] = useState({})


    useEffect(() => {
        getActiveQuest()
        getCreatedQuests()
        getAllPlayedQuests()
    }, [])

    const getActiveQuest = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/activequest',
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                let newActiveQuest = extractActiveQuest(response.data.data[0])
                setActiveQuest(newActiveQuest)
            }else if(statusCode === 'NO_CONTENT'){
                setActiveQuest({})
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        })
    }
    const extractActiveQuest = (activeQuest:any) => {
        return {
            questId: activeQuest[0],
            questName: activeQuest[1],
            categoryName: activeQuest[2],
            categoryImage: activeQuest[3]
        }
    }

    const getCreatedQuests = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/allcreatedquests',
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                let newCreatedQuest = response.data.data.map((createdQuest:any) => extractCreatedQuests(createdQuest))
                setCreatedQuest(newCreatedQuest)
            }else if(statusCode === 'NO_CONTENT'){
                setCreatedQuest({})
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        })
    }
    const extractCreatedQuests = (createdQuest:any) => {
        return {
            questId: createdQuest[0],
            questDate: createdQuest[1],
            questDescription: createdQuest[2],
            questDifficulty: createdQuest[3],
            questPrivate: createdQuest[4],
            categoryName: createdQuest[5],
            categoryImage: createdQuest[6],
            questName: createdQuest[7]
        }
    }

    const getAllPlayedQuests = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/allplayedquests',
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode
            if(statusCode === 'OK'){
                let newPlayedQuest = response.data.data.map((playedQuest:any) => extractAPlayedQuest(playedQuest))
                setPlayedQuest(newPlayedQuest)
            }else if(statusCode === 'NO_CONTENT'){
                setPlayedQuest({})
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        })
    }
    const extractAPlayedQuest = (playedQuest:any) => {

        let extractPlayedQuest = Array()

        for(let i=0; i<playedQuest.length; i++){

            let quest = {
                stageStatus: playedQuest[i][0],
                stageId: playedQuest[i][1],
                stageType: playedQuest[i][2],
                questId: playedQuest[i][3],
                questName: playedQuest[i][4],
                categoryName: playedQuest[i][5],
                categoryImage: playedQuest[i][6],
                stageDate: playedQuest[i][7]
            }
            extractPlayedQuest.push(quest)
        }
        return extractPlayedQuest
    }

    // Template
    return (
        <div className="user-quest-list">
            <UserQuestActive activeQuest={activeQuest} setActiveQuest={setActiveQuest} />
            <UserQuestCreated createdQuest={createdQuest} setCreatedQuest={setCreatedQuest}  />
            <UserQuestPlayed playedQuest={playedQuest} setPlayedQuest={setPlayedQuest} />
        </div>
    )
}

export default UserQuestList
