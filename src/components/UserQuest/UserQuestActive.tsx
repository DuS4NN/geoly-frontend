import React, {useContext, useEffect, useState} from "react"
import {NavLink} from "react-router-dom"
import axios from "axios"
import {UserContext} from "../../UserContext"
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom"
import './UserQuestList.scss'

// Props
interface Props {
    activeQuest: any
    setActiveQuest: (activeQuest:any) => void
    playedQuest: any
    setPlayedQuest: (playedQuest:any) => void
}

const UserQuestActive: React.FC<Props> = (props) => {

    const {setActiveQuest, activeQuest, playedQuest, setPlayedQuest} = props

    const [image, setImage] = useState("")
    const [category, setCategory] = useState("")

    // Context
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text
    const history = useHistory()
    const alert = useAlert()

    useEffect(() => {
        if(activeQuest !== null && activeQuest.categoryImage){
            setImage(activeQuest.categoryImage)
            setCategory(activeQuest.categoryName)
        }
    },[activeQuest])

    const handleSignOut = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/quest/signout?questId='+activeQuest.questId,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){

                let newPlayedQuest = playedQuest.map((quest:any) => {
                    if (activeQuest.questId === quest[0].questId){

                        let newQuest = []

                        for(let i=0; i<quest.length; i++){
                            if(i===0){
                                newQuest.push({
                                    ...quest[i],
                                    stageStatus: "CANCELED"
                                })
                            }else{
                                newQuest.push(quest[i])
                            }
                        }
                        return newQuest
                    }else{
                        return quest
                    }
                })
                setPlayedQuest(newPlayedQuest)

                setActiveQuest({})
                alert.success(text.success[serverResponse])
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })

    }

    return (
        <div className="user-quest-active">
            {activeQuest.questId && (
                <div className="user-quest-active-container">
                    <div className="container-title">
                        <h2>{text.userQuest.activeQuest}</h2>
                    </div>
                    <div className="container-table">
                        <div className="container-table-item">
                            <div className="item-category-image">
                                <img alt="" src={require("../../"+image)} />
                            </div>
                            <div className="item-category-name">
                                <span>{text.category[category.toLowerCase()]}</span>
                            </div>
                            <div className="item-quest-name">
                                <NavLink to={"./quest/"+activeQuest.questId}>{activeQuest.questName}</NavLink>
                            </div>
                        </div>
                    </div>

                    <div className="container-button">
                        <button onClick={handleSignOut}>{text.userQuest.signOut}</button>
                    </div>

                </div>
            )}
        </div>
    )
}
export default UserQuestActive
