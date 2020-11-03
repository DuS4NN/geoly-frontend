import React from "react"

// Props
interface Props {
    point: any
}

// Component
const ItemPoint: React.FC<Props> = (props:any) => {

    const {point} = props

    const text = require("../../../../assets/languageText/2").text


    // Template
    return (
        <div className="tablePoint">
            <div className="season">
                <span>{text.month[point.month-1]} {point.year}</span>
            </div>
            <div className="amount">
                <span>{point.amount}</span>
            </div>
        </div>
    )
}

export default ItemPoint
