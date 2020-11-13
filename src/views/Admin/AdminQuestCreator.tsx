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
    const userText = require('../../assets/languageText/2').user
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

    const handleAddQuest = () => {

        let finalStages = [] as any

        stages.map((s:any) => {
            finalStages.push({
                type: s.type,
                answer: s.answer === null ? null : s.answer.current?.value,
                question: s.question === null ? null : s.question.current?.value,
                advise: s.advise === null ? null : s.advise.current?.value === '' ? null : s.advise.current?.value,
                answersList: s.answerList === null ? null : s.answerList.length === 0 ? null : s.answerList.join(";"),
                latitude: s.latitude,
                longitude: s.longitude,
                qrCodeUrl: null,
                note: s.note === null ? null : s.note.current?.value === '' ? null : s.note.current?.value
            })
        })

        axios({
            method: 'POST',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminAddQuest',
            withCredentials: true,
            data: {
                name: nameRef.current?.value,
                description: descriptionRef.current?.value,
                categoryId: details.category,
                difficulty: details.difficulty,
                active: details.active,
                premium: details.premium,
                privateQuest: details.private,
                stages: finalStages
            }
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){

                history.push("/admin")
                alert.success(adminText.success[serverResponse])
            }else if(statusCode === 'BAD_REQUEST'){
                alert.error(adminText.error[serverResponse])
            }else{
                alert.error(adminText.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(adminText.error.SOMETHING_WENT_WRONG)
        })


    }

    // Template
    return (
        <div className="adminQuestCreator">
            <AdminNavigation />

            <div className="adminQuestCreatorContainer">
                <AdminQuestCreatorForm categories={categories} details={details} setDetails={setDetails} nameRef={nameRef} descriptionRef={descriptionRef} />
                <AdminQuestCreatorStageList stages={stages} setStages={setStages} />

                <div className="submitButton">
                    <button onClick={handleAddQuest}>{adminText.questCreator.addQuest}</button>
                </div>
            </div>

        </div>
    )
}

export default AdminQuestCreator
