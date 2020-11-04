import React, {ChangeEvent, useEffect} from "react"
import {debounce} from "lodash-es";

// Props
interface Props {
    findQuests: any
}

// Component
const AdminQuestInput: React.FC<Props> = (props) => {

    const {findQuests} = props

    const text = require('../../../assets/languageText/admin').adminText

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleSearch(e.target.value)
    }

    const handleSearch = debounce((name:any) => {
        findQuests(name)
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
