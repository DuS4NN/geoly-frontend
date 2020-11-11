import React from "react"


// Props
interface Props {
    counts: any
}

// Component
const AdminMainCounts: React.FC<Props> = (props) => {

    const {counts} = props

    const text = require('../../../assets/languageText/admin').adminText


    // Template
    return (
        <div className="adminMainCounts">

            <div className="countContainer">
                <div className="title">
                    <span>{text.main.newUsers}</span>
                </div>
                <div className="count">
                    <span>{counts.newUsers}</span>
                </div>
            </div>

            <div className="countContainer center">
                <div className="title">
                    <span>{text.main.finishedQuests}</span>
                </div>
                <div className="count">
                    <span>{counts.finishedQuests}</span>
                </div>
            </div>

            <div className="countContainer">
                <div className="title">
                    <span>{text.main.finishedDaily}</span>
                </div>
                <div className="count">
                    <span>{counts.finishedDaily}</span>
                </div>
            </div>

        </div>
    )
}

export default AdminMainCounts
