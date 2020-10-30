import React, {useContext, useEffect, useState} from "react"
import axios from "axios"
import {UserContext} from "../../UserContext"
import {useAlert} from "react-alert";
import UserQuestActive from "./UserQuestActive";
import UserQuestCreated from "./UserQuestCreated";
import UserQuestPlayed from "./UserQuestPlayed";
import {useHistory} from "react-router-dom"
import './UserQuestList.scss'

// Props
interface Props {
}

// Component
const UserQuestList: React.FC = () => {

    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const alert = useAlert()
    const history = useHistory()

    const [activeQuest, setActiveQuest] = useState(null) as Array<any>
    const [createdQuest, setCreatedQuest] = useState(null) as Array<any>
    const [playedQuest, setPlayedQuest] = useState(null) as Array<any>

    const getAllPlayedQuests = (page:number) => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/allplayedquests?page='+page,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode
            if(statusCode === 'OK'){
                let newPlayedQuest = response.data.data.reverse().map((playedQuest:any) => extractAPlayedQuest(playedQuest))
                setPlayedQuest(newPlayedQuest)
            }else if(statusCode === 'NO_CONTENT'){
                setPlayedQuest({})
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }
    const extractAPlayedQuest = (playedQuest:any) => {
        let extractPlayedQuest = []

        for(let i=0; i<playedQuest.length; i++){

            let quest = {
                stageStatus: playedQuest[i][0],
                stageId: playedQuest[i][1],
                stageType: playedQuest[i][2],
                questId: playedQuest[i][3],
                questName: playedQuest[i][4],
                categoryImage: playedQuest[i][5],
                stageDate: playedQuest[i][6],
                categoryName: playedQuest[i][7]
            }
            extractPlayedQuest.push(quest)
        }
        return extractPlayedQuest
    }

    const getCreatedQuests = (page:number) => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/allcreatedquests?page='+page,
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
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }
    const extractCreatedQuests = (createdQuest:any) => {
        return {
            questId: createdQuest[0],
            questDate: createdQuest[1],
            questDescription: createdQuest[2],
            questDifficulty: createdQuest[3],
            questPrivate: createdQuest[4] == 'true',
            categoryName: createdQuest[5],
            categoryImage: createdQuest[6],
            questName: createdQuest[7]
        }
    }

    useEffect(() => {
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
            }).catch(function () {
                history.push("/welcome")
                alert.error(text.error.SOMETHING_WENT_WRONG)
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

        getActiveQuest()
        getCreatedQuests(1)
        getAllPlayedQuests(1)
    }, [alert, text])



    // Template
    return (
        <div className="user-quest-list">

            {activeQuest === null && playedQuest === null && createdQuest === null && (
                <div className="user-quest-empty">

                    <div className="container-title">
                        <h2></h2>
                    </div>

                    <img src={require("../../assets/images/otherIcons/loading.svg")} alt="" />
                </div>
            )}

            {activeQuest !== null && playedQuest !== null && createdQuest !== null && (
                <div>
                    <UserQuestActive activeQuest={activeQuest} setActiveQuest={setActiveQuest} playedQuest={playedQuest} setPlayedQuest={setPlayedQuest}/>
                    <UserQuestCreated createdQuest={createdQuest} setCreatedQuest={setCreatedQuest} getCreatedQuests={getCreatedQuests}  />
                    <UserQuestPlayed playedQuest={playedQuest} getAllPlayedQuests={getAllPlayedQuests}/>
                </div>
            )}

            {activeQuest !== null && createdQuest !== null && playedQuest !== null && Object.keys(activeQuest).length === 0 && Object.keys(createdQuest).length === 0 && Object.keys(playedQuest).length === 0 && (
                <div className="user-quest-empty">

                    <div className="container-title">
                        <h2>{text.userQuest.title}</h2>
                    </div>

                    <div className="user-quest-empty-title">
                        <span>{text.userQuest.noData}</span>
                    </div>
                    <br />
                    <img src={require("../../assets/images/noData.svg")} alt="" />
                </div>
            )}
        </div>
    )
}

export default UserQuestList
