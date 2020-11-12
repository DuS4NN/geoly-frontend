import React, {useContext, useEffect, useRef, useState} from "react"
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";
import {UserContext} from "../../UserContext";
import axios from "axios"
import AdminQuestCreatorForm from "../../components/Admin/QuestCreator/AdminQuestCreatorForm";
import AdminQuestCreatorStageList from "../../components/Admin/QuestCreator/AdminQuestCreatorStageList";
import AdminNavigation from "../../components/Admin/Navigation/AdminNavigation";
import "../../components/Admin/QuestCreator/AdminQuestCreator.scss"

// Component
const AdminQuestCreator: React.FC = () => {

    const {userContext} = useContext(UserContext)

    const adminText = require('../../assets/languageText/admin').adminText
    const alert = useAlert()
    const history = useHistory()

    if(userContext['roles'] === undefined || (!userContext['roles'].includes("MOD") && !userContext['roles'].includes("ADMIN"))){
        history.push("/")
        alert.error(adminText.error.PERMISSION_DENIED)
    }

    const [categories, setCategories] = useState([]) as Array<any>
    const [details, setDetails] = useState({}) as Array<any>
    const [stages, setStages] = useState([]) as Array<any>

    const nameRef = useRef(null) as any
    const descriptionRef = useRef(null) as any

    useEffect(() => {
        setDetails({
            category: 1,
            difficulty: 1,
            active: true,
            premium: true,
            private: false
        })

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/categories',
        }).then(function (response) {
            setCategories(response.data.map((category:any) => {
                return {
                    value: category.id,
                    label: category.name,
                    image: category.imageUrl
                }
            }))
        }).catch(function () {
            history.push("/welcome")
            alert.error(adminText.error.SOMETHING_WENT_WRONG)
        })
    }, [])

    // Template
    return (
        <div className="adminQuestCreator">
            <AdminNavigation />

            <div className="adminQuestCreatorContainer">
                <AdminQuestCreatorForm categories={categories} details={details} setDetails={setDetails} nameRef={nameRef} descriptionRef={descriptionRef} />
                <AdminQuestCreatorStageList stages={stages} setStages={setStages} />
            </div>

        </div>
    )
}

export default AdminQuestCreator
