import React, {useContext, useEffect, useState} from "react"
import GroupHeader from "../components/Group/GroupHeader"
import axios from 'axios'
import GroupQuestDetail from "../components/Group/GroupQuestDetail";
import GroupQuestList from "../components/Group/GroupQuestList";
import '../components/Group/GroupQuestList.scss'
import {UserContext} from "../UserContext";
import {useHistory} from "react-router-dom";
import {useAlert} from "react-alert";

// Props
interface Props {
}

// Component
const Group: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const text = require('../assets/languageText/'+userContext['languageId']+'.ts').text
    const history = useHistory()
    const alert = useAlert()

    const [id] = useState(window.location.href.split('/').pop())
    const [selectedQuest, setSelectedQuest] = useState({})
    const [details, setDetails] = useState({}) as Array<any>
    const [users, setUsers] = useState([]) as Array<any>
    const [quests, setQuests] = useState([]) as Array<any>

    useEffect(() => {
        if(!userContext['nickName']){
            alert.error(text.error.UNAUTHORIZED)
            history.push("/login")
            return
        }

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/group?id='+id,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                setDetails({
                    groupName: response.data.data[0][0][0],
                    groupDate: new Date(response.data.data[0][0][1]),
                    groupOwner: response.data.data[0][0][2]
                })

                setUsers(response.data.data[1].map((user:any) => {
                    return {
                        userName: user[0],
                        userImage: user[1],
                        userDate: new Date(user[2])
                    }
                }))

                setQuests(response.data.data[2].map((quest:any, index:number) => {
                    let q = {
                        questDescription: quest[0],
                        questDifficulty: quest[1],
                        categoryImage: quest[2],
                        categoryName: quest[3],
                        questName: quest[4],
                        questId: quest[5]
                    }
                    if(index === 0){
                        setSelectedQuest(q)
                    }
                    return q
                }))

            }else{
                throw Object.assign(
                    new Error("404"), {code: 404}
                )
            }
        })
    }, [])

    // Template
    return (
        <div className="group">
            {userContext['nickName'] && (
                <div>
                    <GroupHeader details={details} users={users}/>

                    {quests && quests.length > 0 ? (
                        <div className="group-content">
                            <GroupQuestList quests={quests} setSelectedQuest={setSelectedQuest}/>
                            <GroupQuestDetail selectedQuest={selectedQuest} id={id}/>
                        </div>
                    ) : (
                        <div className="group-no-quest">
                            <div className="title">
                                <h2>{text.group.noQuest}</h2>
                            </div>
                            <div className="img">
                                <img src={require("../assets/images/noData.svg")} alt=""/>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Group
