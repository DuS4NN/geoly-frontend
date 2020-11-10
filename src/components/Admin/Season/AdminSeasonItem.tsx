import React, {useEffect, useState} from "react"
import axios from "axios"
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";
import {createMuiTheme, makeStyles, MuiThemeProvider} from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import AdminQuestItem from "../Quests/AdminQuestItem";
import AdminSeasonDetailsItem from "./AdminSeasonDetailsItem";

// Props
interface Props {
    season: any
}

// Component
const AdminSeasonItem: React.FC<Props> = (props) => {

    const {season} = props

    const userText = require('../../../assets/languageText/2.ts').text
    const adminText = require('../../../assets/languageText/admin').adminText
    const alert = useAlert()
    const history = useHistory()

    const [show, setShow] = useState(false) as Array<any>
    const [details, setDetails] = useState([]) as Array<any>

    const [count, setCount] = useState(0) as Array<any>
    const [page, setPage] = useState(1) as Array<any>

    const useStyles = makeStyles(theme => ({
        alignItemsAndJustifyContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '20px',
            paddingBottom: '20px'
        },
    }))
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: "#30dd8a",
            },
        },
    });
    const classes = useStyles();

    const handleChangePage = (event:any, value:number) => {
        setPage(value)
        getDetails(value)
    }

    const getDetails = (page:number) => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminSeasonDetails?page='+page+'&year='+season.year+'&month='+season.month,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                let newDetails = response.data.data.map((detail:any) => {
                    return {
                        amount: detail[0],
                        name: detail[1],
                        image: detail[2],
                        id: detail[3]
                    }
                })
                setDetails(newDetails)
            }else{
                alert.error(adminText.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(adminText.error.SOMETHING_WENT_WRONG)
        })
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminSeasonDetailsCount?year='+season.year+"&month="+season.month,
            withCredentials: true
        }).then(function (response) {
            setCount(response.data)
        }).catch(function () {
            history.push("/welcome")
            alert.error(adminText.error.SOMETHING_WENT_WRONG)
        })
    }, [])

    const handleShow = () => {
        if(!show && details.length === 0){
            getDetails(1)
        }

        setShow(!show)
    }

    // Template
    return (
        <div className="adminSeasonItem">
            <div className="item">
                <div className="year">
                    <span>{season.year}</span>
                </div>
                <div className="month">
                    <span>{userText.month[season.month-1]}</span>
                </div>
                <div className="show">
                    <img onClick={handleShow} alt="" src={show ? require("../../../assets/images/otherIcons/arrow-up.svg") : require("../../../assets/images/otherIcons/arrow-down.svg")} />
                </div>
            </div>

            {show && details.length>0 && (
                <div className="details">

                    <div className="header">
                        <div className="user">
                            <span>{adminText.season.user}</span>
                        </div>
                        <div className="amount">
                            <span>{adminText.season.amount}</span>
                        </div>
                    </div>

                    {details.map((detail:any) => (
                        <AdminSeasonDetailsItem detail={detail} key={season.year+" "+season.month+" "+detail.id} />
                    ))}

                    {count > 20 && (
                        <MuiThemeProvider theme={theme}>
                            <Pagination
                                className={classes.alignItemsAndJustifyContent + " pagination"}
                                count={Math.ceil(count/20)}
                                page={page}
                                color="primary"
                                onChange={handleChangePage}
                            />
                        </MuiThemeProvider>
                    )}
                </div>
            )}
        </div>
    )
}

export default AdminSeasonItem
