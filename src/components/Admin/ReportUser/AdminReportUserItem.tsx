import React, {useState} from "react"
import {NavLink, useHistory} from "react-router-dom"
import axios from "axios"
import {useAlert} from "react-alert";
import {adminText} from "../../../assets/languageText/admin";

// Props
interface Props {
    report: any
    reports: any
    setReports: (reports:any) => void
}

// Component
const AdminReportUserItem: React.FC<Props> = (props) => {

    const {report, reports, setReports} = props

    const [roll, setRoll] = useState(false) as Array<any>

    const [unsolved, setUnsolved] = useState([]) as Array<any>
    const [solved, setSolved] = useState([]) as Array<any>

    const adminText = require('../../../assets/languageText/admin').adminText
    const text = require('../../../assets/languageText/2.ts').text
    const alert = useAlert()
    const history = useHistory()

    const handleRoll = () => {
        if(!roll && unsolved.length === 0){
            axios({
                method: 'GET',
                url: process.env.REACT_APP_API_SERVER_URL+'/adminReportUserDetails?id='+report.userId,
                withCredentials: true
            }).then(function (response) {
                let statusCode = response.data.responseEntity.statusCode
                if(statusCode === 'OK'){
                    setSolved(response.data.data[0].map((report:any) => {
                        return {
                            count: report[0],
                            reason: report[1]
                        }
                    }))

                    setUnsolved(response.data.data[1].map((report:any) => {
                        return {
                            count: report[0],
                            reason: report[1]
                        }
                    }))

                }else{
                    alert.error(text.error.SOMETHING_WENT_WRONG)
                }
            }).catch(function () {
                history.push("/welcome")
                alert.error(text.error.SOMETHING_WENT_WRONG)
            })
        }

        setRoll(!roll);
    }

    const handleSolve = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminReportUserSolve?id='+report.userId,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){

                setReports(reports.filter(function (r:any) {
                    return r.userId !== report.userId
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
        <div className="adminReportUserItem">

            <div className="itemContent">
                <div className="image">
                    <img alt="" src={process.env.REACT_APP_IMAGE_SERVER_URL+report.image} />
                </div>
                <div className="name">
                    <NavLink to={"/admin/user/"+report.userId}>{report.nick}</NavLink>
                </div>
                <div className="count">
                    <span>{report.count}</span>
                </div>
                <div className="arrow">
                    <img onClick={handleRoll} alt="" src={roll ? require("../../../assets/images/otherIcons/arrow-up.svg") : require("../../../assets/images/otherIcons/arrow-down.svg")} />
                </div>
            </div>

            {roll && unsolved.length > 0 && (
                <div className="reportDetails">
                    <div className="detailsContainer">
                        <div className="title">
                            <span>{adminText.userReport.unsolved}</span>
                        </div>

                        {unsolved.map((report:any) => (
                            <div className="details" key={"unsolved-"+report.reason}>
                                <div className="reason">
                                    <span>{text.reportReasons[report.reason]}:</span>
                                </div>
                                <div className="count">
                                    <span>&ensp;{report.count}</span>
                                </div>
                            </div>
                        ))}

                    </div>

                    {solved.length > 0 && (
                        <div className="detailsContainer">
                            <div className="title">
                                <span>{adminText.userReport.solved}</span>
                            </div>

                            {solved.map((report:any) => (
                                <div className="details" key={"solved-"+report.reason}>
                                    <div className="reason">
                                        <span>{text.reportReasons[report.reason]}:</span>
                                    </div>
                                    <div className="count">
                                        <span>&ensp;{report.count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}


                    <div className="detailsButton">
                        <button onClick={handleSolve}>{adminText.userReport.solve}</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminReportUserItem
