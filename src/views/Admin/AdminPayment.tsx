import React, {useContext, useEffect, useState} from "react"
import AdminNavigation from "../../components/Admin/Navigation/AdminNavigation";
import "../../components/Admin/Payment/AdminPayment.scss"
import axios from "axios";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";
import {UserContext} from "../../UserContext";
import AdminPaymentInput from "../../components/Admin/Payment/AdminPaymentInput";
import AdminPaymentList from "../../components/Admin/Payment/AdminPaymentList";


// Component
const AdminPayment: React.FC = () => {

    const {userContext} = useContext(UserContext)
    const userText = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const text = require('../../assets/languageText/admin').adminText
    const alert = useAlert()
    const history = useHistory()

    if(userContext['roles'] === null || !userContext['roles'].includes("ADMIN")){
        history.push("/")
        alert.error(userText.error.PERMISSION_DENIED)
    }

    const [paymentList, setPaymentList] = useState([]) as Array<any>
    const [page, setPage] = useState(1) as Array<any>
    const [count, setCount] = useState(0) as Array<any>
    const [user, setUser] = useState("") as Array<any>

    const findUsers = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminPayment?page='+page+'&nick='+user,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                setCount(response.data.data[0])

                let newPayments = response.data.data[1].map((user:any) => {
                    return {
                        nick: user[0],
                        image: user[1],
                        start: user[2],
                        end: user[3],
                        agreement: user[4],
                        state: user[5],
                        userId: user[6]
                    }
                })
                setPaymentList(newPayments)
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }

    useEffect(() => {
        findUsers()
    }, [user, page])

    // Template
    return (
        <div className="adminPayment">
            <AdminNavigation />

            <div className="adminPaymentContainer">
                <AdminPaymentInput setUser={setUser} setPage={setPage} />
                <AdminPaymentList paymentList={paymentList} page={page} count={count} setPage={setPage} />
            </div>

        </div>
    )
}

export default AdminPayment
