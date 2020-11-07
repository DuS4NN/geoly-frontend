import React, {ChangeEvent} from "react"
import {debounce} from "lodash-es";

// Props
interface Props {
    setQuest: (user:any) => void
    setPage: (page:number) => void
}

// Component
const AdminReportQuestInput: React.FC<Props> = (props) => {

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
        <div className="adminQuestReportInput">
            <div className="title">
                <span>{text.questReport.title}</span>
            </div>
            <div className="input">
                <input maxLength={15} onChange={handleInputChange} placeholder={text.questReport.inputPlaceholder} />
            </div>
        </div>
    )
}

export default AdminReportQuestInput
