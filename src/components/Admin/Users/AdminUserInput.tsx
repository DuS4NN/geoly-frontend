import React, {ChangeEvent, useEffect} from "react"
import {debounce} from "lodash-es";

// Props
interface Props {
    setUser: (user:any) => void
    setPage: (page:number) => void
}

// Component
const AdminUserInput: React.FC<Props> = (props) => {

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
