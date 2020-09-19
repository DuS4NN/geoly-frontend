import React, {useContext, useEffect} from 'react'
import {UserContext} from "../../UserContext"
import axios from 'axios'

// Style

// Props
interface Props {
    selectedQuest: any
    id: any
}

// Component
const GroupQuestDetail: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const {selectedQuest, id} = props

    useEffect(() => {
        if(selectedQuest !== 0){
            axios({
                method: 'GET',
                url: process.env.REACT_APP_API_SERVER_URL+'/group/questdetails?partyId='+id+'&questId='+selectedQuest,
                withCredentials: true
            }).then(function (response) {
                console.log(response)
            })
        }
    }, [selectedQuest])

    // Template
    return (
        <div className="group-quest-detail">

        </div>
    )
}

export default GroupQuestDetail
