import React, {ChangeEvent} from "react"
import {debounce} from "lodash-es";

// Props
interface Props {
    setUser: (user:any) => void
    setPage: (page:number) => void
}

// Component
const AdminUserReportInput: React.FC<Props> = (props) => {

    const {setUser, setPage} = props

    const text = require('../../../assets/languageText/admin').adminText

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleSearch(e.target.value)
    }

    const handleSearch = debounce((nick:any) => {
        setUser(nick)
        setPage(1)
    }, 500)

    // Template
    return (
        <div className="adminUserReportInput">
            <div className="title">
                <span>{text.userReport.title}</span>
            </div>
            <div className="input">
                <input maxLength={15} onChange={handleInputChange} placeholder={text.userReport.inputPlaceholder} />
            </div>
        </div>
    )
}

export default AdminUserReportInput
