import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import {UserContext} from "../../UserContext"

// Style
import './GroupsList.scss'
import GroupsListCreated from "./GroupListCreated";
import {useAlert} from "react-alert";

// Props
interface Props {
}

// Component
const GroupsList: React.FC = () => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text
    const alert = useAlert()

    const [createdGroups, setCreatedGroups] = useState([]) as Array<any>
    const [createdGroupsCount, setCreatedGroupsCount] = useState(0)


    const getCreatedGroups = (page:number) => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/createdgroups?page='+page,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                let newCreatedGroups = response.data.data.map((group:any) => {
                    return {
                        groupId: group[0],
                        groupName: group[1],
                        groupDate: group[2]
                    }
                })
                setCreatedGroups(newCreatedGroups)
            }else if(statusCode === 'NO_CONTENT'){
                setCreatedGroups([])
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        })
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/countcreatedgroups',
            withCredentials: true
        }).then(function (response) {
            setCreatedGroupsCount(response.data)
        })

        getCreatedGroups(1)
    }, [])

    // Template
    return (
        <div className="groups-list">
            <GroupsListCreated
                createdGroups={createdGroups}
                setCreatedGroups={setCreatedGroups}
                count={createdGroupsCount}
                setCount={setCreatedGroupsCount}
                getCreatedGroups={getCreatedGroups}
            />
        </div>
    )
}

export default GroupsList