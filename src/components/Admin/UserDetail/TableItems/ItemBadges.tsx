import React, {useEffect, useState} from "react"
import {useAlert} from "react-alert"
import ReactTooltip from "react-tooltip";
import axios from "axios"
import {useHistory} from "react-router-dom";

// Props
interface Props {
    badge: any
    setBadges: (badges:any) => void
    badges: any
}

// Component
const ItemBadge: React.FC<Props> = (props:any) => {

    const {badge, setBadges, badges} = props

    const [date, setDate] = useState(new Date())
    const [remove, setRemove] = useState(false) as Array<any>

    const adminText = require('../../../../assets/languageText/admin').adminText
    const text = require('../../../../assets/languageText/2').text
    const alert = useAlert()
    const history = useHistory()

    useEffect(() => {
        if(badge.date){
            setDate(new Date(badge.date))
        }
    }, [])

    const handleChangeRemove = () => {
        setRemove(!remove)
    }

    const handleDelete = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminRemoveBadge?id='+badge.id,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){
                setBadges(badges.filter(function (b:any) {
                    return b.id !== badge.id
                }))

                alert.success(adminText.success[serverResponse])
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }

    // Template
    return (
        <div className="tableItemBadge">
            {!remove && (
                <div className="item">
                    <div className="tableItemBadgeImage">
                        <img alt="" src={require("../../../../"+badge.image)} />
                    </div>
                    <div className="tableItemBadgeName">
                        <span>{text.badge[badge.name]}</span>
                    </div>
                    <div className="tableItemBadgeDate">
                        <span>{date.getDate()+". "+(date.getMonth()+1)+". "+date.getFullYear()+" "+ (date.getHours() < 10 ? '0' : '') +date.getHours()+":"+ (date.getMinutes() < 10 ? '0' : '') +date.getMinutes()}</span>
                    </div>

                    <div className="tableItemBadgeAction">
                        <img data-tip={adminText.userDetails.delete} alt="" src={require("../../../../assets/images/otherIcons/delete.svg")} onClick={handleChangeRemove} />
                        <ReactTooltip />
                    </div>
                </div>
            )}

            {remove && (
                <div className="removeItem">
                    <div className="removeYes">
                        <button onClick={handleDelete}>{adminText.userDetails.delete}</button>
                    </div>
                    <div className="removeNo">
                        <button onClick={handleChangeRemove}>{adminText.userDetails.return}</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ItemBadge
