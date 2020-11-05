import React, {ChangeEvent} from "react"
import {debounce} from "lodash-es";

// Props
interface Props {
    setQuest: (quest:any) => void
    setPage: (page:number) => void
}

// Component
const AdminQuestInput: React.FC<Props> = (props) => {

    const {setQuest, setPage} = props

    const text = require('../../../assets/languageText/admin').adminText

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleSearch(e.target.value)
    }

    const handleSearch = debounce((name:any) => {
        setQuest(name)
        setPage(1)
    }, 500)

    // Template
    return (
        <div className="adminQuestInput">
            <div className="title">
                <span>{text.quest.title}</span>
            </div>
            <div className="input">
                <input maxLength={50} onChange={handleInputChange} placeholder={text.quest.inputPlaceholder} />
            </div>
        </div>
    )
}

export default AdminQuestInput
