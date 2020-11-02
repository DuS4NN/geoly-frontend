import React, {ChangeEvent, useEffect} from "react"
import {debounce} from "lodash-es";

// Props
interface Props {
    findUsers: any
}

// Component
const AdminUserInput: React.FC<Props> = (props) => {

    const {findUsers} = props

    const text = require('../../../assets/languageText/admin').adminText

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleSearch(e.target.value)
    }

    const handleSearch = debounce((nick:any) => {
        findUsers(nick)
    }, 500)

    // Template
    return (
        <div className="adminUserInput">
            <div className="title">
                <span>{text.user.title}</span>
            </div>
            <div className="input">
                <input maxLength={15} onChange={handleInputChange} placeholder={text.user.inputPlaceholder} />
            </div>
        </div>
    )
}

export default AdminUserInput
