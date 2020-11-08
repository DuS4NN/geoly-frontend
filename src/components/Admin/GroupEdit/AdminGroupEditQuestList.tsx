import React from "react"
import AdminGroupEditQuestItem from "./AdminGroupEditQuestItem";

// Props
interface Props {
    quests: any
    setQuests: (users:any) => void
    groupId: any
}

// Component
const AdminGroupEditQuestList: React.FC<Props> = (props) => {

    const {quests, setQuests, groupId} = props

    const text = require('../../../assets/languageText/admin').adminText

    // Template
    return (
        <div className="adminGroupEditQuestList">

            <div className="title">
                <span>{text.groupEdit.quests}</span>
            </div>

            <div className="form">
                {quests.map((quest:any) => (
                    <AdminGroupEditQuestItem key={quest.id} groupId={groupId} quest={quest} quests={quests} setQuests={setQuests} />
                ))}
            </div>

        </div>
    )
}

export default AdminGroupEditQuestList
