import React from "react"
import AdminQuestStageItem from "./AdminQuestStageItem";

// Props
interface Props {
   stages: any
}

// Component
const AdminQuestStageList: React.FC<Props> = (props) => {

    const {stages} = props

    const text = require('../../../assets/languageText/admin').adminText

    // Template
    return (
        <div className="adminQuestStageList">

            <div className="title">
                <span>{text.questDetails.stages}</span>
            </div>

            <div className="form">
            {stages.map((stage:any) => (
                <AdminQuestStageItem stage={stage} key={stage.id}/>
            ))}
        </div>

        </div>
    )
}

export default AdminQuestStageList
