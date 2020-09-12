import React, {useContext, useEffect, useState} from "react"
import axios from "axios"
import {useHistory} from "react-router-dom"
// Context
import {UserContext} from "../../UserContext"

import './UserQuestList.scss'
import {useAlert} from "react-alert";
import UserQuestActive from "./UserQuestActive";
import UserQuestCreated from "./UserQuestCreated";


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


    useEffect(() => {
        getActiveQuest()
        getCreatedQuests()
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


    // Template
    return (
        <div className="user-quest-list">
            <UserQuestActive activeQuest={activeQuest} setActiveQuest={setActiveQuest} />
            <UserQuestCreated createdQuest={createdQuest} setCreatedQuest={setCreatedQuest}  />
        </div>
    )
}

export default UserQuestList
