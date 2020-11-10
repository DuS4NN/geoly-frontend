import React, {useContext, useEffect, useState} from "react"
import axios from "axios"
import "../../components/Admin/UserDetail/AdminUserDetails.scss"
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";
import AdminNavigation from "../../components/Admin/Navigation/AdminNavigation";
import AdminUserDetailsEdit from "../../components/Admin/UserDetail/AdminUserDetailsEdit";
import AdminUserDetailsTable from "../../components/Admin/UserDetail/AdminUserDetailsTable";
import {UserContext} from "../../UserContext";

// Props
interface Props {
}

// Component
const AdminUserEdit: React.FC<Props> = (props:any) => {

    const {userContext} = useContext(UserContext)
    const userText = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const text = require('../../assets/languageText/admin').adminText
    const alert = useAlert()
    const history = useHistory()

    if(userContext['roles'] === undefined || (!userContext['roles'].includes("MOD") && !userContext['roles'].includes("ADMIN"))){
        history.push("/")
        alert.error(userText.error.PERMISSION_DENIED)
    }
    const [details, setDetails] = useState({}) as Array<any>
    const [badges, setBadges] = useState([]) as Array<any>
    const [createdGroups, setCreatedGroups] = useState([]) as Array<any>
    const [joinedGroups, setJoinedGroups] = useState([]) as Array<any>
    const [createdQuests, setCreatedQuests] = useState([]) as Array<any>
    const [playedQuests, setPlayedQuests] = useState([]) as Array<any>
    const [reviews, setReviews] = useState([]) as Array<any>
    const [points, setPoints] = useState([]) as Array<any>

    useEffect(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminUserDetail?id='+props.match.params.id,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                let userDetails = response.data.data[0][0]
                setDetails({
                    id: props.match.params.id,
                    image: userDetails[0],
                    nick: userDetails[1],
                    about: userDetails[2],
                    active: userDetails[3] === 1,
                    email: userDetails[4],
                    address: userDetails[5],
                    verified: userDetails[6] === 1,
                    private: userDetails[7] === 1,
                    darkMode: userDetails[8] === 1,
                    mapTheme: userDetails[9],
                    language: userDetails[10]
                })

                setPlayedQuests(response.data.data[1].map((quest:any) => {
                    return {
                        id: quest[0],
                        date: quest[1],
                        name: quest[2],
                        active: quest[3]
                    }
                }))

                setCreatedQuests(response.data.data[2].map((quest:any) => {
                    return {
                        id: quest[0],
                        date: quest[1],
                        name: quest[2],
                        active: quest[3]
                    }
                }))

                setJoinedGroups(response.data.data[3].map((group:any) => {
                    return {
                        id: group[0],
                        name: group[1],
                        ownerId: group[2],
                        ownerNick: group[3],
                        date: group[4]
                    }
                }))

                setCreatedGroups(response.data.data[4].map((group:any) => {
                    return {
                        id: group[0],
                        date: group[1],
                        name: group[2]
                    }
                }))

                setBadges(response.data.data[5].map((badge:any) => {
                    return {
                        id: badge[0],
                        name: badge[1],
                        image: badge[2],
                        date: badge[3]
                    }
                }))

                setReviews(response.data.data[6].map((review:any) => {
                    return {
                        date: review[0],
                        text: review[1],
                        review: review[2],
                        questId: review[3],
                        id: review[4]
                    }
                }))

                setPoints(response.data.data[7].map((point:any) => {
                    return {
                        month: point[0],
                        year: point[1],
                        amount: point[2]
                    }
                }))
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }, [props])

    // Template
    return (
        <div className="adminUserDetails">
            <AdminNavigation />

            <div className="adminUserDetailsContainer">
                <AdminUserDetailsEdit details={details} setDetails={setDetails} />

                <AdminUserDetailsTable data={badges} setData={setBadges} name={text.userDetails.badges} key={text.userDetails.badges} />
                <AdminUserDetailsTable data={createdGroups} setData={setCreatedGroups} name={text.userDetails.createdGroups} key={text.userDetails.createdGroups} />
                <AdminUserDetailsTable data={joinedGroups} setData={setJoinedGroups} name={text.userDetails.joinedGroups} key={text.userDetails.joinedGroups} />
                <AdminUserDetailsTable data={createdQuests} setData={setCreatedQuests} name={text.userDetails.createdQuests} key={text.userDetails.createdQuests }/>
                <AdminUserDetailsTable data={playedQuests} setData={setPlayedQuests} name={text.userDetails.playedQuests} key={text.userDetails.playedQuests} />
                <AdminUserDetailsTable data={reviews} setData={setReviews} name={text.userDetails.reviews} key={text.userDetails.reviews} />
                <AdminUserDetailsTable data={points} setData={setPoints} name={text.userDetails.points} key={text.userDetails.points} />
            </div>
        </div>
    )
}

export default AdminUserEdit
