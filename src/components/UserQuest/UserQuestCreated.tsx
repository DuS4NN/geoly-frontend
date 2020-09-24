import React, {useContext, useEffect, useState} from "react"
// Context
import {UserContext} from "../../UserContext"

import './UserQuestList.scss'
import UserQuestCreatedItem from "./UserQuestCreatedItem";
import {createMuiTheme, makeStyles, MuiThemeProvider} from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import ReactTooltip from "react-tooltip";

// Props
interface Props {
    createdQuest: any
    setCreatedQuest: (activeQuest:any) => void
    getCreatedQuests: (page:number) => void
}

const UserQuestCreated: React.FC<Props> = (props) => {

    const {createdQuest, setCreatedQuest, getCreatedQuests} = props

    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)

    useEffect(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/countcreatedquests',
            withCredentials: true
        }).then(function (response) {
            setCount(response.data)
        })
    }, [])

    // Context
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const handleChangePage = (event:any, value:number) => {
        setPage(value)
        getCreatedQuests(value)
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
        <div className="user-quest-created">
            {createdQuest.length > 0 && (
                <div className="user-quest-created-container">
                    <div className="container-title">
                        <h2>{text.userQuest.createdQuests}</h2>
                    </div>

                    <div className="container-table">
                        {createdQuest.map((quest:any) => (
                            <UserQuestCreatedItem key={quest.questId} createdQuest={quest} createdQuests={createdQuest} setCreatedQuests={setCreatedQuest} count={count} setCount={setCount} page={page} setPage={setPage} getCreatedQuests={getCreatedQuests}/>
                        ))}
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
export default UserQuestCreated
