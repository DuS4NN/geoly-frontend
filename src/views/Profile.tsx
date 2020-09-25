import React, {useContext, useEffect, useState} from "react"
import axios from 'axios'

// Children
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileInfo from "../components/Profile/ProfileInfo";
import {UserContext} from "../UserContext";
import ProfileQuest from "../components/Profile/ProfileQuest";

// Props
interface Props {
}

// Component
const Profile: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const text = require('../assets/languageText/'+userContext['languageId']+'.ts').text

    const [nick] = useState(window.location.href.split('/').pop())
    const [user, setUser] = useState({}) as Array<any>
    const [badges, setBadges] = useState([]) as Array<any>
    const [createdQuests, setCreatedQuests] = useState([]) as Array<any>
    const [playedQuests, setPlayedQuests] = useState([]) as Array<any>
    const [activity, setActivity] = useState([]) as Array<any>

    const [playedLength, setPlayedLength] = useState(0) as Array<any>
    const [createdLength, setCreatedLength] = useState(0) as Array<any>

    useEffect(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/profile?nickName='+nick,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode
            if(statusCode === 'OK'){
                setUser({
                    id: response.data.data[0][0][0],
                    private: response.data.data[0][0][1],
                    nick: response.data.data[0][0][2],
                    image: response.data.data[0][0][3],
                    about: response.data.data[0][0][4],
                    date: new Date(response.data.data[0][0][5]),
                    best: response.data.data[0][0][6],
                    this: response.data.data[0][0][7],
                    owner: response.data.data[0][0][8]
                })
                setBadges(response.data.data[1].map((badge:any) => {
                    return {
                        image: badge[0],
                        name: badge[1],
                        date: badge[2]
                    }
                }))
                setCreatedQuests(response.data.data[2].map((quest:any) => {
                    console.log(quest)
                    return {
                        categoryImage: quest[0],
                        categoryName: quest[1],
                        questDifficulty: quest[2],
                        questId: quest[3],
                        userName: quest[4],
                        userImage: quest[5],
                        questDate: new Date(quest[6]),
                        questName: quest[7]
                    }
                }))
                setPlayedQuests(response.data.data[3].map((quest:any) => {
                    return {
                        categoryImage: quest[0],
                        categoryName: quest[1],
                        questDifficulty: quest[2],
                        questId: quest[3],
                        userName: quest[4],
                        userImage: quest[5],
                        questDate: new Date(quest[6]),
                        questName: quest[7]
                    }
                }))
                setActivity(response.data.data[4].map((activity:any) => {
                    let date = new Date(activity[0])
                    return {
                        date: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
                        count: activity[0] < 4 ? 4 :activity[1]
                    }
                }))
                setPlayedLength(response.data.data[5][0])
                setCreatedLength(response.data.data[6][0])
            }else{
                throw Object.assign(
                    new Error("404"), {code: 404}
                )
            }
        })
    }, [])

    // Template
    return (
        <div className="profile">
            {user.private === 0 || user.owner === 1 ? (
                <div>
                    <ProfileHeader user={user} createdLength={createdLength} playedLength={playedLength} />
                    <ProfileInfo badges={badges} user={user} activity={activity} />
                    <ProfileQuest playedQuests={playedQuests} createdQuests={createdQuests} createdLength={createdLength} playedLength={playedLength} nick={nick} />
                </div>
            ) : (
                <div className="quest-private">
                    <div className="quest-private-title">
                        <h2>{text.private.profile}</h2>
                    </div>
                    <div className="quest-private-img">
                        <img src={require("../assets/images/private.svg")} alt=""/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile
