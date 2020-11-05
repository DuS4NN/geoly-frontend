import React, {ChangeEvent} from "react"
import {debounce} from "lodash-es";

// Props
interface Props {
    setUser: (user:any) => void
    setPage: (page:number) => void
}

// Component
const AdminQuestPlayedInput: React.FC<Props> = (props) => {

    const {setUser, setPage} = props

    const text = require('../../../assets/languageText/admin').adminText

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleSearch(e.target.value)
    }

    const handleSearch = debounce((id:any) => {
        if(id === ""){
            setUser(0)
            setPage(1)
            return
        }else if(!parseInt(id)){
            return
        }
        setPage(1)
        setUser(parseInt(id))
    }, 500)

    // Template
    return (
        <div className="adminQuestPlayedInput">
            <div className="title">
                <span>{text.questDetails.played}</span>
            </div>
            <div className="input">
                <input maxLength={10} onChange={handleInputChange} placeholder={text.questDetails.inputPlaceholder} />
            </div>
        </div>
    )
}

export default AdminQuestPlayedInput
