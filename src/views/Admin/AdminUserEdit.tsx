import React, {useEffect, useState} from "react"
import axios from "axios"
import "../../components/Admin/UserDetail/AdminUserDetails.scss"
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";

// Props
interface Props {
}

// Component
const AdminUserEdit: React.FC<Props> = (props:any) => {

    const [details, setDetails] = useState({}) as Array<any>
    const [badges, setBadges] = useState([]) as Array<any>
    const [createdGroups, setCreatedGroups] = useState([]) as Array<any>
    const [joinedGroups, setJoinedGroups] = useState([]) as Array<any>
    const [createdQuests, setCreatedQuests] = useState([]) as Array<any>
    const [playedQuests, setPlayedQuests] = useState([]) as Array<any>
    const [reviews, setReviews] = useState([]) as Array<any>

    const text = require('../../assets/languageText/admin').adminText
    const alert = useAlert()
    const history = useHistory()
    
    useEffect(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminUserDetail?id='+props.match.params.id,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                console.log(response)
            }else{
                alert.error(text.error)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }, [])

    // Template
    return (
        <div className="adminUserDetails">

        </div>
    )
}

export default AdminUserEdit
