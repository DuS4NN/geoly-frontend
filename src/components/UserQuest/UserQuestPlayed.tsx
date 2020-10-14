import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "../../UserContext"
import axios from 'axios'
import UserQuestPlayedItem from "./UserQuestPlayedItem";
import './UserQuestList.scss'
import {createMuiTheme, makeStyles, MuiThemeProvider} from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import ReactTooltip from "react-tooltip";
import {useHistory} from "react-router-dom"
import {useAlert} from "react-alert";

// Props
interface Props {
    playedQuest: any
    getAllPlayedQuests: (page:number) => void
}

const UserQuestPlayed: React.FC<Props> = (props) => {

    const {playedQuest, getAllPlayedQuests} = props
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)

    const history = useHistory()
    const alert = useAlert()


    useEffect(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/countplayedquests',
            withCredentials: true
        }).then(function (response) {
            setCount(response.data)
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }, [])

    const handleChangePage = (event:any, value:number) => {
        setPage(value)
        getAllPlayedQuests(value)
    };

    const useStyles = makeStyles(theme => ({
        alignItemsAndJustifyContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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


    return (
        <div className="user-quest-played">
            {playedQuest.length > 0 && (
                <div className="user-quest-played-container">
                    <div className="container-title">
                        <h2>{text.userQuest.playedQuests}</h2>
                    </div>

                    <div className="container-table">
                        {playedQuest.map((quest:any) => (
                            <UserQuestPlayedItem key={quest[0].questId} playedQuest={quest} />
                        ))}
                    </div>
                    <ReactTooltip />

                    <div className="user-quest-played-container-bottom">
                        <div className="user-quest-played-container-bottom-border">
                        </div>
                    </div>


                    {count > 5 && (
                        <MuiThemeProvider theme={theme}>
                            <Pagination
                                className={classes.alignItemsAndJustifyContent + " pagination"}
                                count={Math.ceil(count/5)}
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
export default UserQuestPlayed
