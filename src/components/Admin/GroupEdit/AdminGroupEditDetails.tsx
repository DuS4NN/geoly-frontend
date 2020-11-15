import React from "react"
import {NavLink} from "react-router-dom"

// Props
interface Props {
    details: any
}

// Component
const AdminGroupEditDetails: React.FC<Props> = (props) => {

    const {details} = props

    const adminText = require('../../../assets/languageText/admin').adminText

    // Template
    return (
        <div className="adminGroupEditDetails">
            <div className="title">
                <span>{details.name}</span>
            </div>

            <div className="info">
                <div className="item">
                    <div className="label">
                        <span>{adminText.groupEdit.user}</span>
                    </div>
                    <div className="content">
                        <div className="image">
                            <img alt="" src={process.env.REACT_APP_IMAGE_SERVER_URL+details.image} />
                        </div>
                        <div className="name">
                            <NavLink to={"/admin/user/"+details.userId}>{details.nick}</NavLink>
                        </div>
                    </div>
                </div>

                <div className="item">
                    <div className="label">
                        <span>{adminText.groupEdit.createdAt}</span>
                    </div>
                    <div className="content">
                        <span>{new Date(details.createdAt).getDate()+". "+(new Date(details.createdAt).getMonth()+1)+". "+new Date(details.createdAt).getFullYear()+" "+ (new Date(details.createdAt).getHours() < 10 ? '0' : '') +new Date(details.createdAt).getHours()+":"+ (new Date(details.createdAt).getMinutes() < 10 ? '0' : '') +new Date(details.createdAt).getMinutes()}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminGroupEditDetails
