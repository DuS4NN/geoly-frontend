import React, {ChangeEvent} from "react"
import {debounce} from "lodash-es";

// Props
interface Props {
    setUser: (quest:any) => void
    setPage: (page:number) => void
}

// Component
const AdminPaymentInput: React.FC<Props> = (props) => {

    const {setUser, setPage} = props

    const text = require('../../../assets/languageText/admin').adminText

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleSearch(e.target.value)
    }

    const handleSearch = debounce((name:any) => {
        setUser(name)
        setPage(1)
    }, 500)

    // Template
    return (
        <div className="adminPaymentInput">
            <div className="title">
                <span>{text.payment.title}</span>
            </div>
            <div className="input">
                <input maxLength={50} onChange={handleInputChange} placeholder={text.payment.inputPlaceholder} />
            </div>
        </div>
    )
}

export default AdminPaymentInput
